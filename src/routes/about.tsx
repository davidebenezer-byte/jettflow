import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeading } from "@/components/site/PageHeading";
import { ShieldCheck, Cpu, Truck, CheckCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JetFlo — Rooftop Solar Kits & Manufacturing | JetFlo" },
      {
        name: "description",
        content:
          "Learn about JetFlo Solar, our self-manufactured Volt inverters, vetted BOS components, and how we are backed by Claro Energy.",
      },
      { property: "og:title", content: "About JetFlo — Rooftop Solar Kits & Manufacturing" },
      {
        property: "og:description",
        content: "Self-manufactured solar inverters and vetted components, priced honestly.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-12 pb-16 sm:px-8 sm:pt-16">
      <PageHeading
        eyebrow="Who We Are"
        title="About JetFlo Solar"
        lede="JetFlo is a modern rooftop solar supply brand. We manufacture our own solar inverters and source vetted balance-of-system (BOS) components, delivering them at honest prices."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left column: Narrative */}
        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Our Mission: Honest Pricing</h2>
            <p>
              Rooftop solar procurement has historically been fragmented, slow, and marked by high middleman markups. JetFlo was created to solve this. By manufacturing key components like inverters in-house and purchasing structural steel and panels at scale, we pass the savings directly to our installer-partners. We offer a flat 15% discount below reference open-market prices on all pre-configured kits.
            </p>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-card">
              <div className="grid size-10 place-items-center rounded-xl bg-amber-soft text-amber-ink mb-4">
                <Cpu className="size-5" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">JetFlo Volt Inverters</h3>
              <p className="text-[13px] leading-relaxed">
                Our flagship grid-tied Volt inverters are built at our facility. Backed by a category-leading 5-year replacement warranty, we control the firmware and engineering to ensure peak grid stability.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card shadow-card">
              <div className="grid size-10 place-items-center rounded-xl bg-amber-soft text-amber-ink mb-4">
                <Truck className="size-5" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Vetted Components</h3>
              <p className="text-[13px] leading-relaxed">
                For panels, structures, and BOS, we run a vetted supply pool. Vendors rotate behind the scenes based on live inventory, ensuring assured 3–6 day delivery without you ever having to negotiate.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Backed by Claro Energy</h2>
            <p>
              JetFlo is built, funded, and backed by <strong>Claro Energy Limited</strong>. Founded in 2011, Claro Energy has been a pioneering force in India's solar landscape, installing over 100,000+ solar pumping systems and rooftop arrays. This backing gives JetFlo installers institutional trust, massive purchasing leverage, and absolute warranty security.
            </p>
          </section>
        </div>

        {/* Right column: Fast Facts */}
        <aside className="h-fit rounded-3xl border border-border bg-card p-8 shadow-card space-y-6">
          <h3 className="font-display text-lg font-bold text-foreground">JetFlo Fast Facts</h3>
          
          <ul className="space-y-4">
            <li className="flex gap-3 text-[13.5px]">
              <CheckCircle className="size-5 text-amber-ink shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Coimbatore Production</strong>
                Inverters are designed and manufactured at our dedicated unit in Coimbatore, Tamil Nadu.
              </div>
            </li>
            <li className="flex gap-3 text-[13.5px]">
              <CheckCircle className="size-5 text-amber-ink shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">3–6 Day Supply Assurance</strong>
                Orders are dispatched from our Madhapur, Hyderabad hub within 24 hours of confirmation.
              </div>
            </li>
            <li className="flex gap-3 text-[13.5px]">
              <CheckCircle className="size-5 text-amber-ink shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Top-up Warranties</strong>
                We provide a 5-year replacement cover on Volt inverters and a 3-year local warranty top-up on structural items.
              </div>
            </li>
          </ul>

          <div className="pt-4 border-t border-border">
            <Link
              to="/kits"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-display text-[13px] font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse Solar Kits <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
