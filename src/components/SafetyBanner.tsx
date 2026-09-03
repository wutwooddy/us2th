'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <aside
      aria-label="Official verification advisory"
      className="w-full bg-[#0D0E12] border-b border-white/[0.07] text-[#9B9FA8] py-2 px-4 select-none text-xs relative z-50"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-2 text-center font-sans font-medium flex-wrap">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-white/[0.05] border border-white/[0.1] text-[#F4F4F2] text-[10px] font-semibold tracking-wider uppercase font-heading">
            VERIFIED CHANNELS
          </span>
        </div>
        <span className="leading-relaxed text-[#9B9FA8]">
          โปรดระวังมิจฉาชีพแอบอ้าง ติดต่อและสั่งซื้อผ่าน{' '}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F4F4F2] font-semibold underline underline-offset-4 decoration-white/20 hover:text-[#10B981] hover:decoration-[#10B981] transition-colors"
          >
            LINE OA (@hij2541a)
          </a>{' '}
          และ{' '}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F4F4F2] font-semibold underline underline-offset-4 decoration-white/20 hover:text-[#10B981] hover:decoration-[#10B981] transition-colors"
          >
            Facebook Messenger US2TH
          </a>{' '}
          ทางการเท่านั้น
        </span>
      </div>
    </aside>
  );
}
