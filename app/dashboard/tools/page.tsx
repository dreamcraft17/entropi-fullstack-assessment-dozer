import { PlaceholderSection } from "../PlaceholderSection";

export default function ToolsPage() {
  return (
    <PlaceholderSection
      title="Web Tools"
      icon="🛠️"
      description="Bucket for small utilities around links and content."
      features={[
        "Ideas: link preview checker, UTM builder, etc.",
        "A few helpers for text / URL manipulation",
        "Optional tools that can be added over time",
      ]}
    />
  );
}
