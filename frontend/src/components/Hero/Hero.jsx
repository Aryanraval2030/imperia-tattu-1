// ===============================
// Hero Section Component
// Full-bleed landing section with a CSS-only fixed parallax background,
// the studio's headline, subtitle and the two primary CTAs.
// ===============================
import styles from "./Hero.module.css";

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Fixed background layer — background-attachment: fixed creates the
          parallax illusion entirely in CSS, no JS required. */}
      <div className={styles.heroBackground} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow anim-fade-up`}>
          IMPERIA Contemporary Tattoo Studio
        </p>

        <h1 className={`${styles.headline} anim-fade-up`}>
          Ink that becomes
          <br />
          <span className={styles.headlineAccent}>part of the story.</span>
        </h1>

        <p className={`${styles.subtitle} anim-fade-up`}>
          imperia is a studio for people who want their tattoo considered, not
          rushed — custom design, certified artists and a space built for
          precision.
        </p>

        <div className={`${styles.actions} anim-fade-up`}>
          <a href="#contact" className="btn btn-primary">
            Book Appointment
          </a>
          <a href="#portfolio" className="btn btn-outline">
            Explore Portfolio
          </a>
        </div>
      </div>

      {/* Scroll indicator — a small floating cue, kept subtle */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        Scroll
      </div>
    </section>
  );
}

export default Hero;
