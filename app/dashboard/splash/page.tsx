import { PlaceholderSection } from "../PlaceholderSection";

export default function SplashPage() {
  return (
    <PlaceholderSection
      title="Splash Pages"
      icon="⏱️"
      description="Ruang untuk eksperimen splash page sebelum user dialihkan ke link utama."
      features={[
        "Halaman perantara dengan sedikit teks + tombol",
        "Bisa dipakai untuk promo / CTA singkat",
        "Redirect otomatis ke link tujuan",
      ]}
    />
  );
}
