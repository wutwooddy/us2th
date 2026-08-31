'use client';

import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'คุณธีรวัฒน์ S.',
    role: 'สัตวแพทย์ (นักสะสมสนีกเกอร์)',
    stars: 5,
    comment: 'ฝากหาสนีกเกอร์รุ่นวินเทจใน eBay ที่ตามหามาหลายปี แอดมินตอบเร็วมาก เช็คเครดิตคนขายให้ละเอียดจนมั่นใจ ปลายทางนำเข้าและส่งมอบเคลียร์ราคาเบ็ดเสร็จ ส่งถึงคลินิกในงวดเดียว ประทับใจมากครับ',
  },
  {
    id: 2,
    name: 'คุณเก็จมณี P.',
    role: 'ดีไซเนอร์แฟชั่นอิสระ',
    stars: 5,
    comment: 'พรีออร์เดอร์เสื้อแจ็คเก็ตและเสื้อผ้าสตรีทแวร์ลายกราฟิกยากๆ จากโตเกียวกับ US2TH ตลอดค่ะ ได้ราคาดีและเคลียร์ยอดจบทีเดียวตั้งแต่แรก ไม่มีค่าธรรมเนียมอื่นใดมาเรียกบวกเพิ่มทีหลัง แนะนำเลยค่ะ',
  },
  {
    id: 3,
    name: 'คุณณพัต P.',
    role: 'นักสะสมของเล่นระดับพรีเมียม',
    stars: 5,
    comment: 'ฝากหาโมเดล Bearbrick Karimoku ไม้แท้ ราคาหลักแสน แอดมินดูแลเป็นอย่างดี แพ็คของและห่อกันกระแทกส่งตรงจากฮ่องกงมาเนี๊ยบมาก ปลอดภัย ไว้ใจได้ล้านเปอร์เซ็นต์ครับสำหรับของสะสมราคาแพง',
  },
  {
    id: 4,
    name: 'คุณศรัณย์ K.',
    role: 'วิศวกรระบบ',
    stars: 5,
    comment: 'สั่งของแบรนด์เนมลดราคาจากห้าง Nordstrom ไปสองรอบ บริการดีและช่วยกดจองขนาดไซส์ได้ทันเวลาโปรโมชั่น มีระบบแจ้งสถานะพรีที่ดี คุ้มค่าและสบายใจกว่ากดเองเยอะครับ',
  },
  {
    id: 5,
    name: 'คุณวรัญญา A.',
    role: 'นักศึกษาการออกแบบดีไซน์',
    stars: 5,
    comment: 'เคยฝากสั่งรองเท้ารุ่นพิเศษจากเว็บยุโรปหลายครั้ง แอดมินช่วยประเมินราคาเหมานำส่งรวดเร็วมาก ราคาเน็ตจบที่หน้าบ้านจริงและไม่ต้องกังวลเรื่องขั้นตอนเอกสารนำเข้าหน้าประตูบ้านค่ะ',
  },
];

export default function TestimonialsSection() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {testimonials.map((t) => (
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
                  <span className="block text-[10px] text-slate-400 font-bold mt-0.5 font-heading">{t.role}</span>
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
