import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "AOP3 | Observatório ANP",
  description: "Monitoramento de combustíveis em tempo real via ANP.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#EAEAE5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script async src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
      </head>
      <body className="antialiased min-h-screen relative">
        <div className="noise-overlay"></div>
        <Navigation />
        <main className="max-w-[1440px] mx-auto px-6 py-28 relative z-10 w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
