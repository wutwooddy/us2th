'use client';

import React from 'react';
import { MessageCircle, Bell, Sparkles, AlertCircle } from 'lucide-react';

export default function OpenChatBanner() {
  return (
    <section id="openchat" className="w-full bg-white py-20 px-4 md:px-8 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Double-bordered Grid Box */}
        <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 relative overflow-hidden rounded-3xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                ช่องทางการอัปเดตหลัก
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight mb-4 leading-tight">
                LINE OPENCHAT VIP HUB
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-8">
                เข้าร่วมกลุ่ม LINE OpenChat เพื่อติดตามข่าวสารการปรับราคาพิเศษ ดีลส่วนลดรายวัน แจ้งเตือนสินค้ามือสองแบรนด์เนมสภาพดี และขอรับคำปรึกษาจากทีมงานแอดมินได้โดยตรงตลอด 24 ชั่วโมง ฟรีไม่มีค่าใช้จ่าย!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-slate-100 p-4 bg-white rounded-2xl shadow-sm">
                  <Bell className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-slate-700">อัปเดตดีลลดราคาแบบเรียลไทม์</span>
                </div>
                <div className="flex items-center gap-3 border border-slate-100 p-4 bg-white rounded-2xl shadow-sm">
                  <AlertCircle className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-slate-700">ติดตามข่าวรองเท้าออกใหม่</span>
                </div>
              </div>
            </div>

            {/* CTA Terminal Box */}
            <div className="bg-white border border-slate-200 p-6 text-center lg:min-w-[320px] rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#06C755]/10 text-[#06C755] flex items-center justify-center mx-auto mb-4 border border-[#06C755]/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                ช่องทางคอมมูนิตี้
              </span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mb-6">
                US2TH OpenChat Community
              </span>
              
              <a
                href="https://bit.ly/3FFICJz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold rounded-full flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                กดเข้าร่วมกลุ่มแชทที่นี่
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
