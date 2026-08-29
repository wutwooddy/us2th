'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="w-full bg-[#FF5A09] text-black py-2 px-4 overflow-hidden border-b border-black select-none">
      <div className="relative w-full flex items-center justify-center">
        {/* Moving Alert Ticker */}
        <div className="flex whitespace-nowrap animate-marquee text-[10px] md:text-xs font-mono font-black uppercase tracking-widest">
          {Array(8).fill(
            <span className="mx-6 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-black flex-shrink-0" />
              SECURITY WARNING ✦ ระวังมิจฉาชีพ! แอบอ้างชื่อร้าน ✦ ติดต่อผ่านช่องทางหลักที่ระบุบนหน้านี้เท่านั้น ✦ OFFICIAL CHANNELS ONLY
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
