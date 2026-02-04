import { PlaceholderSection } from "../PlaceholderSection";

export default function ShopPage() {
  return (
    <PlaceholderSection
      title="Shop"
      icon="🛍️"
      description="Rough idea for a small shop area linked from the bio page."
      features={[
        "Simple list of products (name, price, payment link)",
        "Send people to an external checkout page",
        "Could be wired to a payment provider later",
      ]}
    />
  );
}

