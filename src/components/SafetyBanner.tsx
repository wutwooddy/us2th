'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="w-full bg-amber-50 text-amber-800 py-3 px-4 border-b border-amber-200 select-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-center">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>ประกาศสำคัญ: ระวังมิจฉาชีพแอบอ้าง! โปรดติดต่อร้านผ่านทาง Line หรือ FB Messenger ที่แสดงบนหน้าเว็บนี้เท่านั้น</span>
      </div>
    </div>
  );
}
