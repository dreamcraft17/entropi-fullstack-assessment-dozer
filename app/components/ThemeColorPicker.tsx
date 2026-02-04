"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "link-in-bio-accent";
export type AccentId = "terracotta" | "blue" | "green" | "purple";

const ACCENTS: { id: AccentId; label: string; color: string }[] = [
  { id: "terracotta", label: "Terracotta", color: "#c45c3e" },
  { id: "blue", label: "Blue", color: "#2563eb" },
  { id: "green", label: "Green", color: "#059669" },
  { id: "purple", label: "Purple", color: "#7c3aed" },
];

export function ThemeColorPicker() {
  const [accent, setAccent] = useState<AccentId>("terracotta");
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AccentId | null;
    const current = (document.documentElement.getAttribute("data-accent") as AccentId) || "terracotta";
    const value = stored && ACCENTS.some((a) => a.id === stored) ? stored : "terracotta";
    setAccent(value);
    if (!document.documentElement.getAttribute("data-accent")) {
      document.documentElement.setAttribute("data-accent", "terracotta");
    }
    setMounted(true);
  }, []);

  function select(id: AccentId) {
    document.documentElement.setAttribute("data-accent", id);
    localStorage.setItem(STORAGE_KEY, id);
    setAccent(id);
  }

  if (!mounted) {
    return (
      <div className="flex h-10 items-center gap-1 rounded-full border px-2" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }} aria-hidden />
    );
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border p-1.5 transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
      style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow-sm)" }}
      role="group"
      aria-label="Pilih warna aksen"
    >
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => select(a.id)}
          className="h-7 w-7 rounded-full border-2 transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]"
          style={{
            background: a.color,
            borderColor: accent === a.id ? "var(--text)" : "transparent",
            boxShadow: accent === a.id ? "0 0 0 1px var(--text)" : undefined,
          }}
          title={a.label}
          aria-label={`Warna ${a.label}`}
          aria-pressed={accent === a.id}
        />
      ))}
    </div>
  );
}
