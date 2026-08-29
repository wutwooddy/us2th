'use client';

import React from 'react';
import { Plane, Truck, Anchor, CheckCircle2, Navigation, ShieldCheck } from 'lucide-react';

const activeShipments = [
  {
    id: 'BATCH-US-991A',
    origin: 'Oregon, United States 🇺🇸',
    destination: 'Bangkok, Thailand 🇹🇭',
    method: 'Air Cargo',
    status: 'อยู่ระหว่างพิธีการศุลกากร (Customs Clearance)',
    percentage: 80,
    steps: [
      { name: 'เข้ารับสินค้า', done: true },
      { name: 'ส่งออกจากโกดัง US', done: true },
      { name: 'เดินทางถึงไทย (BKK)', done: true },
      { name: 'ศุลกากรขาเข้า', active: true },
      { name: 'จัดส่งในไทย', pending: true }
    ],
    eta: 'คาดว่าถึงมือลูกค้าใน 3-5 วัน',
    icon: Plane,
  },
  {
    id: 'BATCH-JP-442B',
    origin: 'Tokyo, Japan 🇯🇵',
    destination: 'Bangkok, Thailand 🇹🇭',
    method: 'Air Cargo',
    status: 'สินค้าอยู่ระหว่างขนส่งไปไทย (In Transit)',
    percentage: 50,
    steps: [
      { name: 'เข้ารับสินค้า', done: true },
      { name: 'ส่งออกจากโกดัง JP', done: true },
      { name: 'เดินทางถึงไทย (BKK)', active: true },
      { name: 'ศุลกากรขาเข้า', pending: true },
      { name: 'จัดส่งในไทย', pending: true }
    ],
    eta: 'คาดว่าถึงมือลูกค้าใน 6-9 วัน',
    icon: Plane,
  },
  {
    id: 'BATCH-UK-088C',
    origin: 'London, United Kingdom 🇬🇧',
    destination: 'Bangkok, Thailand 🇹🇭',
    method: 'Air Cargo',
    status: 'นำเข้าเรียบร้อย เตรียมจัดส่งในประเทศ',
    percentage: 100,
    steps: [
      { name: 'เข้ารับสินค้า', done: true },
      { name: 'ส่งออกจากโกดัง UK', done: true },
      { name: 'เดินทางถึงไทย (BKK)', done: true },
      { name: 'ศุลกากรขาเข้า', done: true },
      { name: 'จัดส่งในไทย', active: true }
    ],
    eta: 'ส่งมอบให้ขนส่งในไทยแล้ว (Kerry/Flash)',
    icon: Truck,
  }
];

export default function ShipmentTimeline() {
  return (
    <section id="tracker" className="w-full bg-neutral-950 py-20 px-4 md:px-8 border-b border-dark-card-border relative">
      
      {/* Decorative side glow */}
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] bg-brand-emerald/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              <span className="text-xs font-black text-brand-emerald uppercase tracking-widest">LIVE IMPORT TRACKER</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              LIVE SHIPMENT TIMELINE
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              ติดตามสถานะตู้คอนเทนเนอร์และคาร์โก้ของร้านเราได้แบบเรียลไทม์ โปร่งใส ตรวจสอบได้ เพื่อความมั่นใจของลูกค้าทุกคน
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-brand-emerald/10 border border-brand-emerald/20 px-3.5 py-1.5 rounded-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider">
              เคลียร์ภาษีถูกกฎหมาย 100%
            </span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activeShipments.map((shipment) => {
            const Icon = shipment.icon;
            return (
              <div 
                key={shipment.id}
                className="bg-neutral-900/40 border border-neutral-800 p-5 md:p-6 rounded-sm flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Batch ID and Method */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono font-black text-brand-orange">
                      {shipment.id}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1">
                      <Icon className="w-3 h-3 text-brand-emerald" />
                      {shipment.method}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="mb-4">
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Route</div>
                    <div className="text-xs md:text-sm font-black text-white mt-1 flex items-center gap-1.5">
                      <span>{shipment.origin.split(' ')[0]}</span>
                      <span className="text-neutral-600">➔</span>
                      <span>{shipment.destination.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="mb-6">
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Current Status</div>
                    <div className="text-xs font-bold text-brand-emerald mt-1.5 flex items-center gap-1.5 bg-brand-emerald/5 border border-brand-emerald/10 p-2.5 rounded-sm">
                      <Navigation className="w-3.5 h-3.5 text-brand-emerald animate-pulse flex-shrink-0" />
                      <span className="leading-snug">{shipment.status}</span>
                    </div>
                  </div>

                  {/* Horizontal steps design */}
                  <div className="relative mb-6">
                    <div className="absolute top-1.5 left-0 right-0 h-0.5 bg-neutral-800 -z-10" />
                    
                    <div className="flex justify-between">
                      {shipment.steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div 
                            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                              step.done 
                                ? 'bg-brand-emerald border-brand-emerald' 
                                : step.active 
                                ? 'bg-black border-brand-emerald animate-pulse'
                                : 'bg-neutral-900 border-neutral-800'
                            }`}
                          />
                          <span 
                            className={`text-[8px] md:text-[9px] font-bold uppercase tracking-widest mt-1.5 ${
                              step.done || step.active ? 'text-white font-black' : 'text-neutral-600'
                            }`}
                          >
                            {step.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer: ETA */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">ETA Details</span>
                  <span className="text-xs font-black text-white">{shipment.eta}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
