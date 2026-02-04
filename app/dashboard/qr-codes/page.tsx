import { PlaceholderSection } from "../PlaceholderSection";

export default function QrCodesPage() {
  return (
    <PlaceholderSection
      title="QR Codes"
      icon="🤳"
      description="Placeholder for a simple QR generator for each link."
      features={[
        "Generate a QR for any link in the dashboard",
        "Download the QR image for use elsewhere",
        "Optionally match the QR color to the chosen accent",
      ]}
    />
  );
}
