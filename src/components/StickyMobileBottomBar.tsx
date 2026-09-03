'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyMobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#D4D4CE] p-3 flex gap-3 font-heading shadow-lg">
      {/* LINE OA Button */}
      <a
        href="https://lin.ee/ByS27YW"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 tactile-btn shadow-2xs tracking-wide"
      >
        <MessageCircle className="w-4 h-4" />
        <span>LINE OA</span>
      </a>

      {/* FB Messenger Button */}
      <a
        href="https://m.me/us2th"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#F4F4F0] hover:bg-[#EAEAE5] border border-[#D4D4CE] text-[#111111] text-sm font-bold rounded-xl flex items-center justify-center gap-2 tactile-btn tracking-wide"
      >
        <Send className="w-4 h-4 text-[#555555]" />
        <span>Messenger</span>
      </a>
    </div>
  );
}
