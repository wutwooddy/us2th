'use client';

import React from 'react';
import { ShieldCheck, Calendar, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-neutral-900 pt-16 pb-28 md:pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Bottom Terms & Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-neutral-900 text-left">
          
          {/* Terms 1: Authenticity */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">
                Authenticity Guaranteed
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                การันตีสินค้าลิขสิทธิ์แท้ 100% (รับหาทุกรุ่นตามงบ) หากพบปลอมยินดีคืนเงินเต็มจำนวน
              </p>
            </div>
          </div>

          {/* Terms 2: Import Timeline */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">
                Shipping Timelines
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                ระยะเวลานำเข้า pre-order 20-30 วัน และจัดส่งภายในประเทศผ่าน Flash / Kerry 2-5 วัน
              </p>
            </div>
          </div>

          {/* Terms 3: Import Sourcing Care */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">
                All-Inclusive Service
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                เคลียร์ภาษีนำเข้าและจัดส่งถึงหน้าบ้าน ไม่มีบวกเพิ่มทีหลัง ราคาสรุปหน้าช็อปชำระรอบเดียวจบ
              </p>
            </div>
          </div>

        </div>

        {/* Brand Details */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-black tracking-widest text-white">
                US<span className="text-brand-orange">2</span>TH
              </span>
              <span className="text-[9px] tracking-[0.25em] text-neutral-500 uppercase -mt-1 font-bold">
                Rare Sourcing &amp; Import Service
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              &copy; {new Date().getFullYear()} US2TH. All rights reserved. <br />
              เราเป็นตัวแทนจัดหาและนำเข้าสินค้าถูกลิขสิทธิ์จากต่างประเทศ การอ้างอิงสัญลักษณ์แบรนด์เป็นการชี้แจงเพื่อประกอบการให้บริการเท่านั้น
            </p>
          </div>

          {/* Direct Social Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-neutral-400">
            <a
              href="https://lin.ee/ByS27YW"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors uppercase"
            >
              LINE OA @hij2541a <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/us2th"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors uppercase"
            >
              Facebook <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://bit.ly/3FFICJz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors uppercase"
            >
              OpenChat Community <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
