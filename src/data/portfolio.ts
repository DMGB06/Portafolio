import type { Project, PersonalInfo } from "@/types/porfolio";
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
  Mobile: [
    { name: "React Native", icon: SiReact, color: "#61DAFB" },
    { name: "Expo", icon: SiExpo, color: "#000000" },
  ],
  Backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
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
    title: "BusControl QR",
    type: "mobile",
    description:
      "App móvil para control de asistencia escolar en transporte municipal. Escaneo QR, registro manual, viajes ida/vuelta y trazabilidad en tiempo real con Supabase.",
    images: [
      "/projects/control-asistencia/cover.png",
      "/projects/control-asistencia/dashboard.png",
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
    title: "E-Commerce App",
    type: "web",
    description:
      "Aplicación de comercio electrónico con carrito de compras y pasarela de pagos.",
    images: [
      "https://i0.wp.com/www.silocreativo.com/wp-content/uploads/2018/06/adobe-xd-alternativa-cabecera.png?fit=666%2C370&quality=100&strip=all&ssl=1",
    ],
    technologies: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    github: "https://github.com/DMGB06/ecommerce-app",
    demo: "https://ecommerce-app-demo.com",
  },
];
