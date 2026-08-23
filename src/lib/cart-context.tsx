"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductBySlug, type BatikPattern } from "@/lib/products";

export type CartLine = {
  slug: string;
  size: string;
  pattern: BatikPattern;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (
    slug: string,
    size: string,
    pattern: BatikPattern,
    quantity?: number,
  ) => void;
  removeLine: (slug: string, size: string, pattern: BatikPattern) => void;
  setQuantity: (
    slug: string,
    size: string,
    pattern: BatikPattern,
    quantity: number,
  ) => void;
  clear: () => void;
  count: number;
  subtotalMYR: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "abw-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount, no alternative source for initial state
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback(
    (slug: string, size: string, pattern: BatikPattern, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find(
          (l) => l.slug === slug && l.size === size && l.pattern === pattern,
        );
        if (existing) {
          return prev.map((l) =>
            l.slug === slug && l.size === size && l.pattern === pattern
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          );
        }
        return [...prev, { slug, size, pattern, quantity }];
      });
    },
    [],
  );

  const removeLine = useCallback((slug: string, size: string, pattern: BatikPattern) => {
    setLines((prev) =>
      prev.filter((l) => !(l.slug === slug && l.size === size && l.pattern === pattern)),
    );
  }, []);

  const setQuantity = useCallback(
    (slug: string, size: string, pattern: BatikPattern, quantity: number) => {
      setLines((prev) => {
        if (quantity <= 0) {
          return prev.filter(
            (l) => !(l.slug === slug && l.size === size && l.pattern === pattern),
          );
        }
        return prev.map((l) =>
          l.slug === slug && l.size === size && l.pattern === pattern
            ? { ...l, quantity }
            : l,
        );
      });
    },
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotalMYR = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = getProductBySlug(l.slug);
        return product ? sum + product.priceMYR * l.quantity : sum;
      }, 0),
    [lines],
  );

  const value: CartContextValue = {
    lines,
    addItem,
    removeLine,
    setQuantity,
    clear,
    count,
    subtotalMYR,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
