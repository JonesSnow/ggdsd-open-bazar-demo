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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    className: `reveal${visible ? " is-visible" : ""}`,
    style: { "--reveal-delay": `${delay}ms` } as React.CSSProperties,
  };
}
