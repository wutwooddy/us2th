'use client';

import React from 'react';
import { MessageCircle, Bell, Sparkles, HelpCircle } from 'lucide-react';

export default function OpenChatBanner() {
  return (
    <section id="openchat" className="w-full bg-[#0A0A0A] py-16 px-4 md:px-8 border-b border-dark-card-border relative overflow-hidden">
      
      {/* Background neon effect */}
      <div className="absolute left-1/4 bottom-0 w-[400px] h-[200px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800 p-6 md:p-10 rounded-sm relative overflow-hidden">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Community Promo Group
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3">
              LINE OpenChat VIP Community
            </h3>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-6">
              เข้าร่วมกลุ่มพูดคุยทางการของร้าน เพื่อรับอัปเดตดีลลดราคาจากช็อปต่างประเทศประจำวัน, สินค้าหลุดจำนำแบรนด์เนมราคาพิเศษ และจองคิวหาของหายากก่อนใคร (ฟรี ไม่มีค่าใช้จ่าย)
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                <Bell className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>แจ้งเตือนดีลเด็ดนาทีทองรายวัน</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                <HelpCircle className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>ปรึกษาไซส์และวิธีเช็กแท้-ปลอม</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-black/40 border border-neutral-800 p-6 rounded-sm text-center min-w-[240px] flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-3">
              <MessageCircle className="w-6 h-6" />
            </div>
            
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">
              LINE OpenChat
            </span>
            <span className="text-xs font-bold text-white mb-4">
              US2TH VIP PROMO GROUP
            </span>
            
            <a
              href="https://bit.ly/3FFICJz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-lg orange-glow"
            >
              เข้าร่วมกลุ่มเลย
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
