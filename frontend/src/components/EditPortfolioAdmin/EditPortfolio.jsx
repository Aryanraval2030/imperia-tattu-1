import { useEffect, useState } from "react";
import styles from "./EditPortfolio.module.css";

const CATEGORIES = [
  "Black & Grey",
  "Realism",
  "Traditional",
  "Fine Line",
  "Japanese",
  "Minimal",
];

function EditPortfolio({ portfolio, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================
  // Fill form with existing portfolio data
  // =====================================
  useEffect(() => {
    if (portfolio) {
      setFormData({
        title: portfolio.title || "",
        category: portfolio.category || "",
        image: portfolio.image || "",
      });
    }
  }, [portfolio]);

  // =====================================
  // Handle input change
  // =====================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // Handle form submit
  // =====================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onUpdate(portfolio._id, formData);

      onClose();
    } catch (error) {
      console.error("Update portfolio error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!portfolio) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* =====================================
            Header
        ===================================== */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Owner Access</p>

            <h2 className={styles.title}>Edit Portfolio</h2>

            <p className={styles.subtitle}>Update this portfolio item.</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close edit portfolio"
          >
            ×
          </button>
        </div>

        {/* =====================================
            Edit Form
        ===================================== */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Title */}
          <div className={styles.field}>
            <label htmlFor="portfolio-title">Title</label>

            <input
              id="portfolio-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter portfolio title"
              required
            />
          </div>

          {/* Category */}
          <div className={styles.field}>
            <label htmlFor="portfolio-category">Category</label>

            <select
              id="portfolio-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select category
              </option>

              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className={styles.field}>
            <label htmlFor="portfolio-image">Image URL</label>

            <input
              id="portfolio-image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className={styles.preview}>
              <img src={formData.image} alt="Portfolio preview" />
            </div>
          )}

          {/* Buttons */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.updateButton}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPortfolio;
