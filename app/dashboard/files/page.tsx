import { PlaceholderSection } from "../PlaceholderSection";

export default function FilesPage() {
  return (
    <PlaceholderSection
      title="Transfer Files"
      icon="📃"
      description="Idea: attach files to links so visitors can download things like PDFs or decks."
      features={[
        "Upload a file and get a shareable link",
        "Basic download count per file",
        "Optional expiry/password in front of the file",
      ]}
    />
  );
}
