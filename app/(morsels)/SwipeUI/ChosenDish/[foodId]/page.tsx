"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import SectionShell from "../../_components/SectionShell/page";
import { findFood } from "../../_lib/helpers";
import styles from "./page.module.css";

const OPTIONS = [
  {
    key: "Cook",
    icon: "🍳",
    label: "Make at home",
    sub: "Get ingredients & order them",
  },
  {
    key: "Takeout",
    icon: "🥡",
    label: "Order takeout",
    sub: "Top 5 spots near you",
  },
  {
    key: "DineIn",
    icon: "🍽️",
    label: "Dine in",
    sub: "Book or visit a restaurant",
  },
] as const;

export default function ChosenDishPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = use(params);
  const router = useRouter();
  const food = findFood(foodId);

  if (!food) {
    return (
      <SectionShell>
        <div className={styles.notFound}>Food not found</div>
      </SectionShell>
    );
  }

  return (
    <SectionShell heroSrc={food.image} heroAlt={food.name}>
      <div className={styles.head}>
        <div className={styles.name}>{food.name}</div>
        <div className={styles.meta}>
          {food.category} · {food.cookTime} min · {food.calories} cal
        </div>
      </div>
      <div className={styles.options}>
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            className={styles.row}
            onClick={() => router.push(`/SwipeUI/${o.key}/${food._id}`)}
          >
            <span className={styles.icon}>{o.icon}</span>
            <span className={styles.text}>
              <span className={styles.label}>{o.label}</span>
              <span className={styles.sub}>{o.sub}</span>
            </span>
            <span className={styles.chevron}>›</span>
          </button>
        ))}
        <button
          className={styles.cancel}
          onClick={() => router.push("/SwipeUI")}
        >
          Cancel
        </button>
      </div>
    </SectionShell>
  );
}
