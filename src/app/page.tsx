import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/Contact";
import Skills from "@/components/sections/Skills";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import "./portfolio.css";

export default function Home() {
  return (
    <div className="folio">
      <Hero />
      <ProjectsSection />
      <Skills />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
