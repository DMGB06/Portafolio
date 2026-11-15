"use client";

import { useRef, useState } from "react";
import type { ProjectChapter } from "@/types";

interface ProjectDemoPlayerProps {
  src: string;
  poster?: string;
  label: string;
  chaptersLabel: string;
  chapters: ProjectChapter[];
}

const mmss = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export function ProjectDemoPlayer({
  src,
  poster,
  label,
  chaptersLabel,
  chapters,
}: ProjectDemoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);

  const chapterAt = (time: number) =>
    chapters.reduce((found, chapter, index) => (time >= chapter.time ? index : found), 0);

  const goTo = (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = chapters[index].time;
    setCurrent(index);
    video.play().catch(() => {});
  };

  const active = chapters[current];

  return (
    <div className="case-demo">
      <div className="case-demo__player">
        {/* preload="none": el video (~3 MB) solo se descarga al darle play o elegir un capitulo */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          aria-label={label}
          onTimeUpdate={(event) => {
            if (chapters.length === 0) return;
            const next = chapterAt(event.currentTarget.currentTime);
            setCurrent((prev) => (prev === next ? prev : next));
          }}
        />
        {active && (
          <p className="case-demo__now">
            <b>{active.title}</b>
            {active.text}
          </p>
        )}
      </div>

      {chapters.length > 0 && (
        <ol className="case-demo__chapters" aria-label={chaptersLabel}>
          {chapters.map((chapter, index) => (
            <li key={chapter.title}>
              <button
                type="button"
                className="case-demo__chapter"
                aria-current={index === current ? "true" : undefined}
                onClick={() => goTo(index)}
              >
                <span>{chapter.title}</span>
                <time>{mmss(chapter.time)}</time>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
