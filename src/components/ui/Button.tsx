interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ text, onClick, className = "" }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className={`btn ${className}`}>
      {text}
    </button>
  );
}
