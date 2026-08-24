// ===============================
// Portfolio Section Component
// A filterable gallery of tattoo work, grouped by style category.
// Cards zoom their image on hover and reveal the category on a scrim.
// ===============================
import { useMemo, useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./Portfolio.module.css";

// Gallery items — each tagged with the style category it belongs to.
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Shaded Forearm Piece",
    category: "Black & Grey",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Portrait Study",
    category: "Realism",
    image:
      "https://images.unsplash.com/photo-1600456029456-c4b53813915e?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Eagle & Banner",
    category: "Traditional",
    image:
      "https://images.unsplash.com/photo-1540174053853-1cc5d1fa8814?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Botanical Line Work",
    category: "Minimal",
    image:
      "https://images.unsplash.com/photo-1629811002708-7d15c6c7e7a0?q=80&w=414&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Drmat&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Koi & Waves",
    category: "Japanese",
    image:
      "https://images.unsplash.com/photo-1775135287739-1ce11fd0b6d1?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "Single Needle Symbol",
    category: "Minimal",
    image:
      "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    title: "Skull & Roses Sleeve",
    category: "Black & Grey",
    image:
      "https://images.unsplash.com/photo-1501939387519-cf9c35d4f4eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc5fHx8ZW58MHx8fHx8",
  },
  {
    id: 8,
    title: "Dragon Back Piece",
    category: "Japanese",
    image:
      "https://images.unsplash.com/photo-1640202352521-66c98a02e612?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
  },

  {
    id: 9,
    title: "Lion Chest Artwork",
    category: "Realism",
    image:
      "https://images.unsplash.com/photo-1714787283995-7817fef1becf?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    title: "Phoenix Rising",
    category: "Traditional",
    image:
      "https://plus.unsplash.com/premium_photo-1745177740058-efed6a96a7d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11,
    title: "Floral Wrist Design",
    category: "Fine Line",
    image:
      "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    title: "Geometric Mountain",
    category: "Fine Line",
    image:
      "https://images.unsplash.com/photo-1759247943094-38c725526a5d?q=80&w=883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CATEGORIES = [
  "All",
  "Black & Grey",
  "Realism",
  "Traditional",
  "Fine Line",
  "Japanese",
  "Minimal",
];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [headerRef, headerVisible] = useScrollReveal();

  // Only recompute the filtered list when the active category changes
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="portfolio" className="section section-alt">
      <div className="container">
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? "anim-fade-up" : styles.hidden}`}
        >
          <p className="eyebrow">Portfolio</p>
          <h2 className={styles.heading}>Selected work from the floor.</h2>
        </div>

        {/* Category filter tabs */}
        <div className={styles.tabs}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.tab} ${activeCategory === category ? styles.tabActive : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className={styles.grid}>
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className={styles.card}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={styles.imageWrap}>
                <img
                  src={item.image}
                  alt={`${item.title} — ${item.category} tattoo`}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.scrim} />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardCategory}>{item.category}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
