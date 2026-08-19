import type { Project, PersonalInfo, Skill, ProjectLocalizedFields } from "@/types";
import type { Locale, Dictionary } from "@/i18n";
import { getDictionary } from "@/i18n";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPython,
  SiReact,
  SiExpo,
  SiSupabase,
  SiKubernetes,
  SiNodedotjs,
  SiDocker,
  SiPostman,
  SiFigma,
  SiPostgresql,
  SiNotion,
  SiExpress,
  SiGit,
} from "react-icons/si";

export const personalInfo: PersonalInfo[] = [
  {
    shortName: "Denilson",
    name: "Denilson Godoy Bautista Denilson",
    role: "Ingeniero de Sistemas",
    universidad: "Universidad nacional de cañete",
    github: "https://github.com/DMGB06",
    linkedin: "https://www.linkedin.com/in/denilson-miguel-godoy-bautista/",
    email: "",
    instagram: "https://www.instagram.com/denilson_6_gd/",
  },
];

export type SkillCategoryKey = keyof Dictionary["skills"]["categories"];

export const skillCategories: Record<SkillCategoryKey, Skill[]> = {
  languages: [
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
  ],
  frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  ],
  mobile: [
    { name: "React Native", icon: SiReact, color: "#61DAFB" },
    { name: "Expo", icon: SiExpo, color: "#000000" },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  ],
  devops: [
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Git", icon: SiGit, color: "#F05032" },
  ],
  tools: [
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Notion", icon: SiNotion, color: "#000000" },
  ],
};

/** Fixed project data (URLs, images, tech). Localized copy lives in i18n JSON. */
type ProjectCatalogItem = Omit<Project, ProjectLocalizedFields>;

type ProjectItemKey = keyof Dictionary["projects"]["items"];

const projectCatalog: ProjectCatalogItem[] = [
  {
    id: 1,
    slug: "buscontrol-qr",
    type: "mobile",
    images: [
      "/projects/control-asistencia/dashboard.png",
      "/projects/control-asistencia/cover.png",
    ],
    technologies: [
      { name: "Expo" },
      { name: "React Native" },
      { name: "Supabase" },
      { name: "TypeScript" },
    ],
    github: "https://github.com/DMGB06/bus-attendance-qr",
  },
  {
    id: 2,
    slug: "typingpro",
    type: "web",
    images: [
      "/projects/typing-platform/cover.png",
      "/projects/typing-platform/auth.png",
    ],
    technologies: [
      { name: "Next.js" },
      { name: "NestJS" },
      { name: "Prisma" },
      { name: "TypeScript" },
    ],
    github: "https://github.com/DMGB06/typing-platform",
    demo: "https://typing-platform-six.vercel.app/",
  },
];

function getProjectItemCopy(locale: Locale, id: number) {
  const { projects } = getDictionary(locale);
  const key = String(id) as ProjectItemKey;
  const copy = projects.items[key];
  if (!copy) {
    throw new Error(`Missing i18n copy for project id ${id} (locale: ${locale})`);
  }
  return copy;
}

function hydrateProject(
  locale: Locale,
  catalogItem: ProjectCatalogItem
): Project {
  const text = getProjectItemCopy(locale, catalogItem.id);
  return {
    ...catalogItem,
    title: text.title,
    description: text.description,
    motivation: text.motivation,
    overview: text.overview,
    highlights: text.highlights,
    approach: text.approach,
    learnings: text.learnings,
  };
}

/** Whether the case study should render the approach section */
export function projectHasApproach(project: Project): boolean {
  return project.approach.trim().length > 0;
}

export function getProjects(locale: Locale): Project[] {
  return projectCatalog.map((project) => hydrateProject(locale, project));
}

export function getAllProjectSlugs(): string[] {
  return projectCatalog.map((project) => project.slug);
}

export function getProjectBySlug(
  locale: Locale,
  slug: string
): Project | null {
  const catalogItem = projectCatalog.find((project) => project.slug === slug);
  if (!catalogItem) return null;
  return hydrateProject(locale, catalogItem);
}

/**
 * Neighbor slugs for case study navigation (wraps around).
 * Returns nulls only if the catalog is empty or slug is unknown.
 */
export function getAdjacentProjectSlugs(slug: string): {
  previous: string | null;
  next: string | null;
} {
  const slugs = getAllProjectSlugs();
  if (slugs.length === 0) {
    return { previous: null, next: null };
  }

  const index = slugs.indexOf(slug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  const last = slugs.length - 1;
  return {
    previous: slugs[index === 0 ? last : index - 1] ?? null,
    next: slugs[index === last ? 0 : index + 1] ?? null,
  };
}

/** @deprecated Use getProjects(locale) for localized copy */
export const projects: Project[] = getProjects("es");
