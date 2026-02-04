import { PlaceholderSection } from "../PlaceholderSection";

export default function PixelsPage() {
  return (
    <PlaceholderSection
      title="Tracking Pixels"
      icon="📌"
      description="Nantinya bagian ini dipakai buat ngatur pixel / tracking snippet."
      features={[
        "Simpan ID pixel untuk beberapa penyedia sekaligus",
        "Inject script/pixel ke semua link page",
        "Kontrol on/off per pixel",
      ]}
    />
  );
}
