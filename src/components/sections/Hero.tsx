"use client";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";
import { Button } from "../ui/Button";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Hero() {
  return (
    <main className="max-h-screen mx-auto flex items-center min-w-screen">
      <section className="max-h-screen max-w-6xl mx-auto p-2 md:p-10">
        <div className="w-full mb-5 lg:mt-10 md:mb-20">
          {/* Nombre y descripción */}
          <h1
            className="font-semibold mb-4 leading-snug text-secundary"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.7rem)" }}
          >
            {personalInfo[0].shortName} is a{" "}
            <span className="text-secondary">Systems engineering student </span>{" "}
            and{" "}
            <span className="text-secondary">aspiring software developer</span>
          </h1>
        </div>
        {/* Contenedor de foto, biografy y redes*/}
        <div className="p-1 w-full grid grid-cols-1 md:grid-cols-10 gap-10">
          {/* Foto y disponibilidad*/}
          <figure className="flex flex-col items-center justify-center w-full md:col-span-2 col-span-1">
            <Image
              src="/images/profile/foto_animada.png"
              alt="Denilson Godoy"
              width={200}
              height={200}
              className="rounded-full border-2 border-gray-500 mb-4"
            />

            <figure className="max-w-40 flex items-center gap-2 border border-gray-500 px-4 py-2 rounded">
              <div className="w-3 h-3"
              style={{backgroundColor:"rgb(var(--secondary))"}}></div>
              <span className="text-muted">Available</span>
            </figure>
          </figure>

          {/* Biografy y botones*/}
          <article className="md:col-span-6 col-span-1">
            <h1
              className="mb-1.5"
              style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
            >
              <span className="text-secondary">#</span>Biografy
            </h1>
            <p className="text-muted mb-5">
              He builds practical and efficient solutions where technology meets
              creativity
            </p>
            {/* Aqui van los botones*/}
            <div className="flex justify-end mr-8">
              <Button
                text="Download CV |> "
                onClick={() => alert("Contact button clicked")}
              />
            </div>
          </article>
          <nav className="md:col-span-2 col-span-1">
            {/*Aqui van los enlaces de las redes y el boton de contactame*/}
            <div className="flex md:justify-end">
              <Button
                text="Contact me!!"
                onClick={() => alert("Contact button clicked")}
              ></Button>
            </div>
            <div className="grid md:grid-cols-3 md:grid-rows-3 md:gap-5 grid-cols-5 grid-rows-1 gap-4 mt-6 justify-center items-center">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center"
              >
                <FaGithub size={24} className="text-muted hover:text-white" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center"
              >
                <FaLinkedin size={24} className="text-muted hover:text-white" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center"
              >
                <FaEnvelope size={24} className="text-muted hover:text-white" />
              </a>
              {/*Los puntitos*/}
              <div className="hidden md:grid md:col-span-2 md:row-span-2">
                <div className="max-w-35 grid grid-cols-5  gap-2 ">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="mt-0.5 w-1 h-1 rounded-full"
                      style={{ backgroundColor: "rgb(var(--muted))" }}
                    ></div>
                  ))}
                </div>
              </div>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center"
              >
                <FaInstagram
                  size={24}
                  className="text-muted hover:text-white"
                />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center"
              >
                <FaTwitter size={24} className="text-muted hover:text-white" />
              </a>
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}
