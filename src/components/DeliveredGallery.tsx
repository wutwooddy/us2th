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
    <section id="showcase" className="w-full bg-slate-50/30 py-24 px-4 md:px-8 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">[ ผลงานนำเข้าล่าสุด ]</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              ตัวอย่างสินค้าที่จัดส่งสำเร็จ
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-lg leading-relaxed">
              รวมภาพสินค้าแบรนด์เนมและของสะสมหายาก ที่เราจัดซื้อและนำส่งถึงมือลูกค้าในประเทศไทยอย่างปลอดภัย การันตีของแท้ 100%
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 text-xs font-bold text-slate-400">
            รวมจัดส่งสำเร็จแล้วกว่า 1,240+ รายการ
          </div>
        </div>

        {/* Asymmetric Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {deliveredItems.map((item) => (
            <div 
              key={item.id}
              className={`group bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-slate-200 ${item.spanClass}`}
            >
              
              {/* Photo Area */}
              <div className="relative w-full overflow-hidden min-h-[220px] md:min-h-[280px] flex-grow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 absolute inset-0"
                />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-xs tracking-wide">
                  <span className="bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Package className="w-3.5 h-3.5 text-white" />
                    จัดส่งแล้ว
                  </span>
                  
                  <span className="bg-white/90 text-slate-800 border border-slate-100 px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    สั่งจาก {item.country.replace(/🇺🇸|🇯🇵|🇬🇧|🇭🇰|🇰🇷|🇸🇬/g, '').trim()} {item.country.match(/🇺🇸|🇯🇵|🇬🇧|🇭🇰|🇰🇷|🇸🇬/g)}
                  </span>
                </div>
              </div>

              {/* Bottom Details (Now underneath image with high-contrast text) */}
              <div className="p-6 bg-white flex justify-between items-end border-t border-slate-50">
                <div className="max-w-[70%]">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                    {item.category === 'Sneakers' ? 'รองเท้าสนีกเกอร์' : item.category === 'Apparel' ? 'เสื้อผ้าแฟชั่น' : 'ของสะสมหายาก'}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-800 leading-snug">
                    {item.name}
                  </h3>
                </div>
                
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">ราคารวมส่ง</span>
                  <span className="text-sm md:text-base font-extrabold text-brand-orange tracking-tight">{item.price}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
