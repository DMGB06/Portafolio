"use react";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
export default function ContactSection() {
  return (
    <section className="py-10">
      {/* Título con línea */}
      <div className="flex items-center gap-4">
        <h2
          className="font-normal whitespace-nowrap"
          style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
        >
          <span className="text-secondary">#</span>contacts
        </h2>
        {/* La línea CORRECTA */}
        <div
          className="flex-1 h-px max-w-1/6"
          style={{ backgroundColor: "rgb(var(--secondary))" }}
          aria-hidden="true"
        ></div>
      </div>

      {/* Contenido de contacto */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 ">
        {/* Seccion de contacto*/}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-muted mb-4 md:leading-relaxed leading-snug md:mt-7 mt-2">
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
}
