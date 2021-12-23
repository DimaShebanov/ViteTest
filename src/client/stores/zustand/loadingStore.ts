import create from "zustand-store-addons";

import { LoadingStore } from "./loadingStore.interfaces";

export const useLoadingStore = create<Partial<LoadingStore>>((set) => ({
  loading: false,
  set: (loading: boolean) => set({ loading }),
}));
