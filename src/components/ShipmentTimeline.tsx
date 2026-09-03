'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, Plane } from 'lucide-react';

const activeShipments = [
  {
    id: 'BATCH-US-991A',
    origin: 'OREGON, USA 🇺🇸',
    destination: 'BANGKOK, TH 🇹🇭',
    method: 'AIR_CARGO',
    status: 'ARRIVED AT TH HUB (อยู่ระหว่างจัดเตรียมนำส่ง)',
    percentage: 80,
    steps: [
      { name: 'PICKUP', label: 'รับของ', done: true },
      { name: 'DEP.US', label: 'ส่งออก', done: true },
      { name: 'ARR.TH', label: 'ถึงไทย', done: true },
      { name: 'CUSTOMS', label: 'คลังไทย', active: true },
      { name: 'DELIV', label: 'จัดส่ง', pending: true }
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
      { name: 'PICKUP', label: 'รับของ', done: true },
      { name: 'DEP.JP', label: 'ส่งออก', done: true },
      { name: 'ARR.TH', label: 'ถึงไทย', active: true },
      { name: 'CUSTOMS', label: 'คลังไทย', pending: true },
      { name: 'DELIV', label: 'จัดส่ง', pending: true }
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
      { name: 'PICKUP', label: 'รับของ', done: true },
      { name: 'DEP.UK', label: 'ส่งออก', done: true },
      { name: 'ARR.TH', label: 'ถึงไทย', done: true },
      { name: 'CUSTOMS', label: 'คลังไทย', done: true },
      { name: 'DELIV', label: 'จัดส่ง', active: true }
    ],
    eta: 'DISPATCHED VIA FLASH EXPRESS',
  }
];

export default function ShipmentTimeline() {
  return (
    <section id="tracker" className="w-full bg-[#090A0C] py-20 md:py-24 px-4 md:px-8 border-b border-white/[0.07] text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.15em] font-mono">
                LIVE LOGISTICS RADAR
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#F4F4F2] font-heading">
              สถานะตู้สินค้า & การนำเข้าล่าสุด
            </h2>
            <p className="text-xs md:text-sm text-[#9B9FA8] mt-1.5 max-w-lg leading-relaxed font-sans">
              ติดตามสถานะรอบบินและรอบเรือนำเข้าจากต่างประเทศแบบเรียลไทม์
            </p>
          </div>

          <div className="mt-4 md:mt-0 border border-white/[0.1] bg-white/[0.04] rounded-xl px-3.5 py-2 text-xs text-[#9B9FA8] flex items-center gap-2 font-medium font-sans">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>ดำเนินการถูกต้องตามระบบ เคลียร์จบทุกขั้นตอนไม่มีบวกเพิ่ม</span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activeShipments.map((shipment) => {
            return (
              <div 
                key={shipment.id}
                className="bg-[#12141A] border border-white/[0.08] hover:border-white/[0.16] p-6 flex flex-col justify-between transition-all rounded-2xl shadow-lg"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-mono font-semibold text-[#10B981]">
                      {shipment.id}
                    </span>
                    <span className="text-[10px] text-[#9B9FA8] border border-white/[0.08] px-2.5 py-1 rounded-sm uppercase tracking-wider bg-[#090A0C] font-mono">
                      {shipment.method === 'AIR_CARGO' ? 'AIR CARGO' : 'SEA FREIGHT'}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="mb-5">
                    <span className="block text-[11px] text-[#60646E] font-medium uppercase tracking-wider font-sans">เส้นทางขนส่ง</span>
                    <span className="block text-sm font-semibold text-[#F4F4F2] mt-0.5 font-sans">
                      {shipment.origin} <ArrowRight className="inline w-3.5 h-3.5 mx-1 text-[#60646E]" /> {shipment.destination}
                    </span>
                  </div>

                  {/* Current Status */}
                  <div className="mb-6">
                    <span className="block text-[11px] text-[#60646E] font-medium uppercase tracking-wider font-sans">สถานะปัจจุบัน</span>
                    <div className="mt-1.5 p-3 bg-[#090A0C] border border-white/[0.06] rounded-xl text-xs font-medium text-[#F4F4F2] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed font-sans">{shipment.status}</span>
                    </div>
                  </div>

                  {/* Line Tracker */}
                  <div className="relative mb-6 px-1">
                    <div className="absolute top-1.5 left-2 right-2 h-0.5 bg-white/[0.08] rounded-full" />
                    <div 
                      className="absolute top-1.5 left-2 h-0.5 bg-[#10B981] rounded-full transition-all duration-500" 
                      style={{ width: `${shipment.percentage}%` }}
                    />
                    
                    <div className="relative flex justify-between">
                      {shipment.steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div 
                            className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${
                              step.done 
                                ? 'bg-[#10B981] border-[#10B981]' 
                                : step.active 
                                ? 'bg-[#F4F4F2] border-[#10B981]' 
                                : 'bg-[#090A0C] border-white/[0.15]'
                            }`}
                          />
                          <span 
                            className={`text-[10px] font-medium mt-2 font-sans ${
                              step.done || step.active ? 'text-[#F4F4F2]' : 'text-[#60646E]'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="block text-[11px] text-[#60646E] font-medium uppercase tracking-wider font-sans">ประมาณการ</span>
                  <span className="block text-xs font-mono font-semibold text-[#10B981]">{shipment.eta}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
