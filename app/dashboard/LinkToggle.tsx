"use client";

import { useState } from "react";

export function LinkToggle({
  linkId,
  active,
  onToggle,
}: {
  linkId: string;
  active: boolean;
  onToggle: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/links/${linkId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      if (res.ok) onToggle();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className="relative h-6 w-11 rounded-full transition-[background-color,opacity] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] disabled:opacity-50"
      style={{ background: active ? "#22c55e" : "var(--border)" }}
      aria-label={active ? "Disable link" : "Enable link"}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-[left,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          active ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}
