"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver-driven scroll reveal. Returns props for the
 * wrapper element that drive the `.reveal` CSS transition.
 */
export function useReveal<T extends HTMLElement>(
  options: { threshold?: number; delay?: number } = {}
) {
  const { threshold = 0.12, delay = 0 } = options;
  const ref = useRef<T | null>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasObserver = "IntersectionObserver" in window;
    const rect = element.getBoundingClientRect();
    const initiallyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    const revealImmediately = reduceMotion || !hasObserver || initiallyVisible;
    const revealFrame = window.requestAnimationFrame(() => {
      setReady(true);
      if (revealImmediately) setVisible(true);
    });

    const observer = revealImmediately
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                setVisible(true);
                observer?.disconnect();
              }
            }
          },
          { threshold, rootMargin: "0px 0px -8% 0px" }
        );

    if (observer) observer.observe(element);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      observer?.disconnect();
    };
  }, [threshold]);

  return {
    ref,
    className: `reveal${ready ? " is-ready" : ""}${visible ? " is-visible" : ""}`,
    style: { "--reveal-delay": `${delay}ms` } as React.CSSProperties,
  };
}
