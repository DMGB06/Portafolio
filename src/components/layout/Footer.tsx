import { FaCodepen } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { FooterContent } from "./FooterContent";
import { FooterNav } from "./FooterNav";
import { FooterSocial } from "./FooterSocial";
import "./footer.css";

export default function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div>
            <p className="site-footer__name">
              <FaCodepen aria-hidden />
              Denilson Godoy
            </p>
            <p className="site-footer__role"><FooterContent /></p>
            {email && (
              <address className="site-footer__address">
                <a className="site-footer__email" href={`mailto:${email}`}>
                  {email}
                  <FiArrowUpRight aria-hidden />
                </a>
              </address>
            )}
          </div>

          <div className="site-footer__links">
            <FooterNav />
            <FooterSocial />
          </div>
        </div>

        <p className="site-footer__legal">
          © {new Date().getFullYear()} Denilson Godoy ·{" "}
          <FooterContent part="rights" />
        </p>
      </div>
    </footer>
  );
}
