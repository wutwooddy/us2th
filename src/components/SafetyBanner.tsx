'use client';

import React from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <aside aria-label="System announcement" className="w-full bg-[#0E1128]/95 backdrop-blur-md text-[#DBDEE1] py-2.5 px-4 border-b border-[#5865F2]/20 select-none text-xs md:text-sm relative z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-2 text-center font-sans font-medium flex-wrap">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ShieldAlert className="w-4 h-4 text-[#FEE75C] animate-pulse" />
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#F2F3F5] text-[11px] font-black tracking-wider uppercase font-heading">
            <Sparkles className="w-3 h-3 text-[#5865F2]" />
            @everyone // SYSTEM ALERT
          </span>
        </div>
        <span className="text-[#DBDEE1] leading-relaxed">
          โปรดระวังมิจฉาชีพแอบอ้าง! ติดต่อและสั่งซื้อผ่าน{' '}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#35ED7E] font-bold hover:underline"
          >
            LINE OA (@hij2541a)
          </a>{' '}
          และ{' '}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00B0F4] font-bold hover:underline"
          >
            FB Messenger US2TH
          </a>{' '}
          ทางการเท่านั้น
        </span>
      </div>
    </aside>
  );
}
