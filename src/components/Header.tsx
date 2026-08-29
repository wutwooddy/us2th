'use client';

import React from 'react';
import { Send, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-dark-bg/95 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-[1400px] mx-auto flex items-stretch h-16">
        
        {/* Logo Section */}
        <a 
          href="#" 
          className="px-6 md:px-8 flex flex-col justify-center border-r border-neutral-900 select-none group"
        >
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
            US<span className="text-brand-orange group-hover:text-white transition-colors">2</span>TH
          </span>
          <span className="text-[7px] tracking-[0.3em] font-mono text-neutral-500 uppercase -mt-1 font-bold">
            INDEX.SOURCING
          </span>
        </a>

        {/* Navigation - Desktop (Spans middle column of grid) */}
        <nav className="hidden md:flex flex-grow items-center px-10 text-xs font-mono tracking-widest uppercase text-neutral-400 gap-8">
          <a href="#showcase" className="hover:text-white transition-colors relative py-5 border-b-2 border-transparent hover:border-brand-orange">
            [01/ SHOWCASE]
          </a>
          <a href="#tracker" className="hover:text-white transition-colors relative py-5 border-b-2 border-transparent hover:border-brand-orange">
            [02/ LIVE TRACKER]
          </a>
          <a href="#inquiry" className="hover:text-white transition-colors relative py-5 border-b-2 border-transparent hover:border-brand-orange">
            [03/ SOURCING TERMINAL]
          </a>
        </nav>

        {/* Action CTAs Column */}
        <div className="flex items-stretch border-l border-neutral-900 text-xs font-mono">
          {/* LINE Button */}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 border-r border-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-900/40 transition-all uppercase tracking-wider font-bold"
          >
            <MessageCircle className="w-4 h-4 text-brand-orange" />
            <span className="hidden sm:inline">LINE OA</span>
          </a>
          
          {/* FB Button */}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 text-neutral-300 hover:text-white hover:bg-neutral-900/40 transition-all uppercase tracking-wider font-bold"
          >
            <Send className="w-4 h-4 text-brand-emerald" />
            <span className="hidden sm:inline">MESSENGER</span>
          </a>
        </div>

      </div>
    </header>
  );
}
