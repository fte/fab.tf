import RepoList, { Repo } from "@/components/RepoList";

async function getRepos(): Promise<Repo[]> {
  const res = await fetch("https://api.github.com/users/fte/repos?per_page=100", {
    next: { revalidate: 3600 }, // revalidate every hour
    headers: {
      'Accept': 'application/vnd.github+json',
    },
  });
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

export default async function Home() {
  const repos = await getRepos();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">fab.tf · Dépôts GitHub de fte</h1>
      <RepoList repos={repos} />
      <footer className="mt-16 text-xs text-zinc-500 text-center">
        Données publiques issues de l’API GitHub · <a href="https://github.com/fte" className="underline hover:text-blue-600" target="_blank" rel="noopener noreferrer">@fte</a>
      </footer>
    </div>
  );
}
