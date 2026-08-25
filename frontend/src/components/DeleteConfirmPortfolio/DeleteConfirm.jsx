import styles from "./DeleteConfirm.module.css";

function DeleteConfirm({ onClose, onConfirm, loading }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Owner Action</p>

            <h2 className={styles.title}>Delete Portfolio?</h2>

            <p className={styles.subtitle}>
              Are you sure you want to delete this portfolio item?
              This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
            disabled={loading}
          >
            ×
          </button>
        </div>

        {/* Buttons */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
            No
          </button>

          <button
            type="button"
            className={styles.deleteButton}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;