import { atom } from "jotai";

// Load history from localStorage or default to empty array
const storedHistory = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("searchHistory") || "[]")
  : [];

export const searchHistoryAtom = atom(storedHistory);
export const favouritesAtom = atom([]);

// Persist changes to localStorage automatically
searchHistoryAtom.onMount = (set) => {
  if (typeof window !== "undefined") {
    // Listen for changes to localStorage (from other tabs)
    const handler = () => {
      set(JSON.parse(localStorage.getItem("searchHistory") || "[]"));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }
};

export const setSearchHistoryWithStorage = (set) => (updater) => {
  set((prev) => {
    const newHistory = typeof updater === "function" ? updater(prev) : updater;
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    return newHistory;
  });
};


//helper
export function updateSearchHistory(setSearchHistory, newHistory) {
  localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  setSearchHistory(newHistory);
}

export function updateFavourites(setter, newFavourites) {
  localStorage.setItem("favourites", JSON.stringify(newFavourites));
  setter(newFavourites);
}
