"use client";

import React, { useEffect, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
};

interface RepoListProps {
  repos: Repo[];
}

/** Mélange de Fisher-Yates (copie). */
function shuffle<T>(input: T[]): T[] {
  const items = [...input];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export default function RepoList({ repos }: RepoListProps) {
  // Ordre serveur au premier rendu (pas de mismatch d'hydratation),
  // puis mélange à chaque chargement.
  const [items, setItems] = useState(repos);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    setItems((current) => shuffle(current));
    setRevision((value) => value + 1);
  }, []);

  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Mes dépôts publics GitHub</h2>
      <ul key={revision} className={revision > 0 ? "space-y-4 fab-fade-in" : "space-y-4"}>
        {items.map((repo) => (
          <li key={repo.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow p-5 border transition hover:shadow-lg" style={{ borderColor: "var(--card-border)" }}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold hover:underline"
              style={{ color: "var(--accent)" }}
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="mt-2 text-zinc-700 dark:text-zinc-300 text-sm">{repo.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
