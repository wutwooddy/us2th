'use client';

import React from 'react';
import { BookOpen, ArrowUpRight, Clock } from 'lucide-react';

const magazineArticles = [
  {
    id: 1,
    title: 'สวรรค์คนรักแบรนด์เนม: เจาะลึกวิธีสั่งซื้อสินค้าจาก Nordstrom ส่งตรงถึงบ้านคุณ',
    excerpt: 'พาไปดูวิธีเลือกซื้อเสื้อผ้า รองเท้า และกระเป๋าแบรนด์เนมสุดหรูที่ Nordstrom ห้างสรรพสินค้าชั้นนำของสหรัฐอเมริกา พร้อมแชร์เคล็ดลับการบริการจัดซื้อและประเมินราคาแบบเหมาจ่ายเบ็ดเสร็จ ส่งตรงถึงหน้าบ้านโดยไม่มีค่าใช้จ่ายแอบแฝงเพิ่มเติมภายหลังแน่นอน...',
    category: 'SOURCING GUIDE',
    date: 'AUG 31, 2026',
    readTime: '5 min read',
    imgUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    featured: true,
  },
  {
    id: 2,
    title: 'ล่าไอเทมหาสุดขอบโลก: คู่มือค้นหาและประเมินสินค้าแท้บน eBay อย่างปลอดภัย',
    excerpt: 'อยากสะสมโมเดล Bearbrick หรือสนีกเกอร์รุ่นวินเทจใน eBay แต่กลัวเจอของปลอม? อ่านคู่มือฉบับนี้เพื่อดูวิธีตรวจเช็คเครดิตคนขาย การสังเกตรายละเอียดสินค้าจริง และข้อควรระวังสำคัญสำหรับนักสะสมชาวไทย...',
    category: 'AUTHENTIC TIPS',
    date: 'AUG 29, 2026',
    readTime: '7 min read',
    imgUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 3,
    title: '5 แบรนด์เสื้อผ้าสตรีทแวร์นอกกระแสจากโตเกียว ที่กำลังมาแรงในยุคนี้',
    excerpt: 'เจาะลึกแบรนด์ดีไซเนอร์สตรีทแวร์สัญชาติญี่ปุ่นที่เปี่ยมไปด้วยเอกลักษณ์เฉพาะตัว แต่ยังไม่มีตัวแทนจำหน่ายอย่างเป็นทางการในไทย พาไปชมประวัติความเป็นมาและวิธีพรีออร์เดอร์แบบเหมาจ่ายจบครบทุกขั้นตอน...',
    category: 'STREET CULTURE',
    date: 'AUG 26, 2026',
    readTime: '4 min read',
    imgUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 4,
    title: 'เตรียมตัวรับโปรเด็ด: วางแผนพรีออร์เดอร์เทศกาล Black Friday อย่างไรให้คุ้มค่าที่สุด',
    excerpt: 'เปิดโผปฏิทินเทศกาลเซลครั้งใหญ่ประจำปีของฝั่งอเมริกาและยุโรป พร้อมแนะเทคนิคการเตรียมตัวกดสั่งซื้อและจัดหาของแบรนด์เนม เสื้อผ้าสตรีทแวร์ในช่วงลดราคากระหน่ำปลายปีให้ทันไซส์ในราคาคุ้มที่สุด...',
    category: 'SMART SHOPPING',
    date: 'AUG 20, 2026',
    readTime: '6 min read',
    imgUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
  {
    id: 5,
    title: 'เบื้องหลังกระแส Art Toy & ของสะสมหายาก ทำไมต้องสั่งจากตลาดฮ่องกงและสิงคโปร์?',
    excerpt: 'หาคำตอบว่าทำไมโมเดลของสะสมหายากและของเล่นรุ่นลิมิเต็ดถึงหลั่งไหลเข้าสู่ตลาดเอเชียผ่านทางฮ่องกงและสิงคโปร์ พร้อมแนะนำวิธีจัดหาและนำพรีออร์เดอร์ส่งตรงถึงไทยแบบเหมาจ่ายเคลียร์จบทุกเรื่อง...',
    category: 'COLLECTIBLES',
    date: 'AUG 15, 2026',
    readTime: '5 min read',
    imgUrl: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=800',
    featured: false,
  },
];

export default function MagazineSection() {
  const featuredArticle = magazineArticles.find(a => a.featured);
  const normalArticles = magazineArticles.filter(a => !a.featured);

  return (
    <section id="magazine" className="w-full bg-[#fbfbfb] py-24 px-4 md:px-8 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">[ นิตยสารช้อปปิ้งออนไลน์ ]</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              US2TH Journal
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-lg leading-relaxed font-semibold">
              บทความแนะนำแบรนด์ วิธีการช้อปปิ้งต่างประเทศ และอัปเดตเทรนด์แฟชั่นหายากเพื่อส่งเสริมความรู้ในการสั่งซื้อ
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>นิตยสารออนไลน์เพื่อคนรักของหายาก</span>
          </div>
        </div>

        {/* Featured Article Layout (Read The Cloud Style - Large horizontal card) */}
        {featuredArticle && (
          <div className="mb-16 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side */}
              <div className="lg:col-span-7 min-h-[300px] lg:min-h-[480px] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={featuredArticle.imgUrl} 
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-bold text-brand-green tracking-wider mb-6">
                    <span>{featuredArticle.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-450 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6 group-hover:text-brand-blue transition-colors leading-tight">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-semibold">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="text-xs font-bold text-slate-400">{featuredArticle.date}</span>
                  <span className="text-xs font-bold text-brand-blue flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    อ่านต่อ <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Regular Articles Grid (2x2 or 4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {normalArticles.map((article) => (
            <div 
              key={article.id}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image top */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.imgUrl} 
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-550 ease-out"
                  />
                </div>

                {/* Text body */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] font-bold text-brand-green tracking-wider mb-4">
                    <span>{article.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-450 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h4 className="text-base font-bold text-slate-850 mb-3 group-hover:text-brand-blue transition-colors leading-snug">
                    {article.title}
                  </h4>
                  
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3 font-semibold">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-50/50 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-400">{article.date}</span>
                <span className="text-[11px] font-bold text-brand-blue flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  อ่านเพิ่มเติม <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
