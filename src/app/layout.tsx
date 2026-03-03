import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const secondaryFont = Montserrat({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const brandFont = localFont({
  src: "../../public/LOGO Y TIPOGRAFIA/fat_kat/Fat Kat - (Demo) hanscostudio.com.ttf",
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tortugrafo | Portafolio",
  description:
    "Dirección visual, fotografía y producción audiovisual orientada a resultados.",
  icons: {
    icon: "/LOGO%20Y%20TIPOGRAFIA/LOGO-WEB.png",
    shortcut: "/LOGO%20Y%20TIPOGRAFIA/LOGO-WEB.png",
    apple: "/LOGO%20Y%20TIPOGRAFIA/LOGO-WEB.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${secondaryFont.variable} ${brandFont.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
