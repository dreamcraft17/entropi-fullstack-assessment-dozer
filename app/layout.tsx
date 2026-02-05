import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Link in Bio | One link for everything you share",
  description: "Your one link for everything you share. Build your page in minutes.",
};

export const viewport = { width: "device-width", initialScale: 1 };

const themeScript = `
(function() {
  var t = localStorage.getItem('link-in-bio-theme');
  if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
  var a = localStorage.getItem('link-in-bio-accent');
  if (a && ['terracotta','blue','green','purple'].indexOf(a) >= 0) document.documentElement.setAttribute('data-accent', a);
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
