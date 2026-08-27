import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, MapPin, PartyPopper, ShieldCheck, Truck, Loader2 } from "lucide-react";

import { PageHeading } from "@/components/site/PageHeading";
import { fmt } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useLead } from "@/lib/lead";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { CITIES } from "@/lib/cities";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Review Your List & Confirm Order | JetFlo" },
      {
        name: "description",
        content:
          "Review your list, see your indicative partner price, choose your delivery method, and confirm your order to schedule a call.",
      },
      { property: "og:title", content: "Review Your List & Confirm Order" },
      {
        property: "og:description",
        content: "Confirm your order and book a slot with a representative.",
      },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, referenceTotal, jetfloTotal, removeLine } = useCart();
  const revealed = true;
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "porter">("pickup");
  const saving = referenceTotal - jetfloTotal;
  const pct = referenceTotal > 0 ? Math.round((saving / referenceTotal) * 100) : 0;

  // Guest Details Form State
  const { lead, saveLead, ready } = useLead();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmingOrder, setConfirmingOrder] = useState(false);

  // 1. If cart is empty, show empty state immediately (no gate needed)
  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 sm:pt-16">
        <PageHeading
          title="Your list is empty"
          lede="Add a kit or a few parts, then come back to see an indicative partner price and request a quote."
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/kits"
            className="rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground"
          >
            Browse kits
          </Link>
          <Link
            to="/powered-by-jetflo"
            className="rounded-full border border-border bg-card px-6 py-3.5 font-display text-[13.5px] font-bold"
          >
            Shop parts
          </Link>
        </div>
      </div>
    );
  }

  // 2. If details are not loaded yet, show a loading spinner
  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-amber border-t-transparent" />
      </div>
    );
  }

  // 3. Pre-checkout guest details gate
  if (ready && !lead) {
    const handleProceed = async (e: React.FormEvent) => {
      e.preventDefault();
      const next: Record<string, string> = {};
      if (name.trim().length < 2) next.name = "Please tell us your name.";
      if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10)))
        next.phone = "Enter a valid 10-digit mobile number.";
      if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
      if (!city) next.city = "Please select your city.";
      setErrors(next);
      if (Object.keys(next).length > 0) return;

      setSubmitting(true);
      try {
        const { error } = await supabase.from("leads").insert([
          {
            name: name.trim(),
            phone: phone.replace(/\D/g, "").slice(-10),
            email: email.trim(),
            company: company.trim() || null,
            city,
            interest: "Pre-checkout Guest details",
          },
        ]);

        if (error) {
          console.error("Error storing lead:", error);
          toast.error("Failed to save details: " + error.message);
        } else {
          saveLead({
            name: name.trim(),
            phone: phone.replace(/\D/g, "").slice(-10),
            email: email.trim(),
            company: company.trim() || undefined,
            city,
          });
          toast.success(`Welcome, ${name.trim().split(" ")[0]}! Proceeding to checkout.`);
        }
      } catch (err) {
        console.error(err);
        toast.error("An unexpected error occurred.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="mx-auto max-w-[500px] px-5 pt-12 pb-16 sm:pt-16">
        <div className="text-center mb-8">
          <span className="label-caps inline-flex items-center gap-2 rounded-full bg-amber-soft px-3 py-1.5 text-amber-ink">
            <Lock className="size-3.5" /> Secure Checkout
          </span>
          <h2 className="mt-4 font-display text-[26px] font-extrabold leading-tight">
            Tell us where to send your quote
          </h2>
          <p className="mt-2 text-[13.5px] text-muted-foreground">
            Please share a few details to unlock the checkout and save your progress.
          </p>
        </div>

        <form
          onSubmit={handleProceed}
          noValidate
          className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-4">
            <div>
              <label className="label-caps text-muted-foreground" htmlFor="checkout-name">
                Full name *
              </label>
              <input
                id="checkout-name"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((p) => ({ ...p, name: "" }));
                }}
                placeholder="Enter first name"
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1.5 text-[11.5px] text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="label-caps text-muted-foreground" htmlFor="checkout-phone">
                Mobile number *
              </label>
              <input
                id="checkout-phone"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((p) => ({ ...p, phone: "" }));
                }}
                placeholder="Enter mobile number"
                inputMode="tel"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1.5 text-[11.5px] text-destructive">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="label-caps text-muted-foreground" htmlFor="checkout-email">
                Email address *
              </label>
              <input
                id="checkout-email"
                type="email"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: "" }));
                }}
                placeholder="you@company.in"
                inputMode="email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1.5 text-[11.5px] text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="label-caps text-muted-foreground" htmlFor="checkout-company">
                Firm Name (optional)
              </label>
              <input
                id="checkout-company"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Sunrise Solar Works"
                autoComplete="organization"
              />
            </div>

            <div>
              <label className="label-caps text-muted-foreground" htmlFor="checkout-city">
                City *
              </label>
              <select
                id="checkout-city"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none transition-colors focus:border-amber"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors((p) => ({ ...p, city: "" }));
                }}
              >
                <option value="">Select your city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="mt-1.5 text-[11.5px] text-destructive">{errors.city}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-colors hover:bg-amber/90 disabled:opacity-50"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : "Proceed to Checkout"}
          </button>
        </form>
      </div>
    );
  }

  // 4. Order Confirmation Handler
  const handleConfirmOrder = async () => {
    if (!lead) return;
    setConfirmingOrder(true);
    try {
      const itemsSummary = lines.map((l) => `${l.qty} × ${l.name} (PM: ${l.pmLabel})`).join("\n");

      const { error } = await supabase.from("orders").insert([
        {
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          company: lead.company || null,
          city: lead.city,
          delivery_option:
            deliveryOption === "pickup" ? "Pickup from Warehouse" : "Porter Delivery",
          items: itemsSummary,
          total_price: jetfloTotal,
          reference_total: referenceTotal,
        },
      ]);

      if (error) {
        console.error("Order insertion error:", error);
        toast.error("Failed to place order: " + error.message);
      } else {
        toast.success("Order confirmed! Redirecting to schedule a call...");

        // Clear all items in the cart
        lines.forEach((line) => {
          removeLine(line.id);
        });

        // Redirect to Calendly
        setTimeout(() => {
          window.location.href = "https://calendly.com/vivek-venugopal-claroenergy/30min";
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setConfirmingOrder(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 sm:pt-16">
      <PageHeading
        eyebrow="Step 2 of 2 · Indicative price"
        title={`Hi ${lead?.name.split(" ")[0]}, review your list and confirm order`}
        lede="Your partner discount applies to the whole list. Select your delivery option, review the list and confirm your order to schedule a representative slot."
      />

      <div className="mt-9 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Lines */}
        <div className="flex flex-col gap-3">
          {lines.map((line) => (
            <div
              key={line.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-background">
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
                <div className="font-display text-[14.5px] font-bold">{line.name}</div>
                <div className="mt-1 text-[11.5px] text-muted-foreground">
                  Preventive Maintenance: {line.pmLabel} · Qty {line.qty}
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span
                    className={
                      revealed
                        ? "font-display text-[13px] text-muted-foreground line-through"
                        : "font-display text-[15px] font-extrabold"
                    }
                  >
                    {fmt(line.marketPrice * line.qty)}
                  </span>
                  {revealed && (
                    <span className="font-display text-[16px] font-extrabold text-amber-ink">
                      {fmt(line.unitPrice * line.qty)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Delivery Choices */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card mt-3">
            <h3 className="font-display text-[15px] font-bold">Delivery Choice</h3>
            <p className="text-[12.5px] text-muted-foreground mt-1">
              Select how you want to receive your solar components:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {/* Option 1: Pickup */}
              <button
                type="button"
                onClick={() => setDeliveryOption("pickup")}
                className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all ${
                  deliveryOption === "pickup"
                    ? "border-amber bg-amber-soft/20 shadow-lift"
                    : "border-border hover:border-foreground/35"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={deliveryOption === "pickup"}
                    onChange={() => setDeliveryOption("pickup")}
                    className="accent-amber"
                  />
                  <span className="font-display text-[13.5px] font-bold">
                    Pickup from Warehouse
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground mt-2 pl-5">
                  Order available for Pickup Immediately.
                </p>
              </button>

              {/* Option 2: Get it delivered */}
              <button
                type="button"
                onClick={() => setDeliveryOption("porter")}
                className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all ${
                  deliveryOption === "porter"
                    ? "border-amber bg-amber-soft/20 shadow-lift"
                    : "border-border hover:border-foreground/35"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={deliveryOption === "porter"}
                    onChange={() => setDeliveryOption("porter")}
                    className="accent-amber"
                  />
                  <span className="font-display text-[13.5px] font-bold">
                    Get it delivered to your location
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground mt-2 pl-5">
                  Powered by Porter (additional charges apply).
                </p>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-card p-5 text-[12.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-4 text-amber-ink" /> 3–6 day assured delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-amber-ink" /> Warranty registered to your partner
              account
            </span>
          </div>
        </div>

        {/* Reveal panel */}
        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <div className="label-caps text-muted-foreground">List summary</div>

          <div className="mt-4 flex justify-between text-[13.5px]">
            <span className="text-muted-foreground">Open-market reference</span>
            <span className={revealed ? "line-through text-muted-foreground" : "font-bold"}>
              {fmt(referenceTotal)}
            </span>
          </div>

          {revealed ? (
            <div className="mt-4 rounded-2xl bg-amber-soft p-5">
              <div className="inline-flex items-center gap-2 label-caps text-amber-ink">
                <PartyPopper className="size-3.5" /> Indicative JetFlo price
              </div>
              <div className="mt-2 font-display text-[2rem] leading-none font-extrabold">
                {fmt(jetfloTotal)}
              </div>
              <div className="mt-2 text-[13px] font-bold text-amber-ink">
                You save {fmt(saving)} ({pct}% off)
              </div>
              <div className="mt-3 border-t border-amber-ink/15 pt-2.5 text-[12px] text-amber-ink/90 flex justify-between">
                <span>Delivery:</span>
                <span className="font-bold">
                  {deliveryOption === "pickup"
                    ? "Pickup (Immediate)"
                    : "Porter delivery (additional)"}
                </span>
              </div>
              <p className="mt-3 text-[11.5px] text-muted-foreground italic">
                Indicative only, pending vendor lock. GST, freight and final figures are confirmed
                in your written quote.
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={confirmingOrder}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-colors hover:bg-amber/90 disabled:opacity-50"
          >
            {confirmingOrder ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Confirm Order &amp; Book Slot <ArrowRight className="size-4" />
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Order details will be confirmed directly during your booked slot.
          </p>
        </aside>
      </div>

      {/* Connect with Representative */}
      <section className="mt-16 border-t border-border pt-12 pb-8">
        <div className="mx-auto max-w-[620px] text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Connect with our representative
          </h2>
          <p className="mt-3 text-[14.5px] text-muted-foreground leading-relaxed">
            Need help customising your kit size, discussing specific warehouse locations, or
            planning Porter last-mile transit? Book a 30-minute call with our solar supply desk.
          </p>
          <div className="mt-7">
            <a
              href="https://calendly.com/vivek-venugopal-claroenergy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-[14px] font-extrabold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              Book a 30-Min Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
