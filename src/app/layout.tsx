import type { Metadata } from "next";
import { Limelight, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Art Deco / vintage-marquee display face — used for the logo wordmark and
// every major heading, matching the look of the client's existing site.
const limelight = Limelight({
  subsets: ["latin"],
  variable: "--font-limelight",
  weight: ["400"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotstuffstoves.com"),
  title: {
    default: "Hot Stuff Stoves | HETAS & Gas Safe Registered Stove Installers, Hoylake",
    template: "%s | Hot Stuff Stoves",
  },
  description:
    "Twenty years of fires done properly. HETAS and Gas Safe registered Esse stove installers based in Hoylake, Wirral. Enquire about the Esse range and our chimney services.",
  openGraph: {
    title: "Hot Stuff Stoves | HETAS & Gas Safe Registered Stove Installers, Hoylake",
    description:
      "Twenty years of fires done properly. HETAS and Gas Safe registered Esse stove installers based in Hoylake, Wirral.",
    siteName: "Hot Stuff Stoves",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${limelight.variable} ${plexSans.variable}`}>
      <body className="bg-charcoal-ink text-ash-cream antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ember-red focus:px-4 focus:py-2 focus:text-ash-cream"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
