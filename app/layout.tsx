import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Ege Yatçılık | Gemi Acenteliği & Müşavirlik",
    template: "%s | Ege Yatçılık",
  },
  description:
    "Ege Yatçılık — 2002'den beri İzmir'de yat bayrak tescili, şirket kuruluşu, acentelik, gümrük ve ticari gemi işlemleri.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
