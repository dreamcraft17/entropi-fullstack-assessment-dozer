import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InsightsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const links = await prisma.link.findMany({
    where: { userId: session.userId },
    orderBy: [{ clicks: "desc" }, { order: "asc" }],
    select: { id: true, title: true, clicks: true, active: true },
  });

  const mostClicked = links[0];
  const withClicks = links.filter((l) => (l.clicks ?? 0) > 0);
  const leastClicked = withClicks[withClicks.length - 1];
  const zeroClickLinks = links.filter((l) => (l.clicks ?? 0) === 0);

  return (
    <div className="space-y-8">
      <section>
        <h2
          className="font-display text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: "var(--text)" }}
        >
          Quick insights
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          A couple of simple observations based on the click counts you already see on the Links page.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div
          className="rounded-2xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Top performer
          </p>
          {mostClicked ? (
            <>
              <p className="mt-2 text-sm font-semibold" style={{ color: "var(--text)" }}>
                {mostClicked.title}
              </p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {mostClicked.clicks} clicks
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              No links yet.
            </p>
          )}
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Under‑used link
          </p>
          {leastClicked ? (
            <>
              <p className="mt-2 text-sm font-semibold" style={{ color: "var(--text)" }}>
                {leastClicked.title}
              </p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {leastClicked.clicks} clicks
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              No low‑performing links yet.
            </p>
          )}
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Links with 0 clicks
          </p>
          <p className="mt-2 text-2xl font-bold" style={{ color: "var(--text)" }}>
            {zeroClickLinks.length}
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            Consider moving them up, rewriting the title, or turning them off.
          </p>
        </div>
      </section>

      {zeroClickLinks.length > 0 && (
        <section>
          <h3
            className="mb-3 font-display text-lg font-semibold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Links with no clicks yet
          </h3>
          <ul className="space-y-2">
            {zeroClickLinks.slice(0, 6).map((link) => (
              <li
                key={link.id}
                className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <span className="truncate" style={{ color: "var(--text)" }}>
                  {link.title}
                </span>
                {!link.active && (
                  <span
                    className="ml-3 flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ background: "var(--bg)", color: "var(--text-muted)" }}
                  >
                    inactive
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
