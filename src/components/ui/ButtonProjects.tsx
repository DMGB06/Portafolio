"use client";

interface ButtonProjectsProps {
  href: string;
  className?: string;
  isDemo?: boolean;
  isGitHub?: boolean;
}

export default function ButtonProjects({
  href,
  className = "",
  isDemo = false,
  isGitHub = false,
}: ButtonProjectsProps) {
  const borderColor = isGitHub
    ? "rgb(var(--secondary))"
    : isDemo
      ? "rgb(var(--muted))"
      : "rgb(var(--muted))";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block border px-4 py-2 ${className}`}
      style={{ borderColor }}
    >
      {isGitHub && "Github <~>"}
      {isDemo && "Demo <~>"}
    </a>
  );
}
