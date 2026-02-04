type Props = {
  title: string;
  icon: string;
  description: string;
  features?: string[];
};

export function PlaceholderSection({
  title,
  icon,
  description,
  features = [],
}: Props) {
  return (
    <div
      className="card rounded-2xl p-8 shadow-md"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="mb-4 text-4xl" aria-hidden>
        {icon}
      </div>
      <h2
        className="font-display text-xl font-bold tracking-tight sm:text-2xl"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
        {description}
      </p>
      {features.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <span style={{ color: "var(--accent)" }}>•</span> {f}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
        I parked this section for now during the assessment and only wired up the main Links page.
      </p>
    </div>
  );
}
