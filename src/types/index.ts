import type { IconType } from "react-icons";

// ==================== PROYECTO ====================
export interface Project {
  id: number;
  title: string;
  description: string;
  principalImage: string;
  secundayImage: string;
  technologies: Technology[];
  github?: string;
  demo?: string;
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
