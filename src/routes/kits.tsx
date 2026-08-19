import { createFileRoute } from "@tanstack/react-router";

import { KitCard } from "@/components/site/KitCard";
import { PageHeading } from "@/components/site/PageHeading";
import { KITS } from "@/lib/catalog";

export const Route = createFileRoute("/kits")({
  head: () => ({
    meta: [
      { title: "Order Pre-configured Rooftop Kits — 2kW, 3kW, 5kW | JetFlo" },
      {
        name: "description",
        content:
          "Complete 2kW, 3kW and 5kW rooftop solar kits — JetFlo Volt inverter, panels, mounting and BOS in one order at 15% below open-market rate.",
      },
      { property: "og:title", content: "Order Pre-configured Rooftop Kits — 2kW, 3kW, 5kW" },
      {
        property: "og:description",
        content: "Everything for the job in one order, at 15% below open-market rate.",
      },
    ],
  }),
  component: KitsPage,
});

function KitsPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 sm:pt-16">
      <PageHeading
        eyebrow="15% below market — locked"
        title="Pre-configured rooftop kits"
        lede="Everything for the job — JetFlo Volt inverter, panels, mounting and BOS — in one order, at 15% below open-market rate. Add a Preventive Maintenance plan if you want one."
      />
      <div className="mt-9 grid gap-6 lg:grid-cols-3">
        {KITS.map((kit) => (
          <KitCard key={kit.id} kit={kit} />
        ))}
      </div>
    </div>
  );
}
