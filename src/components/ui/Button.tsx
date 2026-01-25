interface ButtonProps {
  text: string; //Aqui va el texto del boton
  onClick: () => void; //Accion al hacer click
  className?: string; //Clases adicionales opcionales
}

export function Button({ text, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{ borderColor: "rgb(var(--secondary))" }}
    >
      {text}
    </button>
  );
}
