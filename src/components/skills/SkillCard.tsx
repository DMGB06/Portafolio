import type { Skill } from "@/types";
import { GSAP_PREHIDE, REVEAL_ITEM } from "@/animations";
import { SkillChip } from "./SkillChip";

interface SkillCardProps {
  category: string;
  skills: Skill[];
  className?: string;
  reveal?: boolean;
}

export function SkillCard({
  category,
  skills,
  className = "",
  reveal = false,
}: SkillCardProps) {
  return (
    <article
      {...(reveal ? { [REVEAL_ITEM]: true } : {})}
      className={`skill-card ${reveal ? GSAP_PREHIDE : ""} ${className}`}
    >
      <h3 className="skill-card__title">
        <span className="text-secondary">#</span> {category}
      </h3>
      <ul className="skill-card__list">
        {skills.map((skill) => (
          <li key={skill.name}>
            <SkillChip skill={skill} />
          </li>
        ))}
      </ul>
    </article>
  );
}
