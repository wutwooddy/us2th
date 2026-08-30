'use client';

import React from 'react';
import { ShieldCheck, Calendar, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 pt-20 pb-28 md:pb-20 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Bottom Terms & Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-slate-200 text-left">
          
          {/* Terms 1: Authenticity */}
          <div className="flex gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-850 mb-1.5 font-heading">
                รับประกันของแท้ 100%
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                การันตีสินค้าลิขสิทธิ์แท้ 100% รับหาทุกรุ่นตามงบ พบปลอมยินดีคืนเงินเต็มจำนวนทันที
              </p>
            </div>
          </div>

          {/* Terms 2: Import Sourcing Spped */}
          <div className="flex gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-850 mb-1.5 font-heading">
                ระยะเวลานำเข้าที่รวดเร็ว
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                ระยะเวลานำเข้า Pre-order ส่งตรงจากต่างประเทศ 20-30 วัน และจัดส่งต่อในไทยรวดเร็วผ่านขนส่งชั้นนำ 2-5 วัน
              </p>
            </div>
          </div>

          {/* Terms 3: Import Sourcing Care */}
          <div className="flex gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-850 mb-1.5 font-heading">
                ราคาเหมาจ่ายเบ็ดเสร็จ
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                ดูแลการนำเข้าและจัดส่งตรงถึงหน้าบ้านคุณ ราคาเคลียร์จบครบทุกอย่าง ไม่มีเรียกเก็บค่าใช้จ่ายเพิ่มเติมภายหลังแน่นอนครับ
              </p>
            </div>
          </div>

        </div>

        {/* Brand Details */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                US<span className="text-brand-blue">2</span>TH
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 font-bold -mt-0.5 font-heading">
                GLOBAL SOURCING PLATFORM
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-medium">
              &copy; {new Date().getFullYear()} US2TH. สงวนลิขสิทธิ์ทั้งหมด. <br />
              บริการจัดหาและนำเข้าสินค้าแฟชั่นแบรนด์เนมยอดนิยม
            </p>
          </div>

          {/* Direct Social Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs md:text-sm font-bold text-slate-550">
            <a
              href="https://lin.ee/ByS27YW"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-green flex items-center gap-1 transition-colors tracking-wide"
            >
              LINE OA @hij2541a <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="https://www.facebook.com/us2th"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue flex items-center gap-1 transition-colors tracking-wide"
            >
              FACEBOOK <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="https://bit.ly/3FFICJz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-green flex items-center gap-1 transition-colors tracking-wide"
            >
              OPENCHAT <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
