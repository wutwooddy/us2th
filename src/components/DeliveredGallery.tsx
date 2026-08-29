'use client';

import React from 'react';
import { Package, MapPin } from 'lucide-react';

const deliveredItems = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High OG "Travis Scott"',
    category: 'Sneakers',
    country: 'Japan 🇯🇵',
    price: '34,500 THB',
    imgUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000',
    date: '2 DAYS AGO',
    spanClass: 'md:col-span-8 aspect-[16/10]',
  },
  {
    id: 2,
    name: 'Supreme Box Logo Sweatshirt Black',
    category: 'Apparel',
    country: 'USA 🇺🇸',
    price: '28,900 THB',
    imgUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    date: '4 DAYS AGO',
    spanClass: 'md:col-span-4 aspect-[3/4]',
  },
  {
    id: 3,
    name: 'Bearbrick Karimoku Horizon 400%',
    category: 'Collectibles',
    country: 'Hong Kong 🇭🇰',
    price: '112,000 THB',
    imgUrl: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=600',
    date: '1 WEEK AGO',
    spanClass: 'md:col-span-4 aspect-[3/4]',
  },
  {
    id: 4,
    name: 'Nike SB Dunk Low "Travis Scott"',
    category: 'Sneakers',
    country: 'UK 🇬🇧',
    price: '46,000 THB',
    imgUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1000',
    date: '1 WEEK AGO',
    spanClass: 'md:col-span-8 aspect-[16/10]',
  },
  {
    id: 5,
    name: 'Yeezy Boost 350 V2 "Zebra"',
    category: 'Sneakers',
    country: 'South Korea 🇰🇷',
    price: '12,900 THB',
    imgUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    date: '2 WEEKS AGO',
    spanClass: 'md:col-span-6 aspect-square sm:aspect-[4/3]',
  },
  {
    id: 6,
    name: 'Nike Zoom Vaporfly 3 Premium Sourcing',
    category: 'Sneakers',
    country: 'Singapore 🇸🇬',
    price: '9,800 THB',
    imgUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    date: '2 WEEKS AGO',
    spanClass: 'md:col-span-6 aspect-square sm:aspect-[4/3]',
  },
];

export default function DeliveredGallery() {
  return (
    <section id="showcase" className="w-full bg-dark-bg py-24 px-4 md:px-8 border-b border-neutral-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-brand-orange" />
              <span className="font-mono text-xs font-black text-brand-orange uppercase tracking-widest">[ SOURCED INDEX CATALOG ]</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              DELIVERED SHOWCASE
            </h2>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider mt-3 max-w-lg leading-relaxed">
              PREVIOUS ACQUISITIONS SHIPPED DIRECTLY TO COLLECTORS IN THAILAND. 100% AUTHENTIC VERIFIED.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
            CATALOG_ID: US2TH-ARCHIVE_v1 // 1,240+ DELIVERIES
          </div>
        </div>

        {/* Asymmetric Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {deliveredItems.map((item) => (
            <div 
              key={item.id}
              className={`group bg-neutral-950 border border-neutral-900 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-brand-orange ${item.spanClass}`}
            >
              
              {/* Photo Area */}
              <div className="relative w-full h-full overflow-hidden flex-grow min-h-[250px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700 absolute inset-0"
                />
                
                {/* Asymmetric Text Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start font-mono text-[9px] tracking-widest uppercase">
                  <span className="bg-brand-emerald text-black font-black px-2 py-1 flex items-center gap-1">
                    <Package className="w-3 h-3 text-black" />
                    DELIVERED
                  </span>
                  
                  <span className="bg-black/90 text-white border border-neutral-800 px-2 py-1 flex items-center gap-1 font-bold">
                    <MapPin className="w-3 h-3 text-brand-orange" />
                    {item.country}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="max-w-[70%]">
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-1">
                      // {item.category}
                    </span>
                    <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-tight leading-tight">
                      {item.name}
                    </h3>
                  </div>
                  
                  <div className="text-right font-mono">
                    <span className="block text-[8px] text-neutral-500 tracking-wider">VALUE</span>
                    <span className="text-xs md:text-sm font-black text-white tracking-tighter">{item.price}</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
