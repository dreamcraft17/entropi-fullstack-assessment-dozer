import { PlaceholderSection } from "../PlaceholderSection";

export default function AnalyticsPage() {
  return (
    <PlaceholderSection
      title="Analytics"
      icon="📈"
      description="Space for a simple analytics view on top of link clicks."
      features={[
        "Aggregate link click counts over time",
        "Breakdown by link",
        "Room to plug in referrer / device data later",
      ]}
    />
  );
}
