import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardContent } from "../DashboardContent";

export default async function LinksPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user, links] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true, bio: true, avatar: true },
    }),
    prisma.link.findMany({
      where: { userId: session.userId },
      orderBy: { order: "asc" },
    }),
  ]);

  if (!user) redirect("/login");

  return (
    <DashboardContent
      user={user}
      links={links}
      profileUrl={`/p/${session.userId}`}
    />
  );
}
