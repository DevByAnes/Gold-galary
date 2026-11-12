import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartLine {
  slug: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

export const MAX_QTY = 10;

// skipHydration: the server and first client render both see an empty store; StoreHydrator
// rehydrates from localStorage after mount so there is no hydration mismatch.
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (slug, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.slug === slug);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
              ),
            };
          }
          return { lines: [...s.lines, { slug, qty: Math.min(MAX_QTY, qty) }] };
        }),
      setQty: (slug, qty) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.slug === slug ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l,
          ),
        })),
      remove: (slug) => set((s) => ({ lines: s.lines.filter((l) => l.slug !== slug) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "rezaei-cart", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

interface WishlistState {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      slugs: [],
      toggle: (slug) =>
        set((s) => ({
          slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [...s.slugs, slug],
        })),
      remove: (slug) => set((s) => ({ slugs: s.slugs.filter((x) => x !== slug) })),
    }),
    { name: "rezaei-wishlist", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

export function rehydrateShopStores() {
  void useCart.persist.rehydrate();
  void useWishlist.persist.rehydrate();
}

export const selectCartCount = (s: CartState) => s.lines.reduce((n, l) => n + l.qty, 0);
