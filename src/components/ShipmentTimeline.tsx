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
    <section id="tracker" className="w-full bg-white py-24 px-4 md:px-8 border-b border-slate-100 relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider">[ ติดตามสถานะการนำเข้า ]</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              สถานะตู้สินค้าล่าสุด
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-lg leading-relaxed">
              ติดตามเส้นทางการขนส่งสินค้าของแต่ละรอบบิน/รอบเรือจากต่างประเทศแบบเรียลไทม์
            </p>
          </div>

          <div className="mt-6 md:mt-0 border border-emerald-100 bg-emerald-50/50 rounded-2xl px-4 py-2.5 text-xs md:text-sm text-emerald-800 flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ดำเนินการนำเข้าอย่างเป็นระบบ // เคลียร์จบทุกขั้นตอนไม่มีบวกเพิ่ม</span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeShipments.map((shipment) => {
            return (
              <div 
                key={shipment.id}
                className="bg-slate-50/50 border border-slate-100 p-6 flex flex-col justify-between hover:border-slate-200 transition-colors rounded-3xl shadow-sm"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-brand-orange">
                      // {shipment.id}
                    </span>
                    <span className="text-xs text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-white font-semibold">
                      {shipment.method === 'AIR_CARGO' ? 'ขนส่งทางอากาศ' : 'ขนส่งทางเรือ'}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="mb-6">
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">เส้นทางขนส่ง</span>
                    <span className="block text-base font-bold text-slate-800 mt-1">
                      {shipment.origin} ➔ {shipment.destination}
                    </span>
                  </div>

                  {/* Current Status */}
                  <div className="mb-8">
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">สถานะปัจจุบัน</span>
                    <div className="mt-2 p-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs md:text-sm font-bold text-emerald-850 flex items-start gap-2">
                      <Navigation className="w-4 h-4 text-emerald-600 animate-pulse flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{shipment.status}</span>
                    </div>
                  </div>

                  {/* Line Tracker */}
                  <div className="relative mb-8 px-2">
                    {/* Line Bar */}
                    <div className="absolute top-1.5 left-2 right-2 h-1 bg-slate-200 rounded-full" />
                    <div 
                      className="absolute top-1.5 left-2 h-1 bg-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${shipment.percentage}%` }}
                    />
                    
                    <div className="relative flex justify-between">
                      {shipment.steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div 
                            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                              step.done 
                                ? 'bg-emerald-500 border-emerald-500' 
                                : step.active 
                                ? 'bg-white border-emerald-500 text-emerald-500 animate-pulse'
                                : 'bg-slate-200 border-slate-200'
                            }`}
                          />
                          <span 
                            className={`text-[10px] md:text-xs font-bold mt-2.5 ${
                              step.done || step.active ? 'text-slate-700' : 'text-slate-400'
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
                <div className="pt-4 border-t border-slate-100">
                  <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">ประมาณการจัดส่ง</span>
                  <span className="block text-sm font-bold text-slate-800 mt-1">{shipment.eta}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
