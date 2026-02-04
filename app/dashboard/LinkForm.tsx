"use client";

import { useState } from "react";

type LinkItem = { id: string; title: string; url: string };

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}

export function LinkForm({
  initial,
  onCancel,
  onSaved,
}: {
  initial?: LinkItem;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const urlToSave = normalizeUrl(url);
    try {
      if (initial) {
        const res = await fetch(`/api/links/${initial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, url: urlToSave }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Update failed");
        }
      } else {
        const res = await fetch("/api/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, url: urlToSave }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Create failed");
        }
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="link-title" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          Title
        </label>
        <input
          id="link-title"
          type="text"
          placeholder="My link"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-focus w-full rounded-xl border px-4 py-3 outline-none"
          style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
        />
      </div>
      <div>
        <label htmlFor="link-url" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          URL
        </label>
        <input
          id="link-url"
          type="text"
          placeholder="www.example.com or https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="input-focus w-full rounded-xl border px-4 py-3 outline-none"
          style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
        />
      </div>
      {error && (
        <p className="rounded-lg px-3 py-2 text-sm" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
          {error}
        </p>
      )}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary rounded-xl px-5 py-2.5 font-semibold shadow-md disabled:opacity-50"
        >
          {loading ? "Saving…" : initial ? "Save" : "Add link"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-5 py-2.5 font-medium transition hover:opacity-90"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
