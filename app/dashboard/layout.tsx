import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logout } from "@/app/actions/auth";
import { DashboardSidebar } from "./DashboardSidebar";
import { HeaderActions } from "./HeaderActions";

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
        className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b px-4 py-3 pl-14 pr-4 transition-[background-color,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)] sm:pl-56 sm:py-4 sm:pr-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <h1 className="min-w-0 truncate font-display text-lg font-bold tracking-tight sm:text-xl">Dashboard</h1>
        <HeaderActions userId={session.userId} logout={logout} />
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8 pl-4 pr-4 sm:pl-56 sm:pr-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
