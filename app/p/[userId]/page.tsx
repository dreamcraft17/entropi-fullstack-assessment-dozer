import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, bio: true, avatar: true },
  });
  if (!user) return null;
  const links = await prisma.link.findMany({
    where: { userId, active: true },
    orderBy: { order: "asc" },
    select: { id: true, title: true, url: true },
  });
  return { ...user, links };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const profile = await getProfile(userId);
  if (!profile) notFound();

  return (
    <div className="min-h-screen px-4 py-12 transition-colors duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)] sm:py-16" style={{ background: "var(--bg)" }}>
      <main className="mx-auto max-w-md">
        {/* User avatar & bio */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={120}
                height={120}
                className="h-28 w-28 rounded-full object-cover shadow-lg sm:h-32 sm:w-32"
                style={{ border: "4px solid var(--border)", boxShadow: "var(--shadow-lg)" }}
                unoptimized
              />
            ) : (
              <div
                className="flex h-28 w-28 items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg sm:h-32 sm:w-32 sm:text-4xl"
                style={{ background: "var(--accent)", border: "4px solid var(--border)", boxShadow: "var(--shadow-lg)" }}
              >
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="font-display mb-2 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
            {profile.name}
          </h1>
          {profile.bio && (
            <p className="max-w-sm text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* List of clickable links */}
        <ul className="space-y-3">
          {profile.links?.map((link: { id: string; title: string; url: string }) => (
            <li key={link.id}>
              <a
                href={`/l/${link.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left font-semibold"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <span className="truncate">{link.title}</span>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:scale-110" style={{ background: "var(--accent-soft)", color: "var(--accent)" }} aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        {(!profile.links || profile.links.length === 0) && (
          <p className="py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No links yet.
          </p>
        )}
      </main>
    </div>
  );
}
