'use client';

import React from 'react';
import { ShieldCheck, Calendar, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-neutral-900 pt-20 pb-28 md:pb-20 px-4 md:px-8 font-mono">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Bottom Terms & Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-neutral-900 text-left">
          
          {/* Terms 1: Authenticity */}
          <div className="flex gap-4 p-5 bg-black border border-neutral-900">
            <div className="w-10 h-10 rounded-none bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1.5">
                [ AUTHENTICITY_VERIFIED ]
              </h4>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide leading-relaxed">
                การันตีสินค้าลิขสิทธิ์แท้ 100% รับหาทุกรุ่นตามงบ พบปลอมคืนเงินเต็มจำนวน
              </p>
            </div>
          </div>

          {/* Terms 2: Import Timeline */}
          <div className="flex gap-4 p-5 bg-black border border-neutral-900">
            <div className="w-10 h-10 rounded-none bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1.5">
                [ SHIPPING_TIMELINES ]
              </h4>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide leading-relaxed">
                ระยะเวลานำเข้า Pre-order 20-30 วัน จัดส่งในไทยผ่าน Kerry / Flash 2-5 วัน
              </p>
            </div>
          </div>

          {/* Terms 3: Import Sourcing Care */}
          <div className="flex gap-4 p-5 bg-black border border-neutral-900">
            <div className="w-10 h-10 rounded-none bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1.5">
                [ DUTY_INCLUSIVE ]
              </h4>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide leading-relaxed">
                เคลียร์ภาษีนำเข้าและจัดส่งถึงหน้าบ้าน ไม่มีเรียกเก็บค่าใช้จ่ายเพิ่มเติมภายหลัง
              </p>
            </div>
          </div>

        </div>

        {/* Brand Details */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                US<span className="text-brand-orange">2</span>TH
              </span>
              <span className="text-[8px] tracking-[0.3em] text-neutral-600 uppercase -mt-1 font-bold">
                GLOBAL SOURCING PLATFORM
              </span>
            </div>
            <p className="text-[10px] text-neutral-600 max-w-sm leading-relaxed uppercase tracking-wide">
              &copy; {new Date().getFullYear()} US2TH. ALL RIGHTS RESERVED. <br />
              REGISTERED SOURCING INDEX. DESIGN INSPIRED BY STREET CULTURE.
            </p>
          </div>

          {/* Direct Social Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold text-neutral-400">
            <a
              href="https://lin.ee/ByS27YW"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest"
            >
              LINE OA @hij2541a <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/us2th"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest"
            >
              FACEBOOK <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://bit.ly/3FFICJz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest"
            >
              OPENCHAT <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
