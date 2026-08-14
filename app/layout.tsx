import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getTechnicalSettings } from "@/lib/data/technical";
import { HeadCode } from "@/components/site/HeadCode";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

// Site başlığı, açıklaması ve favicon panelden (Teknik) yönetilir
export async function generateMetadata(): Promise<Metadata> {
  const technical = await getTechnicalSettings();
  return {
    title: {
      default: technical.seo.title,
      template: "%s | Ege Yatçılık",
    },
    description: technical.seo.description,
    ...(technical.favicon ? { icons: { icon: technical.favicon } } : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const technical = await getTechnicalSettings();

  return (
    <html lang="tr" className={inter.variable}>
      <body>
        <HeadCode code={technical.headCode} />
        {children}
      </body>
    </html>
  );
}
