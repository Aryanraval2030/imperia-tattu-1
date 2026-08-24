// ===============================
// WhyChooseUs Section Component
// A grid of feature cards, each pairing a small line-icon with a
// studio standard (hygiene, equipment, pricing, custom design, etc).
// ===============================
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./WhyChooseUs.module.css";

const FEATURES = [
  {
    title: "Professional Artists",
    description: "Every artist is independently certified with a proven body of work.",
    icon: "artist",
  },
  {
    title: "Safe & Hygienic",
    description: "Hospital-grade sterilisation and single-use needles on every client.",
    icon: "shield",
  },
  {
    title: "Premium Equipment",
    description: "Industry-leading machines, pigments and aftercare products only.",
    icon: "spark",
  },
  {
    title: "Custom Designs",
    description: "No flash walls by default — every piece is drawn for your skin.",
    icon: "pen",
  },
  {
    title: "Affordable Pricing",
    description: "Transparent, session-based quotes agreed before any needle touches skin.",
    icon: "tag",
  },
  {
    title: "Customer Satisfaction",
    description: "Free touch-ups within 60 days and aftercare support for every client.",
    icon: "heart",
  },
];

// Minimal inline line-icon set — keeps the component dependency-free
function FeatureIcon({ type }) {
  const paths = {
    artist: <path d="M12 3l2.2 4.6L19 9l-3.5 3.2L16.4 17 12 14.6 7.6 17l.9-4.8L5 9l4.8-1.4L12 3z" />,
    shield: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
    spark: <path d="M12 3v6M12 15v6M4 12h6M14 12h6M6 6l4 4M18 18l-4-4M18 6l-4 4M6 18l4-4" />,
    pen: <path d="M4 20l3-1 11-11a1.6 1.6 0 000-2.3l-.7-.7a1.6 1.6 0 00-2.3 0L4 16l-1 4z" />,
    tag: <path d="M3 12l8-8h6a2 2 0 012 2v6l-8 8-8-8z M13 8h.01" />,
    heart: <path d="M12 20.5S3 14.9 3 9.1A4.6 4.6 0 0112 6.3a4.6 4.6 0 019 2.8c0 5.8-9 11.4-9 11.4z" />,
  };

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  );
}

function WhyChooseUs() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="section section-alt">
      <div className="container">
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? "anim-fade-up" : styles.hidden}`}
        >
          <p className="eyebrow">Why Choose Us</p>
          <h2 className={styles.heading}>The standard we hold every piece to.</h2>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={styles.card}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div className={styles.iconWrap}>
                <FeatureIcon type={feature.icon} />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
