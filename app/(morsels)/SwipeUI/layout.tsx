"use client";

import { usePathname } from "next/navigation";
import { AppProvider, useApp } from "./_components/AppProvider/page";
import Header from "./_components/Header/page";
import styles from "./layout.module.css";

function ThemedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, picks } = useApp();
  const themeClass = theme === "light" ? styles.light : styles.dark;
  return (
    <div className={`${styles.page} ${themeClass}`}>
      <Header />
      <div key={pathname} className={styles.viewWrapper}>
        {children}
      </div>
      <footer className={styles.footer}>{picks.length} saved</footer>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemedShell>{children}</ThemedShell>
    </AppProvider>
  );
}
