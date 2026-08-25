import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lead = { name: string; phone: string; city: string; email: string; company?: string };

type LeadContextValue = {
  lead: Lead | null;
  /** true once we've read localStorage on the client */
  ready: boolean;
  saveLead: (lead: Lead) => void;
  clearLead: () => void;
};

const STORAGE_KEY = "jetflo.lead.v1";
const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Lead;
        if (parsed?.name && parsed?.phone && parsed?.city && parsed?.email) setLead(parsed);
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  const saveLead = useCallback((next: Lead) => {
    setLead(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in memory only */
    }
  }, []);

  const clearLead = useCallback(() => {
    setLead(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo<LeadContextValue>(
    () => ({ lead, ready, saveLead, clearLead }),
    [lead, ready, saveLead, clearLead],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside LeadProvider");
  return ctx;
}
