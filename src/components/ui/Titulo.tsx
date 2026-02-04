interface TituloProps {
  text: string;
  isSection?: boolean;
  className?: string; //Esta clase sera solo para
}

export function Titulo({
  text,
  isSection = true,
  className = "",
}: TituloProps) {
  return (
    <div
      className={`w-full mb-7 lg:mt-10 md:mb-20 flex flex-row gap-4 items-center `}
    >
      {/* Título de la sección de habilidades */}
      <h2
        className="font-normal whitespace-nowrap"
        style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
      >
        <span className="text-secondary">{isSection ? "#" : "/"}</span>
        {text}
      </h2>
      {/*Esto lo hago para que sea personalido por seccion cada linea*/}
      <div
        className={`h-px ${className} flex-1 `}
        style={{ backgroundColor: "rgb(var(--secondary))" }}
        aria-hidden="true"
      ></div>
    </div>
  );
}
