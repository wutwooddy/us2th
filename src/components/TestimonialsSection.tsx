'use client';

import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const testimonials = [
  {
    id: 1,
    name: 'คุณธีรวัฒน์ S.',
    role: 'สัตวแพทย์ (นักสะสมสนีกเกอร์)',
    stars: 5,
    comment: 'ฝากหาสนีกเกอร์ eBay แอดมินตอบเร็วมาก เช็คเครดิตคนขายให้ละเอียด นำเข้าและส่งมอบเคลียร์ราคาเบ็ดเสร็จ ส่งถึงคลินิกงวดเดียวจบเลยครับ',
  },
  {
    id: 2,
    name: 'คุณเก็จมณี P.',
    role: 'ดีไซเนอร์แฟชั่นอิสระ',
    stars: 5,
    comment: 'พรีออร์เดอร์เสื้อผ้าสตรีทแวร์จากโตเกียวกับ US2TH ตลอดค่ะ ได้ราคาดีและเคลียร์ยอดจบทีเดียวตั้งแต่แรก ไม่มีค่าธรรมเนียมอื่นบวกเพิ่มแน่นอน',
  },
  {
    id: 3,
    name: 'คุณณพัต P.',
    role: 'นักสะสมของเล่นระดับพรีเมียม',
    stars: 5,
    comment: 'ฝากหา Bearbrick Karimoku ไม้แท้หลักแสน แอดมินแพ็คของและห่อกันกระแทกส่งตรงเนี๊ยบมาก ปลอดภัย ไว้ใจได้ล้านเปอร์เซ็นต์ครับ',
  },
  {
    id: 4,
    name: 'คุณศรัณย์ K.',
    role: 'วิศวกรระบบ',
    stars: 5,
    comment: 'สั่งของแบรนด์เนมลดราคาจากห้าง Nordstrom ไปสองรอบ บริการดีช่วยกดจองไซส์ทันเวลาโปร มีระบบแจ้งสถานะพรีที่ดี คุ้มค่าและสบายใจมากครับ',
  },
  {
    id: 5,
    name: 'คุณวรัญญา A.',
    role: 'นักศึกษาการออกแบบดีไซน์',
    stars: 5,
    comment: 'ฝากสั่งรองเท้ารุ่นพิเศษจากเว็บยุโรปหลายครั้ง แอดมินประเมินราคาเหมานำส่งรวดเร็ว ราคาเน็ตจบที่หน้าบ้านจริงไม่ต้องห่วงเรื่องภาษีนำเข้าเลยค่ะ',
  },
];

export default function TestimonialsSection({ testimonialsData }: { testimonialsData?: typeof testimonials }) {
  const listToRender = testimonialsData || testimonials;
  return (
    <section id="testimonials" className="w-full bg-white py-20 px-4 md:px-8 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-green" />
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-heading">[ เสียงตอบรับจากผู้ใช้บริการ ]</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-heading">
            ความพึงพอใจจากลูกค้า
          </h2>
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listToRender.map((t) => (
            <div 
              key={t.id}
              className="bg-[#fbfbfb] border border-slate-100 p-6 rounded-3xl flex flex-col justify-between hover:border-slate-200 transition-colors shadow-sm"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex justify-between items-center mb-4">
                  <Quote className="w-5 h-5 text-slate-300" />
                  <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed mb-6 font-semibold">
                  "{t.comment}"
                </p>
              </div>

              {/* Customer Profiling */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-800 font-heading">{t.name}</span>
                </div>
                <div className="text-brand-green bg-brand-green/5 p-1 rounded-full" title="Verified Customer">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
