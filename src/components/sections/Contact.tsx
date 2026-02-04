"use client";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Titulo } from "../ui/Titulo";

type ProjectsSectionProps = {
  isSection?: boolean; // Cambiar de 'true | undefined' a 'boolean | undefined'
};

const ContactSection = ({ isSection = true }: ProjectsSectionProps) => {
  return (
    <section className="py-10">
      {/* Título con línea */}
      <Titulo
        text="Contacts"
        isSection={isSection}
        className="max-w-1/6"
      ></Titulo>

      {/* Contenido de contacto */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 ">
        {/* Seccion de contacto*/}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-muted mb-4 md:leading-relaxed leading-snug  mt-2">
            I’m interested in freelance opportunities. However, if you have
            other request or question, don’t hesitate to contact me
          </p>
          <address
            className="border-2 p-4 rounded-r-sm w-fit"
            style={{ borderColor: "rgb(var(--muted))" }}
          >
            <h3
              className="not-italic m-2
            "
            >
              Message me here
            </h3>
            <a
              href="https://www.linkedin.com/in/denilson-miguel-godoy-bautista/"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-4 not-italic text-muted flex flex-row items-center p-1 m-2"
            >
              <FaLinkedin size={24} className="text-muted" />
              <p>denilson-miguel-godoy-bautista</p>
            </a>
            <a
              href="mailto:2201010141@undc.edu.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-4 not-italic text-muted flex flex-row items-center p-1 m-2"
            >
              <FaEnvelope size={24} className="text-muted" />
              <p>2201010141@undc.edu.pe</p>
            </a>
          </address>
        </div>
        {/*Imagen*/}
        <figure className="hidden md:flex flex-col items-center mt-4">
          <Image
            src={"/images/profile/foto_contact.jpeg"}
            alt="Profile picture"
            width={250}
            height={250}
            className="-rotate-z-30"
            style={{
              boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)", // Sombra hacia abajo y derecha
            }}
          />
        </figure>
      </div>
    </section>
  );
  /* Sección de contacto */
};

export default ContactSection;
