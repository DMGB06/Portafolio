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

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const [current, setCurrent] = useState(0);
  const picks = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : projects.length - 1;
    const next = (current + delta) % projects.length;
    setCurrent(next);
    picks.current[next]?.focus();
  };

  const active = projects[current];
  const total = pad(projects.length);

  return (
    <div className="projects-index">
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
                  onClick={() => setCurrent(i)}
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
                      <p className="projects-index__desc">{project.description}</p>
                      <div className="projects-index__actions">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="project-card__link project-card__link--primary"
                          aria-label={fillTemplate(dict.a11y.viewCase, { title: project.title })}
                        >
                          {dict.projects.viewCase}
                        </Link>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__link"
                          >
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
