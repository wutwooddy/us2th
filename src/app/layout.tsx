import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["400", "600", "700", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
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
      className={`${kanit.variable} scroll-smooth`}
    >
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
