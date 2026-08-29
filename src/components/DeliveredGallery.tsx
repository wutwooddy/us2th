'use client';

import React from 'react';
import Image from 'next/image';
import { Package, MapPin, Tag } from 'lucide-react';

const deliveredItems = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High OG "Travis Scott"',
    category: 'Sneakers',
    country: 'Japan 🇯🇵',
    price: '34,500 THB',
    imgUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    date: '2 วันที่แล้ว',
  },
  {
    id: 2,
    name: 'Supreme Box Logo Hooded Sweatshirt Black',
    category: 'Apparel',
    country: 'USA 🇺🇸',
    price: '28,900 THB',
    imgUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    date: '4 วันที่แล้ว',
  },
  {
    id: 3,
    name: 'Bearbrick Karimoku Horizon 400%',
    category: 'Collectibles',
    country: 'Hong Kong 🇭🇰',
    price: '112,000 THB',
    imgUrl: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=600',
    date: '1 สัปดาห์ที่แล้ว',
  },
  {
    id: 4,
    name: 'Nike SB Dunk Low "Travis Scott" Special Box',
    category: 'Sneakers',
    country: 'UK 🇬🇧',
    price: '46,000 THB',
    imgUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
    date: '1 สัปดาห์ที่แล้ว',
  },
  {
    id: 5,
    name: 'Yeezy Boost 350 V2 "Zebra"',
    category: 'Sneakers',
    country: 'South Korea 🇰🇷',
    price: '12,900 THB',
    imgUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
    date: '2 สัปดาห์ที่แล้ว',
  },
  {
    id: 6,
    name: 'Nike Zoom Vaporfly 3 Premium Sourcing',
    category: 'Sneakers',
    country: 'Singapore 🇸🇬',
    price: '9,800 THB',
    imgUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    date: '2 สัปดาห์ที่แล้ว',
  },
];

export default function DeliveredGallery() {
  return (
    <section id="showcase" className="w-full bg-[#0A0A0A] py-20 px-4 md:px-8 border-b border-dark-card-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs font-black text-brand-orange uppercase tracking-widest">REAL SOURCED LOOKBOOK</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              DELIVERED SHOWCASE
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              ตัวอย่างส่วนหนึ่งของสินค้านำเข้าหายาก ส่งตรงถึงมือลูกค้าชาวไทยเรียบร้อยแล้ว การันตีของแท้ 100% ทุกรายการ
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 text-xs font-mono text-neutral-500">
            SHOWING 6 OF 1,240+ SOURCED ITEMS
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {deliveredItems.map((item) => (
            <div 
              key={item.id}
              className="group bg-neutral-950 border border-neutral-900 overflow-hidden transition-all duration-300 hover:border-brand-orange/40 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <span className="bg-brand-emerald text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 flex items-center gap-1 shadow-md">
                    <Package className="w-3 h-3" />
                    DELIVERED 📦
                  </span>
                  
                  <span className="bg-black/85 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 shadow-md">
                    <MapPin className="w-3 h-3 text-brand-orange" />
                    {item.country}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="bg-black/90 text-neutral-400 text-[9px] font-mono px-2 py-0.5 border border-neutral-800">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">
                    <Tag className="w-3 h-3 text-neutral-500" />
                    {item.category}
                  </div>
                  <h3 className="text-sm md:text-base font-black text-white leading-snug group-hover:text-brand-orange transition-colors">
                    {item.name}
                  </h3>
                </div>
                
                <div className="mt-5 pt-4 border-t border-neutral-900 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Import Value</span>
                  <span className="text-sm font-black text-white tracking-tight">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
