'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { mockArticles, Article } from '@/lib/mockArticles';
import { Star, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TESTIMONIALS = [
  {
    name: 'คุณธีรวัฒน์ S.',
    role: 'สัตวแพทย์ (นักสะสมสนีกเกอร์)',
    comment: 'ฝากหาสนีกเกอร์ eBay แอดมินตอบเร็วมาก เช็คเครดิตคนขายให้ละเอียด นำเข้าและส่งมอบเคลียร์ราคาเบ็ดเสร็จ ส่งถึงคลินิกงวดเดียวจบเลยครับ'
  },
  {
    name: 'คุณเก็จมณี P.',
    role: 'ดีไซเนอร์แฟชั่นอิสระ',
    comment: 'พรีออร์เดอร์เสื้อผ้าสตรีทแวร์จากโตเกียวกับ US2TH ตลอดค่ะ ได้ราคาดีและเคลียร์ยอดจบทีเดียวตั้งแต่แรก ไม่มีค่าธรรมเนียมอื่นบวกเพิ่มแน่นอน'
  },
  {
    name: 'คุณณพัต P.',
    role: 'นักสะสมของเล่นระดับพรีเมียม',
    comment: 'ฝากหา Bearbrick Karimoku ไม้แท้หลักแสน แอดมินแพ็คของและห่อกันกระแทกส่งตรงเนี๊ยบมาก ปลอดภัย ไว้ใจได้ล้านเปอร์เซ็นต์ครับ'
  },
  {
    name: 'คุณศรัณย์ K.',
    role: 'วิศวกรระบบ',
    comment: 'สั่งของแบรนด์เนมลดราคาจากห้าง Nordstrom ไปสองรอบ บริการดีช่วยกดจองไซส์ทันเวลาโปร มีระบบแจ้งสถานะพรีที่ดี คุ้มค่าและสบายใจมากครับ'
  },
  {
    name: 'คุณวรัญญา A.',
    role: 'นักศึกษาการออกแบบดีไซน์',
    comment: 'ฝากสั่งรองเท้ารุ่นพิเศษจากเว็บยุโรปหลายครั้ง แอดมินประเมินราคาเหมานำส่งรวดเร็ว ราคาเน็ตจบที่หน้าบ้านจริงไม่ต้องห่วงเรื่องภาษีนำเข้าเลยค่ะ'
  }
];

export default function SoftSellHeader() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [randomTestimonial, setRandomTestimonial] = useState<typeof TESTIMONIALS[0] | null>(null);

  useEffect(() => {
    // Pick 1 random testimonial
    const randomIdx = Math.floor(Math.random() * TESTIMONIALS.length);
    setRandomTestimonial(TESTIMONIALS[randomIdx]);

    // Fetch 3 latest articles
    async function getArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        if (!error && data && data.length >= 3) {
          setArticles(data);
        } else {
          setArticles(mockArticles.slice(0, 3));
        }
      } catch (err) {
        setArticles(mockArticles.slice(0, 3));
      }
    }
    getArticles();
  }, []);

  return (
    <section className="w-full bg-[#fafafa] py-12 px-4 md:px-8 border-b border-slate-100 font-sans">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Magazine / Lifestyle Articles Thumbnail Grid */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-heading">
                [ นิตยสารแฟชั่น & ช้อปปิ้งสตรีทแวร์ ]
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-6 font-heading">
              บทความน่าสนใจ & อัปเดตเทรนด์แฟชั่น
            </h3>

            {/* Articles List: Row/Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {articles.map((art) => (
                <Link 
                  href={`/journal/${art.slug}`} 
                  key={art.id}
                  className="group flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-sm hover:border-slate-300 transition-all duration-300"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={art.img_url} 
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 flex flex-col justify-between flex-grow text-left">
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-wider mb-1 block">
                      {art.category || 'LIFESTYLE'}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors font-sans mb-3">
                      {art.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 flex items-center gap-0.5 mt-auto">
                      อ่านต่อ <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 1 Random Testimonial Card */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-slate-200/60 p-6 rounded-3xl shadow-xs relative text-left">
          {randomTestimonial ? (
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-200" />
                </div>
                <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-medium mb-6 font-sans">
                  "{randomTestimonial.comment}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <span className="block text-xs font-bold text-slate-800 font-heading">
                  {randomTestimonial.name}
                </span>
                <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                  {randomTestimonial.role}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              กำลังโหลดรีวิวจากลูกค้า...
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
