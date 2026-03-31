//Componente/AboutSection.tsx

"use client";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { Titulo } from "../ui/Titulo";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface AboutSectionProps {
  isSection?: boolean; //Prop para posición de la imagen
  showReadMore?: boolean; //Prop para mostrar botón "Leer más"
}

const AboutSection = ({
  isSection = true, //Prop para posición de la imagen
  showReadMore = true, //Prop para mostrar botón "Leer más"
}: AboutSectionProps) => {
  //Comparador de posición de imagen para verificar si es izquierda o derecha
  const router = useRouter();
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const text3Ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleReadMore = () => {
    router.push("/about-me");
  };

  useEffect(() => {
    // Observador para detectar cuando la sección es visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return undefined; // Retorna undefined explícitamente

    const tl = gsap.timeline();

    // Primer párrafo
    tl.to(text1Ref.current, {
      text: "Hello, I'm Denilson!",
      duration: 1,
      ease: "none",
    });

    // Segundo párrafo - espera a que termine el primero
    tl.to(
      text2Ref.current,
      {
        text: "I'm a 20-year-old full stack developer from Peru, currently studying at the Universidad Nacional de Cañete. I enjoy building responsive and user-friendly websites and applications, turning ideas into interactive digital experiences.",
        duration: 3,
        ease: "none",
      },
      "+=0.2"
    );

    // Tercer párrafo - espera a que termine el segundo
    tl.to(
      text3Ref.current,
      {
        text: "I love combining creativity with technology to develop projects that make an impact. I'm constantly learning new tools and frameworks to deliver modern and efficient solutions.",
        duration: 2.5,
        ease: "none",
      },
      "+=0.2"
    );

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-10" id="about-me">
      {/* Título con línea */}
      <Titulo
        text="About Me"
        isSection={isSection}
        className="max-w-1/3"
      ></Titulo>

      {/* Contenido de about */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 p-2 ${
          !isSection ? "md:flex md:flex-row-reverse" : ""
        }`}
      >
        <figure className="flex justify-center order-2 md:order-0">
          <Image
            src="/images/profile/carnet.jpeg"
            alt="Denilson Godoy"
            width={300}
            height={400}
            priority
            className="custom-shadow col-span-2 md:col-span-1 "
          />
        </figure>
        <div className="w-full">
          <div className="text-muted mb-4 md:leading-relaxed leading-snug">
            {/* Cada bloque usa relative + invisible placeholder + absolute animated text */}
            <span className="relative inline">
              <span className="invisible">Hello, I&apos;m Denilson!</span>
              <span ref={text1Ref} className="absolute left-0 top-0"></span>
            </span>
            <br /> <br />
            <span className="relative block">
              <span className="invisible">I&apos;m a 20-year-old full stack developer from Peru, currently studying at the Universidad Nacional de Cañete. I enjoy building responsive and user-friendly websites and applications, turning ideas into interactive digital experiences.</span>
              <span ref={text2Ref} className="absolute left-0 top-0"></span>
            </span>
            <br /> <br />
            <span className="relative block">
              <span className="invisible">I love combining creativity with technology to develop projects that make an impact. I&apos;m constantly learning new tools and frameworks to deliver modern and efficient solutions.</span>
              <span ref={text3Ref} className="absolute left-0 top-0"></span>
            </span>
          </div>
          <div className="hidden md:flex justify-end mr-2">
            {showReadMore && (
              <Button
                text="Read more ->"
                onClick={handleReadMore}
                className="flex justify-end"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
