// ===============================
// Artists Section Component
// Premium profile cards for each resident artist: photo, specialization,
// experience, a short bio and social links, with a hover lift animation.
// ===============================
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./Artists.module.css";

const ARTISTS = [
  {
    id: 1,
    name: "Liam Parker",
    specialization: "Realism & Portraiture",
    experience: "9 years experience",
    bio: "Rehan builds his portrait work in layered greyscale, favouring long single sittings over multiple sessions.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Ines Cabral",
    specialization: "Fine Line & Botanical",
    experience: "6 years experience",
    bio: "Ines works almost entirely in single-needle line, drawing every design directly onto skin freehand.",
    image:
      "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Emma Johnson",
    specialization: "Traditional & Japanese",
    experience: "11 years experience",
    bio: "Kabir trained under two Yokohama-style masters and leads all large-scale sleeve and back-piece work.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Ava Wilson",
    specialization: "Black & Grey Minimal",
    experience: "5 years experience",
    bio: "Sana's work sits between minimal and black & grey — restrained line with soft, deliberate shading.",
    image:
      "https://images.unsplash.com/photo-1635713150362-ed0cd425e697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
  },
];

function Artists() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="artists" className="section">
      <div className="container">
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? "anim-fade-up" : styles.hidden}`}
        >
          <p className="eyebrow">Meet the Artists</p>
          <h2 className={styles.heading}>Four artists. One standard.</h2>
        </div>

        <div className={styles.grid}>
          {ARTISTS.map((artist) => (
            <article key={artist.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img
                  src={artist.image}
                  alt={`Portrait of tattoo artist ${artist.name}`}
                  className={styles.image}
                  loading="lazy"
                />

                {/* Social icons revealed on hover */}
                <div className={styles.socials}>
                  <a href="#" aria-label={`${artist.name} on Instagram`} className={styles.socialIcon}>
                    <InstagramIcon />
                  </a>
                  {/* <a href="#" aria-label={`${artist.name} on Pinterest`} className={styles.socialIcon}>
                    <PinterestIcon />
                  </a> */}
                </div>
              </div>

              <h3 className={styles.name}>{artist.name}</h3>
              <p className={styles.specialization}>{artist.specialization}</p>
              <p className={styles.experience}>{artist.experience}</p>
              <p className={styles.bio}>{artist.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Small inline icon components keep the JSX above readable
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 20c.5-2 1.4-5.5 1.8-7.3M12 3c-5 0-8 3.2-8 7 0 2.6 1.4 4 2.3 4.3M12 3c5 0 8 3.4 8 7.5 0 4-2.2 6.5-5.3 6.5-1.4 0-2.3-.8-2.7-1.6" />
    </svg>
  );
}

export default Artists;
