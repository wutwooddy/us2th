'use client';

import React from 'react';
import { Send, MessageCircle, Hash, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0D3A]/85 backdrop-blur-xl border-b border-[#5865F2]/20">
      <div className="max-w-[1400px] mx-auto flex items-stretch h-16 px-4 md:px-6">
        
        {/* Logo Section */}
        <a 
          href="#" 
          aria-label="หน้าแรก US2TH Sourcing Hub"
          className="flex items-center gap-2.5 pr-6 md:pr-8 border-r border-[#5865F2]/20 select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#5865F2] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight text-[#F2F3F5] font-heading leading-none">
              US<span className="text-[#5865F2] group-hover:text-[#4752C4] transition-colors">2</span>TH
            </span>
            <span className="text-[9px] tracking-widest text-[#949BA4] font-bold mt-0.5 font-heading uppercase">
              GLOBAL SOURCING // HUB
            </span>
          </div>
        </a>

        {/* Navigation - Discord Channels Style */}
        <nav className="hidden lg:flex flex-grow items-center px-8 text-xs font-bold tracking-wide text-[#949BA4] gap-6 font-heading">
          <a 
            href="#showcase" 
            className="flex items-center gap-1 hover:text-[#F2F3F5] hover:bg-[#1E2353]/60 px-3 py-1.5 rounded-lg transition-all"
          >
            <Hash className="w-3.5 h-3.5 text-[#5865F2]" />
            <span>ผลงานจัดส่ง</span>
          </a>
          <a 
            href="#flashsale" 
            className="flex items-center gap-1 hover:text-[#F2F3F5] hover:bg-[#1E2353]/60 px-3 py-1.5 rounded-lg transition-all"
          >
            <Hash className="w-3.5 h-3.5 text-[#EC48BD]" />
            <span>ดีลพิเศษวันนี้</span>
          </a>
          <a 
            href="#tracker" 
            className="flex items-center gap-1 hover:text-[#F2F3F5] hover:bg-[#1E2353]/60 px-3 py-1.5 rounded-lg transition-all"
          >
            <Hash className="w-3.5 h-3.5 text-[#00B0F4]" />
            <span>สถานะตู้สินค้า</span>
          </a>
          <a 
            href="#magazine" 
            className="flex items-center gap-1 hover:text-[#F2F3F5] hover:bg-[#1E2353]/60 px-3 py-1.5 rounded-lg transition-all"
          >
            <Hash className="w-3.5 h-3.5 text-[#949BA4]" />
            <span>US2TH Journal</span>
          </a>
          <a 
            href="#inquiry" 
            className="flex items-center gap-1.5 text-[#35ED7E] bg-[#23A55A]/15 border border-[#23A55A]/30 hover:bg-[#23A55A]/25 px-3 py-1.5 rounded-lg transition-all ml-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#35ED7E] animate-pulse" />
            <span>ฝากหาของ / เช็คราคา</span>
          </a>
        </nav>

        {/* Action CTAs Column */}
        <div className="flex items-center gap-2.5 ml-auto lg:ml-0 pl-4 md:pl-6 text-sm">
          {/* Live Community Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1E2353]/50 border border-[#5865F2]/20 text-[11px] font-bold text-[#DBDEE1]">
            <span className="w-2 h-2 rounded-full bg-[#23A55A] animate-pulse" />
            <span className="font-heading">2,490 ออนไลน์</span>
          </div>

          {/* LINE Button (Discord Green) */}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#23A55A] hover:bg-[#1F924F] text-white text-xs font-bold rounded-xl transition-all tracking-wide shadow-md hover:shadow-[#23A55A]/20 font-heading cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>LINE OA</span>
          </a>
          
          {/* FB Button (Discord Blurple) */}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold rounded-xl transition-all tracking-wide shadow-md hover:shadow-[#5865F2]/20 font-heading cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>FACEBOOK</span>
          </a>
        </div>

      </div>
    </header>
  );
}
