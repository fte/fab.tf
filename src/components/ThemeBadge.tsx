"use client";

import { useEffect, useState } from "react";
import { applyTheme, getThemeById, type SiteTheme } from "@/lib/themes";

/**
 * Affiche le thème tiré au hasard pour ce chargement (appliqué par le script
 * inline du layout) et le ré-applique au changement de mode clair/sombre.
 */
export default function ThemeBadge() {
  const [theme, setTheme] = useState<SiteTheme | null>(null);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const sync = () => {
      const root = document.documentElement;
      const current = getThemeById(root.dataset.theme);
      if (!current) {
        return;
      }
      applyTheme(current, window.matchMedia("(prefers-color-scheme: dark)").matches);
      setTheme(current);
      setForced(Boolean(root.dataset.themeForced));
    };

    sync();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (!theme) {
    return null;
  }

  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400" data-theme-id={theme.id}>
      <span aria-hidden="true">{theme.emoji}</span> Thème « {theme.name} »{forced && " · aperçu"}
    </p>
  );
}
