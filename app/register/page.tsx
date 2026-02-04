"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12 transition-colors duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="font-display mb-8 block text-center text-2xl font-bold tracking-tight transition-colors duration-200"
          style={{ color: "var(--text)" }}
        >
          Link in Bio
        </Link>
        <div
          className="card rounded-2xl p-8 shadow-lg transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <h2 className="font-display mb-2 text-2xl font-semibold" style={{ color: "var(--text)" }}>
            Create your account
          </h2>
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            One link for all your links. Free and easy.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="input-focus w-full rounded-xl border px-4 py-3 outline-none"
                style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="input-focus w-full rounded-xl border px-4 py-3 outline-none"
                style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="input-focus w-full rounded-xl border px-4 py-3 outline-none"
                style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
              />
            </div>
            {error && (
              <p className="rounded-lg px-3 py-2 text-sm" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full rounded-xl py-3.5 font-semibold shadow-md disabled:opacity-50"
            >
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold underline hover:no-underline" style={{ color: "var(--accent)" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
