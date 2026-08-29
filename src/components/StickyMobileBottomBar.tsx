'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyMobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-md border-t border-neutral-900 p-3 flex gap-2 font-mono">
      {/* LINE OA Button */}
      <a
        href="https://lin.ee/ByS27YW"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-11 bg-brand-orange text-white text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4" />
        LINE @hij2541a
      </a>

      {/* FB Messenger Button */}
      <a
        href="https://www.facebook.com/us2th"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-11 bg-black border border-neutral-800 text-white text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Send className="w-4 h-4 text-brand-emerald" />
        MESSENGER
      </a>
    </div>
  );
}
