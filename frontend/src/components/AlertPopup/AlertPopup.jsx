import styles from "./AlertPopup.module.css";

function AlertPopup({ isOpen, type = "success", title, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <p
              className={`${styles.eyebrow} ${
                type === "success" ? styles.success : styles.error
              }`}
            >
              {type === "success" ? "Success" : "Error"}
            </p>

            <h2 className={styles.title}>{title}</h2>

            <p className={styles.subtitle}>{message}</p>
          </div>

          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <button className={styles.okButton} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default AlertPopup;
