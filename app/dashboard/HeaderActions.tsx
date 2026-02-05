"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeColorPicker } from "@/app/components/ThemeColorPicker";
import { ThemeToggle } from "@/app/components/ThemeToggle";

type Props = {
  userId: string;
  logout: () => Promise<void>;
};

export function HeaderActions({ userId, logout }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="flex items-center gap-2 sm:gap-3" ref={ref}>
      {/* Desktop: full row */}
      <div className="hidden sm:flex sm:items-center sm:gap-3">
        <Link
          href={`/p/${userId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-2 text-sm font-semibold transition-[color,opacity] duration-200 hover:opacity-90"
          style={{ color: "var(--accent)" }}
        >
          View profile
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-xl border px-4 py-2 text-sm font-medium transition-[border-color,color,opacity] duration-200 hover:opacity-90"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Logout
          </button>
        </form>
        <div className="flex items-center gap-2">
          <ThemeColorPicker />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile: single menu button + dropdown */}
      <div className="relative sm:hidden">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border transition-opacity hover:opacity-90"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="text-lg leading-none" aria-hidden>⋯</span>
        </button>
        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border py-2 shadow-lg"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <Link
              href={`/p/${userId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
              style={{ color: "var(--accent)" }}
            >
              View profile
            </Link>
            <form action={logout} onSubmit={() => setOpen(false)}>
              <button
                type="submit"
                className="block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:opacity-90"
                style={{ color: "var(--text)" }}
              >
                Logout
              </button>
            </form>
            <div className="border-t px-4 py-2" style={{ borderColor: "var(--border)" }}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Theme
              </p>
              <div className="flex items-center gap-2">
                <ThemeColorPicker />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
