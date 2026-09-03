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
    <section id="testimonials" className="w-full bg-[#0A0D3A] py-24 px-4 md:px-8 border-b border-[#5865F2]/20 text-[#F2F3F5] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#5865F2]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#23A55A] animate-pulse" />
            <span className="text-xs font-bold text-[#35ED7E] uppercase tracking-widest font-heading">
              [ #CUSTOMER-VOUCHES // REAL REVIEWS ]
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F2F3F5] font-heading">
            ความพึงพอใจจากลูกค้าจริง
          </h2>
          <p className="text-sm md:text-base text-[#DBDEE1] mt-2 leading-relaxed font-medium font-sans">
            รีวิวและเสียงตอบรับจากนักสะสมและลูกค้าที่ใช้บริการนำเข้าสินค้ากับเราอย่างต่อเนื่อง
          </p>
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listToRender.map((t, idx) => {
            const avatarColors = ['bg-[#5865F2]', 'bg-[#23A55A]', 'bg-[#EC48BD]', 'bg-[#00B0F4]', 'bg-[#FEE75C]'];
            const avatarColor = avatarColors[idx % avatarColors.length];
            const initial = t.name.replace('คุณ', '').trim().charAt(0);

            return (
              <div 
                key={t.id}
                className="bg-[#1E1F22] border border-[#5865F2]/20 hover:border-[#5865F2]/50 hover:bg-[#232529] p-6 rounded-3xl flex flex-col justify-between transition-all shadow-lg discord-embed-blurple font-sans"
              >
                <div>
                  {/* Stars & Verified Role Header */}
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex gap-1">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FEE75C] text-[#FEE75C]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 bg-[#23A55A]/15 border border-[#23A55A]/30 text-[#35ED7E] text-[10px] font-black px-2.5 py-0.5 rounded-full font-heading uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      VERIFIED
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-[#DBDEE1] text-xs md:text-sm leading-relaxed mb-6 font-medium font-sans">
                    "{t.comment}"
                  </p>
                </div>

                {/* Customer Profile Discord Style */}
                <div className="border-t border-[#35373C] pt-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatarColor} text-white font-black flex items-center justify-center text-sm font-heading shadow-md flex-shrink-0`}>
                    {initial}
                  </div>
                  <div className="text-left overflow-hidden">
                    <span className="block text-xs md:text-sm font-bold text-[#F2F3F5] font-heading truncate">
                      {t.name}
                    </span>
                    <span className="block text-[11px] text-[#949BA4] font-sans truncate">
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
