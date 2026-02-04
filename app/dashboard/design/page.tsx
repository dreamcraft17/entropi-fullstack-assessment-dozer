import { PlaceholderSection } from "../PlaceholderSection";

export default function DesignPage() {
  return (
    <PlaceholderSection
      title="Design"
      icon="🎨"
      description="Area to tweak the look of the bio page (colors, fonts, maybe a simple layout picker)."
      features={[
        "Choose a theme / color combination",
        "Adjust accent color and background",
        "Room to add layout presets later",
      ]}
    />
  );
}

