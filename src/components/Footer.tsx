'use client';

import React from 'react';
import { ShieldCheck, Calendar, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#07091F] border-t border-[#5865F2]/20 pt-20 pb-28 md:pb-20 px-4 md:px-8 text-[#DBDEE1] relative overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5865F2]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Guarantees Grid - Discord Embed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-16 border-b border-[#5865F2]/20 text-left">
          
          {/* Terms 1: Authenticity */}
          <div className="flex gap-4 p-6 bg-[#1E1F22] border border-[#5865F2]/25 rounded-2xl shadow-md discord-embed-blurple">
            <div className="w-11 h-11 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2] flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#F2F3F5] mb-1.5 font-heading">
                รับประกันของแท้ 100%
              </h4>
              <p className="text-xs md:text-sm text-[#DBDEE1] leading-relaxed font-medium font-sans">
                การันตีสินค้าลิขสิทธิ์แท้ 100% รับหาทุกรุ่นตามงบ พบปลอมยินดีคืนเงินเต็มจำนวนทันที
              </p>
            </div>
          </div>

          {/* Terms 2: Import Speed */}
          <div className="flex gap-4 p-6 bg-[#1E1F22] border border-[#23A55A]/30 rounded-2xl shadow-md discord-embed-green">
            <div className="w-11 h-11 rounded-xl bg-[#23A55A]/15 border border-[#23A55A]/30 flex items-center justify-center text-[#35ED7E] flex-shrink-0 shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#F2F3F5] mb-1.5 font-heading">
                ระยะเวลานำเข้าที่รวดเร็ว
              </h4>
              <p className="text-xs md:text-sm text-[#DBDEE1] leading-relaxed font-medium font-sans">
                ระยะเวลานำเข้า Pre-order ส่งตรงจากต่างประเทศ 20-30 วัน และจัดส่งต่อในไทยรวดเร็วผ่านขนส่งชั้นนำ 2-5 วัน
              </p>
            </div>
          </div>

          {/* Terms 3: All Inclusive Pricing */}
          <div className="flex gap-4 p-6 bg-[#1E1F22] border border-[#00B0F4]/30 rounded-2xl shadow-md discord-embed-cyan">
            <div className="w-11 h-11 rounded-xl bg-[#00B0F4]/15 border border-[#00B0F4]/30 flex items-center justify-center text-[#00B0F4] flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#F2F3F5] mb-1.5 font-heading">
                ราคาเหมาจ่ายเบ็ดเสร็จ
              </h4>
              <p className="text-xs md:text-sm text-[#DBDEE1] leading-relaxed font-medium font-sans">
                ดูแลการนำเข้าและจัดส่งตรงถึงหน้าบ้านคุณ ราคาเคลียร์จบครบทุกอย่าง ไม่มีเรียกเก็บค่าใช้จ่ายเพิ่มเติมภายหลังแน่นอนครับ
              </p>
            </div>
          </div>

        </div>

        {/* Brand Details */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <div className="flex flex-col mb-3">
              <span className="text-2xl font-black tracking-tight text-[#F2F3F5] font-heading">
                US<span className="text-[#5865F2]">2</span>TH
              </span>
              <span className="text-[10px] tracking-widest text-[#00B0F4] font-black font-heading">
                GLOBAL SOURCING PLATFORM
              </span>
            </div>
            <p className="text-xs text-[#949BA4] leading-relaxed max-w-sm font-medium font-sans">
              &copy; 2026 US2TH. บริการสั่งซื้อและนำเข้าสินค้าทั่วโลก สตรีทแวร์ สนีกเกอร์ และของสะสม
            </p>
          </div>

          {/* Direct Social Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs md:text-sm font-bold font-heading">
            <a
              href="https://lin.ee/ByS27YW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#35ED7E] hover:text-white flex items-center gap-1 transition-colors tracking-wide bg-[#23A55A]/10 border border-[#23A55A]/25 px-3 py-1.5 rounded-xl"
            >
              LINE OA @us2th <ArrowUpRight className="w-4 h-4 text-[#35ED7E]" />
            </a>
            <a
              href="https://www.facebook.com/us2th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5865F2] hover:text-white flex items-center gap-1 transition-colors tracking-wide bg-[#5865F2]/10 border border-[#5865F2]/25 px-3 py-1.5 rounded-xl"
            >
              FACEBOOK <ArrowUpRight className="w-4 h-4 text-[#5865F2]" />
            </a>
            <a
              href="https://bit.ly/3FFICJz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EC48BD] hover:text-white flex items-center gap-1 transition-colors tracking-wide bg-[#EC48BD]/10 border border-[#EC48BD]/25 px-3 py-1.5 rounded-xl"
            >
              OPENCHAT <ArrowUpRight className="w-4 h-4 text-[#EC48BD]" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
