import { CurrencyItem } from '@/types/transaction';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CurrencyStore = {
  targetCurrency: CurrencyItem;
  krwAtBottom: boolean;
  history?: {
    currency: string;
    name: string;
  }[];
  setTargetCurrency: (newTarget: CurrencyItem) => void;
  switchOrder: () => void;
  addToHistory: (newCurrency: CurrencyItem) => void;
};

const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      targetCurrency: {
        currency: 'USD',
        name: '미국 달러',
      },
      krwAtBottom: true,
      history: undefined,
      setTargetCurrency: (newTarget) => set((state) => ({ targetCurrency: newTarget })),
      switchOrder: () => set((state) => ({ krwAtBottom: !state.krwAtBottom })),
      addToHistory: (newCurrency: CurrencyItem) =>
        set((state) => {
          if (state.history?.find((hitem) => hitem.currency === newCurrency.currency)) {
            const oldHistory = state.history.filter((hi) => hi.currency !== newCurrency.currency)?.slice(0, 4);
            return { history: [newCurrency, ...oldHistory] };
          } else {
            return { history: [newCurrency, ...(state.history?.slice(0, 4) || [])] };
          }
        }),
    }),
    {
      name: 'currency-storage',
    },
  ),
);

export { useCurrencyStore };
