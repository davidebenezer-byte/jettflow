import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

import logo from "@/assets/jetflo-logo.png";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/inverters", label: "JetFlo Inverters" },
  { to: "/powered-by-jetflo", label: "Powered by JetFlo" },
  { to: "/kits", label: "Order Kits" },
];

export function Nav() {
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1180px] items-center gap-3 px-5 py-3.5 sm:px-8">
        <Link to="/" className="mr-2 shrink-0" aria-label="JetFlo by Claro Energy — home">
          <img src={logo} alt="JetFlo by Claro Energy" width={338} height={160} className="h-8 w-auto" />
        </Link>

        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="shrink-0 rounded-full px-3 py-2 font-display text-[13px] font-bold whitespace-nowrap transition-colors hover:bg-foreground/5 sm:px-4 sm:text-[13.5px]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={openCart}
          className="relative shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 font-display text-[13px] font-bold text-primary-foreground"
        >
          <ShoppingCart className="size-4" />
          <span className="hidden sm:inline">Cart</span>
          <span className="absolute -top-1.5 -right-1.5 grid size-[19px] place-items-center rounded-full border-2 border-background bg-amber text-[10.5px] font-extrabold text-accent-foreground">
            {count}
          </span>
        </button>
      </nav>
    </header>
  );
}
