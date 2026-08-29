'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyMobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-dark-bg/85 backdrop-blur-md border-t border-neutral-900 px-4 py-3 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {/* LINE OA Button */}
      <a
        href="https://lin.ee/ByS27YW"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-11 bg-brand-orange text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4" />
        💬 LINE @hij2541a
      </a>

      {/* FB Messenger Button */}
      <a
        href="https://www.facebook.com/us2th"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-11 bg-neutral-900 border border-neutral-800 text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Send className="w-4 h-4" />
        📘 FB Messenger
      </a>
    </div>
  );
}
