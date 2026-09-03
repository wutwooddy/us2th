'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyMobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#090A0C]/95 backdrop-blur-xl border-t border-white/[0.1] p-3 flex gap-2.5 font-heading">
      {/* LINE OA Button */}
      <a
        href="https://lin.ee/ByS27YW"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 tactile-btn shadow-sm tracking-wider uppercase"
      >
        <MessageCircle className="w-4 h-4" />
        <span>LINE OA</span>
      </a>

      {/* FB Messenger Button */}
      <a
        href="https://m.me/us2th"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-[#F4F4F2] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 tactile-btn tracking-wider uppercase"
      >
        <Send className="w-4 h-4 text-[#9B9FA8]" />
        <span>Messenger</span>
      </a>
    </div>
  );
}
