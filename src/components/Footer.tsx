'use client';

import React from 'react';
import { ShieldCheck, Calendar, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F4F4F0] border-t border-[#E5E5E0] pt-16 pb-28 md:pb-16 px-4 md:px-8 text-[#555555] font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-12 border-b border-[#E5E5E0] text-left">
          
          {/* Terms 1: Authenticity */}
          <div className="flex gap-4 p-6 bg-white border border-[#E5E5E0] rounded-2xl shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#111111] mb-1.5 font-heading">
                รับประกันของแท้ 100%
              </h4>
              <p className="text-sm text-[#555555] leading-relaxed font-normal font-sans">
                การันตีสินค้าลิขสิทธิ์แท้ทุกชิ้น ตรวจสอบประวัติผู้ขายละเอียด หากพบของปลอมยินดีคืนเงินเต็มจำนวนทันที
              </p>
            </div>
          </div>

          {/* Terms 2: Import Speed */}
          <div className="flex gap-4 p-6 bg-white border border-[#E5E5E0] rounded-2xl shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#111111] mb-1.5 font-heading">
                ระยะเวลานำส่งชัดเจน
              </h4>
              <p className="text-sm text-[#555555] leading-relaxed font-normal font-sans">
                ขนส่งรอบบินตรง 10-30 วันตามภูมิภาคต้นทาง พร้อมบริการจัดส่งด่วนในไทยถึงหน้าบ้านคุณ
              </p>
            </div>
          </div>

          {/* Terms 3: All Inclusive Pricing */}
          <div className="flex gap-4 p-6 bg-white border border-[#E5E5E0] rounded-2xl shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#111111] mb-1.5 font-heading">
                ราคาเหมาจ่ายเบ็ดเสร็จ
              </h4>
              <p className="text-sm text-[#555555] leading-relaxed font-normal font-sans">
                เคลียร์ภาษีศุลกากรและค่าจัดส่งครบจบในยอดเดียว ไม่มีเรียกเก็บค่าใช้จ่ายแอบแฝงเพิ่มเติมภายหลังแน่นอน
              </p>
            </div>
          </div>

        </div>

        {/* Brand Details */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="text-left">
            <div className="flex flex-col mb-2">
              <span className="text-2xl font-bold tracking-tight text-[#111111] font-heading">
                US2TH
              </span>
              <span className="text-xs tracking-[0.2em] text-[#777777] font-semibold uppercase font-heading">
                GLOBAL SOURCING PLATFORM
              </span>
            </div>
            <p className="text-sm text-[#666666] leading-relaxed font-normal font-sans">
              &copy; 2026 US2TH. บริการสั่งซื้อและนำเข้าสินค้าทั่วโลก สตรีทแวร์ สนีกเกอร์ และของสะสม
            </p>
          </div>

          {/* Direct Social Links */}
          <div className="flex flex-wrap gap-3 text-sm font-sans">
            <a
              href="https://lin.ee/ByS27YW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#059669] hover:text-[#047857] flex items-center gap-1.5 transition-colors bg-white border border-[#D4D4CE] hover:border-[#111111] px-4 py-2 rounded-full tactile-btn font-semibold shadow-2xs"
            >
              LINE OA <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/us2th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] hover:text-[#059669] flex items-center gap-1.5 transition-colors bg-white border border-[#D4D4CE] hover:border-[#111111] px-4 py-2 rounded-full tactile-btn font-semibold shadow-2xs"
            >
              Facebook US2TH <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://bit.ly/3FFICJz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555555] hover:text-[#111111] flex items-center gap-1.5 transition-colors bg-white border border-[#D4D4CE] hover:border-[#111111] px-4 py-2 rounded-full tactile-btn font-semibold shadow-2xs"
            >
              LINE OpenChat <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
