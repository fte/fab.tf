// Thème appliqué côté client : tiré aléatoirement à chaque chargement,
// avec mémorisation du précédent pour ne jamais répéter deux fois de suite.

export type ThemeColors = {
  accent: string;
  from: string;
  via: string;
  to: string;
  border: string;
};

export type SiteTheme = {
  id: string;
  name: string;
  emoji: string;
  light: ThemeColors;
  dark: ThemeColors;
};

export const STORAGE_KEY = "fab.tf.theme";

export const THEMES: SiteTheme[] = [
  {
    id: "ocean",
    name: "Océan",
    emoji: "🌊",
    light: { accent: "#0284c7", from: "#f0f9ff", via: "#ffffff", to: "#cffafe", border: "#bae6fd" },
    dark: { accent: "#38bdf8", from: "#082f49", via: "#09090b", to: "#164e63", border: "#0c4a6e" },
  },
  {
    id: "sunset",
    name: "Crépuscule",
    emoji: "🌅",
    light: { accent: "#ea580c", from: "#fff7ed", via: "#ffffff", to: "#ffe4e6", border: "#fed7aa" },
    dark: { accent: "#fb923c", from: "#431407", via: "#09090b", to: "#4c0519", border: "#7c2d12" },
  },
  {
    id: "forest",
    name: "Forêt",
    emoji: "🌲",
    light: { accent: "#059669", from: "#ecfdf5", via: "#ffffff", to: "#ecfccb", border: "#a7f3d0" },
    dark: { accent: "#34d399", from: "#022c22", via: "#09090b", to: "#1a2e05", border: "#064e3b" },
  },
  {
    id: "grape",
    name: "Raisin",
    emoji: "🍇",
    light: { accent: "#7c3aed", from: "#f5f3ff", via: "#ffffff", to: "#fae8ff", border: "#ddd6fe" },
    dark: { accent: "#a78bfa", from: "#2e1065", via: "#09090b", to: "#4a044e", border: "#5b21b6" },
  },
  {
    id: "gold",
    name: "Or",
    emoji: "✨",
    light: { accent: "#d97706", from: "#fffbeb", via: "#ffffff", to: "#fef9c3", border: "#fde68a" },
    dark: { accent: "#fbbf24", from: "#451a03", via: "#09090b", to: "#422006", border: "#78350f" },
  },
  {
    id: "rose",
    name: "Rose",
    emoji: "🌸",
    light: { accent: "#e11d48", from: "#fff1f2", via: "#ffffff", to: "#ffe4e6", border: "#fecdd3" },
    dark: { accent: "#fb7185", from: "#4c0519", via: "#09090b", to: "#500724", border: "#9f1239" },
  },
  {
    id: "arctic",
    name: "Arctique",
    emoji: "❄️",
    light: { accent: "#0891b2", from: "#ecfeff", via: "#ffffff", to: "#e0f2fe", border: "#a5f3fc" },
    dark: { accent: "#22d3ee", from: "#164e63", via: "#09090b", to: "#0c4a6e", border: "#155e75" },
  },
  {
    id: "lime",
    name: "Citron vert",
    emoji: "🍀",
    light: { accent: "#65a30d", from: "#f7fee7", via: "#ffffff", to: "#dcfce7", border: "#d9f99d" },
    dark: { accent: "#a3e635", from: "#1a2e05", via: "#09090b", to: "#052e16", border: "#365314" },
  },
];

/** Renvoie un thème par son id (insensible à la casse), sinon null. */
export function getThemeById(id: string | null | undefined): SiteTheme | null {
  if (!id) {
    return null;
  }
  const wanted = id.trim().toLowerCase();
  return THEMES.find((theme) => theme.id === wanted) ?? null;
}

/**
 * Thème forcé pour l'aperçu / les captures. Accepte `?theme=ocean` ou
 * `#theme=ocean`, sans se soucier de la casse ni des espaces.
 */
export function getForcedTheme(search: string, hash = ""): SiteTheme | null {
  const fromQuery = new URLSearchParams(search).get("theme");
  const fromHash = new URLSearchParams(hash.replace(/^#/, "")).get("theme");
  return getThemeById(fromQuery ?? fromHash);
}

/** Tirage aléatoire, en évitant si possible le thème précédent. */
export function pickRandomTheme(excludeId?: string | null): SiteTheme {
  const pool = excludeId ? THEMES.filter((theme) => theme.id !== excludeId) : THEMES;
  const candidates = pool.length > 0 ? pool : THEMES;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Applique un thème aux variables CSS de <html> selon le mode clair/sombre. */
export function applyTheme(theme: SiteTheme, dark: boolean): void {
  const colors = dark ? theme.dark : theme.light;
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--page-from", colors.from);
  root.style.setProperty("--page-via", colors.via);
  root.style.setProperty("--page-to", colors.to);
  root.style.setProperty("--card-border", colors.border);
}
