import { FaCodepen } from "react-icons/fa";
import { FooterContent } from "./FooterContent";
import { FooterNav } from "./FooterNav";
import { FooterSocial } from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="border-t border-theme mt-24 text-muted py-10">
      <div className="max-w-6xl mx-auto px-6 min-w-80vw">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-0">
          <div className="flex flex-col gap-1 md:pr-8">
            <div className="flex flex-row items-center gap-2">
              <FaCodepen size={15} className="text-secondary" aria-hidden />
              <span className="text-foreground font-medium">Godoy</span>
            </div>
            <FooterContent />
            <address className="text-muted not-italic">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </address>
          </div>

          <div className="md:border-l md:border-theme md:pl-8">
            <FooterNav />
          </div>

          <div className="md:border-l md:border-theme md:pl-8">
            <FooterSocial />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-theme text-sm">
          © {new Date().getFullYear()} Denilson Godoy ·{" "}
          <FooterContent part="rights" />
        </div>
      </div>
    </footer>
  );
}
