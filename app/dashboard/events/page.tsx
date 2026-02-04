import { PlaceholderSection } from "../PlaceholderSection";

export default function EventsPage() {
  return (
    <PlaceholderSection
      title="Event Links"
      icon="📆"
      description="Section for event links (webinars, meetups, launches) that can drop straight into a calendar."
      features={[
        "Store event date and description",
        "Generate simple \"add to calendar\" links",
        "Track how many people click an event link",
      ]}
    />
  );
}
