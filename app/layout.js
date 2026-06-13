import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalAI from "@/components/GlobalAI";
import PWAInit from "@/components/PWAInit";
import ConnectionStatus from "@/components/ConnectionStatus";

// Runs before paint: resolves the theme (stored, else system), persists it so
// the toggle/Settings always agree, and applies the `dark` class — no flash,
// no light/dark mismatch on first load.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';localStorage.setItem('theme',t);}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevZone",
  description: "Platformă personală de învățare programare — Python, JavaScript, React, Next.js, SQL, C++, Cybersecurity și mai mult.",
  keywords: ["programare", "invatare", "python", "javascript", "react", "nextjs", "sql", "cursuri"],
  metadataBase: new URL("https://devzone.vercel.app"),
  openGraph: {
    title: "DevZone — Învață Programare",
    description: "Lecții practice cu teorie + exerciții pentru Python, JS, React, Next.js, SQL, C++, Cybersecurity și altele.",
    url: "https://devzone.vercel.app",
    siteName: "DevZone",
    images: [{ url: "/image.png", width: 1254, height: 1254, alt: "DevZone" }],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevZone — Învață Programare",
    description: "Platformă personală de învățare programare.",
    images: ["/image.png"],
  },
  icons: {
    icon: [
      { url: "/image.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/image.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/image.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-900">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PWAInit />
        <ConnectionStatus />
        {children}
        <GlobalAI />
      </body>
    </html>
  );
}
