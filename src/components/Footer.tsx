'use client';

import React from 'react';
import { ShieldCheck, Calendar, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#07080A] border-t border-white/[0.08] pt-16 pb-28 md:pb-16 px-4 md:px-8 text-[#9B9FA8] font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-12 border-b border-white/[0.08] text-left">
          
          {/* Terms 1: Authenticity */}
          <div className="flex gap-4 p-5 bg-[#12141A] border border-white/[0.08] rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#10B981] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F4F4F2] mb-1 font-heading">
                รับประกันของแท้ 100%
              </h4>
              <p className="text-xs text-[#9B9FA8] leading-relaxed font-normal font-sans">
                การันตีสินค้าลิขสิทธิ์แท้ทุกชิ้น ตรวจสอบประวัติผู้ขายละเอียด หากพบของปลอมยินดีคืนเงินเต็มจำนวนทันที
              </p>
            </div>
          </div>

          {/* Terms 2: Import Speed */}
          <div className="flex gap-4 p-5 bg-[#12141A] border border-white/[0.08] rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#10B981] flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F4F4F2] mb-1 font-heading">
                ระยะเวลานำเข้าตามรอบ
              </h4>
              <p className="text-xs text-[#9B9FA8] leading-relaxed font-normal font-sans">
                ขนส่งทางอากาศรอบบินตรง 10-30 วันตามภูมิภาคต้นทาง พร้อมบริการจัดส่งด่วนในไทยถึงหน้าบ้านคุณ
              </p>
            </div>
          </div>

          {/* Terms 3: All Inclusive Pricing */}
          <div className="flex gap-4 p-5 bg-[#12141A] border border-white/[0.08] rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#10B981] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F4F4F2] mb-1 font-heading">
                ราคาเหมาจ่ายเบ็ดเสร็จ
              </h4>
              <p className="text-xs text-[#9B9FA8] leading-relaxed font-normal font-sans">
                เคลียร์ภาษีศุลกากรและค่าจัดส่งครบจบในยอดเดียว ไม่มีเรียกเก็บค่าใช้จ่ายแอบแฝงเพิ่มเติมภายหลังแน่นอน
              </p>
            </div>
          </div>

        </div>

        {/* Brand Details */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex flex-col mb-2">
              <span className="text-xl font-bold tracking-tight text-[#F4F4F2] font-heading">
                US2TH
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#60646E] font-medium uppercase font-heading">
                LUXURY SOURCING PLATFORM
              </span>
            </div>
            <p className="text-xs text-[#60646E] leading-relaxed font-normal font-sans">
              &copy; 2026 US2TH. บริการสั่งซื้อและนำเข้าสินค้าทั่วโลก สตรีทแวร์ สนีกเกอร์ และของสะสม
            </p>
          </div>

          {/* Direct Social Links */}
          <div className="flex flex-wrap gap-3 text-xs font-sans">
            <a
              href="https://lin.ee/ByS27YW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10B981] hover:text-white flex items-center gap-1.5 transition-colors bg-white/[0.04] border border-white/[0.08] hover:border-white/20 px-3 py-1.5 rounded-full tactile-btn"
            >
              LINE OA @hij2541a <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/us2th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4F4F2] hover:text-white flex items-center gap-1.5 transition-colors bg-white/[0.04] border border-white/[0.08] hover:border-white/20 px-3 py-1.5 rounded-full tactile-btn"
            >
              Facebook US2TH <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://bit.ly/3FFICJz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9B9FA8] hover:text-white flex items-center gap-1.5 transition-colors bg-white/[0.04] border border-white/[0.08] hover:border-white/20 px-3 py-1.5 rounded-full tactile-btn"
            >
              LINE OpenChat <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
