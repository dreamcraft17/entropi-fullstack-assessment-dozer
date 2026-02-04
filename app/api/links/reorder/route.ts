import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { ids } = body; // array of link ids in new order
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "ids array is required" },
        { status: 400 }
      );
    }
    await prisma.$transaction(
      ids.map((id: string, index: number) =>
        prisma.link.updateMany({
          where: { id, userId: session.userId },
          data: { order: index },
        })
      )
    );
    const links = await prisma.link.findMany({
      where: { userId: session.userId },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(links);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Reorder failed" }, { status: 500 });
  }
}
