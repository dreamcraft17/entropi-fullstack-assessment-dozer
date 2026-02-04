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
    const { name, bio, avatar } = body;
    const data: { name?: string; bio?: string; avatar?: string } = {};
    if (typeof name === "string") data.name = name;
    if (typeof bio === "string") data.bio = bio;
    if (typeof avatar === "string") data.avatar = avatar;
    const user = await prisma.user.update({
      where: { id: session.userId },
      data,
      select: { id: true, email: true, name: true, bio: true, avatar: true },
    });
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
