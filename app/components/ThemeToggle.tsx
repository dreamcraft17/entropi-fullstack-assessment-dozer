"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "link-in-bio-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
    const current = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setTheme(stored || current);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  }

  if (!mounted) {
    return (
      <div
        className="h-10 w-10 rounded-full border"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border transition-[border-color,background-color,color,box-shadow,opacity,transform] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:opacity-90 hover:scale-105 active:scale-95"
      style={{ borderColor: "var(--border)", background: "var(--bg-card)", color: "var(--text)", boxShadow: "var(--shadow-sm)" }}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Mode gelap" : "Mode terang"}
    >
      {theme === "light" ? (
        <span className="text-lg" aria-hidden>🌙</span>
      ) : (
        <span className="text-lg" aria-hidden>☀️</span>
      )}
    </button>
  );
}
