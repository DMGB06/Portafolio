import type { Project, PersonalInfo } from "@/types/porfolio";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPython,
  SiReact,
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
    Description: "",
    github: "https://github.com/DMGB06",
    linkedin: "https://www.linkedin.com/in/denilson-miguel-godoy-bautista/",
    email: "2201010141@undc.edu.pe",
    instagram: "https://www.instagram.com/denilson_6_gd/",
  },
];

export const skills = {
  Languages: [
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
  ],
  Frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  ],
  Backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  ],
  DevOps: [
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Git", icon: SiGit, color: "#F05032" },
  ],
  Tools: [
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Notion", icon: SiNotion, color: "#000000" },
  ],
};

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce App",
    description:
      "Una aplicación de comercio electrónico con carrito de compras y pasarela de pagos.",
    principalImage:
      "https://i0.wp.com/www.silocreativo.com/wp-content/uploads/2018/06/adobe-xd-alternativa-cabecera.png?fit=666%2C370&quality=100&strip=all&ssl=1",
    secundayImage: "/projects/ecommerce-2.png",
    technologies: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    github: "https://github.com/DMGB06/ecommerce-app",
    demo: "https://ecommerce-app-demo.com",
  }
];
