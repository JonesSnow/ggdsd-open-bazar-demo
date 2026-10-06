"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/src/components/ui/icon";
import { AdminNav, AdminDemoNotice } from "./admin-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen">
      <AdminNav mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />

      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-dropdown border-b border-paper-200 bg-paper-50/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open admin menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-paper-100 lg:hidden"
              >
                <Icon name="menu" size={20} />
              </button>
              <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-sm text-ink-500 sm:flex">
                <Link href="/admin" className="hover:text-pine-700 hover:underline underline-offset-4">
                  Admin
                </Link>
                <Icon name="chevron-right" size={13} className="text-ink-300" />
                <span className="font-medium text-ink-800">
                  Demo workspace
                </span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <AdminDemoNotice />
              <span className="hidden items-center gap-2 rounded-full bg-paper-100 px-3 py-1.5 text-xs font-medium text-ink-600 sm:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pine-600" />
                </span>
                Coordinator view
              </span>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </main>

        <footer className="border-t border-paper-200 py-6">
          <p className="mx-auto max-w-6xl px-4 text-center text-xs text-ink-400 sm:px-6 lg:px-8">
            Open Bazar admin demo — a frontend simulation for institutional
            review. No authentication, no database, no real listings are
            affected.
          </p>
        </footer>
      </div>
    </div>
  );
}
