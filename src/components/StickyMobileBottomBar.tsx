'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyMobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0D3A]/90 backdrop-blur-xl border-t border-[#5865F2]/25 p-3 flex gap-2.5 font-heading">
      {/* LINE OA Button - Discord Green */}
      <a
        href="https://lin.ee/ByS27YW"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#23A55A] hover:bg-[#1F924F] text-white text-xs font-black rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md tracking-wider uppercase"
      >
        <MessageCircle className="w-4 h-4" />
        LINE OA
      </a>

      {/* FB Messenger Button - Discord Blurple */}
      <a
        href="https://m.me/us2th"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-black rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md tracking-wider uppercase"
      >
        <Send className="w-4 h-4 text-white" />
        Messenger
      </a>
    </div>
  );
}
