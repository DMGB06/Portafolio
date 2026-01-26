"use client";

import { FaCodepen, FaTimes, FaBars } from "react-icons/fa";
import { ThemeToggle } from "../ui/ThemeToogle";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  //Para verificar el estado de la hamburguesa
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Después:
    <nav className="sticky top-0 w-dvw bg-white dark:bg-[#282c33] backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 pt-5 pb-5 min-80vw">
        <div className="flex items-center justify-between">
          {/*Logo*/}
          <Link href="/" className="dark:text-white font-bold flex items-center gap-2">
            <FaCodepen className="text-[#E4B169]" />
            Denilson
          </Link>

          {/* Links de navegación */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-[#abb2bf] hover:text-white transition-colors"
            >
              <span className="text-secondary">#</span>
              home
            </Link>
            <Link   
              href="/projects"
              className="text-[#abb2bf] hover:text-white transition-colors"
            >
              <span className="text-secondary">#</span>projects
            </Link>
            <Link
              href="/about-me"
              className="text-[#abb2bf] hover:text-white transition-colors"
            >
              <span className="text-secondary">#</span>about-me
            </Link>
            <Link
              href="/contacts"
              className="text-[#abb2bf] hover:text-white transition-colors"
            >
              <span className="text-secondary">#</span>contacts
            </Link>
            <ThemeToggle />
          </div>
          {/*Boton hamburguesa*/}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toogle Menu"
              className="text-[#abb2bf] hover:text-white"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-[#abb2bf] hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-secondary">#</span>
              home
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsOpen(false)}
              className="text-[#abb2bf] hover:text-white transition-colors"
            >
              <span className="text-secondary">#</span>
              projects
            </Link>
            <Link
              href="/about-me"
              onClick={() => setIsOpen(false)}
              className="text-[#abb2bf] hover:text-white transition-colors"
            >
              <span className="text-secondary">#</span>about-me
            </Link>
            <Link
              href="/contacts"
              onClick={() => setIsOpen(false)}
              className="text-[#abb2bf] hover:text-white transition-colors"
            >
              <span className="text-secondary">#</span>contacts
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
