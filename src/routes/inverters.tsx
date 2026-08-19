import { createFileRoute } from "@tanstack/react-router";

import { PageHeading } from "@/components/site/PageHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { INVERTERS } from "@/lib/catalog";

export const Route = createFileRoute("/inverters")({
  head: () => ({
    meta: [
      { title: "JetFlo Volt Inverters — 2kW, 3kW & 5kW | JetFlo" },
      {
        name: "description",
        content:
          "JetFlo Volt inverters, manufactured in-house at our Coimbatore facility. 2kW, 3kW and 5kW sizes with a 5-year JetFlo warranty.",
      },
      { property: "og:title", content: "JetFlo Volt Inverters — 2kW, 3kW & 5kW" },
      {
        property: "og:description",
        content: "Self-manufactured grid-tied and hybrid-ready inverters with a 5-year warranty.",
      },
    ],
  }),
  component: InvertersPage,
});

function InvertersPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 sm:pt-16">
      <PageHeading
        eyebrow="JetFlo manufactured"
        title="JetFlo Inverters"
        lede="Manufactured in-house at our Coimbatore facility — the one component in every kit we build ourselves. 5-year JetFlo warranty on all three."
      />
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {INVERTERS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
