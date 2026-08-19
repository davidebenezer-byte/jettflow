import { fmt, type PmPlan } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function PmSelector({
  plans,
  value,
  onChange,
}: {
  plans: PmPlan[];
  value: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-background/70 p-3.5">
      <div className="label-caps mb-2.5 text-muted-foreground">Preventive Maintenance plan</div>
      <div className="grid grid-cols-3 gap-2">
        {plans.map((plan, i) => (
          <button
            key={plan.yrs}
            type="button"
            onClick={() => onChange(i)}
            aria-pressed={i === value}
            className={cn(
              "rounded-lg border bg-card px-3 py-2 text-left transition-colors",
              i === value
                ? "border-amber bg-amber-soft"
                : "border-border hover:border-foreground/30",
            )}
          >
            <div className="font-display text-[12.5px] leading-tight font-extrabold">
              {plan.yrs}
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">
              {plan.cost ? fmt(plan.cost) : "Free"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
