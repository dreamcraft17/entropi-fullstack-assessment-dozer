"use client";

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

  return (
    <aside
      className="fixed left-0 top-0 z-20 hidden h-screen w-52 flex-col border-r py-6 transition-[background-color,border-color] sm:flex"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        paddingTop: "5rem",
      }}
    >
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
    </aside>
  );
}
