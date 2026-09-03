'use client';

import React from 'react';
import { MessageCircle, Bell, Sparkles, AlertCircle } from 'lucide-react';

export default function OpenChatBanner() {
  return (
    <section id="openchat" className="w-full bg-[#0A0D3A] py-20 px-4 md:px-8 border-b border-[#5865F2]/20 text-[#F2F3F5] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-[#23A55A]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Discord Server Invite Card */}
        <div className="bg-[#1E1F22] border border-[#5865F2]/30 p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl discord-embed-blurple">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#EC48BD]/15 border border-[#EC48BD]/30 text-[#EC48BD] text-xs font-bold rounded-full mb-6 font-heading">
                <Sparkles className="w-4 h-4" />
                #COMMUNITY-HUB // SERVER INVITE
              </span>
              <h3 className="text-2xl md:text-4xl font-black text-[#F2F3F5] tracking-tight mb-4 leading-tight font-heading">
                US2TH // LINE OPENCHAT VIP SERVER
              </h3>
              <p className="text-sm md:text-base text-[#DBDEE1] leading-relaxed mb-8 font-medium font-sans">
                เข้าร่วมคอมมูนิตี้คนรักสตรีทแวร์และสนีกเกอร์ เพื่อติดตามข่าวสารดีลลับลดราคา แจ้งเตือนไอเทมมือสองสภาพสะสม และปรึกษาราคาพรีออร์เดอร์กับทีมงานได้ตลอด 24 ชั่วโมง ฟรีไม่มีค่าใช้จ่าย!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center gap-3 border border-[#383A40] p-4 bg-[#111214] rounded-2xl">
                  <Bell className="w-4 h-4 text-[#EC48BD] flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-[#DBDEE1] font-sans">แจ้งเตือนดีลโปรเด็ดก่อนใคร</span>
                </div>
                <div className="flex items-center gap-3 border border-[#383A40] p-4 bg-[#111214] rounded-2xl">
                  <AlertCircle className="w-4 h-4 text-[#00B0F4] flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-[#DBDEE1] font-sans">อัปเดตกำหนดการดรอปสนีกเกอร์</span>
                </div>
              </div>
            </div>

            {/* Discord Server Invite Widget Card */}
            <div className="bg-[#111214] border border-[#5865F2]/40 p-6 text-center lg:min-w-[340px] rounded-3xl shadow-xl flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-[#5865F2] text-white flex items-center justify-center font-black text-xl font-heading shadow-lg">
                  US2TH
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#23A55A] border-2 border-[#111214]" title="Online" />
              </div>
              
              <span className="text-[10px] text-[#949BA4] font-bold uppercase tracking-wider mb-1 font-heading">
                YOU'VE BEEN INVITED TO JOIN
              </span>
              <h4 className="text-base font-bold text-[#F2F3F5] mb-2 font-heading">
                US2TH OpenChat Hub
              </h4>

              {/* Server Stats */}
              <div className="flex items-center gap-3 text-xs font-semibold text-[#949BA4] mb-6 font-sans">
                <span className="flex items-center gap-1.5 text-[#35ED7E]">
                  <span className="w-2 h-2 rounded-full bg-[#23A55A] inline-block animate-pulse" />
                  1,450 ออนไลน์
                </span>
                <span>•</span>
                <span>6,200 สมาชิก</span>
              </div>
              
              <a
                href="https://bit.ly/3FFICJz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#23A55A] hover:bg-[#1F924F] text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading uppercase tracking-wider active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                เข้าร่วมกลุ่มคุย (JOIN SERVER)
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
