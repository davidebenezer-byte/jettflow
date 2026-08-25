import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { JETFLO_DISCOUNT, PM_PLANS, fmt, jetfloPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { MfgBadge, PoweredBadge } from "./Badges";
import { PmSelector } from "./PmSelector";

type DetailContextValue = { openProduct: (product: Product) => void };
const DetailContext = createContext<DetailContextValue | null>(null);


export function useProductDetail() {
  const ctx = useContext(DetailContext);
  if (!ctx) throw new Error("useProductDetail must be used inside ProductDetailProvider");
  return ctx;
}

export function ProductDetailProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [pmIndex, setPmIndex] = useState(0);
  const { addLine } = useCart();

  const value = useMemo<DetailContextValue>(
    () => ({
      openProduct: (p) => {
        setPmIndex(0);
        setProduct(p);
      },
    }),
    [],
  );

  const isInverter = product?.kind === "inverter";
  const plans = PM_PLANS[isInverter ? "inverter" : "part"];
  const plan = plans[pmIndex] ?? plans[0]!;

  function addToCart() {
    if (!product) return;
    addLine({
      id: `${product.id}|${plan.yrs}`,
      name: product.name,
      img: product.img,
      unitPrice: jetfloPrice(product.market) + plan.cost,
      marketPrice: product.market + plan.cost,
      pmLabel: plan.yrs,
    });
    setProduct(null);
  }


  return (
    <DetailContext.Provider value={value}>
      {children}
      <Sheet open={!!product} onOpenChange={(open) => !open && setProduct(null)}>
        <SheetContent className="w-full gap-0 overflow-y-auto border-border bg-background sm:max-w-[460px]">
          <SheetHeader className="border-b border-border px-6 py-5">
            <SheetTitle className="font-display text-base font-extrabold">
              Product details
            </SheetTitle>
          </SheetHeader>

          {product && (
            <div className="space-y-4 px-6 py-6">
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div>
                {isInverter ? <MfgBadge /> : <PoweredBadge />}
                <div className="label-caps mt-3 text-muted-foreground">
                  {product.categoryLabel}
                </div>
                <h2 className="mt-1 font-display text-xl">{product.name}</h2>
                <p className="mt-2 text-[13.5px] text-muted-foreground">{product.desc}</p>
              </div>

              <div className="flex items-center gap-2 text-[13px] font-bold">
                <ShieldCheck className="size-4 shrink-0 text-amber" />
                {product.warranty}
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-[13px] text-muted-foreground">
                {isInverter ? (
                  <>
                    <b className="text-foreground">Manufactured by JetFlo.</b> Assembled and
                    quality-checked at our own facility — this is the one component in every kit
                    we build ourselves, no vendor swap.
                  </>
                ) : (
                  <>
                    <b className="text-foreground">Powered by JetFlo.</b> This item is currently
                    being fulfilled by <b className="text-foreground">{product.vendor}</b>, our
                    approved vendor with live stock this week. The spec stays identical if the
                    fulfilling vendor changes — you're buying the JetFlo-vetted part, not a brand.
                  </>
                )}
              </div>

              <PmSelector plans={plans} value={pmIndex} onChange={setPmIndex} />

              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-xl font-extrabold text-amber-ink">
                    {fmt(jetfloPrice(product.market))}
                  </span>
                  <span className="font-display text-[14px] text-muted-foreground line-through">
                    {fmt(product.market)}
                  </span>
                </div>
                <div className="label-caps mt-2 inline-block rounded-full bg-amber-soft px-2.5 py-1 text-amber-ink">
                  JetFlo price · {Math.round(JETFLO_DISCOUNT * 100)}% below market
                </div>
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="w-full rounded-full bg-primary px-6 py-3.5 font-display text-[13.5px] font-extrabold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Add to cart
              </button>

            </div>
          )}
        </SheetContent>
      </Sheet>
    </DetailContext.Provider>
  );
}
