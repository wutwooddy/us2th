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
      setErrorMsg('[ERROR: FIELD_DETAILS_EMPTY] กรุณากรอกรายละเอียดสินค้า');
      return;
    }
    if (!contactInfo.trim()) {
      setErrorMsg('[ERROR: FIELD_CONTACT_EMPTY] กรุณากรอกข้อมูลสำหรับติดต่อกลับ');
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
        '[ERROR: DB_CONNECTION_FAILED] ไม่สามารถส่งข้อมูลผ่านระบบอัตโนมัติได้ชั่วคราว คุณสามารถทักแชทหลักด้านล่างเพื่อแจ้งความต้องการหาของได้โดยตรงครับ'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry" className="w-full bg-[#0A0D3A] py-24 px-4 md:px-8 border-b border-[#5865F2]/20 text-[#F2F3F5] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#5865F2]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative z-10">
        
        {/* Left Side: Information & Instructions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse" />
              <span className="text-xs font-bold text-[#5865F2] uppercase tracking-widest font-heading">
                [ #REQUEST-QUOTE // CUSTOM SOURCING ]
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F2F3F5] mb-6 font-heading">
              ฝากหาของ / เช็คราคา
            </h2>
            <p className="text-sm md:text-base text-[#DBDEE1] leading-relaxed mb-8 font-medium font-sans">
              เมื่อไอเทมที่คุณตามหาไม่มีวางจำหน่ายในไทย หรือหาซื้อได้ยาก... เราพร้อมช่วยจัดซื้อและนำส่งตรงถึงหน้าบ้านคุณ ด้วยระบบบริการแบบเหมาจ่ายเบ็ดเสร็จ ไม่มีค่าใช้จ่ายแอบแฝงเพิ่มเติมภายหลังแน่นอนครับ
            </p>
            
            <div className="space-y-4 border-t border-[#5865F2]/20 pt-6">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1E2353]/40 border border-[#5865F2]/15">
                <Info className="w-5 h-5 text-[#00B0F4] flex-shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-[#DBDEE1] leading-relaxed font-medium font-sans">
                  <strong className="text-[#F2F3F5] block font-heading mb-0.5">1. เลือกหมวดหมู่ประเภทสินค้า</strong>
                  สนีกเกอร์, เสื้อผ้าสตรีทแวร์, ของสะสม หรือสินค้าทั่วไป
                </p>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1E2353]/40 border border-[#5865F2]/15">
                <Info className="w-5 h-5 text-[#5865F2] flex-shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-[#DBDEE1] leading-relaxed font-medium font-sans">
                  <strong className="text-[#F2F3F5] block font-heading mb-0.5">2. ระบุรายละเอียดหรือลิงก์</strong>
                  วางลิงก์สินค้าจากเว็บต่างประเทศ หรือระบุชื่อรุ่น ไซส์ (เช่น 9US / 42.5EU)
                </p>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1E2353]/40 border border-[#5865F2]/15">
                <Info className="w-5 h-5 text-[#35ED7E] flex-shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-[#DBDEE1] leading-relaxed font-medium font-sans">
                  <strong className="text-[#F2F3F5] block font-heading mb-0.5">3. กรอกช่องทางติดต่อที่สะดวก</strong>
                  LINE ID, Facebook หรือเบอร์โทร เพื่อให้แอดมินแจ้งยอดเหมาจ่าย
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 pt-6 border-t border-[#5865F2]/20 text-xs font-bold text-[#949BA4] font-heading flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#23A55A]" />
            <span>ระบบส่งข้อมูลเข้ารหัส ปลอดภัย มั่นใจได้ของแท้ 100%</span>
          </div>
        </div>

        {/* Right Side: Discord Form Card */}
        <div className="lg:col-span-7 bg-[#1E1F22] border border-[#5865F2]/30 p-6 md:p-10 rounded-3xl shadow-2xl discord-embed-blurple">
          
          {success ? (
            <div className="text-center py-12 animate-fade-in font-sans">
              <div className="w-14 h-14 rounded-2xl bg-[#23A55A]/20 text-[#35ED7E] flex items-center justify-center mx-auto mb-6 border border-[#23A55A]/40 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#F2F3F5] mb-3 font-heading">
                ส่งความต้องการสำเร็จแล้ว!
              </h3>
              <p className="text-sm text-[#DBDEE1] max-w-sm mx-auto leading-relaxed mb-8 font-medium">
                เราได้รับข้อมูลของคุณเรียบร้อยแล้ว ทีมงานแอดมินจะรีบตรวจสอบราคาแหล่งซื้อและติดต่อกลับโดยเร็วที่สุดครับ
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://lin.ee/ByS27YW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#23A55A] hover:bg-[#1F924F] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading tracking-wide"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  ทักแชทสอบถามทาง LINE OA
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="py-3 px-6 border border-[#383A40] bg-[#111214] hover:bg-[#1E2353]/50 text-[#DBDEE1] text-xs font-bold rounded-xl transition-all font-heading"
                >
                  ส่งรายการเพิ่มอีกรายการ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              
              {/* Category Selector */}
              <div>
                <label className="block text-sm font-bold text-[#F2F3F5] mb-3 font-heading">
                  01 / เลือกประเภทสินค้า
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Sneakers', label: '👟 รองเท้าสนีกเกอร์' },
                    { id: 'Apparel', label: '👕 เสื้อผ้าแฟชั่น' },
                    { id: 'Collectibles', label: '🧸 ของสะสมหายาก' },
                    { id: 'Others', label: '📦 อื่น ๆ' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`py-3 px-3 text-xs md:text-sm font-bold border rounded-xl transition-all cursor-pointer font-heading ${
                        category === cat.id
                          ? 'bg-[#5865F2] border-[#5865F2] text-white shadow-md'
                          : 'bg-[#111214] border-[#383A40] text-[#DBDEE1] hover:bg-[#1E2353]/50 hover:border-[#5865F2]/40'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <label htmlFor="details" className="block text-sm font-bold text-[#F2F3F5] mb-2 font-heading">
                  02 / รายละเอียดสินค้า ลิงก์ ชื่อรุ่น หรือไซส์ที่ต้องการ
                </label>
                <textarea
                  id="details"
                  rows={4}
                  required
                  placeholder="เช่น: Nike Dunk Low สี Panda ไซส์ 9.5US หรือวางลิงก์สินค้าจากเว็บต่างประเทศ..."
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  className="w-full bg-[#111214] border border-[#383A40] focus:border-[#5865F2] focus:ring-1 focus:ring-[#5865F2] text-[#F2F3F5] rounded-xl p-4 text-sm placeholder-[#80848E] outline-none transition-all font-medium font-sans"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="contact" className="block text-sm font-bold text-[#F2F3F5] mb-2 font-heading">
                  03 / ช่องทางการติดต่อกลับ (LINE ID, เบอร์โทร หรือ Facebook)
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  placeholder="เช่น LINE ID: @ชื่อไอดี / เบอร์โทร: 08x-xxx-xxxx"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full h-12 bg-[#111214] border border-[#383A40] focus:border-[#5865F2] focus:ring-1 focus:ring-[#5865F2] text-[#F2F3F5] rounded-xl px-4 text-sm placeholder-[#80848E] outline-none transition-all font-medium font-sans"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="bg-[#ED4245]/15 border border-[#ED4245]/30 text-[#F2F3F5] text-xs md:text-sm font-medium p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#ED4245]" />
                  <div>
                    <p className="leading-relaxed">{errorMsg}</p>
                    {errorMsg.includes('DB_CONNECTION_FAILED') && (
                      <div className="mt-3">
                        <a
                          href="https://lin.ee/ByS27YW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#23A55A] text-white text-xs font-bold rounded-lg inline-flex items-center gap-1.5 hover:bg-[#1F924F] transition-colors shadow-sm font-heading"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> ทัก LINE OA แทน
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
                  className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#5865F2]/30 cursor-pointer font-heading tracking-wide uppercase active:scale-98"
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
