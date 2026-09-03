'use client';

import React from 'react';
import { MessageCircle, Bell, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function OpenChatBanner() {
  return (
    <section id="openchat" className="w-full bg-[#090A0C] py-20 px-4 md:px-8 border-b border-white/[0.07] text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Community Card */}
        <div className="bg-[#12141A] border border-white/[0.1] p-8 md:p-12 relative rounded-2xl shadow-xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] text-[#10B981] text-[11px] font-mono font-medium rounded-sm mb-5 uppercase tracking-[0.15em]">
                COLLECTORS COMMUNITY
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#F4F4F2] tracking-tight mb-3 font-heading">
                US2TH LINE OpenChat VIP Lounge
              </h3>
              <p className="text-xs md:text-sm text-[#9B9FA8] leading-relaxed mb-8 font-sans">
                คอมมูนิตี้คนรักสตรีทแวร์และสนีกเกอร์ ติดตามข่าวสารโปรโมชั่น แจ้งเตือนไอเทมสภาพสะสมหายาก และปรึกษาราคาพรีออร์เดอร์กับทีมงานได้ตลอดเวลา เข้าร่วมฟรีไม่มีค่าใช้จ่าย
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 border border-white/[0.08] p-3.5 bg-[#090A0C] rounded-xl">
                  <Bell className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span className="text-xs font-medium text-[#F4F4F2] font-sans">แจ้งเตือนโปรลดราคาก่อนใคร</span>
                </div>
                <div className="flex items-center gap-3 border border-white/[0.08] p-3.5 bg-[#090A0C] rounded-xl">
                  <AlertCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span className="text-xs font-medium text-[#F4F4F2] font-sans">อัปเดตกำหนดการดรอปสนีกเกอร์ลิมิเต็ด</span>
                </div>
              </div>
            </div>

            {/* Invite Widget Card */}
            <div className="bg-[#090A0C] border border-white/[0.1] p-6 text-center lg:min-w-[320px] rounded-2xl shadow-lg flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-white/[0.08] text-[#F4F4F2] flex items-center justify-center font-bold text-lg font-mono mb-4 border border-white/[0.1]">
                2TH
              </div>
              
              <span className="text-[10px] text-[#60646E] font-mono font-medium uppercase tracking-wider mb-1">
                COMMUNITY HUB
              </span>
              <h4 className="text-sm font-semibold text-[#F4F4F2] mb-2 font-heading">
                US2TH OpenChat
              </h4>

              {/* Members */}
              <div className="flex items-center gap-2 text-xs font-medium text-[#9B9FA8] mb-6 font-mono">
                <span className="flex items-center gap-1.5 text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  6,200+ สมาชิก
                </span>
              </div>
              
              <a
                href="https://bit.ly/3FFICJz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading uppercase tracking-wider tactile-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>เข้าร่วมกลุ่ม LINE OpenChat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
