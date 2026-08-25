import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type CityContextValue = {
  selectedCity: string | null;
  ready: boolean;
  setCity: (city: string | null) => void;
};

const CityContext = createContext<CityContextValue | null>(null);

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("jetflo.selectedCity");
    setSelectedCity(saved);
    setReady(true);
  }, []);

  const setCity = (city: string | null) => {
    setSelectedCity(city);
    if (city) {
      localStorage.setItem("jetflo.selectedCity", city);
    } else {
      localStorage.removeItem("jetflo.selectedCity");
    }
  };

  return (
    <CityContext.Provider value={{ selectedCity, ready, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCity must be used within a CityProvider");
  return ctx;
}
