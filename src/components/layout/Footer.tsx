import { FaCodepen } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t mt-24 text-muted py-8">
      <div className="max-w-6xl mx-auto px-6 py-4 pb-5 min-w-80vw">
        {/*Contenido del footer*/}
        {/* Texto centrado*/}
        <div className="flex flex-col max-w-full">
          <div className="flex flex-row items-center gap-2 mb-2">
            <FaCodepen size={15} className="text-secondary" />
            <span className="text-foreground">Godoy</span>
            <address className="text-muted not-italic ml-5">
              2201010141@undc.edu.pe
            </address>
          </div>
          <div className="flex flex-row mt-3">
            <p>full stack developer</p>
          </div>
        </div>
        <div></div>
        <address></address>
      </div>
    </footer>
  );
}
