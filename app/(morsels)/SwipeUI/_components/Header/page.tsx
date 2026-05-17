"use client";

import { usePathname, useRouter } from "next/navigation";
import { useApp } from "../AppProvider/page";
import { findFood } from "../../_lib/helpers";
import styles from "./page.module.css";

const ROUTE_TITLES: Record<string, { title: string; subWith?: string }> = {
  "": { title: "morsels", subWith: "intro" },
  ChosenDish: { title: "How will you have it?" },
  Cook: { title: "Make at home" },
  Takeout: { title: "Takeout near you" },
  DineIn: { title: "Dine in nearby" },
  Chat: { title: "Let's get cooking" },
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useApp();

  const segments = pathname.split("/").filter(Boolean);
  const sub = segments[1] ?? "";
  const foodId = segments[2];
  const food = foodId ? findFood(foodId) : null;

  const route = ROUTE_TITLES[sub] ?? ROUTE_TITLES[""];
  const title = route.title;
  const subtitle =
    route.subWith === "intro"
      ? "This or that — pick the one you'd rather eat"
      : food?.name ?? "";

  const isRoot = sub === "";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {!isRoot && (
          <button
            className={styles.iconBtn}
            aria-label="Cancel"
            onClick={() => router.push("/SwipeUI")}
          >
            ←
          </button>
        )}
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
      <button
        className={styles.themeToggle}
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
