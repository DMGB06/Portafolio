"use client";

import { useRouter } from "next/navigation";

interface ButtonProjectsProps {
  href: string; //Link al que redirige
  className?: string; //Clases adicionales opcionales
  isDemo?: boolean; //Si es codigo o demo
  isGitHub?: boolean; //Si es un link normal
}

export default function ButtonProjects({
  href,
  className = "",
  isDemo = false,
  isGitHub = false,
}: ButtonProjectsProps) {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(href);
  };
  return (
    <div>
      <button
        className={`border  px-4 py-2 ${className} cursor-pointer`}
        style={{
          borderColor: `${isDemo ? "rgb(var(--muted))" : ""}${isGitHub ? "rgb(var(--secondary))" : ""}`,
        }}
        onClick={handleReadMore}
      >
        {isGitHub && " Github <~>"}
        {isDemo && " Demo <~>"}
      </button>
    </div>
  );
}
