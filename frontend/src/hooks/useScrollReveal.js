// ===============================
// useScrollReveal
// Small reusable hook that adds a "is-visible" class to an element
// once it scrolls into the viewport. Powers every fade-up / slide-in
// entrance animation on the site without any animation library.
// ===============================
import { useEffect, useRef, useState } from "react";
export default function useScrollReveal({ threshold = 0.2 } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the browser doesn't support IntersectionObserver, just show content.
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // animate once, not on every scroll pass
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}