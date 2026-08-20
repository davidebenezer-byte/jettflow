import { createFileRoute } from "@tanstack/react-router";
import { Clock, PhoneCall, ShieldCheck } from "lucide-react";

import { PageHeading } from "@/components/site/PageHeading";
import { LeadForm } from "@/components/site/LeadForm";
import { fmt } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Talk to the JetFlo Supply Desk | JetFlo" },
      {
        name: "description",
        content:
          "Share a few details and the JetFlo supply desk will call you within one working day with partner pricing, stock position and delivery dates for kits, inverters and parts.",
      },
      { property: "og:title", content: "Get a Quote — Talk to the JetFlo Supply Desk" },
      {
        property: "og:description",
        content:
          "Tell us what you need. We come back within one working day with partner pricing and stock availability.",
      },
    ],
  }),
  component: Enquiry,
});

const assurances = [
  { icon: Clock, title: "Reply in one working day", text: "A named person from the supply desk calls you — not a ticket queue." },
  { icon: PhoneCall, title: "Quote, not a checkout", text: "We confirm sizes, stock and delivery dates before anything is priced." },
  { icon: ShieldCheck, title: "No obligation", text: "Partner pricing is shared for you to compare. Order only when it works." },
];

function Enquiry() {
  const { lines, referenceTotal } = useCart();

  const summary =
    lines.length > 0
      ? `${lines
          .map((l) => `${l.qty} × ${l.name} (PM: ${l.pmLabel})`)
          .join("\n")}\nOpen-market reference total: ${fmt(referenceTotal)}`
      : undefined;

  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-12 pb-4 sm:px-8 sm:pt-16">
      <PageHeading
        eyebrow="Enquiry · One working day reply"
        title="Get a quote or speak to someone"
        lede="We don't take orders online yet. Tell us what you're planning and the JetFlo supply desk comes back with partner pricing, live stock and a delivery date."
      />

      <div className="mt-9 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col gap-3">
          {assurances.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-amber">
                <Icon className="size-4.5" />
              </span>
              <div>
                <div className="font-display text-[14.5px] font-bold">{title}</div>
                <p className="mt-1 text-[13px] text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-amber bg-amber-soft p-5 text-[12.5px] text-amber-ink">
            Prices across the site are open-market reference figures, illustrative and pending
            vendor lock. Your partner price is confirmed in the quote we send you.
          </div>
        </div>

        <LeadForm summary={summary} />
      </div>
    </div>
  );
}
