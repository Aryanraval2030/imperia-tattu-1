import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import AdminLogin from "../AdminLogin/AdminLogin.jsx";
import AlertPopup from "../AlertPopup/AlertPopup";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Meet the Artists", href: "#artists" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Alert Popup state
  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        {/* Studio wordmark */}
        <a href="#home" className={styles.logo}>
          IMPERIA<span className={styles.logoDot}>.</span>
        </a>

        {/* Primary navigation links */}
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

          {/* Mobile CTA */}
          <a
            href="#contact"
            className={`btn btn-primary ${styles.mobileCta}`}
            onClick={handleLinkClick}
          >
            Book Appointment
          </a>

          {/* Admin Login */}
          <button
            type="button"
            className={`btn btn-primary ${styles.desktopCta}`}
            onClick={() => setIsAdminLoginOpen(true)}
          >
            Admin Login
          </button>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.menuToggle} ${
            isMenuOpen ? styles.menuToggleOpen : ""
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Admin Login Popup */}
      {isAdminLoginOpen && (
        <AdminLogin
          onClose={() => setIsAdminLoginOpen(false)}
          showAlert={(data) => setAlertData(data)}
        />
      )}

      {/* Alert Popup */}
      <AlertPopup
        isOpen={alertData.isOpen}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        onClose={() =>
          setAlertData((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />
    </header>
  );
}

export default Navbar;
