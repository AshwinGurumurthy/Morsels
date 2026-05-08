"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FoodCard from "./_components/FoodCard/page";
import { useApp } from "./_components/AppProvider/page";
import type { Flash, Side } from "./_lib/types";
import styles from "./page.module.css";

export default function SwipeBoardPage() {
  const router = useRouter();
  const { left, right, pickCounts, bumpPickCount, replaceSide } = useApp();
  const [flash, setFlash] = useState<Flash>(null);

  const handlePick = (side: Side) => {
    const food = side === "left" ? left : right;
    if (!food) return;
    const next = bumpPickCount(food._id);
    const key = Date.now();
    if (next >= 3) {
      setFlash({ side, key, unlock: true });
      window.setTimeout(() => {
        setFlash(null);
        router.push(`/SwipeUI/ChosenDish/${food._id}`);
      }, 800);
    } else {
      setFlash({ side, key, unlock: false });
      replaceSide(side, food._id);
      window.setTimeout(() => setFlash(null), 900);
    }
  };

  return (
    <main className={styles.grid}>
      <FoodCard
        key={`L-${left?._id ?? "loading"}`}
        food={left}
        count={left ? pickCounts[left._id] ?? 0 : 0}
        flash={flash && flash.side === "left" ? flash : null}
        onPick={() => handlePick("left")}
      />
      <div className={styles.vsWrap}>
        <div className={styles.vs}>VS</div>
      </div>
      <FoodCard
        key={`R-${right?._id ?? "loading"}`}
        food={right}
        count={right ? pickCounts[right._id] ?? 0 : 0}
        flash={flash && flash.side === "right" ? flash : null}
        onPick={() => handlePick("right")}
      />
    </main>
  );
}
