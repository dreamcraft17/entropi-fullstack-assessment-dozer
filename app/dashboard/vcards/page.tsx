import { PlaceholderSection } from "../PlaceholderSection";

export default function VcardsPage() {
  return (
    <PlaceholderSection
      title="Share vCards"
      icon="👤"
      description="Future spot for managing simple contact cards / vCards."
      features={[
        "Store basic contact info (name, email, phone, socials)",
        "Generate a link or QR code to the vCard",
        "Count how many times people open / download it",
      ]}
    />
  );
}
