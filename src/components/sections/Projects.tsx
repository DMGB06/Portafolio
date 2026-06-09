"use client";

import { useRef } from "react";
import { Titulo } from "../ui/Titulo";
import { projects } from "@/data/portfolio";
import Link from "next/link";
import { GSAP_PREHIDE, REVEAL_ITEM, useScrollReveal } from "@/animations";
import { ProjectCard } from "../projects/ProjectCard";
import "../projects/projects.css";

type ProjectsSectionProps = {
  isSection?: boolean;
};

const ProjectsSection = ({ isSection = true }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectList = isSection ? projects.slice(0, 3) : projects;

  useScrollReveal(sectionRef, { stagger: 0.12 });

  return (
    <section ref={sectionRef} className="py-10">
      <div {...{ [REVEAL_ITEM]: true }} className={GSAP_PREHIDE}>
        <Titulo text="Projects" isSection={isSection} className="max-w-1/2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {projectList.map((project) => (
          <div
            key={project.id}
            {...{ [REVEAL_ITEM]: true }}
            className={GSAP_PREHIDE}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {isSection && (
        <Link
          href="/projects"
          {...{ [REVEAL_ITEM]: true }}
          className={`flex w-full justify-end mt-4 ${GSAP_PREHIDE}`}
        >
          Leer más ~~{">"}
        </Link>
      )}
    </section>
  );
};

export default ProjectsSection;
