import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "US2TH — RARE ITEM & SOURCING | บริการสั่งซื้อและนำเข้าสินค้าแบรนด์เนมต่างประเทศ",
  description: "บริการรับกดและนำเข้า รองเท้าสนีกเกอร์ เสื้อผ้าสตรีทแวร์ และของสะสมหายากจากทั่วทุกมุมโลก (US, JP, UK, EU, KR, HK, SG) เคลียร์ภาษีนำเข้าครบถ้วน รวมส่งถึงหน้าบ้านคุณ การันตีของแท้ 100%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-dark-bg text-white">
        {children}
      </body>
    </html>
  );
}
