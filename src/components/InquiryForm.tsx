'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Send, CheckCircle2, AlertTriangle, Loader2, Info, MessageCircle } from 'lucide-react';

export default function InquiryForm() {
  const [category, setCategory] = useState('Sneakers');
  const [productDetails, setProductDetails] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productDetails.trim()) {
      setErrorMsg('กรุณากรอกรายละเอียดสินค้า เช่น ชื่อรุ่น ไซส์ หรือวางลิงก์สินค้าครับ');
      return;
    }
    if (!contactInfo.trim()) {
      setErrorMsg('กรุณากรอกข้อมูลสำหรับติดต่อกลับ (LINE ID, เบอร์โทร หรือ Facebook) ด้วยครับ');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            category: category,
            product_details: productDetails,
            contact_info: contactInfo,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      setProductDetails('');
      setContactInfo('');
    } catch (err: any) {
      console.error('Error inserting into Supabase: ', err);
      setErrorMsg(
        'ระบบไม่สามารถส่งข้อมูลได้ชั่วคราว คุณสามารถทักแชท LINE OA (@hij2541a) ด้านล่างเพื่อแจ้งความต้องการหาของกับแอดมินได้โดยตรงครับ'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry" className="w-full bg-[#090A0C] py-20 md:py-24 px-4 md:px-8 border-b border-white/[0.07] text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Information & Instructions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.15em] font-mono">
                BESPOKE SOURCING
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#F4F4F2] mb-4 font-heading">
              ฝากหาของ / เช็คราคา
            </h2>
            <p className="text-xs md:text-sm text-[#9B9FA8] leading-relaxed mb-8 font-sans">
              เมื่อไอเทมที่คุณตามหาไม่มีวางจำหน่ายในไทย หรือหาซื้อได้ยาก เราพร้อมช่วยจัดซื้อและนำส่งตรงถึงหน้าบ้านคุณ ในราคาเหมาจ่ายเบ็ดเสร็จ ไร้กังวลเรื่องค่าใช้จ่ายเพิ่มเติมภายหลัง
            </p>
            
            <div className="space-y-3.5 border-t border-white/[0.08] pt-6">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#12141A] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-white/[0.06] text-[#F4F4F2] flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-[#9B9FA8] font-sans">
                  <strong className="text-[#F4F4F2] block font-heading mb-0.5">เลือกหมวดหมู่ประเภทสินค้า</strong>
                  สนีกเกอร์, เสื้อผ้าสตรีทแวร์, ของสะสม หรือสินค้าทั่วไป
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#12141A] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-white/[0.06] text-[#F4F4F2] flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-[#9B9FA8] font-sans">
                  <strong className="text-[#F4F4F2] block font-heading mb-0.5">ระบุรายละเอียดหรือวางลิงก์</strong>
                  ลิงก์จากเว็บต่างประเทศ หรือระบุชื่อรุ่น ไซส์ (เช่น 9US / 42.5EU)
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#12141A] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-white/[0.06] text-[#F4F4F2] flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs text-[#9B9FA8] font-sans">
                  <strong className="text-[#F4F4F2] block font-heading mb-0.5">กรอกช่องทางติดต่อที่สะดวก</strong>
                  LINE ID, Facebook หรือเบอร์โทร เพื่อให้ทีมงานแจ้งยอดเหมาจ่าย
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs font-medium text-[#60646E] font-sans flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>ข้อมูลของคุณจะถูกส่งเข้าระบบอย่างปลอดภัย การันตีของแท้ 100%</span>
          </div>
        </div>

        {/* Right Side: Requisition Form */}
        <div className="lg:col-span-7 bg-[#12141A] border border-white/[0.1] p-6 md:p-8 rounded-2xl shadow-xl">
          
          {success ? (
            <div className="text-center py-10 font-sans">
              <div className="w-12 h-12 rounded-full bg-white/[0.05] text-[#10B981] flex items-center justify-center mx-auto mb-4 border border-white/[0.1]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F4F4F2] mb-2 font-heading">
                ส่งความต้องการสำเร็จแล้ว
              </h3>
              <p className="text-xs md:text-sm text-[#9B9FA8] max-w-sm mx-auto leading-relaxed mb-6 font-normal">
                เราได้รับข้อมูลเรียบร้อยแล้ว ทีมงานจะรีบตรวจสอบราคาแหล่งซื้อและติดต่อกลับโดยเร็วที่สุดครับ
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://lin.ee/ByS27YW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading tracking-wider uppercase tactile-btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  ทักแชททาง LINE OA (@hij2541a)
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="py-3 px-5 border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F4F2] text-xs font-semibold rounded-xl transition-all font-heading tactile-btn"
                >
                  ส่งรายการเพิ่มอีกรายการ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#F4F4F2] uppercase tracking-wider mb-2.5 font-heading">
                  ประเภทสินค้า (CATEGORY)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Sneakers', label: 'รองเท้าสนีกเกอร์' },
                    { id: 'Apparel', label: 'เสื้อผ้าสตรีทแวร์' },
                    { id: 'Collectibles', label: 'ของสะสมหายาก' },
                    { id: 'Others', label: 'สินค้าทั่วไป' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`py-2.5 px-3 text-xs font-medium border rounded-xl transition-all cursor-pointer font-sans tactile-btn ${
                        category === cat.id
                          ? 'bg-[#F4F4F2] border-[#F4F4F2] text-[#090A0C] font-semibold shadow-sm'
                          : 'bg-[#090A0C] border-white/[0.1] text-[#9B9FA8] hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <label htmlFor="details" className="block text-xs font-semibold text-[#F4F4F2] uppercase tracking-wider mb-2 font-heading">
                  รายละเอียดสินค้า ลิงก์ ชื่อรุ่น หรือไซส์ที่ต้องการ
                </label>
                <textarea
                  id="details"
                  rows={4}
                  required
                  placeholder="เช่น: Nike Dunk Low Travis Scott ไซส์ 9US หรือวางลิงก์สินค้าจากเว็บไซต์ต่างประเทศ"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  className="w-full bg-[#090A0C] border border-white/[0.12] focus:border-[#10B981] text-[#F4F4F2] rounded-xl p-3.5 text-xs md:text-sm placeholder-[#60646E] outline-none transition-all font-sans"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="contact" className="block text-xs font-semibold text-[#F4F4F2] uppercase tracking-wider mb-2 font-heading">
                  ช่องทางติดต่อกลับ (LINE ID, เบอร์โทร หรือ Facebook)
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  placeholder="เช่น LINE ID: @yourname / เบอร์โทร: 08x-xxx-xxxx"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full h-11 bg-[#090A0C] border border-white/[0.12] focus:border-[#10B981] text-[#F4F4F2] rounded-xl px-4 text-xs md:text-sm placeholder-[#60646E] outline-none transition-all font-sans"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#F4F4F2] text-xs p-3.5 rounded-xl flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#EF4444]" />
                  <div className="leading-relaxed">
                    <p>{errorMsg}</p>
                    {errorMsg.includes('LINE OA') && (
                      <div className="mt-2.5">
                        <a
                          href="https://lin.ee/ByS27YW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-[#10B981] text-black text-xs font-bold rounded-lg inline-flex items-center gap-1.5 hover:bg-[#059669] transition-colors font-heading"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> ทัก LINE OA (@hij2541a)
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer font-heading tracking-wider uppercase tactile-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      กำลังส่งข้อมูล...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      ส่งข้อมูลตรวจสอบราคาฟรี
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
