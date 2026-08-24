// ===============================
// Footer Component
// Closes the page with the studio wordmark, navigation, quick links,
// social icons and the copyright line.
// ===============================
import { useState } from "react";
import styles from "./Footer.module.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Meet the Artists", href: "#artists" },
  { label: "Contact", href: "#contact" },
];

const QUICK_LINKS = [
  { label: "Aftercare Guide", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Careers", href: "#" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const year = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Subscribing..." });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Thanks for subscribing!" });
        setEmail("");
      } else {
        setStatus({ type: "error", message: data.message || "Subscription failed." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Failed to connect to server." });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        {/* Brand column */}
        <div className={styles.brand}>
          <a href="#home" className={styles.logo}>
            imperia<span className={styles.logoDot}>.</span>
          </a>
          <p className={styles.tagline}>
            A contemporary imperia studio for considered, custom work.
          </p>
          
          <div className={styles.newsletter}>
            <h4 className={styles.columnTitle}>Newsletter</h4>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterBtn}>
                Join
              </button>
            </form>
            {status.message && (
              <p className={`${styles.status} ${styles[status.type]}`}>
                {status.message}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Navigation</h4>
          <ul className={styles.linkList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Follow</h4>
          <div className={styles.socials}>
            <a href="#" aria-label="Tattu on Instagram" className={styles.socialIcon}>
              IG
            </a>
            <a href="#" aria-label="Tattu on Pinterest" className={styles.socialIcon}>
              PIN
            </a>
            <a href="#" aria-label="Tattu on TikTok" className={styles.socialIcon}>
              TT
            </a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} imperia Studio. All rights reserved.</p>
        <p>Springfield, Illinois, United States</p>
      </div>
    </footer>
  );
}

export default Footer;
