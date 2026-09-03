'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E5E5E0]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 md:h-18 px-4 md:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <a 
            href="#" 
            aria-label="หน้าแรก US2TH Concierge"
            className="flex items-center gap-3 pr-6 md:pr-8 border-r border-[#E5E5E0] select-none group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#111111] text-white flex items-center justify-center font-heading font-black text-xs tracking-tighter transition-transform group-hover:scale-105">
              2TH
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-[#111111] font-heading leading-none">
                US2TH
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#666666] font-semibold mt-1 font-heading uppercase">
                GLOBAL SOURCING
              </span>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center px-6 gap-8 text-sm font-medium tracking-normal text-[#444444] font-sans">
            <a 
              href="#showcase" 
              className="hover:text-[#111111] transition-colors py-1.5"
            >
              ผลงานจัดส่ง
            </a>
            <a 
              href="#flashsale" 
              className="hover:text-[#111111] transition-colors py-1.5"
            >
              ดีลพิเศษวันนี้
            </a>
            <a 
              href="#magazine" 
              className="hover:text-[#111111] transition-colors py-1.5"
            >
              US2TH Journal
            </a>
            <a 
              href="#inquiry" 
              className="flex items-center gap-2 text-[#111111] bg-white border border-[#D4D4CE] hover:border-[#111111] px-3.5 py-1.5 rounded-full transition-all text-sm font-medium shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span>ฝากหาของ / เช็คราคา</span>
            </a>
          </nav>
        </div>

        {/* Action CTAs Column */}
        <div className="flex items-center gap-3 text-sm">
          {/* LINE Button */}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs md:text-sm font-bold rounded-lg transition-all tracking-wide shadow-2xs font-heading cursor-pointer tactile-btn"
          >
            <MessageCircle className="w-4 h-4" />
            <span>LINE OA</span>
          </a>
          
          {/* FB Button */}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#111111] text-xs md:text-sm font-semibold rounded-lg transition-all tracking-wide font-heading cursor-pointer tactile-btn shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 text-[#555555]" />
            <span>Facebook</span>
          </a>
        </div>

      </div>
    </header>
  );
}
