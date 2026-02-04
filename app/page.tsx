import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle gradient orbs */}
      <div
        className="pointer-events-none absolute -left-1/4 top-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl transition-colors duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{ background: "var(--accent-soft)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-25 blur-3xl transition-colors duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{ background: "var(--teal-soft)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-lg flex-1 flex-col items-center justify-center text-center">
        <span
          className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
        >
          One link for everything
        </span>
        <h1
          className="font-display mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: "var(--text)" }}
        >
          Link in Bio
        </h1>
        <p className="mb-10 max-w-md text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Share your links in one place. Simple, fast, and yours—no credit card needed.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold shadow-lg"
          >
            Get started free
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border-2 px-8 py-4 font-semibold transition-[color,border-color,opacity,transform] duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Log in
          </Link>
        </div>
      </div>

      <p className="relative z-10 pb-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
        Free to use · Mobile-friendly · No credit card
      </p>
    </div>
  );
}
