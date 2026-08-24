// ===============================
// Contact Section Component
// Studio contact details, business hours, a map placeholder and a
// controlled booking-enquiry form (Name, Email, Phone, Message).
// ===============================
import { useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./Contact.module.css";

const HOURS = [
  { day: "Monday — Friday", time: "11:00 AM – 8:00 PM" },
  { day: "Saturday", time: "10:00 AM – 9:00 PM" },
  { day: "Sunday", time: "12:00 PM – 6:00 PM" },
];

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };

function Contact() {
  const [formRef, formVisible] = useScrollReveal();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          tattooIdea: formData.message, // Mapping message to tattooIdea
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData(INITIAL_FORM);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className={styles.header}>
          <p className="eyebrow">Contact</p>
          <h2 className={styles.heading}>
            Start your piece with a consultation.
          </h2>
        </div>

        <div className={styles.grid}>
          {/* ---------- Left: studio info + map ---------- */}
          <div className={styles.info}>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <a href="tel:+912261234567" className={styles.infoValue}>
                  +91 22 6123 1111
                </a>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <a href="mailto:studio@tattu.com" className={styles.infoValue}>
                  studio@tattu.com
                </a>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>
                  Springfield, Illinois, United States
                </span>
              </li>
            </ul>

            <div className={styles.hours}>
              <span className={styles.infoLabel}>Business Hours</span>
              <ul className={styles.hoursList}>
                {HOURS.map((slot) => (
                  <li key={slot.day} className={styles.hoursRow}>
                    <span>{slot.day}</span>
                    <span>{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Embedded map placeholder — swap for a real embed / API key */}
            <div className={styles.mapContainer}>
              <iframe
                title="imperia Studio Location"
                src="https://www.google.com/maps?q=Soho,London&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* ---------- Right: booking form ---------- */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`${styles.form} ${formVisible ? "anim-slide-left" : styles.hidden}`}
          >
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your full name"
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="you@email.com"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Tell us about the piece you have in mind — placement, size, style."
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${styles.submit}`}
            >
              Send Enquiry
            </button>

            {isSubmitted && (
              <p className={styles.successNote} role="status">
                Thanks — your enquiry has been noted. We'll reply within 24
                hours.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
