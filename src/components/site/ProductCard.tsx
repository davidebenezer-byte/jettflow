import { JETFLO_DISCOUNT, fmt, jetfloPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { MfgBadge, PoweredBadge, SizeBadge } from "./Badges";
import { useProductDetail } from "./ProductDetailPanel";

export function ProductCard({ product }: { product: Product }) {
  const { openProduct } = useProductDetail();
  const { addLine } = useCart();
  const isInverter = product.kind === "inverter";

  function quickAdd() {
    addLine({
      id: `${product.id}|nopm`,
      name: product.name,
      img: product.img,
      unitPrice: jetfloPrice(product.market),
      marketPrice: product.market,
      pmLabel: "No PM plan",
    });
  }


  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <button
        type="button"
        onClick={() => openProduct(product)}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-background text-left"
      >
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 z-10">
          {isInverter ? <MfgBadge /> : <PoweredBadge />}
        </span>
        {(product.sizeBadge || product.qty) && (
          <SizeBadge>{product.sizeBadge ?? product.qty}</SizeBadge>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="label-caps text-muted-foreground">{product.categoryLabel}</div>
        <h3 className="mt-1.5 font-display text-[15.5px]">{product.name}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{product.desc}</p>

        <div className="mt-auto pt-4">
          <div className="border-t border-border pt-3.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-extrabold text-amber-ink">
                {fmt(jetfloPrice(product.market))}
              </span>
              <span className="font-display text-[13px] text-muted-foreground line-through">
                {fmt(product.market)}
              </span>
            </div>
            <div className="label-caps mt-1.5 inline-block rounded-full bg-amber-soft px-2.5 py-1 text-amber-ink">
              JetFlo price · {Math.round(JETFLO_DISCOUNT * 100)}% below market
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => openProduct(product)}
              className="rounded-full border border-border px-4 py-2.5 font-display text-[12.5px] font-bold transition-colors hover:border-foreground/40"
            >
              Details
            </button>
            <button
              type="button"
              onClick={quickAdd}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 font-display text-[12.5px] font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Add to cart
            </button>

          </div>
        </div>
      </div>
    </article>
  );
}
