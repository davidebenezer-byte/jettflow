import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

import { CITIES, pickupHub } from "@/lib/cities";
import { useLead } from "@/lib/lead";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber";
const labelCls = "label-caps text-muted-foreground";

export function CityGate() {
  const { lead, ready, saveLead } = useLead();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!ready || lead) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10)))
      next.phone = "Enter a valid 10-digit mobile number.";
    if (!city) next.city = "Choose the city you're buying for.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    saveLead({ name: name.trim(), phone: phone.replace(/\D/g, "").slice(-10), city });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tell us where you're buying for"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-foreground/60 p-4 backdrop-blur-sm sm:items-center"
    >
      <div className="my-auto w-full max-w-[440px] overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
        <div className="border-b border-border px-7 pt-7 pb-6">
          <span className="label-caps inline-flex items-center gap-2 rounded-full bg-amber-soft px-3 py-1.5 text-amber-ink">
            <MapPin className="size-3.5" /> Before you browse
          </span>
          <h2 className="mt-4 font-display text-[22px] leading-tight">
            Tell us where you're buying for
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Stock, pickup warehouse and delivery timelines change by city. Three details and you're
            in.
          </p>
        </div>

        <form onSubmit={submit} noValidate className="px-7 py-6">
          <div className="grid gap-4">
            <div>
              <label className={labelCls} htmlFor="gate-name">
                Full name
              </label>
              <input
                id="gate-name"
                className={inputCls}
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
              <label className={labelCls} htmlFor="gate-phone">
                Mobile number
              </label>
              <input
                id="gate-phone"
                className={inputCls}
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
              <label className={labelCls} htmlFor="gate-city">
                Which city are you from?
              </label>
              <select
                id="gate-city"
                className={inputCls}
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

          {city && (
            <p className="mt-4 rounded-xl bg-background p-3.5 text-[12px] text-muted-foreground">
              Pickup point for {city}: <b className="text-foreground">{pickupHub(city)}</b>. Site
              delivery is available too, 3–6 days.
            </p>
          )}

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-colors hover:bg-amber/90"
          >
            Start browsing <ArrowRight className="size-4" />
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            We only use this to price, stock and deliver your order.
          </p>
        </form>
      </div>
    </div>
  );
}
