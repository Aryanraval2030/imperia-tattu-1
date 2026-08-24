// ===============================
// Testimonials Section Component
// Client quotes displayed on glassmorphism cards over a soft ambient
// glow background, with a gentle hover lift.
// ===============================
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Rehan spent the first session just sketching before a single line went on my arm. Worth every extra week.",
    name: "Ananya Shah",
    detail: "Realism sleeve, 2 sessions",
  },
  {
    id: 2,
    quote:
      "The studio itself made the decision easy — spotless, calm, and nobody rushed me into a design I wasn't sure about.",
    name: "Devraj Singh",
    detail: "Traditional back piece",
  },
  {
    id: 3,
    quote:
      "My fine line piece healed better than any tattoo I've had elsewhere. The aftercare follow-up made the difference.",
    name: "Meher Kapoor",
    detail: "Fine line, forearm",
  },
];

function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className={`section ${styles.section}`}>
      {/* Ambient glow layer sits behind the glass cards */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.container}`}>
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? "anim-fade-up" : styles.hidden}`}
        >
          <p className="eyebrow">Testimonials</p>
          <h2 className={styles.heading}>Told in the clients' own words.</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((testimonial, index) => (
            <blockquote
              key={testimonial.id}
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className={styles.footer}>
                <span className={styles.name}>{testimonial.name}</span>
                <span className={styles.detail}>{testimonial.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
