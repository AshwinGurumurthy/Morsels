"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import SectionShell from "../../_components/SectionShell/page";
import { useApp } from "../../_components/AppProvider/page";
import { findFood } from "../../_lib/helpers";
import styles from "./page.module.css";

export default function CookPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = use(params);
  const router = useRouter();
  const { addPick, advanceFromPick } = useApp();
  const [cart, setCart] = useState<string[]>([]);
  const food = findFood(foodId);

  if (!food) {
    return (
      <SectionShell>
        <div className={styles.notFound}>Food not found</div>
      </SectionShell>
    );
  }

  const allChecked = cart.length === food.ingredients.length;
  const toggle = (ing: string) =>
    setCart(cart.includes(ing) ? cart.filter((x) => x !== ing) : [...cart, ing]);
  const toggleAll = () => setCart(allChecked ? [] : [...food.ingredients]);

  const placeOrder = () => {
    addPick(food);
    advanceFromPick(food);
    router.push("/SwipeUI");
  };

  return (
    <SectionShell heroSrc={food.image} heroAlt={food.name}>
      <div className={styles.head}>
        <div>
          <div className={styles.name}>{food.name}</div>
          <div className={styles.meta}>
            {food.ingredients.length} ingredients
          </div>
        </div>
        <button className={styles.toggleAll} onClick={toggleAll}>
          {allChecked ? "Clear all" : "Select all"}
        </button>
      </div>

      <div className={styles.list}>
        {food.ingredients.map((ing) => {
          const checked = cart.includes(ing);
          return (
            <label key={ing} className={styles.row}>
              <span
                className={`${styles.box} ${checked ? styles.boxOn : ""}`}
                aria-hidden
              >
                {checked ? "✓" : ""}
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(ing)}
                className={styles.nativeCheck}
              />
              <span className={styles.ingName}>{ing}</span>
            </label>
          );
        })}
      </div>

      <div className={styles.footerBar}>
        <div className={styles.cartCount}>{cart.length} in cart</div>
        <div className={styles.actions}>
          <button
            className={styles.btnGhost}
            onClick={() => router.push("/SwipeUI")}
          >
            Cancel
          </button>
          <button
            className={`${styles.btnPrimary} ${
              cart.length === 0 ? styles.btnDisabled : ""
            }`}
            onClick={placeOrder}
            disabled={cart.length === 0}
          >
            Place order
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
