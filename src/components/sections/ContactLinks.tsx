"use client";

import { FaLinkedin, FaEnvelope } from "react-icons/fa";

interface ContactLinksProps {
  heading: string;
  className?: string;
}

export function ContactLinks({ heading, className = "" }: ContactLinksProps) {
  return (
    <address
      className={`border-2 border-theme bg-surface p-4 rounded-r-sm w-fit not-italic ${className}`}
    >
      <h3 className="m-2 font-medium text-foreground">{heading}</h3>
      <a
        href="https://www.linkedin.com/in/denilson-miguel-godoy-bautista/"
        target="_blank"
        rel="noopener noreferrer"
        className="gap-4 text-chrome flex flex-row items-center p-1 m-2"
      >
        <FaLinkedin size={24} aria-hidden />
        <p>denilson-miguel-godoy-bautista</p>
      </a>
      <a
        href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
        className="gap-4 text-chrome flex flex-row items-center p-1 m-2"
      >
        <FaEnvelope size={24} aria-hidden />
        <p>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</p>
      </a>
    </address>
  );
}
