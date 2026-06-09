"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  type?: "mobile" | "web";
}

export function ProjectGallery({
  images,
  title,
  type = "web",
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = type === "mobile";
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!isHovered || !hasMultiple) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered, hasMultiple, images.length]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveIndex(0);
  };

  const handleClick = () => {
    if (!hasMultiple) return;
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div
      className={`project-gallery ${isMobile ? "project-gallery--mobile" : "project-gallery--web"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role={hasMultiple ? "button" : undefined}
      tabIndex={hasMultiple ? 0 : undefined}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      aria-label={
        hasMultiple
          ? `${title}, imagen ${activeIndex + 1} de ${images.length}`
          : title
      }
    >
      <div
        className={
          isMobile ? "project-gallery__phone" : "project-gallery__viewport"
        }
      >
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`${title} - captura ${index + 1}`}
            fill
            sizes={
              isMobile
                ? "(max-width: 768px) 60vw, 200px"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className={`project-gallery__image ${
              index === activeIndex ? "project-gallery__image--active" : ""
            } ${isMobile ? "project-gallery__image--mobile" : ""}`}
            priority={index === 0}
          />
        ))}
      </div>

      {hasMultiple && (
        <>
          <div className="project-gallery__hint" aria-hidden>
            {isHovered ? "◀ ▶" : "hover"}
          </div>
          <div className="project-gallery__dots" aria-hidden>
            {images.map((image, index) => (
              <span
                key={image}
                className={`project-gallery__dot ${
                  index === activeIndex ? "project-gallery__dot--active" : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
