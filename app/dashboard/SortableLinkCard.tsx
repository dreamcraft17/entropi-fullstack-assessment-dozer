"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LinkForm } from "./LinkForm";
import { LinkToggle } from "./LinkToggle";

type LinkItem = { id: string; title: string; url: string; active: boolean; order: number; clicks?: number };

export function SortableLinkCard({
  link,
  isEditing,
  onEdit,
  onEditSave,
  onEditCancel,
  onDelete,
  onCopyUrl,
  onReorder,
  index,
  total,
}: {
  link: LinkItem;
  isEditing: boolean;
  onEdit: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDelete: () => void;
  onCopyUrl: () => void;
  onReorder: (direction: "up" | "down") => void;
  index: number;
  total: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isEditing) {
    return (
      <li ref={setNodeRef} className="card rounded-2xl shadow-md" style={{ borderColor: "var(--border)" }}>
        <div className="p-5">
          <LinkForm
            initial={link}
            onCancel={onEditCancel}
            onSaved={() => {
              onEditCancel();
              onEditSave();
            }}
          />
        </div>
      </li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={{ ...style, borderColor: "var(--border)" }}
      className={`card rounded-2xl shadow-md transition-[box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${isDragging ? "opacity-70 shadow-lg z-10 scale-[1.02]" : ""}`}
    >
      <div className="flex items-start gap-3 p-5">
        <div className="flex flex-shrink-0 items-center gap-0.5">
          <button
            type="button"
            className="touch-none cursor-grab rounded-lg p-2 transition-[background-color,color] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-black/5 active:cursor-grabbing dark:hover:bg-white/10"
            style={{ color: "var(--text-muted)" }}
            aria-label="Drag to reorder"
            {...attributes}
            {...listeners}
          >
            <span className="inline-block text-lg leading-none" aria-hidden>⋮⋮</span>
          </button>
          <button
            type="button"
            onClick={() => onReorder("up")}
            disabled={index === 0}
            className="rounded-lg p-1.5 transition-[background-color,opacity] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"
            style={{ color: "var(--text-muted)" }}
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onReorder("down")}
            disabled={index === total - 1}
            className="rounded-lg p-1.5 transition-[background-color,opacity] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"
            style={{ color: "var(--text-muted)" }}
            aria-label="Move down"
          >
            ↓
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold" style={{ color: "var(--text)" }}>{link.title}</p>
          <p className="truncate text-sm" style={{ color: "var(--text-muted)" }}>{link.url}</p>
        </div>
        <div className="flex-shrink-0">
          <LinkToggle
            linkId={link.id}
            active={link.active}
            onToggle={onEditSave}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t px-5 py-3" style={{ borderColor: "var(--border)" }}>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg p-2 transition-[background-color,color] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-black/5 dark:hover:bg-white/10"
          style={{ color: "var(--text-muted)" }}
          aria-label="Edit"
        >
          ✎
        </button>
        <button
          type="button"
          onClick={onCopyUrl}
          className="rounded-lg p-2 transition-[background-color,color] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-black/5 dark:hover:bg-white/10"
          style={{ color: "var(--text-muted)" }}
          aria-label="Copy URL"
        >
          📋
        </button>
        <span className="text-xs transition-colors duration-300" style={{ color: "var(--text-muted)" }}>{link.clicks ?? 0} clicks</span>
        <button
          type="button"
          onClick={onDelete}
          className="ml-auto rounded-lg p-2 transition-[background-color,color] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-red-500/10"
          style={{ color: "var(--text-muted)" }}
          aria-label="Delete"
        >
          🗑
        </button>
      </div>
    </li>
  );
}
