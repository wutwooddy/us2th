'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <aside
      aria-label="Official verification advisory"
      className="w-full bg-[#F4F4F0] border-b border-[#E5E5E0] text-[#333333] py-2.5 px-4 select-none text-xs md:text-sm relative z-50"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-2 text-center font-sans font-medium flex-wrap">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#059669]" />
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-white border border-[#D4D4CE] text-[#111111] text-[11px] font-semibold tracking-wider uppercase font-heading">
            ช่องทางทางการ
          </span>
        </div>
        <span className="leading-relaxed text-[#444444]">
          โปรดระวังมิจฉาชีพแอบอ้าง ติดต่อและสั่งซื้อผ่าน{' '}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] font-bold underline underline-offset-4 decoration-[#059669] hover:text-[#059669] transition-colors"
          >
            LINE OA
          </a>{' '}
          และ{' '}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] font-bold underline underline-offset-4 decoration-[#059669] hover:text-[#059669] transition-colors"
          >
            Facebook Messenger US2TH
          </a>{' '}
          เท่านั้น
        </span>
      </div>
    </aside>
  );
}
