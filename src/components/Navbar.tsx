"use client";

import { FaCodepen, FaTimes, FaBars } from "react-icons/fa";
import { ThemeToggle } from "./ThemeToogle";
import { useState } from "react";

export default function Navbar() {
  //Para verificar el estado de la hamburguesa
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Después:
    <nav className="sticky top-0 w-full bg-white dark:bg-[#222222] backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/*Logo*/}
          <a className="text-black dark:text-white font-bold flex items-center gap-2">
            <FaCodepen />
            Denilson
          </a>

          {/* Links de navegación */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              #home
            </a>
            <a
              href="#projects"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              #projects
            </a>
            <a
              href="#about-me"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              #about-me
            </a>
            <a
              href="#contacts"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              #contacts
            </a>
            <ThemeToggle />
          </div>
          {/*Boton hamburguesa*/}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toogle Menu"
              className="text-zinc-400 hover:text-white"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a
              href="#home"
              className="text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              #home
            </a>
            <a
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              #projects
            </a>
            <a
              href="#about-me"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              #about-me
            </a>
            <a
              href="#contacts"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              #contacts
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
