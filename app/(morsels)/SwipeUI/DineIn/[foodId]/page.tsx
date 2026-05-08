"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import SectionShell from "../../_components/SectionShell/page";
import RestaurantRow from "../../_components/RestaurantRow/page";
import { useApp } from "../../_components/AppProvider/page";
import { findFood, topRestaurantsFor } from "../../_lib/helpers";
import styles from "./page.module.css";

export default function DineInPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = use(params);
  const router = useRouter();
  const { addPick, advanceFromPick } = useApp();
  const food = findFood(foodId);

  if (!food) {
    return (
      <SectionShell>
        <div className={styles.notFound}>Food not found</div>
      </SectionShell>
    );
  }

  const list = topRestaurantsFor(food, 5);

  const onAct = () => {
    addPick(food);
    advanceFromPick(food);
    router.push("/SwipeUI");
  };

  return (
    <SectionShell>
      <div className={styles.head}>
        <div className={styles.label}>Dine-in for</div>
        <div className={styles.name}>{food.name}</div>
      </div>
      <div className={styles.rows}>
        {list.map((r) => (
          <RestaurantRow key={r._id} r={r} mode="dine-in" onAct={onAct} />
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
