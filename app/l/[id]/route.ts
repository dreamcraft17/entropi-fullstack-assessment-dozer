import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const link = await prisma.link.findUnique({
    where: { id, active: true },
    select: { url: true },
  });
  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }
  await prisma.link.update({
    where: { id },
    data: { clicks: { increment: 1 } },
  });
  return NextResponse.redirect(link.url, 302);
}
