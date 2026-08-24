// ===============================
// About Section Component
// Introduces the studio: mission, experience and the standards
// (clean environment, certified artists, premium equipment).
// ===============================
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./About.module.css";

// Standards shown as small supporting stats beneath the story copy
const STANDARDS = [
  { value: "12+", label: "Years of collective studio experience" },
  { value: "100%", label: "Certified, licensed tattoo artists" },
  { value: "3200+", label: "Custom pieces completed to date" },
];

function About() {
  const [textRef, textVisible] = useScrollReveal();
  const [imageRef, imageVisible] = useScrollReveal();

  return (
    <section id="about" className="section">
      <div className="container">
        <div className={styles.grid}>
          {/* Story copy */}
          <div
            ref={textRef}
            className={`${styles.text} ${textVisible ? "anim-fade-up" : styles.hidden}`}
          >
            <p className="eyebrow">About Tattu</p>
            <h2 className={styles.heading}>
              A studio built around one idea — a tattoo deserves time.
            </h2>
            <p className={styles.paragraph}>
              imperia was founded to slow the process down. Every piece starts
              as a conversation, moves through custom design, and is only
              tattooed once the artist and client are both certain. It's a
              deliberate approach, and it's the only one we work in.
            </p>
            <p className={styles.paragraph}>
              The studio runs on hospital-grade sterilisation, single-use
              needles and premium pigments, in a space designed to feel calm
              rather than clinical. Every artist on the floor is independently
              certified and works from their own developed style.
            </p>

            <ul className={styles.standardsList}>
              {STANDARDS.map((item) => (
                <li key={item.label} className={styles.standardItem}>
                  <span className={styles.standardValue}>{item.value}</span>
                  <span className={styles.standardLabel}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio imagery */}
          <div
            ref={imageRef}
            className={`${styles.imageWrap} ${imageVisible ? "anim-slide-left" : styles.hidden}`}
          >
            <img
              src="https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Close-up detail of custom tattoo artwork completed at Tattu"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageBadge}>
              <span className={styles.badgeNumber}>04</span>
              <span>Certified resident artists</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
