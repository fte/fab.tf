"use client";

import { useEffect, useState } from "react";
import { applyTheme, getHourlyTheme, type HourlyTheme } from "@/lib/themes";

/**
 * Applique le thème de l'heure courante et affiche le badge correspondant.
 * Le script inline du layout applique déjà le thème avant le premier rendu
 * (anti-flash) ; ce composant le maintient à jour et gère le changement de
 * mode clair/sombre ainsi que le passage à l'heure suivante.
 */
export default function HourlyThemeBadge() {
  const [current, setCurrent] = useState<{ key: string; theme: HourlyTheme } | null>(null);

  useEffect(() => {
    const update = () => {
      const next = getHourlyTheme();
      applyTheme(next.theme, window.matchMedia("(prefers-color-scheme: dark)").matches);
      setCurrent({ key: next.key, theme: next.theme });
    };

    update();
    const interval = window.setInterval(update, 60_000);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", update);

    return () => {
      window.clearInterval(interval);
      media.removeEventListener("change", update);
    };
  }, []);

  if (!current) {
    return null;
  }

  const when = current.key.replace("T", " · ");

  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400" data-hour-key={current.key}>
      <span aria-hidden="true">{current.theme.emoji}</span> Thème « {current.theme.name} » ·{" "}
      {when}h UTC
    </p>
  );
}
