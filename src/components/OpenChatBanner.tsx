'use client';

import React from 'react';
import { MessageCircle, Bell, Sparkles, AlertCircle } from 'lucide-react';

export default function OpenChatBanner() {
  return (
    <section id="openchat" className="w-full bg-[#050505] py-20 px-4 md:px-8 border-b border-neutral-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Double-bordered Grid Box */}
        <div className="bg-black border border-neutral-900 p-8 md:p-12 relative overflow-hidden">
          {/* Asymmetric border overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-neutral-900" />
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-neutral-900" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
            <div className="max-w-2xl font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-[9px] font-black tracking-widest uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                [ COMM_INDEX: ACTIVE ]
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                LINE OPENCHAT VIP HUB
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-8 uppercase tracking-wide">
                JOIN THE OFFICIAL COMMUNICATION LINK FOR DAILY PRICE DROPS, REAL-TIME BARGAINS, PRE-OWNED SOURCED DROP NOTIFICATIONS, AND VIP SUPPORT. FREE ACCESSIBILITY FOR ALL PREMIUM CUSTOMERS.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-neutral-900 p-3 bg-neutral-950">
                  <Bell className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">LIVE DISCOUNT FEEDS</span>
                </div>
                <div className="flex items-center gap-3 border border-neutral-900 p-3 bg-neutral-950">
                  <AlertCircle className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">SIZING &amp; QC CONSULTING</span>
                </div>
              </div>
            </div>

            {/* CTA Terminal Box */}
            <div className="bg-neutral-950 border-2 border-neutral-900 p-6 text-center lg:min-w-[280px] font-mono">
              <div className="w-10 h-10 rounded-none bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto mb-4 border border-brand-orange/20">
                <MessageCircle className="w-5 h-5" />
              </div>
              
              <span className="block text-[8px] text-neutral-500 tracking-widest uppercase mb-1">
                ACCESS SYSTEM
              </span>
              <span className="block text-xs font-black text-white uppercase tracking-widest mb-6">
                US2TH OPENCHAT COMMUNITY
              </span>
              
              <a
                href="https://bit.ly/3FFICJz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-1.5 transition-all orange-glow"
              >
                JOIN THE FEED
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
