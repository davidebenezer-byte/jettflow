import { Link } from "@tanstack/react-router";
import { ClipboardList, MapPin } from "lucide-react";
import { toast } from "sonner";

import logo from "@/assets/jetflo-logo.png";
import { useCart } from "@/lib/cart";
import { useCity } from "@/lib/city";

const links = [
  { to: "/inverters", label: "JetFlo Inverters" },
  { to: "/powered-by-jetflo", label: "Powered by JetFlo" },
  { to: "/kits", label: "Solar Kits" },
  { to: "/enquiry", label: "Get a Quote" },
];

export function Nav() {
  const { count, openCart } = useCart();
  const { selectedCity, setCity, ready } = useCity();
  
  const isHyderabad = ready && selectedCity === "Hyderabad";

  const handleNavClick = (e: React.MouseEvent, label: string) => {
    if (!isHyderabad) {
      e.preventDefault();
      toast.warning(`Please select your city first to browse ${label}!`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-3 mr-2 shrink-0">
          <Link to="/" aria-label="JetFlo by Claro Energy — home">
            <img src={logo} alt="JetFlo by Claro Energy" width={338} height={160} className="h-10 sm:h-12 w-auto mix-blend-multiply" />
          </Link>
          {ready && selectedCity && (
            <button
              onClick={() => {
                setCity(null);
                window.location.href = "/";
              }}
              title="Click to change city"
              className="inline-flex items-center gap-1 rounded-full bg-amber-soft px-2.5 py-1 text-[11px] font-bold text-amber-ink transition-colors hover:bg-amber hover:text-accent-foreground sm:gap-1.5 sm:px-3 sm:text-[12px]"
            >
              <MapPin className="size-3" />
              <span>{selectedCity}</span>
              <span className="text-[9.5px] opacity-75 font-normal sm:text-[10px]">(Change)</span>
            </button>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={(e) => handleNavClick(e, l.label)}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                className="shrink-0 rounded-full px-3 py-2 font-display text-[13px] font-bold whitespace-nowrap transition-colors hover:bg-foreground/5 sm:px-4 sm:text-[13.5px]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              if (!isHyderabad) {
                e.preventDefault();
                toast.warning("Please select your city first to view your list!");
              } else {
                openCart();
              }
            }}
            className="relative shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 font-display text-[13px] font-bold text-primary-foreground"
          >
            <ClipboardList className="size-4" />
            <span className="hidden sm:inline">My list</span>
            <span className="absolute -top-1.5 -right-1.5 grid size-[19px] place-items-center rounded-full border-2 border-background bg-amber text-[10.5px] font-extrabold text-accent-foreground">
              {count}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
