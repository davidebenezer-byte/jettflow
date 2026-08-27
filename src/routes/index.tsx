import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, IndianRupee, Truck, Wrench, ShieldCheck, Users, HeartHandshake, PiggyBank, TrendingUp, MapPin } from "lucide-react";

import heroImage from "@/assets/hero-install.jpg";
import explainerMfg from "@/assets/explainer-manufactured.jpg";
import explainerPowered from "@/assets/explainer-powered.jpg";
import { MfgBadge, PoweredBadge } from "@/components/site/Badges";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JetFlo — Rooftop Solar Kits & Components for Installer-Partners" },
      {
        name: "description",
        content:
          "JetFlo by Claro Energy supplies installer-partners across AP & Telangana with self-manufactured Volt inverters and vetted solar components — 15% below market on kits, 3–6 day delivery.",
      },
      {
        property: "og:title",
        content: "JetFlo — Rooftop Solar Kits & Components",
      },
      {
        property: "og:description",
        content:
          "Pre-configured 2/3/5kW rooftop kits and individual parts for installer-partners. Get partner pricing instantly at checkout.",
      },
    ],
  }),
  component: Home,
});

const promises = [
  { icon: IndianRupee, stat: "15% off", label: "on every pre-configured kit" },
  { icon: Truck, stat: "3–6 days", label: "assured delivery, every order" },
  { icon: Wrench, stat: "3–5 yrs", label: "Preventive Maintenance, your choice" },
];

function Home() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
      {/* Hero */}
      <section className="pt-14 pb-4 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="eyebrow eyebrow-dot mb-5">
              Now shipping · JetFlo Volt, self-manufactured
            </div>
            <h1 className="font-display text-[2.1rem] leading-[1.08] sm:text-[2.9rem]">
              Solar kits and parts,
              <br />
              <span className="text-amber">priced honestly.</span>
            </h1>
            <p className="mt-5 max-w-[560px] text-[15.5px] text-muted-foreground">
              JetFlo inverters are made in-house. Every other component ships{" "}
              <strong className="font-bold text-foreground">powered by JetFlo</strong> — vetted, in
              stock, and swapped between top vendors without you ever having to choose. Build a
              full kit or pick single parts, then ask us for a quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/kits"
                className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Browse pre-configured kits <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/enquiry"
                className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3.5 font-display text-[13.5px] font-bold transition-colors hover:border-foreground/40"
              >
                Get a quote
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <img
              src={heroImage}
              alt="Installers fitting a JetFlo rooftop solar kit"
              width={1408}
              height={1056}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        {/* Promise bar */}
        <div className="mt-12 grid overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:grid-cols-3">
          {promises.map(({ icon: Icon, stat, label }) => (
            <div
              key={stat}
              className="flex items-center gap-4 border-b border-border p-6 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-amber">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <div className="font-display text-xl leading-none font-extrabold">{stat}</div>
                <div className="mt-1 text-[11.5px] font-bold text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing transparency strip */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-amber bg-amber-soft px-5 py-4 text-[13px] text-amber-ink">
          <Compass className="mt-0.5 size-4 shrink-0" />
          <p>
            <b className="text-foreground">
              Prices shown while browsing are open-market reference prices.
            </b>{" "}
            Your discounted JetFlo price — 15% off kits, a smaller % off individual parts — is
            shown as an indicative figure once you review your list, and confirmed in the written quote we send you. Figures here are illustrative, pending vendor lock. Photos are representative imagery, not the exact SKUs.
          </p>
        </div>
      </section>

      {/* Two ways to buy */}
      <section className="mt-20">
        <div className="max-w-[620px]">
          <h2 className="font-display text-2xl sm:text-[1.7rem]">
            Two ways to buy. One promise behind both.
          </h2>
          <p className="mt-2.5 text-[13.5px] text-muted-foreground">
            Whichever way a partner shops, the component actually arriving is the same vetted part —
            just sourced against live stock, not a fixed brand contract.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img
              src={explainerMfg}
              alt="A JetFlo Volt inverter being mounted"
              loading="lazy"
              width={1200}
              height={800}
              className="h-44 w-full object-cover"
            />
            <div className="p-6">
              <MfgBadge />
              <h3 className="mt-3.5 font-display text-lg">JetFlo Volt Inverters</h3>
              <p className="mt-2 text-[13.5px] text-muted-foreground">
                Built in our own facility. No vendor swap, ever — it's the one part of every kit we
                make ourselves. Backed by a 5-year warranty, the strongest cover in the category.
              </p>
              <Link
                to="/inverters"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-amber-ink hover:gap-2.5"
              >
                See all three sizes <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img
              src={explainerPowered}
              alt="Pallets of solar panels in a JetFlo warehouse"
              loading="lazy"
              width={1200}
              height={800}
              className="h-44 w-full object-cover"
            />
            <div className="p-6">
              <PoweredBadge />
              <h3 className="mt-3.5 font-display text-lg">Panels, mounting, wiring &amp; BOS</h3>
              <p className="mt-2 text-[13.5px] text-muted-foreground">
                Sourced from whichever approved vendor has stock this week — vendors rotate in
                behind the scenes. You never pick a brand; you just get the part, fast, with a
                3-year top-up warranty.
              </p>
              <Link
                to="/powered-by-jetflo"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-amber-ink hover:gap-2.5"
              >
                Shop the parts catalogue <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Stats - Delivering Lasting Impact */}
      <section className="mt-24 mb-16 border-t border-border/60 pt-16">
        <div className="text-center">
          <h2 className="font-display text-[2rem] font-extrabold sm:text-[2.6rem] text-foreground tracking-tight">
            Delivering Lasting Impact
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
            Our work delivers meaningful environmental &amp; social impact
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-800 mb-5">
              <ShieldCheck className="size-6 text-slate-800" />
            </div>
            <div className="font-display text-[2.2rem] font-black leading-none text-foreground tracking-tight">
              274 million
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">
              kgs of carbon emissions avoided every year
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-800 mb-5">
              <Users className="size-6 text-slate-800" />
            </div>
            <div className="font-display text-[2.2rem] font-black leading-none text-foreground tracking-tight">
              1,10,000+
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">
              individuals benefiting from our work
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-800 mb-5">
              <HeartHandshake className="size-6 text-slate-800" />
            </div>
            <div className="font-display text-[2.2rem] font-black leading-none text-foreground tracking-tight">
              18,382
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">
              women farmers empowered with sustainable irrigation
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-800 mb-5">
              <PiggyBank className="size-6 text-slate-800" />
            </div>
            <div className="font-display text-[2.2rem] font-black leading-none text-foreground tracking-tight">
              $1.2 billion
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">
              cumulative diesel savings delivered till date
            </p>
          </div>

          {/* Card 5 */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-800 mb-5">
              <TrendingUp className="size-6 text-slate-800" />
            </div>
            <div className="font-display text-[2.2rem] font-black leading-none text-foreground tracking-tight">
              ~35%
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">
              average farm yield increase enabled by reliable &amp; on-demand solar irrigation
            </p>
          </div>

          {/* Card 6 */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-800 mb-5">
              <MapPin className="size-6 text-slate-800" />
            </div>
            <div className="font-display text-[2.2rem] font-black leading-none text-foreground tracking-tight">
              2,40,000+
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">
              acres of farmland now under assured solar irrigation
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
