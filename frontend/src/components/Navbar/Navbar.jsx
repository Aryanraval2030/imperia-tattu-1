import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import AdminLogin from "../AdminLogin/AdminLogin.jsx";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Meet the Artists", href: "#artists" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  // Tracks whether the page has been scrolled past the hero threshold
  const [isScrolled, setIsScrolled] = useState(false);
  // Tracks whether the mobile nav drawer is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever a link is clicked
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        {/* Studio wordmark */}
        <a href="#home" className={styles.logo}>
          IMPERIA<span className={styles.logoDot}>.</span>
        </a>

        {/* Primary navigation links (desktop) */}
        <nav
          className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ""}`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}

          {/* CTA shown inside the mobile drawer as well */}
          <a
            href="#contact"
            className={`btn btn-primary ${styles.mobileCta}`}
            onClick={handleLinkClick}
          >
            Book Appointment
          </a>
          {/* Admin Login Button */}
          <button
            type="button"
            className={`btn btn-primary ${styles.desktopCta}`}
            onClick={() => setIsAdminLoginOpen(true)}
          >
            Admin Login
          </button>
        </nav>

        {/* Hamburger toggle for mobile */}
        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {isAdminLoginOpen && (
        <AdminLogin onClose={() => setIsAdminLoginOpen(false)} />
      )}
    </header>
  );
}

export default Navbar;
