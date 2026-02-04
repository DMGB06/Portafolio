import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/Contact";
import Skills from "@/components/sections/Skills";
import ProjectsSection from "@/components/sections/Projects";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Contenedor global centrado */}
      <div className="max-w-6xl mx-auto px-2 md:px-10">
        <Hero />
        <ProjectsSection isSection={true} />
        <Skills isSection={true} />
        <AboutSection
          isSection={true} // ← Con #
          showReadMore={true} // ← Con botón
        />
        <ContactSection isSection={true} />
      </div>
    </main>
  );
}
