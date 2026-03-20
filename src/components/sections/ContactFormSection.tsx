"use client";

import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Titulo } from "../ui/Titulo";
import ContactForm from "../forms/ContactForm";

type ContactFormSectionProps = {
  isSection?: boolean;
};

const ContactFormSection = ({ isSection = true }: ContactFormSectionProps) => {
  return (
    <section className="py-10">
      {/* Título con línea */}
      <Titulo
        text="Contact"
        isSection={isSection}
        className="max-w-1/6"
      />

      {/* Contenido de contacto */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {/* Formulario de contacto */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-muted mb-6 md:leading-relaxed leading-snug">
            I&apos;m interested in freelance opportunities. However, if you have
            other request or question, don&apos;t hesitate to contact me.
          </p>
          <ContactForm />
        </div>

        {/* Info de contacto alternativo */}
        <div className="flex flex-col items-center md:items-center">
          <address
            className="border-2 p-4 rounded-r-sm w-fit not-italic"
            style={{ borderColor: "rgb(var(--muted))" }}
          >
            <h3 className="m-2 font-medium">Or message me here</h3>
            <a
              href="https://www.linkedin.com/in/denilson-miguel-godoy-bautista/"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-4 text-muted flex flex-row items-center p-1 m-2 hover:text-secondary transition-colors"
            >
              <FaLinkedin size={24} />
              <p>denilson-miguel-godoy-bautista</p>
            </a>
            <a
              href="mailto:2201010141@undc.edu.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-4 text-muted flex flex-row items-center p-1 m-2 hover:text-secondary transition-colors"
            >
              <FaEnvelope size={24} />
              <p>2201010141@undc.edu.pe</p>
            </a>
          </address>

          {/* Imagen */}
          <figure className="hidden md:flex flex-col items-center mt-8">
            <Image
              src="/images/profile/foto_contact.jpeg"
              alt="Profile picture"
              width={250}
              height={250}
              className="-rotate-3"
              style={{
                boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)",
              }}
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
