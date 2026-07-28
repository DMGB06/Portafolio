"use client";

import type { Project } from "@/types";
import { ProjectGallery } from "./ProjectGallery";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";
import "./projects.css";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const projectType = project.type ?? "web";
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  return (
    <article className={`project-card ${className}`}>
      <div className="project-card__header">
        <h3 className="project-card__title">
          <span className="text-secondary">#</span>
          {project.title}
        </h3>
        <div className="project-card__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--primary"
            >
              {dict.projects.github}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              {dict.projects.demo}
            </a>
          )}
        </div>
      </div>

      <ProjectGallery
        images={project.images}
        title={project.title}
        type={projectType}
      />

      <div className="project-card__body">
        <p className="project-card__description">{project.description}</p>

        <ul className="project-card__tags">
          {project.technologies.map((tech) => (
            <li key={tech.name} className="project-card__tag">
              {tech.name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
