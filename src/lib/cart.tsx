import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  id: string;
  name: string;
  img: string;
  /** JetFlo (discounted) unit price incl. PM fee — never shown before checkout reveal */
  unitPrice: number;
  /** Open-market reference unit price incl. PM fee */
  marketPrice: number;
  pmLabel: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  referenceTotal: number;
  jetfloTotal: number;
  addLine: (line: Omit<CartLine, "qty">) => void;
  removeLine: (id: string) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addLine = useCallback((line: Omit<CartLine, "qty">) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === line.id);
      if (existing) {
        return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { ...line, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines,
      count,
      referenceTotal: lines.reduce((s, l) => s + l.marketPrice * l.qty, 0),
      jetfloTotal: lines.reduce((s, l) => s + l.unitPrice * l.qty, 0),
      addLine,
      removeLine,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen, addLine, removeLine]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
