"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";
import { Button } from "../ui/Button";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const Hero = () => {
  // Referencias para las animacioneSs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const availableRef = useRef<HTMLElement>(null);
  const biographyRef = useRef(null);
  const biographyTextRef = useRef(null);
  const cvButtonRef = useRef(null);
  const contactButtonRef = useRef(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleContactMe = () => {
    router.push("/contact-me");
  };

  useEffect(() => {
    // Resetear solo las propiedades de transformación y animación, no los estilos inline originales
    gsap.set(
      [
        titleRef.current,
        imageRef.current,
        availableRef.current,
        biographyRef.current,
        biographyTextRef.current,
        cvButtonRef.current,
        contactButtonRef.current,
        socialIconsRef.current,
        dotsRef.current?.children || [],
      ],
      { clearProps: "transform,opacity,scale,rotation,x,y" }
    );

    // Timeline principal para secuenciar las animaciones
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Título principal - fade in + slide up
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // 2. Imagen - scale + rotate con efecto elástico
    tl.from(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.6" // Inicia 0.6s antes de que termine la animación anterior
    );

    // 3. Badge "Available" - fade in con bounce
    tl.from(
      availableRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "bounce.out",
      },
      "-=0.4"
    );

    // 4. Sección Biography - fade in + slide
    tl.from(
      biographyRef.current,
      {
        opacity: 0,
        x: -30,
        duration: 0.8,
      },
      "-=0.5"
    );

    tl.from(
      biographyTextRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
      },
      "-=0.4"
    );

    // 5. Botón CV
    tl.from(
      cvButtonRef.current,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
      },
      "-=0.3"
    );

    // 6. Botón Contact me
    tl.from(
      contactButtonRef.current,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
      },
      "-=0.4"
    );

    // 7. Iconos sociales - stagger (uno por uno)
    tl.from(
      socialIconsRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.5,
        duration: 0.4,
        stagger: 0.1, // 0.1s de retraso entre cada icono
        ease: "back.out(2)",
      },
      "-=0.3"
    );

    // 8. Puntitos decorativos - aparecen con stagger
    tl.from(
      dotsRef.current?.children || [],
      {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        stagger: 0.02,
      },
      "-=0.3"
    );

    // Animación de pulsación continua en el punto verde del badge "Available"
    const pulseAnimation = gsap.to(availableRef.current?.querySelector<HTMLElement>("div")!, {
      scale: 1.2,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Animación de respiración para el badge completo "Available"
    const badgeAnimation = gsap.fromTo(
      availableRef.current,
      {
        scale: 1.01,
      },
      {
        scale: 1.05,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );

    // Animación de flotación infinita para la imagen
    const floatAnimation = gsap.to(imageRef.current, {
      y: -15, // Sube y baja 15px
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Animación de respiración para el botón Contact me
    const contactButtonAnimation = gsap.fromTo(
      contactButtonRef.current,
      {
        scale: 1.02, // Valor mínimo (solo se "achica" hasta aquí)
      },
      {
        scale: 1.08, // Valor máximo
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );

    // Intersection Observer para pausar/reanudar animaciones cuando no esté visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // La sección es visible - reanudar animaciones
            pulseAnimation.play();
            badgeAnimation.play();
            floatAnimation.play();
            contactButtonAnimation.play();
          } else {
            // La sección no es visible - pausar animaciones
            pulseAnimation.pause();
            badgeAnimation.pause();
            floatAnimation.pause();
            contactButtonAnimation.pause();
          }
        });
      },
      {
        threshold: 0.1, // Se activa cuando al menos el 10% es visible
      }
    );

    // Observar la sección
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Limpieza: detener todas las animaciones cuando el componente se desmonte
    return () => {
      observer.disconnect();
      tl.kill();
      pulseAnimation.kill();
      badgeAnimation.kill();
      floatAnimation.kill();
      contactButtonAnimation.kill();
      gsap.killTweensOf([
        titleRef.current,
        imageRef.current,
        availableRef.current,
        biographyRef.current,
        biographyTextRef.current,
        cvButtonRef.current,
        contactButtonRef.current,
        socialIconsRef.current,
        dotsRef.current?.children || [],
      ]);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-2 md:py-10">
      <div className="w-full mb-7 lg:mt-10 md:mb-20">
        {/* Nombre y descripción */}
        <h1
          ref={titleRef}
          className="font-semibold mb-4 leading-snug"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2.7rem)" }}
        >
          {personalInfo[0].shortName} is a{" "}
          <span className="text-secondary">Systems engineering student </span>{" "}
          and{" "}
          <span className="text-secondary">aspiring software developer</span>
        </h1>
      </div>

      {/* Contenedor de foto, biografy y redes*/}
      <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-10">
        {/* Foto y disponibilidad*/}
        <figure className="flex flex-col items-center justify-center w-full md:col-span-2 col-span-1">
          <Image
            ref={imageRef}
            src="/images/profile/foto_animada.png"
            alt="Denilson Godoy"
            width={250}
            height={250}
            className="rounded-full border-2 border-gray-500 mb-4"
            priority
          />

          <figure
            ref={availableRef}
            className="max-w-40 flex items-center gap-2 border border-gray-500 px-4 py-2 rounded"
          >
            <div
              className="w-3 h-3"
              style={{ backgroundColor: "rgb(var(--secondary))" }}
            ></div>
            <span className="text-muted">Available</span>
          </figure>
        </figure>

        {/* Biografy y botones*/}
        <article className="md:col-span-6 col-span-1">
          <h1
            ref={biographyRef}
            className="mb-1.5 font-normal"
            style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
          >
            <span className="text-secondary">#</span>Biography
          </h1>
          <p ref={biographyTextRef} className="text-muted mb-1 md:mb-5">
            He builds practical and efficient solutions where technology meets
            creativity
          </p>

          {/* Aqui van los botones*/}
          <div ref={cvButtonRef} className="hidden md:flex justify-end">
            <a
              href="#"
              //href="/files/CV.pdf"
              //download="CV-Denilson-Godoy.pdf"
              className="inline-block"
            >
              <Button
                text="Download CV |>"
                onClick={() => console.log("Descargando CV")}
              />
            </a>
          </div>
        </article>

        <nav className="md:col-span-2 col-span-1">
          {/*Aqui van los enlaces de las redes y el boton de contactame*/}
          <div ref={contactButtonRef} className="flex md:justify-end justify-center">
            <Button text="Contact me!!" onClick={handleContactMe} />
          </div>

          <div className="grid md:grid-cols-3 md:grid-rows-3 md:gap-5 grid-cols-5 grid-rows-1 gap-4 mt-6 justify-center items-center">
            <a
              ref={(el) => { socialIconsRef.current[0] = el; }}
              href="https://github.com/DMGB06"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <FaGithub size={24} className="text-muted hover:text-white" />
            </a>
            <a
              ref={(el) => { socialIconsRef.current[1] = el; }}
              href="https://www.linkedin.com/in/denilson-miguel-godoy-bautista/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <FaLinkedin size={24} className="text-muted hover:text-white" />
            </a>
            <a
              ref={(el) => { socialIconsRef.current[2] = el; }}
              href="mailto:2201010141@undc.edu.pe"
              className="flex justify-center"
            >
              <FaEnvelope size={24} className="text-muted hover:text-white" />
            </a>

            {/*Los puntitos*/}
            <div ref={dotsRef} className="hidden md:grid md:col-span-2 md:row-span-2">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "rgb(var(--muted))" }}
                  />
                ))}
              </div>
            </div>

            <a
              ref={(el) => { socialIconsRef.current[3] = el; }}
              href="https://www.instagram.com/denilson_6_gd/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <FaInstagram size={24} className="text-muted hover:text-white" />
            </a>
            <a
              ref={(el) => { socialIconsRef.current[4] = el; }}
              href="https://www.facebook.com/denilson.godoy.395"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <FaFacebook size={24} className="text-muted hover:text-white" />
            </a>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
