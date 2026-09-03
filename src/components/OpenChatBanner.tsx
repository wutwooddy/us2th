'use client';

import React from 'react';
import { MessageCircle, Bell, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function OpenChatBanner() {
  return (
    <section id="openchat" className="w-full bg-[#FBFBFA] py-20 px-4 md:px-8 border-b border-[#E5E5E0] text-[#111111] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Community Card */}
        <div className="bg-white border border-[#D4D4CE] p-8 sm:p-12 rounded-2xl shadow-xs">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-bold rounded-full mb-4 uppercase tracking-wider font-heading">
                คอมมูนิตี้นักสะสม
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-3 font-heading">
                US2TH LINE OpenChat
              </h3>
              <p className="text-base text-[#555555] leading-relaxed mb-8 font-sans">
                กลุ่มพูดคุยของคนรักสตรีทแวร์และสนีกเกอร์ ติดตามข่าวสารโปรโมชั่นลดราคา แจ้งเตือนไอเทมสภาพสะสมหายาก และปรึกษาราคาพรีออร์เดอร์กับทีมงานได้ตลอดเวลา เข้าร่วมฟรีไม่มีค่าใช้จ่าย
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-[#E5E5E0] p-4 bg-[#FBFBFA] rounded-xl">
                  <Bell className="w-5 h-5 text-[#059669] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#111111] font-sans">แจ้งเตือนโปรลดราคาก่อนใคร</span>
                </div>
                <div className="flex items-center gap-3 border border-[#E5E5E0] p-4 bg-[#FBFBFA] rounded-xl">
                  <AlertCircle className="w-5 h-5 text-[#059669] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#111111] font-sans">อัปเดตวันวางจำหน่ายสนีกเกอร์รุ่นหายาก</span>
                </div>
              </div>
            </div>

            {/* Invite Widget */}
            <div className="bg-[#FBFBFA] border border-[#D4D4CE] p-8 text-center lg:min-w-[340px] rounded-2xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold text-xl font-heading mb-4">
                2TH
              </div>
              
              <span className="text-xs text-[#777777] font-semibold uppercase tracking-wider mb-1 font-sans">
                LINE OPENCHAT HUB
              </span>
              <h4 className="text-lg font-bold text-[#111111] mb-2 font-heading">
                US2TH OpenChat
              </h4>

              {/* Members */}
              <div className="flex items-center gap-2 text-sm font-medium text-[#555555] mb-6 font-sans">
                <span className="flex items-center gap-1.5 text-[#059669]">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  สมาชิกกว่า 6,200 คน
                </span>
              </div>
              
              <a
                href="https://bit.ly/3FFICJz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 bg-[#059669] hover:bg-[#047857] text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs font-heading tracking-wide uppercase tactile-btn"
              >
                <MessageCircle className="w-5 h-5" />
                <span>เข้าร่วมกลุ่มคุยฟรี</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
