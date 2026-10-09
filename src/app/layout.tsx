import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { STORAGE_KEY, THEMES } from "@/lib/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fab.tf · Dépôts GitHub de fte",
  description: "Liste moderne et responsive de tous les dépôts publics GitHub de l’utilisateur fte.",
};

// Applique un thème tiré au hasard à chaque chargement, avant le premier rendu
// (anti-flash). La logique doit rester alignée avec src/lib/themes.ts.
const themeBootstrapScript = `(function(){try{
var themes=${JSON.stringify(THEMES)};
var n=themes.length;
var forced=((new URLSearchParams(location.search).get('theme'))||(new URLSearchParams(location.hash.replace(/^#/,'')).get('theme'))||'').trim().toLowerCase();
var last=null;try{last=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});}catch(e){}
var chosen=null;
for(var q=0;q<n;q++){if(themes[q].id===forced){chosen=themes[q];break;}}
if(!chosen){
var pool=[];for(var p=0;p<n;p++){if(themes[p].id!==last){pool.push(themes[p]);}}
if(pool.length===0){pool=themes;}
chosen=pool[Math.floor(Math.random()*pool.length)];
}
try{localStorage.setItem(${JSON.stringify(STORAGE_KEY)},chosen.id);}catch(e){}
var dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
var c=dark?chosen.dark:chosen.light;
var r=document.documentElement;
r.dataset.theme=chosen.id;
r.dataset.themeForced=forced;
r.style.setProperty('--accent',c.accent);
r.style.setProperty('--page-from',c.from);
r.style.setProperty('--page-via',c.via);
r.style.setProperty('--page-to',c.to);
r.style.setProperty('--card-border',c.border);
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N88SXBQS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-N88SXBQS'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N88SXBQS');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
