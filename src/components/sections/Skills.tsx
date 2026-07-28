"use client";

import { useRef } from "react";
import { skillCategories, type SkillCategoryKey } from "@/data/portfolio";
import { Titulo } from "../ui/Titulo";
import { GSAP_PREHIDE, REVEAL_ITEM, useScrollReveal } from "@/animations";
import { SkillCard } from "../skills/SkillCard";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";
import "../skills/skills.css";

type SkillsProps = {
  isSection?: boolean;
};

const SKILL_CATEGORY_KEYS = Object.keys(skillCategories) as SkillCategoryKey[];

const Skills = ({ isSection = true }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  useScrollReveal(sectionRef, { stagger: 0.1, threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-2 md:py-10">
      <div {...{ [REVEAL_ITEM]: true }} className={GSAP_PREHIDE}>
        <Titulo
          text={dict.sections.skills}
          isSection={isSection}
          className="max-w-[45%]"
        />
      </div>

      <div className="skills-grid">
        {SKILL_CATEGORY_KEYS.map((categoryKey) => (
          <SkillCard
            key={categoryKey}
            category={dict.skills.categories[categoryKey]}
            skills={skillCategories[categoryKey]}
            reveal
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
