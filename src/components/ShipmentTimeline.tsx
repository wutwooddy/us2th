'use client';

import React from 'react';
import { Plane, Truck, ShieldCheck, Navigation } from 'lucide-react';

const activeShipments = [
  {
    id: 'BATCH-US-991A',
    origin: 'OREGON, USA 🇺🇸',
    destination: 'BANGKOK, TH 🇹🇭',
    method: 'AIR_CARGO',
    status: 'IN CUSTOMS CLEARANCE (ศุลกากรขาเข้า)',
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
    <section id="tracker" className="w-full bg-black py-24 px-4 md:px-8 border-b border-neutral-900 relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-brand-emerald animate-pulse" />
              <span className="font-mono text-xs font-black text-brand-emerald uppercase tracking-widest">[ CARGO TRACKING PROTOCOL ]</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              LIVE TIMELINE
            </h2>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider mt-3 max-w-lg leading-relaxed">
              REAL-TIME LOGISTICS TRACKER FOR ACTIVE CARGOS CURRENTLY IN TRANSIT TO THAILAND.
            </p>
          </div>

          <div className="mt-6 md:mt-0 font-mono border border-brand-emerald/20 bg-brand-emerald/5 px-4 py-2 text-xs text-brand-emerald flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            <span>SECURE CLEARANCE SYSTEM // TAX_PAID</span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeShipments.map((shipment) => {
            return (
              <div 
                key={shipment.id}
                className="bg-neutral-950 border border-neutral-900 p-6 flex flex-col justify-between hover:border-brand-emerald/30 transition-colors"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-6 font-mono">
                    <span className="text-xs font-black text-brand-orange">
                      // {shipment.id}
                    </span>
                    <span className="text-[9px] text-neutral-400 border border-neutral-800 px-2 py-0.5 uppercase tracking-widest">
                      {shipment.method}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="mb-6 font-mono">
                    <span className="block text-[8px] text-neutral-500 tracking-wider">ROUTE</span>
                    <span className="block text-sm font-black text-white mt-1">
                      {shipment.origin} ➔ {shipment.destination}
                    </span>
                  </div>

                  {/* Current Status */}
                  <div className="mb-8 font-mono">
                    <span className="block text-[8px] text-neutral-500 tracking-wider">LOG_STATUS</span>
                    <div className="mt-2 p-3 bg-neutral-900 border border-neutral-850 text-[10px] font-bold text-brand-emerald flex items-start gap-2">
                      <Navigation className="w-3.5 h-3.5 text-brand-emerald animate-pulse flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{shipment.status}</span>
                    </div>
                  </div>

                  {/* Sleek Line Tracker */}
                  <div className="relative mb-8 px-2">
                    {/* Line Bar */}
                    <div className="absolute top-1.5 left-2 right-2 h-[1px] bg-neutral-800" />
                    <div 
                      className="absolute top-1.5 left-2 h-[1px] bg-brand-emerald transition-all duration-500" 
                      style={{ width: `${shipment.percentage}%` }}
                    />
                    
                    <div className="relative flex justify-between">
                      {shipment.steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div 
                            className={`w-3.5 h-3.5 rounded-none border flex items-center justify-center ${
                              step.done 
                                ? 'bg-brand-emerald border-brand-emerald' 
                                : step.active 
                                ? 'bg-black border-brand-emerald text-brand-emerald animate-pulse'
                                : 'bg-neutral-950 border-neutral-850'
                            }`}
                          />
                          <span 
                            className={`font-mono text-[8px] tracking-wider mt-2.5 ${
                              step.done || step.active ? 'text-white font-bold' : 'text-neutral-600'
                            }`}
                          >
                            {step.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="pt-4 border-t border-neutral-900 font-mono">
                  <span className="block text-[8px] text-neutral-500 tracking-wider">DELIVERY SUMMARY</span>
                  <span className="block text-xs font-black text-white mt-1">{shipment.eta}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
