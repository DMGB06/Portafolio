import type { Skill } from "@/types";

const DARK_ICONS = new Set(["Next.js", "Express", "Notion", "Expo"]);

interface SkillChipProps {
  skill: Skill;
}

export function SkillChip({ skill }: SkillChipProps) {
  const Icon = skill.icon;
  const needsInvert = DARK_ICONS.has(skill.name);

  return (
    <span className="skill-chip">
      <Icon
        size={16}
        style={{ color: needsInvert ? undefined : skill.color }}
        className={needsInvert ? "skill-chip__icon--dark" : undefined}
        aria-hidden
      />
      {skill.name}
    </span>
  );
}
