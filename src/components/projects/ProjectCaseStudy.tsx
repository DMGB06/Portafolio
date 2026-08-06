"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  getAdjacentProjectSlugs,
  getProjectBySlug,
  projectHasApproach,
} from "@/data/portfolio";
import {
  DEFAULT_LOCALE,
  fillTemplate,
  getDictionary,
  useTranslations,
} from "@/i18n";
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
        <h1 className="project-case__title">{copy.notFoundTitle}</h1>
        <p className="project-case__lead text-muted">{copy.notFoundBody}</p>
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
    project.type === "mobile"
      ? copy.typeMobile
      : project.type === "web"
        ? copy.typeWeb
        : null;

  const showApproach = projectHasApproach(project);

  const externalLinks = (
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
  );

  const techTags = (
    <ul className="project-case__tags">
      {project.technologies.map((tech) => (
        <li key={tech.name} className="project-card__tag">
          {tech.name}
        </li>
      ))}
    </ul>
  );

  return (
    <article className="project-case">
      <Link href="/projects" className="project-case__back text-chrome">
        {copy.backToProjects}
      </Link>

      <header className="project-case__intro">
        <div className="project-case__heading">
          <h1 className="project-case__title">
            <span className="text-secondary" aria-hidden>
              #
            </span>
            {project.title}
          </h1>
          {typeLabel && <span className="project-case__type">{typeLabel}</span>}
        </div>
      </header>

      <div className="project-case__layout">
        <aside className="project-case__meta">
          <div className="project-case__meta-inner">
            {externalLinks}
            {techTags}
          </div>
        </aside>

        <div className="project-case__story">
          <p className="project-case__lead">{project.description}</p>

          <section
            className="project-case__callout"
            aria-labelledby="case-motivation"
          >
            <h2 id="case-motivation" className="project-case__section-title">
              <span className="text-secondary" aria-hidden>
                #
              </span>
              {copy.sectionMotivation}
            </h2>
            <p className="project-case__callout-text">{project.motivation}</p>
          </section>

          <div className="project-case__media">
            <ProjectGallery
              images={project.images}
              title={project.title}
              type={project.type ?? "web"}
            />
          </div>

          <section
            className="project-case__section"
            aria-labelledby="case-overview"
          >
            <h2 id="case-overview" className="project-case__section-title">
              <span className="text-secondary" aria-hidden>
                #
              </span>
              {copy.sectionOverview}
            </h2>
            <p className="project-case__text">{project.overview}</p>
            {project.highlights.length > 0 && (
              <ul className="project-case__chips">
                {project.highlights.map((item) => (
                  <li key={item} className="project-case__chip">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {showApproach && (
            <section
              className="project-case__panel"
              aria-labelledby="case-approach"
            >
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
            <section
              className="project-case__section"
              aria-labelledby="case-learnings"
            >
              <h2 id="case-learnings" className="project-case__section-title">
                <span className="text-secondary" aria-hidden>
                  #
                </span>
                {copy.sectionLearnings}
              </h2>
              <ol className="project-case__steps">
                {project.learnings.map((item, index) => (
                  <li key={item} className="project-case__step">
                    <span className="project-case__step-index" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>

      <footer className="project-case__footer">
        {externalLinks}
        <nav className="project-case__nav" aria-label={copy.projectsNav}>
          {previousProject && neighbors.previous && neighbors.previous !== slug && (
            <Link
              href={`/projects/${neighbors.previous}`}
              className="project-case__nav-link text-chrome"
              aria-label={fillTemplate(dict.a11y.previousProject, {
                title: previousProject.title,
              })}
            >
              ← {previousProject.title}
            </Link>
          )}
          {nextProject && neighbors.next && neighbors.next !== slug && (
            <Link
              href={`/projects/${neighbors.next}`}
              className="project-case__nav-link project-case__nav-link--next"
              aria-label={fillTemplate(dict.a11y.nextProject, {
                title: nextProject.title,
              })}
            >
              {nextProject.title} →
            </Link>
          )}
        </nav>
      </footer>
    </article>
  );
}
