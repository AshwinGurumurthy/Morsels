import styles from "./page.module.css";

export default function SectionShell({
  heroSrc,
  heroAlt,
  children,
}: {
  heroSrc?: string;
  heroAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.shell}>
      {heroSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={heroSrc} alt={heroAlt ?? ""} className={styles.hero} />
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
