'use client';

import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

const deliveredItems = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro Travis Scott',
    category: 'รองเท้าสนีกเกอร์',
    country: 'USA 🇺🇸',
    price: '34,500 THB',
    imgUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Supreme Box Logo Sweatshirt',
    category: 'เสื้อผ้าสตรีทแวร์',
    country: 'USA 🇺🇸',
    price: '28,900 THB',
    imgUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    name: 'Bearbrick Karimoku 400%',
    category: 'ของสะสมหายาก',
    country: 'Hong Kong 🇭🇰',
    price: '112,000 THB',
    imgUrl: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    name: 'Nike SB Dunk Low Travis Scott',
    category: 'รองเท้าสนีกเกอร์',
    country: 'UK 🇬🇧',
    price: '46,000 THB',
    imgUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 5,
    name: 'Yeezy Boost 350 V2 Zebra',
    category: 'รองเท้าสนีกเกอร์',
    country: 'South Korea 🇰🇷',
    price: '12,900 THB',
    imgUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 6,
    name: 'Nike Zoom Vaporfly 3',
    category: 'รองเท้าสนีกเกอร์',
    country: 'Singapore 🇸🇬',
    price: '9,800 THB',
    imgUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
  },
];

export default function DeliveredGallery() {
  return (
    <section id="showcase" className="w-full bg-[#090A0C] py-20 px-4 md:px-8 border-b border-white/[0.07] text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.15em] font-mono">
                DELIVERED ARCHIVE
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F4F4F2] font-heading">
              ผลงานจัดส่งล่าสุด
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 text-xs font-medium text-[#9B9FA8] font-sans flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#10B981]" />
            <span>จัดส่งสำเร็จแล้วกว่า 1,240 รายการทั่วไทย</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {deliveredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-[#12141A] border border-white/[0.08] hover:border-white/[0.16] rounded-2xl overflow-hidden shadow-md flex flex-col justify-between transition-all group"
            >
              {/* Thumbnail image */}
              <div className="aspect-square relative overflow-hidden bg-[#090A0C]">
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Origin tag */}
                <div className="absolute bottom-2 left-2 bg-[#090A0C]/90 backdrop-blur-xs text-[#F4F4F2] text-[10px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1 border border-white/[0.1]">
                  <MapPin className="w-2.5 h-2.5 text-[#10B981]" />
                  <span>{item.country}</span>
                </div>
              </div>

              {/* Text info */}
              <div className="p-3 text-left">
                <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider block mb-0.5">
                  {item.category}
                </span>
                <h3 className="text-xs font-medium text-[#F4F4F2] line-clamp-1 leading-snug font-sans" title={item.name}>
                  {item.name}
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
