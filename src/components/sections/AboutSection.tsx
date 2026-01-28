//Componente/AboutSection.jsx

"use client";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

const AboutSection = ({
  imagePosition = "left", //Prop para posición de la imagen
  showReadMore = true, //Prop para mostrar botón "Leer más"
}) => {
  //Comparador de posición de imagen para verificar si es izquierda o derecha
  const isImageLeft = imagePosition === "left";
  const router = useRouter();

  const handleReadMore = () => {
    router.push("/about-me");
  }

  return (
    <section className="py-10" id="about-me">
      {/* Título con línea */}
      <div className="flex items-center gap-4 mb-8">
        <h2
          className="font-normal whitespace-nowrap"
          style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
        >
          <span className="text-secondary">{isImageLeft ? "#" : "/"}</span>
          about-me
        </h2>

        {/* La línea CORRECTA */}
        <div
          className="flex-1 h-px max-w-1/3"
          style={{ backgroundColor: "rgb(var(--secondary))" }}
          aria-hidden="true"
        ></div>
      </div>

      {/* Contenido de about */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 p-2 ${
          !isImageLeft ? "md:flex md:flex-row-reverse" : ""
        }`}
      >
        <figure className="flex justify-center order-2 md:order-0">
          <Image
            src="/images/profile/carnet.jpeg"
            alt="Denilson Godoy"
            layout="instrinsic"
            width={300}
            height={400}
            priority
            className="custom-shadow col-span-2 md:col-span-1 "
          />
        </figure>
        <div className="w-full">
          <p className="text-muted mb-4 md:leading-relaxed leading-snug">
            Hello, I’m Denilson!
            <br /> <br />
            I’m a 20-year-old full stack developer from Peru, currently studying
            at the Universidad Nacional de Cañete. I enjoy building responsive
            and user-friendly websites and applications, turning ideas into
            interactive digital experiences.
            <br /> <br />I love combining creativity with technology to develop
            projects that make an impact. I’m constantly learning new tools and
            frameworks to deliver modern and efficient solutions.
          </p>
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
