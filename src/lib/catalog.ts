import inverter2kw from "@/assets/inverter-2kw.jpg";
import inverter3kw from "@/assets/inverter-3kw.jpg";
import inverter5kw from "@/assets/inverter-5kw.jpg";
import panels4 from "@/assets/panels-4.jpg";
import panels6 from "@/assets/panels-6.jpg";
import panels10 from "@/assets/panels-10.jpg";
import mounting from "@/assets/mounting.jpg";
import wiring from "@/assets/wiring.jpg";
import bos from "@/assets/bos.jpg";
import kit2kw from "@/assets/kit-2kw.jpg";
import kit3kw from "@/assets/kit-3kw.jpg";
import kit5kw from "@/assets/kit-5kw.jpg";
import acdb from "@/assets/acdb.jpg";
import dcdb from "@/assets/dcdb.jpg";
import earthing from "@/assets/earthing.jpg";
import surge from "@/assets/surge.jpg";
import connectors from "@/assets/connectors.jpg";
import meter from "@/assets/meter.jpg";

/** JetFlo partner price is a flat 15% below the open-market reference. */
export const JETFLO_DISCOUNT = 0.15;
export const DISCOUNT = { kit: 0.15, part: 0.15, inverterPart: 0.15 };

/** JetFlo price for a market figure. */
export function jetfloPrice(market: number) {
  return market * (1 - JETFLO_DISCOUNT);
}


export type PmPlan = { yrs: string; cost: number };

export const PM_PLANS: Record<"part" | "inverter" | "kit", PmPlan[]> = {
  part: [
    { yrs: "No PM plan", cost: 0 },
    { yrs: "3-yr PM", cost: 299 },
    { yrs: "5-yr PM", cost: 449 },
  ],
  inverter: [
    { yrs: "No PM plan", cost: 0 },
    { yrs: "3-yr PM", cost: 499 },
    { yrs: "5-yr PM", cost: 899 },
  ],
  kit: [
    { yrs: "No PM plan", cost: 0 },
    { yrs: "3-yr PM", cost: 999 },
    { yrs: "5-yr PM", cost: 1499 },
  ],
};

export type Product = {
  id: string;
  kind: "inverter" | "part";
  category: string;
  categoryLabel: string;
  qty?: string;
  sizeBadge?: string;
  name: string;
  market: number;
  desc: string;
  vendor?: string;
  warranty: string;
  img: string;
};

export const INVERTERS: Product[] = [
  {
    id: "inv-2kw",
    kind: "inverter",
    category: "inverters",
    categoryLabel: "Inverters",
    sizeBadge: "2kW",
    name: "JetFlo Volt 2kW Inverter",
    market: 16306,
    desc: "Single-string, grid-tied, sized for a 2kW starter roof.",
    warranty: "5-yr JetFlo warranty",
    img: inverter2kw,
  },
  {
    id: "inv-3kw",
    kind: "inverter",
    category: "inverters",
    categoryLabel: "Inverters",
    sizeBadge: "3kW",
    name: "JetFlo Volt 3kW Inverter",
    market: 22341,
    desc: "Twin-string, our best-selling inverter — sized for most Indian homes.",
    warranty: "5-yr JetFlo warranty",
    img: inverter3kw,
  },
  {
    id: "inv-5kw",
    kind: "inverter",
    category: "inverters",
    categoryLabel: "Inverters",
    sizeBadge: "5kW",
    name: "JetFlo Volt 5kW Inverter",
    market: 37622,
    desc: "Hybrid-ready, twin-string, DCDB/ACDB built in — sized for larger homes.",
    warranty: "5-yr JetFlo warranty",
    img: inverter5kw,
  },
];

export const PARTS: Product[] = [
  {
    id: "pan-2kw",
    kind: "part",
    category: "panels",
    categoryLabel: "For 2kW roof",
    qty: "× 4",
    name: "545W Mono PERC Panel — Set of 4",
    market: 65192,
    desc: "Recommended set for a 2kW roof. Vendor currently fulfilling: revealed inside.",
    vendor: "Waaree",
    warranty: "3-yr top-up warranty",
    img: panels4,
  },
  {
    id: "pan-3kw",
    kind: "part",
    category: "panels",
    categoryLabel: "For 3kW roof",
    qty: "× 6",
    name: "545W Mono PERC Panel — Set of 6",
    market: 105562,
    desc: "Recommended set for a 3kW roof. Vendor currently fulfilling: revealed inside.",
    vendor: "Adani Solar",
    warranty: "3-yr top-up warranty",
    img: panels6,
  },
  {
    id: "pan-5kw",
    kind: "part",
    category: "panels",
    categoryLabel: "For 5kW roof",
    qty: "× 10",
    name: "545W Mono PERC Panel — Set of 10",
    market: 181897,
    desc: "Recommended set for a 5kW roof. Vendor currently fulfilling: revealed inside.",
    vendor: "Tata Power Solar",
    warranty: "3-yr top-up warranty",
    img: panels10,
  },
  {
    id: "mount-2kw",
    kind: "part",
    category: "mounting",
    categoryLabel: "For 2kW roof",
    name: "Mounting Structure Kit — 2kW",
    market: 3951,
    desc: "Cyclone-rated aluminium structure, custom-sized for 2kW roof.",
    vendor: "Rotomag Fabrication",
    warranty: "3-yr top-up warranty",
    img: mounting,
  },
  {
    id: "mount-3kw",
    kind: "part",
    category: "mounting",
    categoryLabel: "For 3kW roof",
    name: "Mounting Structure Kit — 3kW",
    market: 4959,
    desc: "Cyclone-rated aluminium structure, custom-sized for 3kW roof.",
    vendor: "Rotomag Fabrication",
    warranty: "3-yr top-up warranty",
    img: mounting,
  },
  {
    id: "mount-5kw",
    kind: "part",
    category: "mounting",
    categoryLabel: "For 5kW roof",
    name: "Mounting Structure Kit — 5kW",
    market: 9537,
    desc: "Cyclone-rated aluminium structure, custom-sized for 5kW roof.",
    vendor: "Rotomag Fabrication",
    warranty: "3-yr top-up warranty",
    img: mounting,
  },
  {
    id: "wiring-bundle-2kw",
    kind: "part",
    category: "wiring",
    categoryLabel: "For 2kW roof",
    name: "Wiring / Earthing / BOS Bundle — 2kW",
    market: 8526,
    desc: "DC/AC cabling, MC4 connectors, earthing kit, and BOS hardware bundle (17 items total).",
    vendor: "Polycab",
    warranty: "3-yr top-up warranty",
    img: wiring,
  },
  {
    id: "wiring-bundle-3kw",
    kind: "part",
    category: "wiring",
    categoryLabel: "For 3kW roof",
    name: "Wiring / Earthing / BOS Bundle — 3kW",
    market: 9204,
    desc: "DC/AC cabling, MC4 connectors, earthing kit, and BOS hardware bundle (17 items total).",
    vendor: "Polycab",
    warranty: "3-yr top-up warranty",
    img: wiring,
  },
  {
    id: "wiring-bundle-5kw",
    kind: "part",
    category: "wiring",
    categoryLabel: "For 5kW roof",
    name: "Wiring / Earthing / BOS Bundle — 5kW",
    market: 9516,
    desc: "DC/AC cabling, MC4 connectors, earthing kit, and BOS hardware bundle (17 items total).",
    vendor: "Polycab",
    warranty: "3-yr top-up warranty",
    img: wiring,
  },
  {
    id: "acdb-2kw",
    kind: "part",
    category: "bos",
    categoryLabel: "For 2kW roof",
    name: "ACDB Module — 2kW (1P / 3P)",
    market: 1312,
    desc: "AC distribution board with MCB, SPD and isolator, pre-wired and IP65 rated.",
    vendor: "Havells",
    warranty: "3-yr top-up warranty",
    img: acdb,
  },
  {
    id: "acdb-3kw",
    kind: "part",
    category: "bos",
    categoryLabel: "For 3kW roof",
    name: "ACDB Module — 3kW (1P / 3P)",
    market: 1417,
    desc: "AC distribution board with MCB, SPD and isolator, pre-wired and IP65 rated.",
    vendor: "Havells",
    warranty: "3-yr top-up warranty",
    img: acdb,
  },
  {
    id: "acdb-5kw",
    kind: "part",
    category: "bos",
    categoryLabel: "For 5kW roof",
    name: "ACDB Module — 5kW (1P / 3P)",
    market: 1465,
    desc: "AC distribution board with MCB, SPD and isolator, pre-wired and IP65 rated.",
    vendor: "Havells",
    warranty: "3-yr top-up warranty",
    img: acdb,
  },
  {
    id: "dcdb-2kw",
    kind: "part",
    category: "bos",
    categoryLabel: "For 2kW roof",
    name: "DCDB Module — 2kW (2-in 1-out)",
    market: 1312,
    desc: "DC distribution board with string fuses, DC isolator and surge protection.",
    vendor: "Elmex",
    warranty: "3-yr top-up warranty",
    img: dcdb,
  },
  {
    id: "dcdb-3kw",
    kind: "part",
    category: "bos",
    categoryLabel: "For 3kW roof",
    name: "DCDB Module — 3kW (2-in 1-out)",
    market: 1417,
    desc: "DC distribution board with string fuses, DC isolator and surge protection.",
    vendor: "Elmex",
    warranty: "3-yr top-up warranty",
    img: dcdb,
  },
  {
    id: "dcdb-5kw",
    kind: "part",
    category: "bos",
    categoryLabel: "For 5kW roof",
    name: "DCDB Module — 5kW (2-in 1-out)",
    market: 1465,
    desc: "DC distribution board with string fuses, DC isolator and surge protection.",
    vendor: "Elmex",
    warranty: "3-yr top-up warranty",
    img: dcdb,
  },

  {
    id: "acc-meter",
    kind: "part",
    category: "monitoring",
    categoryLabel: "All roof sizes",
    name: "Net Meter & Monitoring Unit",
    market: 7500,
    desc: "Bi-directional net meter with generation monitoring, DISCOM-approval ready.",
    vendor: "Secure Meters",
    warranty: "3-yr top-up warranty",
    img: meter,
  },
];

export const PART_FILTERS = [
  { key: "all", label: "All parts" },
  { key: "panels", label: "Panels" },
  { key: "mounting", label: "Mounting" },
  { key: "wiring", label: "Wiring, Earthing & BOS" },
  { key: "bos", label: "ACDB / DCDB Modules" },
  { key: "monitoring", label: "Metering" },
];


export type Kit = {
  id: string;
  tag: string;
  kw: string;
  name: string;
  market: number;
  featured?: boolean;
  img: string;
  desc: string;
  contents: { label: string; mfg: boolean }[];
};

export const KITS: Kit[] = [
  {
    id: "kit-2kw",
    tag: "The Starter Roof",
    kw: "2 kW",
    name: "JetFlo 2kW Kit",
    market: 96600,
    img: kit2kw,
    desc: "Runs the everyday load of a small home — fans, lights, TV, fridge and a single AC in short bursts.",
    contents: [
      { label: "JetFlo Volt 2kW Inverter", mfg: true },
      { label: "4 × 545W Panels", mfg: false },
      { label: "Mounting structure kit", mfg: false },
      { label: "Wiring, BOS & combo box", mfg: false },
    ],
  },
  {
    id: "kit-3kw",
    tag: "The Everyday Best-Seller",
    kw: "3 kW",
    name: "JetFlo 3kW Kit",
    market: 144900,
    featured: true,
    img: kit3kw,
    desc: "The sweet spot for most Indian homes — covers a full family's load including 1–2 ACs through the day.",
    contents: [
      { label: "JetFlo Volt 3kW Inverter", mfg: true },
      { label: "6 × 545W Panels", mfg: false },
      { label: "Cyclone-rated mounting structure", mfg: false },
      { label: "Wiring, BOS & combo box", mfg: false },
    ],
  },
  {
    id: "kit-5kw",
    tag: "The Full-Load Roof",
    kw: "5 kW",
    name: "JetFlo 5kW Kit",
    market: 241500,
    img: kit5kw,
    desc: "Built for larger homes and small commercial units running multiple ACs, pumps and machines.",
    contents: [
      { label: "JetFlo Volt 5kW Inverter (hybrid-ready)", mfg: true },
      { label: "10 × 545W Panels", mfg: false },
      { label: "Cyclone-rated mounting structure", mfg: false },
      { label: "Wiring, BOS, DCDB/ACDB & surge protection", mfg: false },
    ],
  },
];

export const ALL_PRODUCTS = [...INVERTERS, ...PARTS];

export function findProduct(id: string) {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function fmt(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
