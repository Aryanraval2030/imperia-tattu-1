// ===============================
// Portfolio Section Component
// A filterable gallery of tattoo work.
// ===============================

import { useEffect, useMemo, useState } from "react";
import DeleteConfirm from "../DeleteConfirmPortfolio/DeleteConfirm.jsx";
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./Portfolio.module.css";
import AddPortfolio from "../addPortfolioAdmin/AddPortfolio.jsx";
import EditPortfolio from "../EditPortfolioAdmin/EditPortfolio.jsx";
import {
  getPortfolios,
  getTokenFromCookie,
  deletePortfolio,
  updatePortfolio,
} from "../../api/api.js";

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
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Admin login state
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerRef, headerVisible] = useScrollReveal();
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditPortfolio, setShowEditPortfolio] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // ===============================
  // Check Admin Login
  // ===============================
  useEffect(() => {
    const checkAdminLogin = () => {
      const token = getTokenFromCookie();
      setIsAdmin(!!token);
    };

    // Check when page loads
    checkAdminLogin();
    // Check when admin logs in
    window.addEventListener("adminLogin", checkAdminLogin);
    // Cleanup
    return () => {
      window.removeEventListener("adminLogin", checkAdminLogin);
    };
  }, []);

  // ===============================
  // Get Portfolio Data
  // ===============================
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPortfolios();

        setPortfolioItems(data);
      } catch (error) {
        console.error("Portfolio fetch error:", error);

        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await deletePortfolio(deleteId);

      setPortfolioItems((prev) => prev.filter((item) => item._id !== deleteId));

      setShowDeleteConfirm(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Delete portfolio error:", error);

      setError(error.message || "Failed to delete portfolio.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpdate = async (id, portfolioData) => {
    try {
      const data = await updatePortfolio(id, portfolioData);

      // Updated portfolio UI me bhi update karo
      setPortfolioItems((prev) =>
        prev.map((item) => (item._id === id ? data.data : item)),
      );

      setShowEditPortfolio(false);
      setSelectedPortfolio(null);
    } catch (error) {
      console.error("Update portfolio error:", error);

      setError(error.message || "Failed to update portfolio.");

      throw error;
    }
  };
  // ===============================
  // Filter Portfolio Items
  // ===============================
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return portfolioItems;
    }

    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, portfolioItems]);

  return (
    <>
      {showDeleteConfirm && (
        <DeleteConfirm
          onClose={() => {
            setShowDeleteConfirm(false);
            setDeleteId(null);
          }}
          onConfirm={handleDelete}
          loading={deleteLoading}
        />
      )}
      {showEditPortfolio && (
        <EditPortfolio
          portfolio={selectedPortfolio}
          onClose={() => {
            setShowEditPortfolio(false);
            setSelectedPortfolio(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
      <section id="portfolio" className="section section-alt">
        <div className="container">
          {/* ===============================
            Portfolio Header
        =============================== */}
          <div
            ref={headerRef}
            className={`${styles.header} ${
              headerVisible ? "anim-fade-up" : styles.hidden
            }`}
          >
            <p className="eyebrow">Portfolio</p>

            <h2 className={styles.heading}>Selected work from the floor.</h2>

            {/* ===============================
              Admin Add Button
          =============================== */}
            {isAdmin && (
              <button
                type="button"
                className={`${styles.btn_port} ${styles.addButton}`}
                onClick={() => setShowAddPortfolio(true)}
              >
                <span className={styles.addIcon}>+</span>

                <span>Add Portfolio</span>
              </button>
            )}
          </div>

          {/* ===============================
            Category Filter Tabs
        =============================== */}
          <div className={styles.tabs}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`${styles.tab} ${
                  activeCategory === category ? styles.tabActive : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ===============================
            Loading
        =============================== */}
          {loading && <p className={styles.status}>Loading portfolio...</p>}

          {/* ===============================
            Error
        =============================== */}
          {error && <p className={styles.error}>{error}</p>}

          {/* ===============================
            Gallery
        =============================== */}
          {!loading && !error && (
            <div className={styles.grid}>
              {filteredItems.map((item, index) => (
                <article
                  key={item._id}
                  className={styles.card}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
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

                  {/* Admin Actions */}
                  {isAdmin && (
                    <div className={styles.adminActions}>
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={() => {
                          setSelectedPortfolio(item);
                          setShowEditPortfolio(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => {
                          setDeleteId(item._id);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
        {showAddPortfolio && (
          <AddPortfolio
            onClose={() => setShowAddPortfolio(false)}
            onSuccess={(newPortfolio) => {
              setPortfolioItems((prev) => [newPortfolio, ...prev]);
            }}
          />
        )}
      </section>
    </>
  );
}

export default Portfolio;
