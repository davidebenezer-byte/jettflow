import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, PartyPopper, ShieldCheck, Truck } from "lucide-react";

import { PageHeading } from "@/components/site/PageHeading";
import { fmt } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Reveal Your JetFlo Partner Price | JetFlo" },
      {
        name: "description",
        content:
          "Review your order and reveal your JetFlo partner price — 15% off kits and a partner margin on individual parts, calculated on your cart total.",
      },
      { property: "og:title", content: "Checkout — Reveal Your JetFlo Partner Price" },
      {
        property: "og:description",
        content: "Your partner price is calculated on the cart total and revealed here.",
      },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, referenceTotal, jetfloTotal } = useCart();
  const [revealed, setRevealed] = useState(false);
  const saving = referenceTotal - jetfloTotal;
  const pct = referenceTotal > 0 ? Math.round((saving / referenceTotal) * 100) : 0;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 sm:pt-16">
        <PageHeading title="Your cart is empty" lede="Add a kit or a few parts, then come back to reveal your partner price." />
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/kits"
            className="rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground"
          >
            Browse kits
          </Link>
          <Link
            to="/powered-by-jetflo"
            className="rounded-full border border-border bg-card px-6 py-3.5 font-display text-[13.5px] font-bold"
          >
            Shop parts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 sm:pt-16">
      <PageHeading
        eyebrow="Step 2 of 2 · Price reveal"
        title="Review and reveal your price"
        lede="Your partner discount is applied to the cart total, not line by line. Reveal it when you're ready to order."
      />

      <div className="mt-9 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Lines */}
        <div className="flex flex-col gap-3">
          {lines.map((line) => (
            <div
              key={line.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-background">
                <img
                  src={line.img}
                  alt={line.name}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-[14.5px] font-bold">{line.name}</div>
                <div className="mt-1 text-[11.5px] text-muted-foreground">
                  Preventive Maintenance: {line.pmLabel} · Qty {line.qty}
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span
                    className={
                      revealed
                        ? "font-display text-[13px] text-muted-foreground line-through"
                        : "font-display text-[15px] font-extrabold"
                    }
                  >
                    {fmt(line.marketPrice * line.qty)}
                  </span>
                  {revealed && (
                    <span className="font-display text-[16px] font-extrabold text-amber-ink">
                      {fmt(line.unitPrice * line.qty)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-card p-5 text-[12.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-4 text-amber-ink" /> 3–6 day assured delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-amber-ink" /> Warranty registered to your partner
              account
            </span>
          </div>
        </div>

        {/* Reveal panel */}
        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <div className="label-caps text-muted-foreground">Order summary</div>

          <div className="mt-4 flex justify-between text-[13.5px]">
            <span className="text-muted-foreground">Open-market reference</span>
            <span className={revealed ? "line-through text-muted-foreground" : "font-bold"}>
              {fmt(referenceTotal)}
            </span>
          </div>

          {revealed ? (
            <div className="mt-4 rounded-2xl bg-amber-soft p-5">
              <div className="inline-flex items-center gap-2 label-caps text-amber-ink">
                <PartyPopper className="size-3.5" /> Your JetFlo price
              </div>
              <div className="mt-2 font-display text-[2rem] leading-none font-extrabold">
                {fmt(jetfloTotal)}
              </div>
              <div className="mt-2 text-[13px] font-bold text-amber-ink">
                You save {fmt(saving)} ({pct}% off)
              </div>
              <p className="mt-3 text-[11.5px] text-muted-foreground italic">
                Illustrative pricing, pending vendor lock. GST and freight confirmed on the invoice.
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-amber bg-amber-soft p-5 text-center">
              <Lock className="mx-auto size-5 text-amber-ink" />
              <p className="mt-2.5 text-[12.5px] text-amber-ink">
                Your partner price is locked until you reveal it. Discounts apply to the cart total
                — 15% on kits, a partner margin on individual parts.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setRevealed(true)}
            disabled={revealed}
            className="mt-5 w-full rounded-full bg-primary px-6 py-3.5 font-display text-[13.5px] font-extrabold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
          >
            {revealed ? "Price revealed" : "Reveal my JetFlo price"}
          </button>

          <button
            type="button"
            disabled={!revealed}
            className="mt-2.5 w-full rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-colors hover:bg-amber/90 disabled:opacity-40"
          >
            Place partner order
          </button>
        </aside>
      </div>
    </div>
  );
}
