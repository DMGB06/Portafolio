"use client";

import { Titulo } from "../ui/Titulo";
import { projects } from "@/data/portfolio";
import Link from "next/link";
import ButtonProjects from "../ui/ButtonProjects";

type ProjectsSectionProps = {
  isSection?: boolean; // Cambiar de 'true | undefined' a 'boolean | undefined'
};

const ProjectsSection = ({ isSection = true }: ProjectsSectionProps) => {
  const projectList = isSection ? projects.slice(0, 3) : projects;

  return (
    <section className="py-10">
      <Titulo
        text="Projects"
        isSection={isSection}
        className="max-w-1/2 "
      ></Titulo>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
        {projectList.map((project) => (
          <div
            key={project.id}
            className="mb-8 border-amber-muted border rounded-lg overflow-hidden h-fit"
          >
            <img
              src={project.principalImage}
              alt={project.title}
              width={"100%"}
              height={"100%"}
            />

            {/*Tecnologias*/}
            <div className="flex flex-wrap gap-2 mb-4 p-2 border-t border-b border-muted">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-500 dark:bg-gray-600 rounded px-2 py-1 text-sm"
                >
                  {tech.name}
                </span>
              ))}
            </div>
            <h3
              className="px-2 mb-3 text-primary font-light"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.2rem)" }}
            >
              {project.title}
            </h3>

            <p
              className="text-muted  p-2"
              style={{ fontSize: "clamp(1rem, 2vw, 1rem)" }}
            >
              {project.description}
            </p>
            {/*Botones*/}
            <div className="flex flex-row gap-2 p-2 justify-start mb-2 ">
              {project.github && (
                <ButtonProjects
                  href={project.github}
                  isGitHub={true}
                  className=""
                />
              )}
              {project.demo && (
                <ButtonProjects
                  href={project.demo}
                  isDemo={true}
                  className=""
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Boton para leer mas si es seccion*/}
      {isSection && (
        <Link href="/projects" className="flex w-full justify-end">
          Leer más ~~{">"}
        </Link>
      )}
    </section>
  );
};

export default ProjectsSection;
