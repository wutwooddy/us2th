'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="w-full bg-red-950/40 border-b border-red-500/30 text-red-200 py-2.5 px-4 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 animate-pulse">
      <ShieldAlert className="w-4 h-4 text-brand-orange flex-shrink-0" />
      <span>⚠️ ระวังมิจฉาชีพ ติดต่อผ่านแชทหลักร้านเท่านั้น</span>
    </div>
  );
}
