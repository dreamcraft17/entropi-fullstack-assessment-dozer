import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logout } from "@/app/actions/auth";
import { DashboardSidebar } from "./DashboardSidebar";
import { ThemeColorPicker } from "@/app/components/ThemeColorPicker";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  return (
    <div className="min-h-screen transition-colors duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <DashboardSidebar />
      <header
        className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-4 py-4 pl-4 pr-4 transition-[background-color,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)] sm:pl-56 sm:pr-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <h1 className="font-display text-lg font-bold tracking-tight sm:text-xl">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link
            href={`/p/${session.userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-sm font-semibold transition-[color,opacity] duration-200 hover:opacity-90"
            style={{ color: "var(--accent)" }}
          >
            View profile
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-xl border px-4 py-2 text-sm font-medium transition-[border-color,color,opacity] duration-200 hover:opacity-90"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Logout
            </button>
          </form>
          <div className="flex items-center gap-2">
            <ThemeColorPicker />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8 pl-4 pr-4 sm:pl-56 sm:pr-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
