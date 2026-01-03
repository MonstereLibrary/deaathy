import { useEffect, useRef } from "react";

// Hook to add "magic" reveal-on-scroll behavior to sections.
// Adds a visible class when the section enters the viewport, then unobserves it.
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback: if IntersectionObserver is not available (very old browsers),
    // show content immediately to avoid it staying hidden.
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      node.classList.add("reveal-section-visible");
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
