import { useState } from "react";
import styles from "./AddPortfolio.module.css";
import { createPortfolio } from "../../api/api.js";

const CATEGORIES = [
  "Black & Grey",
  "Realism",
  "Traditional",
  "Fine Line",
  "Japanese",
  "Minimal",
];

function AddPortfolio({ onClose, onSuccess, showAlert }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await createPortfolio(formData);

      // Parent component ko newly created portfolio bhejo
      onSuccess(data.data);

      onClose();

      showAlert({
        isOpen: true,
        type: "success",
        title: "Portfolio Added",
        message: "Portfolio item added successfully.",
      });
    } catch (error) {
      console.error("Add Portfolio Error:", error);

      showAlert({
        isOpen: true,
        type: "error",
        title: "Failed",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Studio Management</p>

            <h2 className={styles.title}>Add Portfolio</h2>

            <p className={styles.subtitle}>
              Add a new piece to your portfolio.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
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
              <option value="">Select category</option>

              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
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

          {/* Submit */}
          <button type="submit" className={styles.addButton} disabled={loading}>
            {loading ? "Adding..." : "Add Portfolio"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPortfolio;
