import { useState } from "react";
import { Check } from "lucide-react";

import { JETFLO_DISCOUNT, PM_PLANS, fmt, jetfloPrice, type Kit } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { MfgBadge, PoweredBadge } from "./Badges";
import { PmSelector } from "./PmSelector";

export function KitCard({ kit }: { kit: Kit }) {
  const [pmIndex, setPmIndex] = useState(0);
  const { addLine } = useCart();
  const plans = PM_PLANS.kit;
  const plan = plans[pmIndex] ?? plans[0]!;

  function addKit() {
    addLine({
      id: `${kit.id}|${plan.yrs}`,
      name: kit.name,
      img: kit.img,
      unitPrice: jetfloPrice(kit.market) + plan.cost,
      marketPrice: kit.market + plan.cost,
      pmLabel: plan.yrs,
    });
  }


  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-card shadow-card",
        kit.featured ? "border-2 border-amber shadow-lift" : "border border-border",
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
        <img
          src={kit.img}
          alt={kit.name}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover"
        />
        {kit.featured && (
          <span className="label-caps absolute top-4 left-4 z-10 rounded-full bg-amber px-3 py-1.5 text-accent-foreground">
            Most installed
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <div className="label-caps text-muted-foreground">
            {kit.tag} · {kit.kw}
          </div>
          <h3 className="mt-1.5 font-display text-2xl">{kit.name}</h3>
          <p className="mt-2 text-[13.5px] text-muted-foreground">{kit.desc}</p>
        </div>

        <div className="rounded-2xl bg-background p-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl font-extrabold text-amber-ink">
              {fmt(jetfloPrice(kit.market))}
            </span>
            <span className="font-display text-[15px] text-muted-foreground line-through">
              {fmt(kit.market)}
            </span>
          </div>
          <div className="label-caps mt-2 inline-block rounded-full bg-amber-soft px-2.5 py-1 text-amber-ink">
            JetFlo price · {Math.round(JETFLO_DISCOUNT * 100)}% below market
          </div>
        </div>


        <ul className="flex flex-col gap-2.5">
          {kit.contents.map((c) => (
            <li key={c.label} className="flex items-start gap-2.5 text-[13px]">
              <Check className="mt-0.5 size-3.5 shrink-0 text-amber" strokeWidth={3} />
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <b className="font-bold">{c.label}</b>
                {c.mfg ? (
                  <MfgBadge className="text-[9.5px]" />
                ) : (
                  <PoweredBadge className="text-[9.5px]" />
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4 pt-2">
          <PmSelector plans={plans} value={pmIndex} onChange={setPmIndex} />
          <button
            type="button"
            onClick={addKit}
            className={cn(
              "w-full rounded-full px-6 py-3.5 font-display text-[13.5px] font-extrabold transition-colors",
              kit.featured
                ? "bg-amber text-accent-foreground hover:bg-amber/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            Add kit to quote
          </button>
        </div>
      </div>
    </article>
  );
}
