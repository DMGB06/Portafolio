import AboutSection from "@/components/sections/AboutSection";
import Skills from "@/components/sections/Skills";

export default function About() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-2 md:px-10">
        <AboutSection imagePosition="right" showReadMore={false} />
        <Skills></Skills>
      </div>
    </main>
  );
}
