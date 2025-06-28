This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## fab.tf – Dépôts publics GitHub de fte

Ce site présente automatiquement tous les dépôts publics de l’utilisateur GitHub [fte](https://github.com/fte) avec un design moderne, responsive, et prêt pour déploiement sur le domaine personnalisé [fab.tf](https://fab.tf).

- **Stack** : Next.js (App Router), TypeScript, Tailwind CSS
- **Données** : API publique GitHub
- **Déploiement** : Prêt pour Vercel ou tout hébergeur Next.js

### Démarrage local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le site.

### Personnalisation du domaine

Pour déployer sur fab.tf, configurez votre hébergeur (ex: Vercel) pour pointer le domaine personnalisé.

## Déploiement sur GitHub Pages

Ce site est prêt à être déployé sur GitHub Pages via Actions. Le workflow `.github/workflows/deploy.yml` construit et exporte le site statique, puis le publie automatiquement sur la branche `gh-pages`.

- L’URL de production sera : `https://fte.github.io/fab.tf/`
- Pour un domaine personnalisé (fab.tf), configurez le DNS et ajoutez un fichier `CNAME` dans le dossier `public/` avec `fab.tf` comme contenu.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
