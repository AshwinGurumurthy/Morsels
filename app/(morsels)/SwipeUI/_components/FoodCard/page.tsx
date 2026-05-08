import styles from "./page.module.css";
import type { Flash, Food } from "../../_lib/types";

export default function FoodCard({
  food,
  count,
  flash,
  onPick,
}: {
  food: Food | null;
  count: number;
  flash: Flash;
  onPick: () => void;
}) {
  if (!food) {
    return <div className={`${styles.card} ${styles.loading}`}>Loading…</div>;
  }
  return (
    <button
      type="button"
      className={styles.card}
      onClick={onPick}
      aria-label={`Pick ${food.name}`}
    >
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={food.image} alt={food.name} className={styles.image} />
        <div className={styles.imageOverlay} />
        <Pips count={count} flash={flash} />
        <FlashOverlay flash={flash} count={count} />
        <div className={styles.titleArea}>
          <div className={styles.foodName}>{food.name}</div>
          <div className={styles.foodMeta}>
            {food.cookTime} min · {food.calories} cal
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.description}>{food.description}</p>
        <div className={styles.tags}>
          {food.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function Pips({ count, flash }: { count: number; flash: Flash }) {
  return (
    <div className={styles.pips}>
      {[0, 1, 2].map((i) => {
        const filled = i < count;
        const justFilled = !!flash && i === count - 1;
        const cls = [styles.pip];
        if (filled) cls.push(styles.pipFilled);
        if (justFilled) cls.push(styles.pipPop);
        return <div key={i} className={cls.join(" ")} />;
      })}
    </div>
  );
}

function FlashOverlay({ flash, count }: { flash: Flash; count: number }) {
  if (!flash) return null;
  return (
    <div className={styles.flashWrap}>
      <div
        key={flash.key}
        className={flash.unlock ? styles.unlock : styles.floatUp}
      >
        {flash.unlock ? "✨ Options unlocked" : `+1 · ${count}/3`}
      </div>
    </div>
  );
}
