import styles from "./page.module.css";
import type { Restaurant } from "../../_lib/types";

export default function RestaurantRow({
  r,
  mode,
  onAct,
}: {
  r: Restaurant;
  mode: "takeout" | "dine-in";
  onAct: () => void;
}) {
  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onAct();
  };
  return (
    <div className={styles.row}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={r.image} alt={r.name} className={styles.thumb} />
      <div className={styles.body}>
        <div className={styles.topLine}>
          <span className={styles.name}>{r.name}</span>
          <span className={styles.rating}>★ {r.rating.toFixed(1)}</span>
        </div>
        <div className={styles.meta}>
          {r.price} · {mode === "takeout" ? r.eta : r.distance} ·{" "}
          {r.reviews.toLocaleString()} reviews
        </div>
        <div className={styles.actions}>
          {mode === "takeout"
            ? r.takeoutLinks.map((l) => (
                <button
                  key={l.service}
                  className={styles.btnTakeout}
                  onClick={() => open(l.url)}
                >
                  {l.service}
                </button>
              ))
            : (
                <button
                  className={styles.btnDine}
                  onClick={() => open(r.mapsUrl)}
                >
                  View on Maps
                </button>
              )}
        </div>
      </div>
    </div>
  );
}
