import { PlaceholderSection } from "../PlaceholderSection";

export default function DomainsPage() {
  return (
    <PlaceholderSection
      title="Custom Domains"
      icon="🌐"
      description="Reserved for managing custom domains if this ever runs in production."
      features={[
        "Connect your own domain to the bio page",
        "Support a few domains per user",
        "Basic settings (active status, target page)",
      ]}
    />
  );
}
