import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user, linkCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.userId },
      select: { name: true },
    }),
    prisma.link.count({ where: { userId: session.userId } }),
  ]);

  if (!user) redirect("/login");

  const quickLinks = [
    { href: "/dashboard/links", label: "Bio Pages", icon: "📱" },
    { href: "/dashboard/short-links", label: "Short Links", icon: "🔗" },
    { href: "/dashboard/files", label: "Transfer Files", icon: "📃" },
    { href: "/dashboard/vcards", label: "Share vCards", icon: "👤" },
    { href: "/dashboard/events", label: "Event Links", icon: "📆" },
    { href: "/dashboard/static", label: "Host HTML", icon: "🧑‍💻" },
    { href: "/dashboard/qr-codes", label: "QR Codes", icon: "🤳" },
    { href: "/dashboard/tools", label: "Web Tools", icon: "🛠️" },
    { href: "/dashboard/analytics", label: "Analytics", icon: "📈" },
    { href: "/dashboard/splash", label: "Splash Pages", icon: "⏱️" },
    { href: "/dashboard/pixels", label: "Tracking Pixels", icon: "📌" },
    { href: "/dashboard/domains", label: "Custom Domains", icon: "🌐" },
    { href: "/dashboard/projects", label: "Projects", icon: "📁" },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2
          className="font-display text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: "var(--text)" }}
        >
          Hi, {user.name}
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Your link-in-bio dashboard. Manage bio pages, short links, files, and more.
        </p>
      </section>

      <section
        className="card grid gap-4 rounded-2xl p-6 shadow-md sm:grid-cols-3"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div>
          <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
            {linkCount}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Bio links
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            —
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Short links
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            —
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            QR codes
          </p>
        </div>
      </section>

      <section>
        <h3
          className="mb-4 font-display text-lg font-semibold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Quick access
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-xl border p-4 transition-[border-color,opacity] hover:opacity-90"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span className="text-xl" aria-hidden>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
