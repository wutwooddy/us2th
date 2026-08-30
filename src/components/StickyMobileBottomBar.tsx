'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyMobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex gap-2">
      {/* LINE OA Button */}
      <a
        href="https://lin.ee/ByS27YW"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm"
      >
        <MessageCircle className="w-4 h-4" />
        คุยทาง LINE OA
      </a>

      {/* FB Messenger Button */}
      <a
        href="https://www.facebook.com/us2th"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm"
      >
        <Send className="w-4 h-4 text-white" />
        คุยทาง Messenger
      </a>
    </div>
  );
}
