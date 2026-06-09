"use client";

import { useRef } from "react";
import { skills } from "@/data/portfolio";
import { Titulo } from "../ui/Titulo";
import { GSAP_PREHIDE, REVEAL_ITEM, useScrollReveal } from "@/animations";
import { SkillCard } from "../skills/SkillCard";
import "../skills/skills.css";

type SkillsProps = {
  isSection?: boolean;
};

const Skills = ({ isSection = true }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, { stagger: 0.1, threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-2 md:py-10">
      <div {...{ [REVEAL_ITEM]: true }} className={GSAP_PREHIDE}>
        <Titulo text="Skills" isSection={isSection} className="max-w-[45%]" />
      </div>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, skillList]) => (
          <SkillCard
            key={category}
            category={category}
            skills={skillList}
            reveal
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
