import type { Metadata } from "next";
import { Kanit, Sarabun } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["400", "600", "700", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "US2TH: RARE ITEM & SOURCING | บริการสั่งซื้อและนำเข้าสินค้าแบรนด์เนมต่างประเทศ",
  description: "บริการรับกดและนำเข้า รองเท้าสนีกเกอร์ เสื้อผ้าสตรีทแวร์ และของสะสมหายากจากทั่วทุกมุมโลก (US, JP, UK, EU, KR, HK, SG) ราคาเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้านคุณ การันตีของแท้ 100%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} ${sarabun.variable} scroll-smooth dark`}
    >
      <body className="bg-[#090A0C] text-[#F4F4F2] antialiased selection:bg-[#10B981] selection:text-black">
        {children}
      </body>
    </html>
  );
}
