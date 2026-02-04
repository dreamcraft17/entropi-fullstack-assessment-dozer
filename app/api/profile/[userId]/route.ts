import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, bio: true, avatar: true },
  });
  if (!user) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  const links = await prisma.link.findMany({
    where: { userId, active: true },
    orderBy: { order: "asc" },
    select: { id: true, title: true, url: true },
  });
  return NextResponse.json({ ...user, links });
}
