'use client';

import React from 'react';
import { Plane, Truck, ShieldCheck, Navigation } from 'lucide-react';

const activeShipments = [
  {
    id: 'BATCH-US-991A',
    origin: 'OREGON, USA 🇺🇸',
    destination: 'BANGKOK, TH 🇹🇭',
    method: 'AIR_CARGO',
    status: 'ARRIVED AT TH HUB (อยู่ระหว่างจัดเตรียมนำส่ง)',
    percentage: 80,
    steps: [
      { name: 'PICKUP', done: true },
      { name: 'DEP.US', done: true },
      { name: 'ARR.TH', done: true },
      { name: 'CUSTOMS', active: true },
      { name: 'DELIV', pending: true }
    ],
    eta: 'EST. DELIVERY: 3-5 DAYS',
  },
  {
    id: 'BATCH-JP-442B',
    origin: 'TOKYO, JP 🇯🇵',
    destination: 'BANGKOK, TH 🇹🇭',
    method: 'AIR_CARGO',
    status: 'IN TRANSIT TO THAILAND (อยู่ระหว่างขนส่ง)',
    percentage: 50,
    steps: [
      { name: 'PICKUP', done: true },
      { name: 'DEP.JP', done: true },
      { name: 'ARR.TH', active: true },
      { name: 'CUSTOMS', pending: true },
      { name: 'DELIV', pending: true }
    ],
    eta: 'EST. DELIVERY: 6-9 DAYS',
  },
  {
    id: 'BATCH-UK-088C',
    origin: 'LONDON, UK 🇬🇧',
    destination: 'BANGKOK, TH 🇹🇭',
    method: 'AIR_CARGO',
    status: 'DISPATCHED FOR LOCAL DELIVERY (เตรียมจัดส่ง)',
    percentage: 100,
    steps: [
      { name: 'PICKUP', done: true },
      { name: 'DEP.UK', done: true },
      { name: 'ARR.TH', done: true },
      { name: 'CUSTOMS', done: true },
      { name: 'DELIV', active: true }
    ],
    eta: 'DISPATCHED VIA FLASH EXPRESS',
  }
];

export default function ShipmentTimeline() {
  return (
    <section id="tracker" className="w-full bg-[#0A0D3A] py-24 px-4 md:px-8 border-b border-[#5865F2]/20 relative overflow-hidden text-[#F2F3F5]">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00B0F4]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5865F2]/20 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00B0F4] animate-pulse" />
              <span className="text-xs font-bold text-[#00B0F4] uppercase tracking-widest font-heading">
                [ #CARGO-TRACKER // LOGISTICS HUB ]
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F2F3F5] font-heading">
              สถานะตู้สินค้า & การนำเข้าล่าสุด
            </h2>
            <p className="text-sm md:text-base text-[#DBDEE1] mt-2 max-w-lg leading-relaxed font-medium font-sans">
              ติดตามเส้นทางการขนส่งสินค้าของแต่ละรอบบิน/รอบเรือจากต่างประเทศแบบเรียลไทม์
            </p>
          </div>

          <div className="mt-6 md:mt-0 border border-[#23A55A]/30 bg-[#23A55A]/10 rounded-2xl px-4 py-2.5 text-xs md:text-sm text-[#35ED7E] flex items-center gap-2 font-bold font-heading">
            <ShieldCheck className="w-4 h-4 text-[#35ED7E]" />
            <span>ดำเนินการนำเข้าถูกต้องตามระบบ // เคลียร์จบทุกขั้นตอนไม่มีบวกเพิ่ม</span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeShipments.map((shipment) => {
            return (
              <div 
                key={shipment.id}
                className="bg-[#1E1F22] border border-[#5865F2]/25 hover:border-[#5865F2]/50 p-6 flex flex-col justify-between transition-all rounded-3xl shadow-xl discord-embed-blurple"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-[#00B0F4] font-heading">
                      // {shipment.id}
                    </span>
                    <span className="text-xs text-[#DBDEE1] border border-[#5865F2]/20 px-3 py-1 rounded-full uppercase tracking-wider bg-[#111214] font-semibold font-heading">
                      {shipment.method === 'AIR_CARGO' ? '✈️ ขนส่งทางอากาศ' : '🚢 ขนส่งทางเรือ'}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="mb-6">
                    <span className="block text-xs text-[#949BA4] font-bold uppercase tracking-wider font-heading">เส้นทางขนส่ง</span>
                    <span className="block text-base font-bold text-[#F2F3F5] mt-1 font-sans">
                      {shipment.origin} ➔ {shipment.destination}
                    </span>
                  </div>

                  {/* Current Status */}
                  <div className="mb-8">
                    <span className="block text-xs text-[#949BA4] font-bold uppercase tracking-wider font-heading">สถานะปัจจุบัน</span>
                    <div className="mt-2 p-3.5 bg-[#111214] border border-[#23A55A]/30 rounded-2xl text-xs md:text-sm font-bold text-[#35ED7E] flex items-start gap-2">
                      <Navigation className="w-4 h-4 text-[#35ED7E] animate-pulse flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-sans">{shipment.status}</span>
                    </div>
                  </div>

                  {/* Line Tracker */}
                  <div className="relative mb-8 px-2">
                    {/* Line Bar */}
                    <div className="absolute top-1.5 left-2 right-2 h-1 bg-[#111214] rounded-full" />
                    <div 
                      className="absolute top-1.5 left-2 h-1 bg-[#23A55A] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(35,165,90,0.6)]" 
                      style={{ width: `${shipment.percentage}%` }}
                    />
                    
                    <div className="relative flex justify-between">
                      {shipment.steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div 
                            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                              step.done 
                                ? 'bg-[#23A55A] border-[#23A55A]' 
                                : step.active 
                                ? 'bg-[#F2F3F5] border-[#23A55A] text-[#23A55A] animate-pulse shadow-[0_0_8px_rgba(35,165,90,0.8)]' 
                                : 'bg-[#111214] border-[#383A40]'
                            }`}
                          />
                          <span 
                            className={`text-[10px] md:text-xs font-bold mt-2.5 font-heading ${
                              step.done || step.active ? 'text-[#F2F3F5]' : 'text-[#80848E]'
                            }`}
                          >
                            {step.name === 'PICKUP' ? 'รับของ' : step.name === 'DEP.US' || step.name === 'DEP.JP' || step.name === 'DEP.UK' ? 'ส่งออก' : step.name === 'ARR.TH' ? 'ถึงไทย' : step.name === 'CUSTOMS' ? 'คลังไทย' : 'จัดส่ง'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="pt-4 border-t border-[#35373C] flex items-center justify-between">
                  <span className="block text-xs text-[#949BA4] font-bold uppercase tracking-wider font-heading">ประมาณการจัดส่ง</span>
                  <span className="block text-xs md:text-sm font-black text-[#35ED7E] font-heading">{shipment.eta}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
