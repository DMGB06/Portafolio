import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { IconType } from "react-icons";

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
