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
    <section id="showcase" className="w-full bg-[#FBFBFA] py-20 px-4 md:px-8 border-b border-[#E5E5E0] text-[#111111] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E0] pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider font-heading">
                ประวัติการส่งมอบจริง
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111] font-heading">
              ผลงานจัดส่งล่าสุด
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm font-medium text-[#555555] font-sans flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#059669]" />
            <span>จัดส่งสำเร็จแล้วกว่า 1,240 รายการทั่วไทย</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {deliveredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-[#E5E5E0] hover:border-[#D4D4CE] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs flex flex-col justify-between transition-all group text-left"
            >
              {/* Thumbnail image */}
              <div className="aspect-square relative overflow-hidden bg-[#F4F4F0]">
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Origin tag */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-[#111111] text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 border border-[#D4D4CE]">
                  <MapPin className="w-3 h-3 text-[#059669]" />
                  <span>{item.country}</span>
                </div>
              </div>

              {/* Text info with clear large price tag */}
              <div className="p-3.5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[11px] font-semibold text-[#059669] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#111111] line-clamp-2 leading-snug font-sans mb-2" title={item.name}>
                    {item.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-[#E5E5E0]">
                  <span className="text-xs text-[#777777] block">ราคาเหมาจบ:</span>
                  <span className="text-sm font-extrabold text-[#111111] font-mono">
                    {item.price}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
