import { PlaceholderSection } from "../PlaceholderSection";

export default function StaticPage() {
  return (
    <PlaceholderSection
      title="Host HTML"
      icon="🧑‍💻"
      description="Eksperimen kecil untuk nantinya bisa nge‑host halaman statis sederhana langsung dari dashboard."
      features={[
        "Upload bundle HTML/CSS/JS ringan",
        "Punya URL sendiri di bawah domain utama",
        "Bisa dihubungkan dengan custom domain di masa depan",
      ]}
    />
  );
}
