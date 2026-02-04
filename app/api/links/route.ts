import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const links = await prisma.link.findMany({
    where: { userId: session.userId },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(links);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { title, url } = body;
    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and URL are required" },
        { status: 400 }
      );
    }
    const maxOrder = await prisma.link.aggregate({
      where: { userId: session.userId },
      _max: { order: true },
    });
    const order = (maxOrder._max.order ?? -1) + 1;
    const link = await prisma.link.create({
      data: { title, url, userId: session.userId, order },
    });
    return NextResponse.json(link);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}
