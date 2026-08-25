import { useState } from "react";
import { ArrowRight, MapPin, X } from "lucide-react";

type CityItem = {
  name: string;
  image: string;
  isActive: boolean;
  tagline: string;
};

const CITIES: CityItem[] = [
  {
    name: "Hyderabad",
    image: "/hyderabad.jpg",
    isActive: true,
    tagline: "Active · Express Delivery",
  },
  {
    name: "Bengaluru",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&h=450&q=80",
    isActive: false,
    tagline: "Coming soon to your location",
  },
  {
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&h=450&q=80",
    isActive: false,
    tagline: "Coming soon to your location",
  },
  {
    name: "Visakhapatnam",
    image: "/vizag.png",
    isActive: false,
    tagline: "Coming soon to your location",
  },
  {
    name: "Vijayawada",
    image: "/vijayawada.png",
    isActive: false,
    tagline: "Coming soon to your location",
  },
  {
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&h=450&q=80",
    isActive: false,
    tagline: "Coming soon to your location",
  },
  {
    name: "Pune",
    image: "/pune.png",
    isActive: false,
    tagline: "Coming soon to your location",
  },
  {
    name: "Kochi",
    image: "/kochi.png",
    isActive: false,
    tagline: "Coming soon to your location",
  },
];

type Props = {
  onSelectCity: (city: string) => void;
};

export function CitySelection({ onSelectCity }: Props) {
  const [selectedInactiveCity, setSelectedInactiveCity] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16">
      <div className="text-center">
        <div className="eyebrow eyebrow-dot mb-4 inline-flex">
          Location Selection
        </div>
        <h1 className="font-display text-[2.2rem] leading-tight font-extrabold sm:text-[3rem]">
          Which city are you buying for?
        </h1>
        <p className="mx-auto mt-4 max-w-[600px] text-[15px] text-muted-foreground sm:text-[16px]">
          Stock availability, local warehouse pickup, and last-mile delivery rates vary by location. Select your project city to begin browsing.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CITIES.map((city) => (
          <button
            key={city.name}
            type="button"
            onClick={() => {
              if (city.isActive) {
                onSelectCity(city.name);
              } else {
                setSelectedInactiveCity(city.name);
              }
            }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-amber"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
              <img
                src={city.image}
                alt={city.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold leading-tight text-white">
                  {city.name}
                </h3>
                {city.isActive ? (
                  <span className="rounded-full bg-amber px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-accent-foreground">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-foreground/35 backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[11px] text-white/90 font-medium">
                {city.tagline}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal / Dialog Overlay */}
      {selectedInactiveCity && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Coming soon to ${selectedInactiveCity}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-[460px] overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-lift animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedInactiveCity(null)}
              className="absolute top-5 right-5 rounded-full border border-border p-2 text-muted-foreground hover:bg-foreground/5 transition-colors"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            <div className="text-center">
              <span className="grid size-12 mx-auto place-items-center rounded-2xl bg-amber-soft text-amber-ink mb-5">
                <MapPin className="size-6" />
              </span>

              <h2 className="font-display text-[22px] leading-tight font-extrabold">
                Coming soon to {selectedInactiveCity}
              </h2>
              <p className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed">
                We are actively expanding our operations to {selectedInactiveCity}! Connect with our team to help us launch faster in your region, get early access, or explore becoming a local supply partner.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href="https://calendly.com/vivek-venugopal-claroenergy/partner-with-jetflo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-all hover:bg-amber/90"
                >
                  Connect with our team <ArrowRight className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedInactiveCity(null)}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 font-display text-[13.5px] font-bold text-muted-foreground hover:border-foreground/35 hover:text-foreground transition-all"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
