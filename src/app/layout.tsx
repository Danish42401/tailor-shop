import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/features/ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Kids Choice - Premium Dubai Tailoring Boutique",
  description: "Bespoke elegance for you & your little ones. Specialists in children frocks, ladies abaya, and mom & daughter pairs in Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
