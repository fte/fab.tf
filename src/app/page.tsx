import Image from "next/image";
import RepoList, { Repo } from "@/components/RepoList";

async function getRepos(): Promise<Repo[]> {
  const res = await fetch("https://api.github.com/users/fte/repos?per_page=100", {
    next: { revalidate: 3600 },
    headers: { 'Accept': 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error("Failed to fetch repos");
  const allRepos = await res.json();
  return allRepos.filter((repo: Repo & { fork: boolean }) => !repo.fork);
}

export default async function Home() {
  const repos = await getRepos();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 text-foreground flex flex-col min-w-0">
      <header className="w-full px-4 py-6 flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/globe.svg" alt="fab.tf logo" width={36} height={36} className="dark:invert" />
          <span className="text-2xl font-bold tracking-tight">fab.tf</span>
        </div>
        <a href="https://github.com/fte" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M10 .3a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 5.8c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 10 .3"/></svg>
          <span>@fte</span>
        </a>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Dépôts publics GitHub de <span className="text-blue-600 dark:text-blue-400">fte</span></h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">Découvrez tous mes projets open source, mis à jour automatiquement via l’API GitHub.</p>
        </section>
        <RepoList repos={repos} />
      </main>
      <footer className="w-full py-8 text-center text-xs text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 mt-12">
        Données publiques issues de l’API GitHub · <a href="https://github.com/fte" className="underline hover:text-blue-600" target="_blank" rel="noopener noreferrer">@fte</a> · fab.tf
      </footer>
    </div>
  );
}
