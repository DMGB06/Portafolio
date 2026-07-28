import type { IconType } from "react-icons";

// ==================== PROYECTO ====================
export interface Project {
  id: number;
  /** Stable URL segment, e.g. buscontrol-qr — not translated */
  slug: string;
  title: string;
  /** Short teaser for cards — not the full case study */
  description: string;
  motivation: string;
  overview: string;
  highlights: string[];
  /** Empty string = hide approach section in the case study template */
  approach: string;
  learnings: string[];
  /** Rutas en /public, ej: /projects/mi-app/cover.png */
  images: string[];
  /** mobile = capturas de celular, web = capturas horizontales */
  type?: "mobile" | "web";
  technologies: Technology[];
  github?: string;
  demo?: string;
}

/** Fields that come from i18n dictionaries, not the static catalog */
export type ProjectLocalizedFields =
  | "title"
  | "description"
  | "motivation"
  | "overview"
  | "highlights"
  | "approach"
  | "learnings";


export interface Technology {
  name: string;
}

// ==================== INFORMACIÓN PERSONAL ====================
export interface PersonalInfo {
  shortName: string;
  name: string;
  role: string;
  universidad: string;
  Description: string;
  github: string;
  linkedin: string;
  email: string;
  instagram: string;
}

// ==================== SKILLS ====================
export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillCategory {
  Languages: Skill[];
  Frontend: Skill[];
  Mobile: Skill[];
  Backend: Skill[];
  DevOps: Skill[];
  Tools: Skill[];
}

// ==================== NAVEGACIÓN ====================
export interface NavLink {
  href: string;
  label: string;
}

// ==================== ANIMACIONES ====================
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface AnimationConfig {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollRevealConfig extends AnimationConfig {
  direction?: AnimationDirection;
  trigger?: string;
  start?: string;
  end?: string;
}

// ==================== FORMULARIO DE CONTACTO ====================
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
