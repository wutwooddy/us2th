'use client';

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

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
    <section id="testimonials" className="w-full bg-[#090A0C] py-20 md:py-24 px-4 md:px-8 border-b border-white/[0.07] text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.15em] font-mono">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#F4F4F2] font-heading">
            ความพึงพอใจจากลูกค้าจริง
          </h2>
          <p className="text-xs md:text-sm text-[#9B9FA8] mt-1.5 leading-relaxed font-sans">
            เสียงตอบรับจากนักสะสมและผู้ที่ใช้บริการนำเข้าสินค้าหายากกับเราอย่างต่อเนื่อง
          </p>
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listToRender.map((t) => {
            const initial = t.name.replace('คุณ', '').trim().charAt(0);

            return (
              <div 
                key={t.id}
                className="bg-[#12141A] border border-white/[0.08] hover:border-white/[0.16] p-6 rounded-2xl flex flex-col justify-between transition-all shadow-md font-sans"
              >
                <div>
                  {/* Stars & Verified Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] text-[#10B981] text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm">
                      <ShieldCheck className="w-3 h-3" />
                      VERIFIED CLIENT
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-[#9B9FA8] text-xs md:text-sm leading-relaxed mb-6 font-normal font-sans">
                    "{t.comment}"
                  </p>
                </div>

                {/* Customer Profile */}
                <div className="border-t border-white/[0.06] pt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#F4F4F2] font-semibold flex items-center justify-center text-xs font-mono flex-shrink-0">
                    {initial}
                  </div>
                  <div className="text-left overflow-hidden">
                    <span className="block text-xs font-semibold text-[#F4F4F2] font-heading truncate">
                      {t.name}
                    </span>
                    <span className="block text-[10px] text-[#60646E] font-sans truncate">
                      {t.role}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
