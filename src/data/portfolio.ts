import type { Project, Skill, PersonalInfo } from "@/types/porfolio";

export const personalInfo: PersonalInfo[] = [
  {
    shortName: "Denilson",
    name: "Denilson Godoy Bautista Denilson",
    role: "Ingeniero de Sistemas",
    universidad: "Universidad nacional de cañete",
    Description: "",
    github: "https://github.com/DMGB06",
    linkedin: "https://www.linkedin.com/in/denilson-miguel-godoy-bautista/",
    email: "2201010141@undc.edu.pe",
    instagram: "https://www.instagram.com/denilson_6_gd/",
  },
];

export const skills: Skill[] = [
  { name: "React", icon: "", category: "Frontend" },
  //Aqui iria mas skills
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Mi Proyecto",
    description: "...",
    principalImage: "/projects/project-1.png",
    secundayImage: "/projects/project-1-2.png",
    technologies: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    github: "...",
    demo: "...",
  },
];
