"use client";

import { useMemo, useRef } from "react";
import { Titulo } from "../ui/Titulo";
import { getProjects } from "@/data/portfolio";
import Link from "next/link";
import { GSAP_PREHIDE, REVEAL_ITEM, useScrollReveal } from "@/animations";
import { ProjectsExplorer } from "../projects/ProjectsExplorer";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

type ProjectsSectionProps = {
  isSection?: boolean;
};

const ProjectsSection = ({ isSection = true }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, locale, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const projects = useMemo(() => getProjects(locale), [locale]);
  const projectList = isSection ? projects.slice(0, 3) : projects;

  useScrollReveal(sectionRef, { stagger: 0.12 });

  return (
    <section ref={sectionRef} className="py-10">
      <div {...{ [REVEAL_ITEM]: true }} className={GSAP_PREHIDE}>
        <Titulo
          text={dict.sections.projects}
          isSection={isSection}
          className="max-w-1/2"
        />
      </div>

      <ProjectsExplorer projects={projectList} variant={isSection ? "home" : "index"} />

      {isSection && (
        <Link
          href="/projects"
          {...{ [REVEAL_ITEM]: true }}
          className={`flex w-full justify-end mt-4 ${GSAP_PREHIDE}`}
        >
          {dict.projects.readMore}
        </Link>
      )}
    </section>
  );
};

export default ProjectsSection;
