import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

type Fields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  interest: string;
  notes: string;
};

const EMPTY: Fields = {
  name: "",
  company: "",
  phone: "",
  email: "",
  city: "",
  interest: "Pre-configured kit (2/3/5 kW)",
  notes: "",
};

const INTERESTS = [
  "Pre-configured kit (2/3/5 kW)",
  "JetFlo Volt inverters only",
  "Panels, mounting, wiring & BOS",
  "Become a JetFlo partner",
  "Something else",
];

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber";
const labelCls = "label-caps text-muted-foreground";

export function LeadForm({ summary }: { summary?: string | undefined }) {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, "").slice(-10)))
      next.phone = "Enter a valid 10-digit mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.city.trim().length < 2) next.city = "Which city or district are you in?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("A few details are still missing.");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
      toast.success("Enquiry received — our team will call you within one working day.");
    }, 700);
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-amber bg-amber-soft p-8 text-center shadow-card">
        <h3 className="font-display text-xl">Thanks, {values.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-2.5 max-w-[420px] text-[13.5px] text-amber-ink">
          Your enquiry is with our AP &amp; Telangana supply desk. Expect a call on{" "}
          <b className="text-foreground">{values.phone}</b> within one working day with your
          partner quote and current stock position.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setDone(false);
          }}
          className="mt-6 rounded-full border border-border bg-card px-5 py-2.5 font-display text-[12.5px] font-bold"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="lead-name">
            Full name *
          </label>
          <input
            id="lead-name"
            className={inputCls}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Ravi Kumar"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1.5 text-[11.5px] text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="lead-phone">
            Mobile number *
          </label>
          <input
            id="lead-phone"
            className={inputCls}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="98765 43210"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1.5 text-[11.5px] text-destructive">{errors.phone}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="lead-email">
            Email *
          </label>
          <input
            id="lead-email"
            className={inputCls}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.in"
            inputMode="email"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1.5 text-[11.5px] text-destructive">{errors.email}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="lead-city">
            City / district *
          </label>
          <input
            id="lead-city"
            className={inputCls}
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Vijayawada"
          />
          {errors.city && <p className="mt-1.5 text-[11.5px] text-destructive">{errors.city}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="lead-company">
            Firm name (optional)
          </label>
          <input
            id="lead-company"
            className={inputCls}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Sunrise Solar Works"
            autoComplete="organization"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="lead-interest">
            What do you need? *
          </label>
          <select
            id="lead-interest"
            className={inputCls}
            value={values.interest}
            onChange={(e) => set("interest", e.target.value)}
          >
            {INTERESTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="lead-notes">
            Anything else? (optional)
          </label>
          <textarea
            id="lead-notes"
            rows={4}
            className={inputCls}
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder={summary ? "Add site details, timelines or quantities…" : "Sizes, quantities, site location, timeline…"}
          />
        </div>
      </div>

      {summary && (
        <div className="mt-4 rounded-2xl bg-background p-4 text-[12.5px] text-muted-foreground">
          <span className="label-caps text-muted-foreground">Attached to this enquiry</span>
          <p className="mt-1.5 whitespace-pre-line text-foreground">{summary}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-[13.5px] font-extrabold text-accent-foreground transition-colors hover:bg-amber/90 disabled:opacity-50"
      >
        {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {sending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        We use these details only to prepare your quote and call you back. No spam, ever.
      </p>
    </form>
  );
}
