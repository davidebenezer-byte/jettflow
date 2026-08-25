import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { fmt } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeLine, referenceTotal, jetfloTotal } = useCart();
  const navigate = useNavigate();
  const saving = referenceTotal - jetfloTotal;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-[440px]">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-base font-extrabold">Your cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-[13px] text-muted-foreground">
              Your cart is empty.
              <br />
              Add kits or parts to get started.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                >
                  <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-background">
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
                    <div className="font-display text-[13px] font-bold">{line.name}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {line.pmLabel} · Qty {line.qty}
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="font-display text-[13.5px] font-extrabold text-amber-ink">
                        {fmt(line.unitPrice * line.qty)}
                      </span>
                      <span className="font-display text-[11.5px] text-muted-foreground line-through">
                        {fmt(line.marketPrice * line.qty)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.id)}
                      className="mt-1.5 text-[11px] font-bold text-claro hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="flex justify-between text-[12.5px] text-muted-foreground">
              <span>Market price</span>
              <span className="line-through">{fmt(referenceTotal)}</span>
            </div>
            <div className="mt-1.5 flex justify-between font-display text-[14px] font-extrabold">
              <span>JetFlo subtotal</span>
              <span>{fmt(jetfloTotal)}</span>
            </div>
            <p className="mt-1 text-[11.5px] font-bold text-amber-ink">
              You save {fmt(saving)} (15% off)
            </p>
            <button
              type="button"
              onClick={() => {
                closeCart();
                void navigate({ to: "/checkout" });
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-colors hover:bg-amber/90"
            >
              Go to checkout <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
