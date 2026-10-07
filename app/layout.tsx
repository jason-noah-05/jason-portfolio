import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation/navigation";
import { Cursor } from "@/components/ui/cursor";
import { SkipLink } from "@/components/ui/skip-link";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * Font roles. Canela, ABC Diatype and Berkeley Mono are commercial and are not
 * bundled. These open-licence stand-ins fill the same three roles and can be
 * swapped for the licensed files later by editing only this block.
 *   display  -> Instrument Serif   (stand-in for Canela)
 *   sans     -> Hanken Grotesk     (stand-in for ABC Diatype)
 *   mono     -> JetBrains Mono     (stand-in for Berkeley Mono)
 */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  ...(site.url ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
    ...(site.url ? { url: "/" } : {}),
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E8E4D8",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  ...(site.url ? { url: site.url } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <SkipLink />
        <Navigation />
        {children}
        <Cursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}