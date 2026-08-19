import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeading } from "@/components/site/PageHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { PARTS, PART_FILTERS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/powered-by-jetflo")({
  head: () => ({
    meta: [
      { title: "Powered by JetFlo — Panels, Mounting, Wiring & BOS | JetFlo" },
      {
        name: "description",
        content:
          "Solar panels, mounting structures, cabling and BOS vetted to JetFlo spec and sourced from whichever approved vendor has live stock. 3-year top-up warranty.",
      },
      { property: "og:title", content: "Powered by JetFlo — Panels, Mounting, Wiring & BOS" },
      {
        property: "og:description",
        content: "One catalogue of vetted solar components. No brand to pick, just the part.",
      },
    ],
  }),
  component: PartsPage,
});

function PartsPage() {
  const [filter, setFilter] = useState("all");
  const items = filter === "all" ? PARTS : PARTS.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 sm:pt-16">
      <PageHeading
        eyebrow="Vendor-vetted, vendor-invisible"
        title="Powered by JetFlo"
        lede="Panels, mounting structures, wiring and BOS — every part vetted to JetFlo spec and sourced from whichever approved vendor has stock this week. No brand to pick, just the part."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {PART_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full border px-4 py-2 font-display text-[12.5px] font-bold transition-colors",
              filter === f.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-foreground/40",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-16 text-center text-[13px] text-muted-foreground">
          No items in this filter.
        </p>
      )}
    </div>
  );
}
