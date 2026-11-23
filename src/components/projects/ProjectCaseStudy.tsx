"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GSAP_PREHIDE, REVEAL_ITEM, useRevealOnScroll } from "@/animations";
import { getAdjacentProjectSlugs, getProjectBySlug } from "@/data/portfolio";
import {
  DEFAULT_LOCALE,
  fillTemplate,
  getDictionary,
  useTranslations,
} from "@/i18n";
import { ProjectDemoPlayer } from "./ProjectDemoPlayer";
import { ProjectScene } from "./ProjectScene";
import "./projects.css";
import "./projects-index.css";
import "./case-study.css";

type ProjectCaseStudyProps = {
  slug: string;
};

function CaseSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`case-sec ${GSAP_PREHIDE}`}
      id={id}
      aria-labelledby={`${id ?? title}-title`}
      {...{ [REVEAL_ITEM]: true }}
    >
      <h2 className="case-sec__label" id={`${id ?? title}-title`}>
        <span className="text-secondary" aria-hidden>
          #
        </span>
        {title}
      </h2>
      <div className="case-sec__body">{children}</div>
    </section>
  );
}

export function ProjectCaseStudy({ slug }: ProjectCaseStudyProps) {
  const { t, locale, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const { projects: copy, a11y } = dict;
  const articleRef = useRef<HTMLElement>(null);
  useRevealOnScroll(articleRef);

  const project = getProjectBySlug(locale, slug);
  const neighbors = getAdjacentProjectSlugs(slug);
  const previousProject = neighbors.previous
    ? getProjectBySlug(locale, neighbors.previous)
    : null;
  const nextProject = neighbors.next
    ? getProjectBySlug(locale, neighbors.next)
    : null;

  useEffect(() => {
    if (!isReady || !project) return;

    const previousTitle = document.title;
    document.title = `${project.title} · ${dict.metadata.title}`;

    return () => {
      document.title = previousTitle;
    };
  }, [isReady, project, dict.metadata.title]);

  if (!project) {
    return (
      <section className="project-case project-case--missing" aria-live="polite">
        <Link href="/projects" className="project-case__back text-chrome">
          {copy.backToProjects}
        </Link>
        <h1 className="case-title">{copy.notFoundTitle}</h1>
        <p className="case-tagline">{copy.notFoundBody}</p>
        <Link
          href="/projects"
          className="project-card__link project-card__link--primary"
        >
          {copy.backToProjects}
        </Link>
      </section>
    );
  }

  const typeLabel =
    project.type === "mobile" ? copy.typeMobile : copy.typeWeb;
  const hasVideo = Boolean(project.video);
  const repoName = project.github?.split("/").slice(-2).join(" / ");

  return (
    <article ref={articleRef} className="project-case">
      <Link href="/projects" className="project-case__back text-chrome">
        {copy.backToProjects}
      </Link>

      <header className="case-hero">
        <div className="case-hero__text case-enter">
          <span className="case-chip">{typeLabel}</span>
          <h1 className="case-title">
            <span className="text-secondary" aria-hidden>
              #
            </span>
            {project.title}
          </h1>
          <p className="case-tagline">{project.description}</p>
          <div className="case-actions">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="case-btn case-btn--main"
              >
                <span className="project-card__link-dot" aria-hidden />
                {copy.liveDemo}
                <FaArrowUpRightFromSquare aria-hidden className="project-card__link-icon" />
              </a>
            ) : (
              hasVideo && (
                <a href="#demo" className="case-btn case-btn--main">
                  {copy.watchVideo} ↓
                </a>
              )
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="case-btn"
              >
                {copy.viewCode}
              </a>
            )}
          </div>
          <ul className="case-stack" aria-label={a11y.stackLabel}>
            {project.technologies.map((tech) => (
              <li key={tech.name}>{tech.name}</li>
            ))}
          </ul>
        </div>

        <div className="case-stage">
          <div className="case-stage__scenes">
            <ProjectScene project={project} active priority />
          </div>
        </div>
      </header>

      <dl className={`case-facts ${GSAP_PREHIDE}`} {...{ [REVEAL_ITEM]: true }}>
        <div className="case-fact">
          <dt>{copy.factType}</dt>
          <dd>{typeLabel}</dd>
        </div>
        {project.platforms && (
          <div className="case-fact">
            <dt>{copy.factPlatforms}</dt>
            <dd>{project.platforms}</dd>
          </div>
        )}
        <div className="case-fact">
          <dt>{copy.factStack}</dt>
          <dd>
            {project.technologies
              .slice(0, 3)
              .map((tech) => tech.name)
              .join(", ")}
          </dd>
        </div>
        {project.github && (
          <div className="case-fact">
            <dt>{copy.factCode}</dt>
            <dd>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                {repoName} ↗
              </a>
            </dd>
          </div>
        )}
      </dl>

      <CaseSection id="problem" title={copy.sectionProblem}>
        <p className="case-lead">{project.motivation}</p>
      </CaseSection>

      <CaseSection
        id="demo"
        title={hasVideo ? copy.sectionDemo : copy.sectionScreens}
      >
        {project.video && (
          <ProjectDemoPlayer
            src={project.video}
            poster={project.images[0]}
            label={fillTemplate(a11y.projectDemo, { title: project.title })}
            chaptersLabel={copy.chaptersLabel}
            chapters={project.chapters}
          />
        )}
        <ul
          className={`case-shots case-shots--${project.type === "mobile" ? "mobile" : "web"}`}
        >
          {project.images.map((image, index) => (
            <li key={image} className="case-shot">
              <Image
                src={image}
                alt={project.screenshotAlts?.[index] ?? fillTemplate(a11y.galleryScreenshot, {
                  title: project.title,
                  index: index + 1,
                })}
                width={project.type === "mobile" ? 406 : 1280}
                height={project.type === "mobile" ? 912 : 681}
                sizes={
                  project.type === "mobile"
                    ? "(max-width: 899px) 45vw, 200px"
                    : "(max-width: 600px) 95vw, (max-width: 899px) 45vw, 440px"
                }
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection id="overview" title={copy.sectionOverview}>
        <p className="case-text">{project.overview}</p>
        {project.highlights.length > 0 && (
          <ul className="case-feats">
            {project.highlights.map((item) => (
              <li key={item} className="case-feat">
                {item}
              </li>
            ))}
          </ul>
        )}
      </CaseSection>

      {project.decisions.length > 0 && (
        <CaseSection id="decisions" title={copy.sectionDecisions}>
          <ul className="case-decisions">
            {project.decisions.map((decision) => (
              <li key={decision.title} className="case-decision">
                <h3>{decision.title}</h3>
                <p>{decision.text}</p>
              </li>
            ))}
          </ul>
        </CaseSection>
      )}

      {project.learnings.length > 0 && (
        <CaseSection id="learnings" title={copy.sectionLearnings}>
          <ul className="case-learn">
            {project.learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseSection>
      )}

      <nav
        className={`case-next ${GSAP_PREHIDE}`}
        aria-label={copy.projectsNav}
        {...{ [REVEAL_ITEM]: true }}
      >
        {/* Con solo 2 proyectos el anterior y el siguiente son el mismo: el lado izquierdo vuelve al listado */}
        {previousProject &&
        neighbors.previous &&
        neighbors.previous !== slug &&
        neighbors.previous !== neighbors.next ? (
          <Link
            href={`/projects/${neighbors.previous}`}
            className="case-nav"
            aria-label={fillTemplate(a11y.previousProject, {
              title: previousProject.title,
            })}
          >
            <small>← {copy.previousProject}</small>
            <span>{previousProject.title}</span>
          </Link>
        ) : (
          <Link href="/projects" className="case-nav">
            <small>{copy.backToProjects}</small>
            <span>{copy.allProjects}</span>
          </Link>
        )}
        {nextProject && neighbors.next && neighbors.next !== slug && (
          <Link
            href={`/projects/${neighbors.next}`}
            className="case-nav case-nav--next"
            aria-label={fillTemplate(a11y.nextProject, {
              title: nextProject.title,
            })}
          >
            <small>{copy.nextProject} →</small>
            <span>{nextProject.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
