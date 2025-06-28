import React from "react";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
};

interface RepoListProps {
  repos: Repo[];
}

export default function RepoList({ repos }: RepoListProps) {
  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Mes dépôts publics GitHub</h2>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow p-5 border border-zinc-200 dark:border-zinc-800 transition hover:shadow-lg">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
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
