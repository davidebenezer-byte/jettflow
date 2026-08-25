export const CITIES = [
  "Hyderabad",
  "Bangalore",
  "Goa",
  "Visakhapatnam",
  "Vijayawada",
  "Chennai",
  "Pune",
  "Kochi",
  "Other city",
] as const;

export type City = (typeof CITIES)[number];

/** Warehouses that support in-person pickup. */
export const PICKUP_HUBS: Record<string, string> = {
  Hyderabad: "Kukatpally warehouse, Hyderabad",
  Bangalore: "Peenya Industrial Area warehouse, Bangalore",
  Goa: "Verna Industrial Estate warehouse, Goa",
  Visakhapatnam: "Autonagar warehouse, Visakhapatnam",
  Vijayawada: "Gollapudi warehouse, Vijayawada",
  Chennai: "Ambattur warehouse, Chennai",
  Pune: "Bhosari warehouse, Pune",
  Kochi: "Kalamassery warehouse, Kochi",
};

export function pickupHub(city?: string) {
  return (city && PICKUP_HUBS[city]) || "Nearest JetFlo regional warehouse";
}

/** Indicative last-mile charge, Porter-fulfilled. */
export const DELIVERY_FEE = 2499;

export const CALENDLY_URL = "https://calendly.com/jetflo-supply/30min";
