import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getLinkAndCheck(id: string, userId: string) {
  const link = await prisma.link.findUnique({ where: { id } });
  if (!link || link.userId !== userId) return null;
  return link;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const link = await getLinkAndCheck(id, session.userId);
  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }
  try {
    const body = await request.json();
    const data: { title?: string; url?: string; active?: boolean; order?: number } = {};
    if (typeof body.title === "string") data.title = body.title;
    if (typeof body.url === "string") data.url = body.url;
    if (typeof body.active === "boolean") data.active = body.active;
    if (typeof body.order === "number") data.order = body.order;
    const updated = await prisma.link.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const link = await getLinkAndCheck(id, session.userId);
  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }
  await prisma.link.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
