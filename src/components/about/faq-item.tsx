"use client";

import { useState } from "react";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";
import { Card } from "@/src/components/ui/card";

export function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card variant="outlined" className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-paper-100/60"
      >
        <span className="font-display text-lg font-semibold text-ink-950">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pine-50 text-pine-700 transition-transform duration-300",
            open && "rotate-180"
          )}
        >
          <Icon name="chevron-down" size={16} />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-ink-600">
            {answer}
          </p>
        </div>
      </div>
    </Card>
  );
}
