"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  getAdjacentProjectSlugs,
  getProjectBySlug,
  projectHasApproach,
} from "@/data/portfolio";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";
import { ProjectGallery } from "./ProjectGallery";
import "./projects.css";

type ProjectCaseStudyProps = {
  slug: string;
};

export function ProjectCaseStudy({ slug }: ProjectCaseStudyProps) {
  const { t, locale, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const { projects: copy } = dict;

  const project = getProjectBySlug(locale, slug);
  const neighbors = getAdjacentProjectSlugs(slug);

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
        <h1 className="project-case__title">{copy.notFoundTitle}</h1>
        <p className="project-case__lead text-muted">{copy.notFoundBody}</p>
        <Link href="/projects" className="project-card__link project-card__link--primary">
          {copy.backToProjects}
        </Link>
      </section>
    );
  }

  const typeLabel =
    project.type === "mobile"
      ? copy.typeMobile
      : project.type === "web"
        ? copy.typeWeb
        : null;

  const showApproach = projectHasApproach(project);

  return (
    <article className="project-case">
      <Link href="/projects" className="project-case__back text-chrome">
        {copy.backToProjects}
      </Link>

      <header className="project-case__header">
        <div className="project-case__heading">
          <h1 className="project-case__title">
            <span className="text-secondary" aria-hidden>
              #
            </span>
            {project.title}
          </h1>
          {typeLabel && <span className="project-case__type">{typeLabel}</span>}
        </div>

        <div className="project-case__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--primary"
            >
              {copy.github}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              {copy.demo}
            </a>
          )}
        </div>
      </header>

      <ul className="project-case__tags">
        {project.technologies.map((tech) => (
          <li key={tech.name} className="project-card__tag">
            {tech.name}
          </li>
        ))}
      </ul>

      <div className="project-case__media">
        <ProjectGallery
          images={project.images}
          title={project.title}
          type={project.type ?? "web"}
        />
      </div>

      <section className="project-case__section" aria-labelledby="case-motivation">
        <h2 id="case-motivation" className="project-case__section-title">
          <span className="text-secondary" aria-hidden>
            #
          </span>
          {copy.sectionMotivation}
        </h2>
        <p className="project-case__text">{project.motivation}</p>
      </section>

      <section className="project-case__section" aria-labelledby="case-overview">
        <h2 id="case-overview" className="project-case__section-title">
          <span className="text-secondary" aria-hidden>
            #
          </span>
          {copy.sectionOverview}
        </h2>
        <p className="project-case__text">{project.overview}</p>
        {project.highlights.length > 0 && (
          <ul className="project-case__list">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      {showApproach && (
        <section className="project-case__section" aria-labelledby="case-approach">
          <h2 id="case-approach" className="project-case__section-title">
            <span className="text-secondary" aria-hidden>
              #
            </span>
            {copy.sectionApproach}
          </h2>
          <p className="project-case__text">{project.approach}</p>
        </section>
      )}

      {project.learnings.length > 0 && (
        <section className="project-case__section" aria-labelledby="case-learnings">
          <h2 id="case-learnings" className="project-case__section-title">
            <span className="text-secondary" aria-hidden>
              #
            </span>
            {copy.sectionLearnings}
          </h2>
          <ul className="project-case__list">
            {project.learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <footer className="project-case__footer">
        <div className="project-case__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--primary"
            >
              {copy.github}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              {copy.demo}
            </a>
          )}
        </div>

        <nav className="project-case__nav" aria-label={copy.nextProject}>
          {neighbors.previous && (
            <Link
              href={`/projects/${neighbors.previous}`}
              className="project-case__nav-link text-chrome"
            >
              {copy.previousProject}
            </Link>
          )}
          {neighbors.next && (
            <Link
              href={`/projects/${neighbors.next}`}
              className="project-case__nav-link project-case__nav-link--next"
            >
              {copy.nextProject} →
            </Link>
          )}
        </nav>
      </footer>
    </article>
  );
}
