"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { pickRandomFood } from "../../_lib/helpers";
import type { Food, Side, Theme } from "../../_lib/types";

type AppState = {
  theme: Theme;
  toggleTheme: () => void;
  left: Food | null;
  right: Food | null;
  pickCounts: Record<string, number>;
  picks: Food[];
  bumpPickCount: (foodId: string) => number;
  replaceSide: (side: Side, currentFoodId: string) => void;
  advanceFromPick: (food: Food) => void;
  addPick: (food: Food) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [left, setLeft] = useState<Food | null>(null);
  const [right, setRight] = useState<Food | null>(null);
  const [pickCounts, setPickCounts] = useState<Record<string, number>>({});
  const [picks, setPicks] = useState<Food[]>([]);

  useEffect(() => {
    if (!left && !right) {
      const a = pickRandomFood();
      const b = pickRandomFood([a._id]);
      setLeft(a);
      setRight(b);
    }
  }, [left, right]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  const bumpPickCount = (foodId: string) => {
    const next = (pickCounts[foodId] ?? 0) + 1;
    setPickCounts((prev) => ({ ...prev, [foodId]: next }));
    return next;
  };

  const replaceSide = (side: Side, currentFoodId: string) => {
    if (side === "left") setRight(pickRandomFood([currentFoodId]));
    else setLeft(pickRandomFood([currentFoodId]));
  };

  const advanceFromPick = (food: Food) => {
    if (left?._id === food._id) setLeft(pickRandomFood([food._id]));
    else if (right?._id === food._id)
      setRight(pickRandomFood([food._id]));
  };

  const addPick = (food: Food) => setPicks((p) => [...p, food]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        left,
        right,
        pickCounts,
        picks,
        bumpPickCount,
        replaceSide,
        advanceFromPick,
        addPick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
