interface TituloProps {
  text: string;
  isSection?: boolean;
  as?: "h1" | "h2";
  className?: string; //Esta clase sera solo para
}

export function Titulo({
  text,
  as: Heading = "h2",
  isSection = true,
  className = "",
}: TituloProps) {
  return (
    <div
      className={`w-full mb-4 lg:mt-10 md:mb-5 flex flex-row gap-4 items-center `}
    >
      {/* Título de la sección de habilidades */}
      <Heading
        className="font-normal whitespace-nowrap"
        style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
      >
        <span className="text-secondary" aria-hidden>{isSection ? "#" : "/"}</span>
        {text}
      </Heading>
      {/*Esto lo hago para que sea personalido por seccion cada linea*/}
      <div
        className={`h-px ${className} flex-1 `}
        style={{ backgroundColor: "rgb(var(--secondary))" }}
        aria-hidden="true"
      ></div>
    </div>
  );
}
