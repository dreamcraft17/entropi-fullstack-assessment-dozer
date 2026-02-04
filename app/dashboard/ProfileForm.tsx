"use client";

import { useState } from "react";

type User = { name: string; bio: string | null; avatar: string | null };

export function ProfileForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: User;
  onClose: () => void;
  onSaved: (user: User) => void;
}) {
  const [name, setName] = useState(initial.name);
  const [bio, setBio] = useState(initial.bio ?? "");
  const [avatar, setAvatar] = useState(initial.avatar ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio: bio || null, avatar: avatar || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Update failed");
      }
      const user = await res.json();
      onSaved({ name: user.name, bio: user.bio, avatar: user.avatar });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md rounded-2xl p-6 shadow-lg transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        <h3 className="font-display mb-1 text-xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
          Edit profile
        </h3>
        <p className="mb-5 text-sm" style={{ color: "var(--text-muted)" }}>
          Update your name, bio, and avatar URL.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-focus w-full rounded-xl border px-4 py-3 outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
            />
          </div>
          <div>
            <label htmlFor="profile-bio" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Bio
            </label>
            <textarea
              id="profile-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="A short bio for your profile"
              className="input-focus w-full rounded-xl border px-4 py-3 outline-none resize-none"
              style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
            />
          </div>
          <div>
            <label htmlFor="profile-avatar" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Avatar URL
            </label>
            <input
              id="profile-avatar"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
              className="input-focus w-full rounded-xl border px-4 py-3 outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
            />
          </div>
        </div>
        {error && (
          <p className="mt-3 rounded-lg px-3 py-2 text-sm" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
            {error}
          </p>
        )}
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary rounded-xl px-5 py-2.5 font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-5 py-2.5 font-medium transition hover:opacity-90"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
