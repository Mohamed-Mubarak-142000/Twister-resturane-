"use client";

import { create } from "zustand";

interface UIStore {
  isLoading: boolean;
  isMenuOpen: boolean;
  activeCategory: string;
  searchQuery: string;
  selectedProduct: string | null;

  setLoading: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  setSelectedProduct: (id: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isLoading: true,
  isMenuOpen: false,
  activeCategory: "pizza",
  searchQuery: "",
  selectedProduct: null,

  setLoading: (v) => set({ isLoading: v }),
  setMenuOpen: (v) => set({ isMenuOpen: v }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedProduct: (id) => set({ selectedProduct: id }),
}));
