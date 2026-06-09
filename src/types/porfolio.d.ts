import { IconType } from "react-icons";

export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  type?: "mobile" | "web";
  technologies: Technology[];
  github?: string;
  demo?: string;
}

export interface Technology {
  name: string;
}
export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

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
