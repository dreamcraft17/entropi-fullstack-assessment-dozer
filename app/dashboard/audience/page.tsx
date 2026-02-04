import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AudiencePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [aggregates, links] = await Promise.all([
    prisma.link.aggregate({
      where: { userId: session.userId },
      _sum: { clicks: true },
      _count: true,
    }),
    prisma.link.findMany({
      where: { userId: session.userId },
      orderBy: { clicks: "desc" },
      select: { id: true, title: true, clicks: true, active: true },
    }),
  ]);

  const totalLinks = aggregates._count;
  const totalClicks = aggregates._sum.clicks ?? 0;
  const activeLinks = links.filter((l) => l.active).length;
  const inactiveLinks = totalLinks - activeLinks;

  const topLinks = links.slice(0, 5);

  return (
    <div className="space-y-8">
      <section>
        <h2
          className="font-display text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: "var(--text)" }}
        >
          Audience overview
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Very lightweight view of how people are interacting with your links,
          based on the click counter that powers the Links page.
        </p>
      </section>

      <section
        className="grid gap-4 rounded-2xl border p-6 sm:grid-cols-3"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Total clicks
          </p>
          <p className="mt-1 text-2xl font-bold" style={{ color: "var(--accent)" }}>
            {totalClicks}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Active links
          </p>
          <p className="mt-1 text-2xl font-bold" style={{ color: "var(--text)" }}>
            {activeLinks}
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {inactiveLinks} inactive
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Avg. clicks per link
          </p>
          <p className="mt-1 text-2xl font-bold" style={{ color: "var(--text)" }}>
            {totalLinks === 0 ? "—" : (totalClicks / totalLinks).toFixed(1)}
          </p>
        </div>
      </section>

      <section>
        <h3
          className="mb-3 font-display text-lg font-semibold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Top links by clicks
        </h3>
        {topLinks.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No clicks yet. Share your public profile and come back later to see which links people use most.
          </p>
        ) : (
          <ul className="space-y-2">
            {topLinks.map((link, index) => (
              <li
                key={link.id}
                className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate" style={{ color: "var(--text)" }}>
                    {link.title}
                  </span>
                  {!link.active && (
                    <span className="flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ background: "var(--bg)", color: "var(--text-muted)" }}>
                      inactive
                    </span>
                  )}
                </div>
                <span className="ml-4 flex-shrink-0 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  {link.clicks} clicks
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
