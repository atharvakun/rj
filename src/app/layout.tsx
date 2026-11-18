import type { Metadata, Viewport } from "next";
import { fontClassNames } from "@/styles/fonts";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { TransitionProvider } from "@/components/layout/TransitionProvider";
import { IntroProvider } from "@/components/layout/IntroProvider";
import { GateIntro } from "@/components/intro/GateIntro";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ArchDefs } from "@/components/ui/ArchDefs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={fontClassNames} suppressHydrationWarning>
      <body className="theme-stage">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <ArchDefs />
        <IntroProvider>
          <SmoothScroll>
            <TransitionProvider>
              <GateIntro />
              <ScrollProgress />
              <Navigation />
              <div id="main" className="relative z-10 bg-ink">
                {children}
              </div>
              <Footer />
              <CustomCursor />
            </TransitionProvider>
          </SmoothScroll>
        </IntroProvider>
      </body>
    </html>
  );
}
