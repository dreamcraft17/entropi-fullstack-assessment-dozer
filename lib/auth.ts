import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "link-in-bio-dev-secret-change-in-production"
);

export type JWTPayload = { userId: string; email: string };

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = cookies(); // ✅ no await
  const token = cookieStore.get("auth")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setAuthCookie(payload: JWTPayload) {
  const token = await signToken(payload);
  const cookieStore = cookies(); // ✅ no await
  cookieStore.set("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export function clearAuthCookie() {
  cookies().delete("auth"); // ✅ no then
}
