"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/types";
import { DEFAULT_LOCALE, fillTemplate, getDictionary, useTranslations } from "@/i18n";

interface ProjectSceneProps {
  project: Project;
  active: boolean;
  /** Carga la primera captura sin lazy (para la imagen principal de una pagina) */
  priority?: boolean;
}

function displayHost(project: Project) {
  return (project.demo ?? project.slug).replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function ProjectScene({ project, active, priority = false }: ProjectSceneProps) {
  const { t, isReady } = useTranslations();
  const { a11y } = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [first, second] = project.images;

  // El clip solo corre si es el proyecto activo, esta a la vista y no hay reduced motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [active]);

  const shot = (src: string, index: number, sizes: string) => (
    <Image
      src={src}
      alt={project.screenshotAlts?.[index] ?? fillTemplate(a11y.galleryScreenshot, { title: project.title, index: index + 1 })}
      fill
      sizes={sizes}
      priority={priority && index === 0}
      className="project-scene__img"
      draggable={false}
    />
  );

  return (
    <div className={`project-scene${active ? " is-active" : ""}`} aria-hidden={!active}>
      {project.type === "mobile" ? (
        <div className="project-scene__media">
          <div className="project-scene__phone project-scene__phone--a">
            <div className="project-scene__screen">
              {project.clip ? (
                <video
                  ref={videoRef}
                  src={project.clip}
                  poster={first}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={fillTemplate(a11y.projectDemo, { title: project.title })}
                  className="project-scene__img"
                />
              ) : (
                first && shot(first, 0, "(max-width: 899px) 45vw, 200px")
              )}
            </div>
          </div>
          {second && (
            <div className="project-scene__phone project-scene__phone--b">
              <div className="project-scene__screen">
                {shot(second, 1, "(max-width: 899px) 45vw, 200px")}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="project-scene__media">
          <div className="project-scene__win project-scene__win--a">
            <div className="project-scene__winbar">
              <i /><i /><i />
              <span>{displayHost(project)}</span>
            </div>
            <div className="project-scene__screen">
              {first && shot(first, 0, "(max-width: 899px) 90vw, 520px")}
            </div>
          </div>
          {second && (
            <div className="project-scene__win project-scene__win--b">
              <div className="project-scene__winbar">
                <i /><i /><i />
              </div>
              <div className="project-scene__screen">
                {shot(second, 1, "(max-width: 899px) 55vw, 320px")}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
