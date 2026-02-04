import { PlaceholderSection } from "../PlaceholderSection";

export default function ShortLinksPage() {
  return (
    <PlaceholderSection
      title="Short Links"
      icon="🔗"
      description="Simple URL shortener area where I plan to manage short links separately from the main bio page."
      features={[
        "Create short links that redirect to long URLs",
        "Optionally add limits (expiry / max clicks)",
        "Room for basic stats per short link",
      ]}
    />
  );
}
