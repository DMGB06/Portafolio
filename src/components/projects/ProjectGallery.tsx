"use client";

import Image from "next/image";
import { DEFAULT_LOCALE, fillTemplate, getDictionary, useTranslations } from "@/i18n";
import { useGalleryScrub } from "./useGalleryScrub";

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
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const { a11y } = dict;
  const isMobile = type === "mobile";
  const hasMultiple = images.length > 1;

  const { rootRef, activeIndex, goTo, onPointerMove, onPointerDown, onKeyDown } =
    useGalleryScrub(images.length);

  const galleryLabel = hasMultiple
    ? fillTemplate(a11y.galleryMultiple, {
        title,
        current: activeIndex + 1,
        total: images.length,
      })
    : title;

  return (
    <div
      ref={rootRef}
      className={`project-gallery project-gallery--${isMobile ? "mobile" : "web"}${
        hasMultiple
          ? " focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
          : ""
      }`}
      onPointerMove={hasMultiple ? onPointerMove : undefined}
      onPointerDown={hasMultiple ? onPointerDown : undefined}
      onKeyDown={hasMultiple ? onKeyDown : undefined}
      role={hasMultiple ? "group" : undefined}
      tabIndex={hasMultiple ? 0 : undefined}
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      aria-label={galleryLabel}
    >
      <div className="project-gallery__viewport">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={fillTemplate(a11y.galleryScreenshot, {
              title,
              index: index + 1,
            })}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`project-gallery__image ${
              index === activeIndex ? "project-gallery__image--active" : ""
            } ${isMobile ? "project-gallery__image--mobile" : ""}`}
            priority={index === 0}
            draggable={false}
          />
        ))}
      </div>

      {hasMultiple && (
        <>
          <div className="project-gallery__hint" aria-hidden>
            {a11y.galleryHover}
          </div>
          <div className="project-gallery__dots" role="tablist" aria-label={title}>
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={fillTemplate(a11y.galleryScreenshot, {
                  title,
                  index: index + 1,
                })}
                className={`project-gallery__dot ${
                  index === activeIndex ? "project-gallery__dot--active" : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(index);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
