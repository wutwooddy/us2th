'use client';

import React from 'react';
import { MessageCircle, Send, ArrowUpRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090A0C]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <a 
            href="#" 
            aria-label="หน้าแรก US2TH Concierge"
            className="flex items-center gap-3 pr-6 md:pr-8 border-r border-white/[0.08] select-none group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#F4F4F2] text-[#090A0C] flex items-center justify-center font-heading font-black text-xs tracking-tighter transition-transform group-hover:scale-105">
              2TH
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold tracking-tight text-[#F4F4F2] font-heading leading-none">
                US2TH
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#60646E] font-medium mt-1 font-heading uppercase">
                CONCIERGE SOURCING
              </span>
            </div>
          </a>

          {/* Navigation - Exact Labels Preserved */}
          <nav className="hidden lg:flex items-center px-6 gap-6 text-xs font-medium tracking-wide text-[#9B9FA8] font-sans">
            <a 
              href="#showcase" 
              className="hover:text-[#F4F4F2] transition-colors py-1.5"
            >
              ผลงานจัดส่ง
            </a>
            <a 
              href="#flashsale" 
              className="hover:text-[#F4F4F2] transition-colors py-1.5"
            >
              ดีลพิเศษวันนี้
            </a>
            <a 
              href="#tracker" 
              className="hover:text-[#F4F4F2] transition-colors py-1.5"
            >
              สถานะตู้สินค้า
            </a>
            <a 
              href="#magazine" 
              className="hover:text-[#F4F4F2] transition-colors py-1.5"
            >
              US2TH Journal
            </a>
            <a 
              href="#inquiry" 
              className="flex items-center gap-1.5 text-[#F4F4F2] bg-white/[0.05] border border-white/[0.1] hover:border-white/20 hover:bg-white/[0.08] px-3 py-1 rounded-full transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>ฝากหาของ / เช็คราคา</span>
            </a>
          </nav>
        </div>

        {/* Action CTAs Column */}
        <div className="flex items-center gap-2.5 text-xs">
          {/* LINE Button */}
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-full transition-all tracking-wide shadow-sm font-heading cursor-pointer tactile-btn"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>LINE OA</span>
          </a>
          
          {/* FB Button */}
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#F4F4F2] text-xs font-semibold rounded-full transition-all tracking-wide font-heading cursor-pointer tactile-btn"
          >
            <Send className="w-3.5 h-3.5 text-[#9B9FA8]" />
            <span>FACEBOOK</span>
          </a>
        </div>

      </div>
    </header>
  );
}
