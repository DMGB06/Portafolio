import { FaCodepen } from "react-icons/fa";
import { FooterContent } from "./FooterContent";

export default function Footer() {
  return (
    <footer className="border-t border-theme mt-24 text-muted py-8">
      <div className="max-w-6xl mx-auto px-6 py-4 pb-5 min-w-80vw">
        <div className="flex flex-col max-w-full">
          <div className="flex flex-row items-center gap-2 mb-2">
            <FaCodepen size={15} className="text-secondary" aria-hidden />
            <span className="text-foreground font-medium">Godoy</span>
            <address className="text-muted not-italic ml-5">
              2201010141@undc.edu.pe
            </address>
          </div>
          <div className="flex flex-row mt-3">
            <FooterContent />
          </div>
        </div>
      </div>
    </footer>
  );
}
