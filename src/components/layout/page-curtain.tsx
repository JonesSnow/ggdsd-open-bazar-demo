"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/src/components/ui/logo";
import { useMediaQuery } from "@/src/hooks";

const STORAGE_KEY = "openbazar:entered";
const CURTAIN_MS = 950;

/**
 * Editorial entrance: two pine panels part like a curtain
 * being drawn open, with the wordmark held briefly in the
 * middle. Plays once per session on initial page load,
 * never on internal navigation. Fully skipped for
 * reduced-motion users. Total: ~950ms, non-blocking
 * (pointer-events: none).
 */
export function PageCurtain() {
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode — replay next visit */
      return;
    }
    // State updates happen inside timer callbacks so the
    // effect itself never triggers a synchronous re-render.
    const show = window.setTimeout(() => setVisible(true), 0);
    const hide = window.setTimeout(() => setVisible(false), CURTAIN_MS);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [prefersReduced]);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="curtain-root">
      <div className="curtain-panel curtain-left" />
      <div className="curtain-panel curtain-right" />
      <div className="curtain-mark">
        <LogoMark size={44} />
      </div>
    </div>
  );
}
