import { useState } from "react";
import styles from "./ AdminLogin.module.css";
import { adminLogin } from "../../api/api.js";

function AdminLogin({ onClose, showAlert }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await adminLogin(formData);
      // Store JWT token in cookie
      document.cookie = `token=${data.data.token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      // Store admin information
      localStorage.setItem("admin", JSON.stringify(data.data));

      onClose();

      showAlert({
        isOpen: true,
        type: "success",
        title: "Login Successful",
        message: "Welcome back! You have successfully logged in.",
      });
    } catch (error) {
      showAlert({
        isOpen: true,
        type: "error",
        title: "Login Failed",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Owner Access</p>
            <h2 className={styles.title}>Admin Login</h2>
            <p className={styles.subtitle}>Sign in to manage the studio.</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close login"
          >
            ×
          </button>
        </div>

        {/* Login Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {" "}
          <div className={styles.field}>
            <label htmlFor="admin-username">Username</label>

            <input
              id="admin-username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="admin-password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
