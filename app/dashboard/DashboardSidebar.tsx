"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuGroups = [
  {
    label: "My Linktree",
    items: [
      { href: "/dashboard/links", label: "Links", icon: "🔗" },
      { href: "/dashboard/shop", label: "Shop", icon: "🛍️" },
      { href: "/dashboard/design", label: "Design", icon: "🎨" },
    ],
  },
  {
    label: "Earn",
    items: [
      { href: "/dashboard", label: "Overview", icon: "📊" },
      { href: "/dashboard/earnings", label: "Earnings", icon: "💰" },
      { href: "/dashboard/audience", label: "Audience", icon: "👥" },
      { href: "/dashboard/insights", label: "Insights", icon: "📈" },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/dashboard/social-planner", label: "Social planner", icon: "🗓️" },
      { href: "/dashboard/instagram-auto-reply", label: "Instagram auto-reply", icon: "💬" },
      { href: "/dashboard/short-links", label: "Link shortener", icon: "✂️" },
      { href: "/dashboard/post-ideas", label: "Post ideas", icon: "💡" },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 pt-4">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <p
              className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive ? "text-white" : "hover:opacity-90"
                      }`}
                      style={
                        isActive
                          ? { background: "var(--accent)", color: "white" }
                          : { color: "var(--text)" }
                      }
                    >
                      <span className="text-base" aria-hidden>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </nav>
  );

  return (
    <>
      {/* Hamburger: only on mobile */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg border sm:hidden"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        <span className="text-xl" aria-hidden>{mobileOpen ? "✕" : "☰"}</span>
      </button>
      {/* Backdrop when sidebar open on mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 sm:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}
      {/* Sidebar: drawer on mobile, fixed on desktop */}
      <aside
        className={`fixed left-0 top-0 z-20 flex h-screen w-52 flex-col border-r py-6 transition-[transform] duration-200 ease-out sm:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
          paddingTop: "5rem",
        }}
      >
        {navContent}
      </aside>
    </>
  );
}
