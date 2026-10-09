"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import type { Business } from "@/src/types";
import { TypeBadge } from "@/src/components/business/business-card";
import { Rating, RatingSummary } from "@/src/components/ui/rating";
import { useMediaQuerySnapshot } from "@/src/hooks";

const COPY_COUNT = 2;
const AUTO_STRIDES_PER_MS = 1 / 3_000;
const REDUCED_MOTION_AUTO_STRIDES_PER_MS = 1 / 15_000;
const REDUCED_MOTION_FRAME_INTERVAL_MS = 1_000 / 30;
const KEY_NUDGE_MS = 360;
const DRAG_THRESHOLD_PX = 7;

export interface HeroWheelItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  type: Business["type"];
  categoryName: string;
  rating: number;
  reviewCount: number;
  coverArt: string;
}

interface MotionState {
  phase: number;
  manualOffset: number;
  manualStart: number;
  manualTarget: number;
  manualElapsed: number;
  lastTime: number;
  pointerId: number | null;
  pointerX: number;
  pointerStartX: number;
  dragging: boolean;
  targetTiltX: number;
  tiltX: number;
  targetTiltY: number;
  tiltY: number;
}

interface StreamMetrics {
  viewportWidth: number;
  cardWidth: number;
  stride: number;
  loopWidth: number;
}

interface CardElement {
  element: HTMLElement;
  copy: number;
  index: number;
}

interface HeroWheelMotionProps {
  items: HeroWheelItem[];
}

function wrap(value: number, length: number): number {
  return length > 0 ? ((value % length) + length) % length : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function createInitialMotion(): MotionState {
  return {
    phase: 0,
    manualOffset: 0,
    manualStart: 0,
    manualTarget: 0,
    manualElapsed: 0,
    lastTime: 0,
    pointerId: null,
    pointerX: 0,
    pointerStartX: 0,
    dragging: false,
    targetTiltX: 0,
    tiltX: 0,
    targetTiltY: 0,
    tiltY: 0,
  };
}

/**
 * Server-rendered listing cards arranged as a continuously moving 3D stream.
 * The animation updates DOM transforms directly; React only renders the data.
 */
export function HeroWheelMotion({ items }: HeroWheelMotionProps) {
  const streamRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<MotionState>(createInitialMotion());
  const metricsRef = useRef<StreamMetrics>({
    viewportWidth: 0,
    cardWidth: 0,
    stride: 0,
    loopWidth: 0,
  });
  const renderRef = useRef<((frameDriven?: boolean) => void) | null>(null);
  const startRef = useRef<(() => void) | null>(null);
  const suppressClickTimerRef = useRef<number | null>(null);
  const draggedCardRef = useRef(false);
  const preference = useMediaQuerySnapshot("(prefers-reduced-motion: reduce)");
  const motionPreferenceResolved = preference.resolved;
  const prefersReducedMotion = preference.resolved && preference.matches;

  useEffect(() => {
    const stream = streamRef.current;
    const track = trackRef.current;
    if (!stream || !track || items.length === 0) return;

    const motion = motionRef.current;
    const cards: CardElement[] = Array.from(
      track.querySelectorAll<HTMLElement>("[data-stream-card]")
    ).map((element) => ({
      element,
      copy: Number(element.dataset.streamCopy ?? 0),
      index: Number(element.dataset.streamIndex ?? 0),
    }));
    const groups = Array.from(
      track.querySelectorAll<HTMLElement>("[data-stream-group]")
    );
    const metrics = metricsRef.current;
    let frameId: number | null = null;
    let lastRenderedAt = 0;
    let inViewport = false;
    let pageVisible = document.visibilityState === "visible";

    const setStyle = (
      element: HTMLElement,
      property: string,
      value: string
    ) => {
      if (element.style.getPropertyValue(property) !== value) {
        element.style.setProperty(property, value);
      }
    };

    const render = (frameDriven = false) => {
      if (metrics.loopWidth <= 0 || metrics.viewportWidth <= 0) return;

      const phase = motion.phase + motion.manualOffset;
      const frameFlag = frameDriven || motion.dragging ? "true" : "false";
      if (track.dataset.motionFrame !== frameFlag) {
        track.dataset.motionFrame = frameFlag;
      }

      setStyle(track, "--stream-phase", `${phase.toFixed(3)}px`);
      setStyle(track, "--stream-tilt-x", `${motion.tiltX.toFixed(3)}deg`);
      setStyle(track, "--stream-tilt-y", `${motion.tiltY.toFixed(3)}deg`);

      const reach = Math.max(
        metrics.viewportWidth * 0.92 + metrics.cardWidth * 0.42,
        metrics.cardWidth * 1.8
      );

      for (const { element, copy, index } of cards) {
        const distanceFromCenter =
          (copy - 1) * metrics.loopWidth + index * metrics.stride + phase;
        const normalizedDepth = clamp(
          1 - Math.abs(distanceFromCenter) / reach,
          0,
          1
        );
        const depth = smoothstep(normalizedDepth);
        const scale = 0.72 + depth * 0.34;
        const opacity = 0.2 + depth * 0.8;
        const z = -250 + depth * 330;
        const curve = clamp(distanceFromCenter / reach, -1, 1);
        const y = Math.sin(curve * Math.PI * 0.5) * 8;
        const yaw = -Math.sign(distanceFromCenter) * (1 - depth) * 12;
        const visualState = [scale, opacity, z, y, yaw]
          .map((value) => value.toFixed(3))
          .join(":");

        if (element.dataset.visualState !== visualState) {
          element.dataset.visualState = visualState;
          setStyle(element, "--stream-card-scale", String(scale));
          setStyle(element, "--stream-card-opacity", String(opacity));
          setStyle(element, "--stream-card-z", `${z.toFixed(2)}px`);
          setStyle(element, "--stream-card-y", `${y.toFixed(2)}px`);
          setStyle(element, "--stream-card-yaw", `${yaw.toFixed(2)}deg`);
        }

        const spotlight = Math.abs(distanceFromCenter) <= metrics.stride * 0.46;
        const spotlightValue = spotlight ? "true" : "false";
        if (element.dataset.spotlight !== spotlightValue) {
          element.dataset.spotlight = spotlightValue;
        }

        const layer = String(Math.round(depth * 24));
        if (element.dataset.depthLayer !== layer) {
          element.dataset.depthLayer = layer;
          element.style.zIndex = layer;
        }

        const cardLeft = distanceFromCenter - metrics.cardWidth / 2;
        const visible =
          cardLeft < metrics.viewportWidth / 2 &&
          cardLeft + metrics.cardWidth > -metrics.viewportWidth / 2;
        const focused = document.activeElement === element;
        const accessible = visible || focused;
        const tabIndex = accessible ? 0 : -1;
        if (element.tabIndex !== tabIndex) element.tabIndex = tabIndex;
        const hidden = element.getAttribute("aria-hidden");
        if (accessible && hidden !== null) {
          element.removeAttribute("aria-hidden");
        } else if (!accessible && hidden !== "true") {
          element.setAttribute("aria-hidden", "true");
        }
      }
    };

    const updateMetrics = () => {
      const firstGroup = groups[0];
      const firstCard = firstGroup?.querySelector<HTMLElement>("[data-stream-card]");
      const nextCard = firstGroup?.querySelectorAll<HTMLElement>("[data-stream-card]")[1];
      if (!firstGroup || !firstCard) return;

      const oldLoopWidth = metrics.loopWidth;
      const oldStride = metrics.stride;
      const gap = Number.parseFloat(getComputedStyle(firstGroup).columnGap) || 0;
      const newStride = nextCard
        ? nextCard.offsetLeft - firstCard.offsetLeft
        : firstCard.offsetWidth + gap;
      const newLoopWidth = firstGroup.offsetWidth;
      const newViewportWidth = stream.clientWidth;
      if (newLoopWidth <= 0 || newStride <= 0 || newViewportWidth <= 0) return;

      if (oldLoopWidth > 0) {
        motion.phase = wrap(
          (motion.phase / oldLoopWidth) * newLoopWidth,
          newLoopWidth
        );
        if (oldStride > 0) {
          const strideScale = newStride / oldStride;
          motion.manualOffset *= strideScale;
          motion.manualStart *= strideScale;
          motion.manualTarget *= strideScale;
        }
      }

      metrics.viewportWidth = newViewportWidth;
      metrics.cardWidth = firstCard.offsetWidth;
      metrics.stride = newStride;
      metrics.loopWidth = newLoopWidth;
      render(false);
    };

    const needsFrame = () =>
      inViewport &&
      pageVisible &&
      motionPreferenceResolved &&
      !motion.dragging;

    const stop = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      render(false);
    };

    const animate = (time: number) => {
      frameId = null;
      if (!needsFrame()) return;

      const delta = Math.max(0, Math.min(time - motion.lastTime, 40));
      motion.lastTime = time;
      const autoStridesPerMs = prefersReducedMotion
        ? REDUCED_MOTION_AUTO_STRIDES_PER_MS
        : AUTO_STRIDES_PER_MS;
      motion.phase = wrap(
        motion.phase + delta * metrics.stride * autoStridesPerMs,
        metrics.loopWidth
      );

      if (motion.manualElapsed < KEY_NUDGE_MS) {
        motion.manualElapsed = Math.min(
          KEY_NUDGE_MS,
          motion.manualElapsed + delta
        );
        const progress = motion.manualElapsed / KEY_NUDGE_MS;
        const eased = easeOutCubic(progress);
        motion.manualOffset =
          motion.manualStart +
          (motion.manualTarget - motion.manualStart) * eased;

        if (progress >= 1) {
          motion.phase = wrap(
            motion.phase + motion.manualTarget,
            metrics.loopWidth
          );
          motion.manualStart = 0;
          motion.manualTarget = 0;
          motion.manualOffset = 0;
          motion.manualElapsed = KEY_NUDGE_MS;
        }
      }

      const tiltFollow = 1 - Math.exp(-delta / 210);
      motion.tiltX += (motion.targetTiltX - motion.tiltX) * tiltFollow;
      motion.tiltY += (motion.targetTiltY - motion.tiltY) * tiltFollow;
      if (Math.abs(motion.targetTiltX - motion.tiltX) < 0.005) {
        motion.tiltX = motion.targetTiltX;
      }
      if (Math.abs(motion.targetTiltY - motion.tiltY) < 0.005) {
        motion.tiltY = motion.targetTiltY;
      }

      if (
        !prefersReducedMotion ||
        time - lastRenderedAt >= REDUCED_MOTION_FRAME_INTERVAL_MS
      ) {
        lastRenderedAt = time;
        render(true);
      }
      if (needsFrame()) frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (frameId !== null || !needsFrame() || metrics.loopWidth <= 0) return;
      motion.lastTime = performance.now();
      lastRenderedAt = motion.lastTime;
      frameId = requestAnimationFrame(animate);
    };

    renderRef.current = render;
    startRef.current = start;

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) start();
      else stop();
    };

    const rect = stream.getBoundingClientRect();
    inViewport = rect.bottom > 0 && rect.top < window.innerHeight;
    const intersectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inViewport = Boolean(entry?.isIntersecting);
              if (inViewport) start();
              else stop();
            },
            { threshold: 0.01 }
          )
        : null;
    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(updateMetrics)
        : null;

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", updateMetrics);
    intersectionObserver?.observe(stream);
    resizeObserver?.observe(stream);
    if (groups[0]) resizeObserver?.observe(groups[0]);
    if (!intersectionObserver) inViewport = true;
    updateMetrics();
    render(false);
    start();

    return () => {
      stop();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", updateMetrics);
      track.dataset.motionFrame = "false";
      if (renderRef.current === render) renderRef.current = null;
      if (startRef.current === start) startRef.current = null;
    };
  }, [motionPreferenceResolved, prefersReducedMotion, items.length]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    if (suppressClickTimerRef.current !== null) {
      window.clearTimeout(suppressClickTimerRef.current);
      suppressClickTimerRef.current = null;
    }

    const motion = motionRef.current;
    draggedCardRef.current = false;
    motion.pointerId = event.pointerId;
    motion.pointerX = event.clientX;
    motion.pointerStartX = event.clientX;
    motion.dragging = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const motion = motionRef.current;
    const metrics = metricsRef.current;
    const rect = event.currentTarget.getBoundingClientRect();

    if (motion.pointerId === event.pointerId) {
      const deltaX = event.clientX - motion.pointerX;
      motion.pointerX = event.clientX;

      if (
        !motion.dragging &&
        Math.abs(event.clientX - motion.pointerStartX) > DRAG_THRESHOLD_PX
      ) {
        draggedCardRef.current = true;
        motion.dragging = true;
        motion.manualStart = 0;
        motion.manualTarget = 0;
        motion.manualOffset = 0;
        motion.manualElapsed = KEY_NUDGE_MS;
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      if (!motion.dragging || metrics.loopWidth <= 0) return;
      motion.phase = wrap(motion.phase + deltaX, metrics.loopWidth);
      renderRef.current?.(true);
      return;
    }

    if (
      event.pointerType === "mouse" &&
      motionPreferenceResolved &&
      !prefersReducedMotion
    ) {
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const y = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      motion.targetTiltX = -y * 1.5;
      motion.targetTiltY = x * 2.4;
      startRef.current?.();
    }
  };

  const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
    const motion = motionRef.current;
    if (motion.pointerId !== event.pointerId) return;

    const wasDragging = motion.dragging;
    motion.pointerId = null;
    motion.dragging = false;

    if (wasDragging) {
      suppressClickTimerRef.current = window.setTimeout(() => {
        draggedCardRef.current = false;
        suppressClickTimerRef.current = null;
      }, 160);
      renderRef.current?.(false);
    } else {
      draggedCardRef.current = false;
    }
    startRef.current?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const metrics = metricsRef.current;
    if (metrics.loopWidth <= 0 || metrics.stride <= 0) return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? -1 : 1;
    const delta = direction * metrics.stride;
    const motion = motionRef.current;

    if (!motionPreferenceResolved || prefersReducedMotion) {
      motion.phase = wrap(motion.phase + delta, metrics.loopWidth);
      motion.manualOffset = 0;
      renderRef.current?.(false);
      return;
    }

    const progress = clamp(motion.manualElapsed / KEY_NUDGE_MS, 0, 1);
    const currentOffset =
      motion.manualStart +
      (motion.manualTarget - motion.manualStart) * easeOutCubic(progress);
    motion.manualStart = currentOffset;
    motion.manualTarget = currentOffset + delta;
    motion.manualOffset = currentOffset;
    motion.manualElapsed = 0;
    startRef.current?.();
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    const motion = motionRef.current;
    if (motion.dragging || event.pointerType !== "mouse") return;
    motion.targetTiltX = 0;
    motion.targetTiltY = 0;
    startRef.current?.();
  };

  useEffect(
    () => () => {
      if (suppressClickTimerRef.current !== null) {
        window.clearTimeout(suppressClickTimerRef.current);
      }
    },
    []
  );

  return (
    <div
      ref={streamRef}
      className="hero-stream"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured businesses"
      aria-describedby="hero-stream-hint"
      aria-live="off"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
      onLostPointerCapture={finishPointer}
      onPointerLeave={handlePointerLeave}
      onDragStart={(event) => event.preventDefault()}
      onKeyDown={handleKeyDown}
      onClickCapture={(event) => {
        if (!draggedCardRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        draggedCardRef.current = false;
        if (suppressClickTimerRef.current !== null) {
          window.clearTimeout(suppressClickTimerRef.current);
          suppressClickTimerRef.current = null;
        }
      }}
    >
      <span id="hero-stream-hint" className="sr-only">
        Featured shop cards glide from left to right. Drag horizontally or use the left and right arrow keys to browse, then select a card to open its shop page.
      </span>
      <div className="hero-stream__aura" aria-hidden="true" />
      <div className="hero-stream__ring" aria-hidden="true" />
      <div className="hero-stream__scene">
        <div ref={trackRef} className="hero-stream__track">
          {Array.from({ length: COPY_COUNT }, (_, copy) => (
            <div
              key={`copy-${copy}`}
              className="hero-stream__group"
              data-stream-group
              aria-hidden="false"
            >
              {items.map((item, index) => {
                const distanceInCards = Math.abs(
                  (copy - 1) * items.length + index
                );
                const initialDepth = smoothstep(
                  Math.max(0, 1 - distanceInCards / 4)
                );
                const style = {
                  "--stream-card-scale": String(0.72 + initialDepth * 0.34),
                  "--stream-card-opacity": String(0.2 + initialDepth * 0.8),
                  "--stream-card-z": `${(-250 + initialDepth * 330).toFixed(2)}px`,
                  "--stream-card-y": "0px",
                  "--stream-card-yaw": "0deg",
                } as CSSProperties;

                return (
                  <Link
                    key={`${copy}-${item.id}`}
                    href={`/explore-shops/${item.slug}`}
                    data-stream-card
                    data-stream-copy={copy}
                    data-stream-index={index}
                    data-spotlight={distanceInCards === 0 ? "true" : "false"}
                    aria-label={`Visit ${item.name}`}
                    className="hero-stream__card group"
                    style={style}
                  >
                    <div className="hero-stream__face">
                      <div className="hero-stream__image-wrap">
                        <Image
                          src={item.coverArt}
                          alt=""
                          fill
                          sizes="(max-width: 639px) 42vw, (max-width: 1023px) 30vw, (max-width: 1350px) 18.5vw, 230px"
                          loading={
                            (copy === 1 && index <= 3) ||
                            (copy === 0 && index === items.length - 1)
                              ? "eager"
                              : "lazy"
                          }
                          decoding="async"
                          className="hero-stream__image"
                        />
                      </div>
                      <div className="hero-stream__content">
                        <div className="hero-stream__meta">
                          <TypeBadge
                            type={item.type}
                            className="hero-stream__badge"
                          />
                          <RatingSummary
                            className="hero-stream__rating--full"
                            rating={item.rating}
                            reviewCount={item.reviewCount}
                            size={11}
                          />
                          <span className="hero-stream__rating--compact">
                            <Rating value={item.rating} size={10} showValue />
                          </span>
                        </div>
                        <h2 className="mt-2 font-display text-lg font-semibold text-ink-950 transition-colors group-hover:text-pine-700">
                          {item.name}
                        </h2>
                        <p className="mt-0.5 line-clamp-1 text-xs text-ink-500">
                          {item.categoryName} · {item.tagline}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
