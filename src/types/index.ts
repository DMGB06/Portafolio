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
  /** Technical decisions (what + why). Empty = hide the section */
  decisions: ProjectDecision[];
  /** Video chapters; empty when the project has no demo video */
  chapters: ProjectChapter[];
  learnings: string[];
  platforms?: string;
  /** Rutas en /public (webp). images[0] y images[1] salen en la vista previa del listado */
  images: string[];
  /** Clip corto sin audio para la vista previa del listado */
  clip?: string;
  /** Video completo para el caso de estudio */
  video?: string;
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
  | "decisions"
  | "chapters"
  | "learnings";

export interface ProjectDecision {
  title: string;
  text: string;
}

/** time = second of the demo video where the chapter starts */
export interface ProjectChapter extends ProjectDecision {
  time: number;
}


export interface Technology {
  name: string;
}

// ==================== INFORMACIÓN PERSONAL ====================
export interface PersonalInfo {
  shortName: string;
  name: string;
  role: string;
  universidad: string;
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
