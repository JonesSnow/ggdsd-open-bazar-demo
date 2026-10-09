"use client";

import type { ReactNode } from "react";
import { cn } from "@/src/utils/cn";
import { useReveal } from "@/src/hooks";
import { Icon, type IconName } from "./icon";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "footer";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}

type HeadingLevel = 1 | 2 | 3;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  level = 2,
  action,
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  level?: HeadingLevel;
  action?: { label: string; href: string; icon?: IconName };
  className?: string;
  id?: string;
}) {
  const Tag = `h${level}` as const;
  const heading = (
    <>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-pine-700">
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display text-3xl font-medium tracking-heading text-ink-950 text-balance sm:text-4xl",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-ink-600",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </>
  );

  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        align === "center" && "text-center",
        align === "left" && action && "flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
        className
      )}
    >
      {heading}
      {action && align === "left" && (
        <a
          href={action.href}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-paper-100"
          )}
        >
          {action.label}
          <Icon name={action.icon ?? "arrow-right"} size={18} />
        </a>
      )}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, className: revealClass, style } = useReveal<HTMLDivElement>({
    delay,
  });
  return (
    <div ref={ref} className={cn(revealClass, className)} style={style}>
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("pb-10 sm:pb-14", className)}>
      <Container>
        {eyebrow && (
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-pine-700">
            <Icon name="compass" size={14} />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-medium tracking-heading text-ink-950 text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
            {description}
          </p>
        )}
      </Container>
    </header>
  );
}
