"use client";

import { Titulo } from "@/components/ui/Titulo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { getProjects } from "@/data/portfolio";
import { useTranslations } from "@/i18n";
import "./catalog.css";

export default function Projects() {
  const { locale, t } = useTranslations();
  const [filter, setFilter] = useState("all");
  const projects = getProjects(locale);
  const filters = [
    { key: "all", label: t.projects.allTypes },
    { key: "web", label: t.projects.typeWeb },
    { key: "mobile", label: t.projects.typeMobile },
  ];
  const visible = projects.filter(project => filter === "all" || project.type === filter);

  return (
    <section className="catalog">
      <Titulo as="h1" text={t.sections.projects} isSection={false} className="max-w-1/2" />
      <div className="catalog-filters" role="group" aria-label={t.sections.projects}>
        {filters.filter(({ key }) => key === "all" || projects.some(p => p.type === key)).map(({ key, label }) => (
          <button key={key} type="button" aria-pressed={key === filter} onClick={() => setFilter(key)}>{label}</button>
        ))}
      </div>
      <ul className="catalog-grid">
        {visible.map(project => (
          <li key={project.slug}>
            <Link className="catalog-entry" href={`/projects/${project.slug}`}>
              <div className="catalog-preview" data-type={project.type} data-project={project.slug}>
                {project.images.slice(0, project.type === "mobile" ? 2 : 1).map(src => (
                  <div key={src} className="catalog-shot">
                    <Image src={src} alt="" fill sizes={project.type === "mobile" ? "140px" : "(max-width: 700px) 88vw, 480px"} />
                  </div>
                ))}
              </div>
              <h2>{project.title}<FiArrowUpRight aria-hidden /></h2>
              <p>{project.shortDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
