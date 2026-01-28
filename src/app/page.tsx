import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/Contact";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Contenedor global centrado */}
      <div className="max-w-6xl mx-auto px-2 md:px-10">
        <Hero />
        <Skills />
        <AboutSection
          imagePosition="left"
          showReadMore={true} // ← Con botón
        />
        <ContactSection />
      </div>
    </main>
  );
}
