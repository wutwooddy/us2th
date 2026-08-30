'use client';

import React from 'react';
import { Send, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto flex items-stretch h-16">
        
        {/* Logo Section */}
        <a 
          href="#" 
          className="px-6 md:px-8 flex flex-col justify-center border-r border-slate-100 select-none group"
        >
          <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 font-heading">
            US<span className="text-brand-blue group-hover:text-brand-blue-hover transition-colors">2</span>TH
          </span>
          <span className="text-[10px] tracking-wider text-slate-400 font-bold -mt-0.5 font-heading">
            SNEAKERS & STREETWEAR
          </span>
        </a>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex flex-grow items-center px-10 text-sm font-bold tracking-wide text-slate-500 gap-8">
          <a href="#showcase" className="hover:text-brand-blue transition-colors relative py-5">
            ผลงานล่าสุด
          </a>
          <a href="#magazine" className="hover:text-brand-blue transition-colors relative py-5">
            US2TH Journal
          </a>
          <a href="#tracker" className="hover:text-brand-blue transition-colors relative py-5">
            สถานะขนส่ง
          </a>
          <a href="#inquiry" className="hover:text-brand-blue transition-colors relative py-5">
            ฝากหาของ / เช็คราคา
          </a>
        </nav>

        {/* Action CTAs Column */}
        <div className="flex items-center gap-3 px-6 text-sm">
          {/* LINE Button */}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold rounded-full transition-all tracking-wide shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>LINE OA</span>
          </a>
          
          {/* FB Button */}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold rounded-full transition-all tracking-wide shadow-sm"
          >
            <Send className="w-4 h-4 text-white" />
            <span>FACEBOOK</span>
          </a>
        </div>

      </div>
    </header>
  );
}
