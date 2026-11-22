"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GSAP_PREHIDE, REVEAL_ITEM } from "@/animations";
import type { Project } from "@/types";
import { DEFAULT_LOCALE, fillTemplate, getDictionary, useTranslations } from "@/i18n";
import { ProjectScene } from "./ProjectScene";
import "./projects.css";
import "./projects-index.css";

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectDetails({ project, dict, compact = false }: { compact?: boolean; project: Project; dict: ReturnType<typeof getDictionary> }) {
  return (
    <>
      <p className="projects-index__desc">{compact ? project.shortDescription : project.description}</p>
      <div className="projects-index__actions">
        <Link
          href={`/projects/${project.slug}`}
          className="project-card__link project-card__link--primary"
          aria-label={fillTemplate(dict.a11y.viewCase, { title: project.title })}
        >
          {dict.projects.viewCase}
        </Link>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
            {dict.projects.github}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--demo"
          >
            <span className="project-card__link-dot" aria-hidden />
            {dict.projects.demo}
            <FaArrowUpRightFromSquare aria-hidden className="project-card__link-icon" />
          </a>
        )}
      </div>
    </>
  );
}

export function ProjectsExplorer({
  projects,
  variant = "index",
}: {
  projects: Project[];
  variant?: "home" | "index";
}) {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const [{ index: current, animate }, setSelection] = useState({ index: 0, animate: false });
  const picks = useRef<(HTMLButtonElement | null)[]>([]);
  const isHome = variant === "home";

  const select = (index: number, animate: boolean) => {
    setSelection((previous) => previous.index === index ? previous : { index, animate });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : projects.length - 1;
    const next = (current + delta) % projects.length;
    select(next, false);
    const preventScroll = isHome && window.matchMedia("(width > 899px)").matches;
    picks.current[next]?.focus({ preventScroll });
  };

  const active = projects[current];
  const total = pad(projects.length);

  return (
    <div className="projects-index" data-variant={variant} data-animate-selection={animate || undefined}>
      <div>
        <ul className="projects-index__list" aria-label={dict.a11y.projectsList} onKeyDown={onKeyDown}>
          {projects.map((project, i) => {
            const isActive = i === current;
            const typeLabel = project.type === "mobile" ? dict.projects.typeMobile : dict.projects.typeWeb;
            return (
              <li
                key={project.id}
                className={`projects-index__item${isActive ? " is-active" : ""} ${GSAP_PREHIDE}`}
                {...{ [REVEAL_ITEM]: true }}
              >
                <button
                  type="button"
                  ref={(el) => {
                    picks.current[i] = el;
                  }}
                  className="projects-index__pick"
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => select(i, isHome && event.detail > 0)}
                >
                  <span className="projects-index__idx">{pad(i + 1)}</span>
                  <span className="projects-index__main">
                    <span className="projects-index__row">
                      <span className="projects-index__name">{project.title}</span>
                      <span className="projects-index__type">{typeLabel}</span>
                    </span>
                    <span className="projects-index__tags">
                      {project.technologies.map((tech) => (
                        <span key={tech.name} className="projects-index__tag">
                          {tech.name}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>

                <div className="projects-index__more">
                  <div className="projects-index__more-in">
                    <div className="projects-index__more-pad">
                      <ProjectDetails project={project} dict={dict} compact={isHome} />
                    </div>
                  </div>
                </div>

                <div className="projects-index__media">
                  <ProjectScene project={project} active />
                </div>
              </li>
            );
          })}
        </ul>
        {isHome && (
          <div className={`projects-index__details ${GSAP_PREHIDE}`} {...{ [REVEAL_ITEM]: true }}>
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="projects-index__detail"
                data-active={i === current}
                inert={i !== current}
              >
                <ProjectDetails project={project} dict={dict} compact={isHome} />
              </div>
            ))}
          </div>
        )}
        <p className="projects-index__hint">
          <kbd>↑</kbd> <kbd>↓</kbd> {dict.projects.switchHint}
        </p>
      </div>

      <div className={`projects-stage ${GSAP_PREHIDE}`} {...{ [REVEAL_ITEM]: true }}>
        <div className="projects-stage__scenes">
          {projects.map((project, i) => (
            <ProjectScene key={project.id} project={project} active={i === current} />
          ))}
        </div>
        <div className="projects-stage__bar">
          <span>
            <b>
              {pad(current + 1)} / {total}
            </b>
            &nbsp; {active.title}
          </span>
          <span>{active.technologies.map((tech) => tech.name).join(" · ")}</span>
        </div>
      </div>
    </div>
  );
}
