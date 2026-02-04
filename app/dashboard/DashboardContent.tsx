"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { LinkForm } from "./LinkForm";
import { ProfileForm } from "./ProfileForm";
import { SortableLinkCard } from "./SortableLinkCard";

type User = { id: string; name: string; bio: string | null; avatar: string | null };
type LinkItem = { id: string; title: string; url: string; active: boolean; order: number; clicks?: number };

export function DashboardContent({
  user,
  links: initialLinks,
  profileUrl,
}: {
  user: User;
  links: LinkItem[];
  profileUrl: string;
}) {
  const [links, setLinks] = useState(initialLinks);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [showAddLink, setShowAddLink] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profile, setProfile] = useState(user);

  const refreshLinks = useCallback(async () => {
    const res = await fetch("/api/links");
    if (res.ok) setLinks(await res.json());
  }, []);

  // Auto-refresh clicks every 3s in background (no visible reload)
  useEffect(() => {
    const id = setInterval(refreshLinks, 3000);
    return () => clearInterval(id);
  }, [refreshLinks]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this link?")) return;
    const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
      setEditingLink(null);
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
  }

  async function applyReorder(ids: string[]) {
    const res = await fetch("/api/links/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (res.ok) setLinks(await res.json());
  }

  async function handleReorder(linkId: string, direction: "up" | "down") {
    const idx = links.findIndex((l) => l.id === linkId);
    if (idx < 0) return;
    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= links.length) return;
    const newOrder = [...links];
    [newOrder[idx], newOrder[newIdx]] = [newOrder[newIdx], newOrder[idx]];
    await applyReorder(newOrder.map((l) => l.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const newOrder = [...links];
    const [moved] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved);
    void applyReorder(newOrder.map((l) => l.id));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="max-w-2xl space-y-8">
      {/* Edit profile (name, bio, avatar URL) */}
      <section
        className="card card-hover flex cursor-pointer items-start gap-4 rounded-2xl p-5 shadow-md transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
        onClick={() => setShowProfileForm(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setShowProfileForm(true)}
      >
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={56}
            height={56}
            className="h-14 w-14 flex-shrink-0 rounded-full object-cover shadow"
            unoptimized
          />
        ) : (
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow"
            style={{ background: "var(--accent)" }}
          >
            {profile.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-bold" style={{ color: "var(--text)" }}>{profile.name}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {profile.bio || "Add a bio"}
          </p>
          <p className="mt-2 text-xs font-medium" style={{ color: "var(--accent)" }}>Click to edit profile</p>
        </div>
      </section>

      {showProfileForm && (
        <ProfileForm
          initial={profile}
          onClose={() => setShowProfileForm(false)}
          onSaved={(u) => {
            setProfile(u);
            setShowProfileForm(false);
          }}
        />
      )}

      {/* Add / Edit / Delete links • Toggle on/off • Reorder */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold tracking-tight" style={{ color: "var(--text)" }}>Links</h2>
          <button
            type="button"
            onClick={() => { setShowAddLink(true); setEditingLink(null); }}
            className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md"
            style={{ background: "var(--accent)" }}
          >
            + Add link
          </button>
        </div>

        {showAddLink && (
          <div className="card rounded-2xl p-5 shadow-md transition-[box-shadow,opacity] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]">
            <LinkForm
              onCancel={() => setShowAddLink(false)}
              onSaved={() => {
                setShowAddLink(false);
                refreshLinks();
              }}
            />
          </div>
        )}
      </section>

      {/* Daftar link - drag & drop + kartu */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-3">
            {links.map((link, index) => (
              <SortableLinkCard
                key={link.id}
                link={link}
                isEditing={editingLink?.id === link.id}
                onEdit={() => setEditingLink(link)}
                onEditSave={refreshLinks}
                onEditCancel={() => setEditingLink(null)}
                onDelete={() => handleDelete(link.id)}
                onCopyUrl={() => copyUrl(link.url)}
                onReorder={(dir) => handleReorder(link.id, dir)}
                index={index}
                total={links.length}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {links.length === 0 && !showAddLink && (
        <div className="card rounded-2xl border-2 border-dashed p-10 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="mb-2 font-medium" style={{ color: "var(--text-muted)" }}>
            No links yet
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Click &quot;+ Add link&quot; to add your first link.
          </p>
        </div>
      )}
    </div>
  );
}
