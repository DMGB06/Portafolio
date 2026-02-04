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
  },
  {
    id: 2,
    title: "Blog Personal",
    description:
      "Un blog personal con soporte para Markdown y panel de administración.",
    principalImage:
      "https://www.shutterstock.com/image-vector/xd-dx-x-d-images-260nw-2162920451.jpg",
    secundayImage: "/projects/blog-2.png",
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    github: "https://github.com/DMGB06/blog-personal",
    demo: "https://blog-personal-demo.com",
  },
  {
    id: 3,
    title: "Gestor de Tareas",
    description:
      "Una aplicación para gestionar tareas con soporte para múltiples usuarios.",
    principalImage:
      "https://media.istockphoto.com/id/1414308103/es/vector/dx-xd-abstract-letters-dise%C3%B1o-de-logotipo.jpg?s=612x612&w=0&k=20&c=B8rgQrVTVpIghAjVcr-gZBaorSaZY6g8lv3hkxOllcE=",
    secundayImage: "/projects/tasks-2.png",
    technologies: [
      { name: "React" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
    ],
    github: "https://github.com/DMGB06/task-manager",
    demo: "https://task-manager-demo.com",
  },
  {
    id: 4,
    title: "Portafolio Web",
    description: "Un portafolio personal para mostrar proyectos y habilidades.",
    principalImage: "/projects/portfolio-1.png",
    secundayImage: "/projects/portfolio-2.png",
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    github: "https://github.com/DMGB06/portfolio",
    demo: "https://portfolio-demo.com",
  },
  {
    id: 5,
    title: "API RESTful",
    description:
      "Una API RESTful para gestionar datos de usuarios y autenticación.",
    principalImage: "/projects/api-1.png",
    secundayImage: "/projects/api-2.png",
    technologies: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
    ],
    github: "https://github.com/DMGB06/api-restful",
    demo: "https://api-restful-demo.com",
  },
  {
    id: 6,
    title: "Dashboard Administrativo",
    description:
      "Un panel administrativo con gráficos y estadísticas en tiempo real.",
    principalImage: "/projects/dashboard-1.png",
    secundayImage: "/projects/dashboard-2.png",
    technologies: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Chart.js" },
    ],
    github: "https://github.com/DMGB06/admin-dashboard",
    demo: "https://admin-dashboard-demo.com",
  },
  {
    id: 7,
    title: "Juego de Memoria",
    description:
      "Un juego interactivo para mejorar la memoria con diferentes niveles de dificultad.",
    principalImage: "/projects/memory-game-1.png",
    secundayImage: "/projects/memory-game-2.png",
    technologies: [{ name: "React" }, { name: "JavaScript" }, { name: "CSS" }],
    github: "https://github.com/DMGB06/memory-game",
    demo: "https://memory-game-demo.com",
  },
];
