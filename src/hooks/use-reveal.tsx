import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref and stamps
 * data-revealed on it the first time it enters the viewport. Pair with the
 * `.reveal` utility (see styles.css) on descendants that should fade/rise in.
 *
 * Content is not gated behind JS: `.reveal` only hides once a real observer
 * fires, and users with prefers-reduced-motion get the fallback in CSS.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.revealed = "true";
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
