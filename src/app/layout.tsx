import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { THEMES } from "@/lib/themes";

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

// Applique le thème de l'heure courante avant le premier rendu (anti-flash).
// La logique de hash doit rester alignée avec src/lib/themes.ts.
const themeBootstrapScript = `(function(){try{
var themes=${JSON.stringify(THEMES)};
var n=themes.length;
function h32(s){var h=0;for(var i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))>>>0;}return h;}
var k=new Date().toISOString().slice(0,13);
var idx=h32(k)%n;
var pk=new Date(Date.now()-3600000).toISOString().slice(0,13);
if(idx===h32(pk)%n){idx=(idx+1)%n;}
var forced=((new URLSearchParams(location.search).get('theme'))||(new URLSearchParams(location.hash.replace(/^#/,'')).get('theme'))||'').trim().toLowerCase();
var t=null;
for(var q=0;q<n;q++){if(themes[q].id===forced){t=themes[q];break;}}
if(!t){t=themes[idx];}
var dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
var c=dark?t.dark:t.light;
var r=document.documentElement;
r.dataset.hourTheme=t.id;
r.dataset.hourForced=forced;
r.dataset.hourKey=k;
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
