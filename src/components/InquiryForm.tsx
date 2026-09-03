'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Send, CheckCircle2, AlertTriangle, Loader2, MessageCircle } from 'lucide-react';

export default function InquiryForm() {
  const [category, setCategory] = useState('Sneakers');
  const [productDetails, setProductDetails] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState<{ category: string; details: string; contact: string } | null>(null);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'Sneakers': return 'รองเท้าสนีกเกอร์';
      case 'Apparel': return 'เสื้อผ้าสตรีทแวร์';
      case 'Collectibles': return 'ของสะสมหายาก';
      default: return 'สินค้าทั่วไป';
    }
  };

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

      setSubmittedData({
        category: getCategoryLabel(category),
        details: productDetails,
        contact: contactInfo
      });
      setSuccess(true);
      setProductDetails('');
      setContactInfo('');
    } catch (err: any) {
      console.error('Error inserting into Supabase: ', err);
      setErrorMsg(
        'ระบบไม่สามารถส่งข้อมูลได้ชั่วคราว คุณสามารถทักแชท LINE OA ด้านล่างเพื่อแจ้งความต้องการหาของกับแอดมินได้โดยตรงครับ'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry" className="w-full bg-[#FBFBFA] py-20 md:py-24 px-4 md:px-8 border-b border-[#E5E5E0] text-[#111111] relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Information & Instructions */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider font-heading">
                บริการฝากหาของพิเศษ
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] mb-4 font-heading">
              ฝากหาของ / เช็คราคา
            </h2>
            <p className="text-base text-[#555555] leading-relaxed mb-8 font-sans">
              เมื่อไอเทมที่คุณตามหาไม่มีวางจำหน่ายในไทย หรือหาซื้อได้ยาก เราพร้อมช่วยจัดซื้อและนำส่งตรงถึงหน้าบ้านคุณ ในราคาเหมาจ่ายเบ็ดเสร็จ ไร้กังวลเรื่องค่าใช้จ่ายเพิ่มเติมภายหลัง
            </p>
            
            <div className="space-y-4 border-t border-[#E5E5E0] pt-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E5E5E0]">
                <div className="w-8 h-8 rounded-full bg-[#F4F4F0] text-[#111111] flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-sm text-[#555555] font-sans">
                  <strong className="text-[#111111] block font-heading mb-1 text-base">เลือกหมวดหมู่ประเภทสินค้า</strong>
                  สนีกเกอร์, เสื้อผ้าสตรีทแวร์, ของสะสม หรือสินค้าทั่วไป
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E5E5E0]">
                <div className="w-8 h-8 rounded-full bg-[#F4F4F0] text-[#111111] flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-sm text-[#555555] font-sans">
                  <strong className="text-[#111111] block font-heading mb-1 text-base">ระบุรายละเอียดหรือวางลิงก์</strong>
                  วางลิงก์จากเว็บต่างประเทศ หรือระบุชื่อรุ่น ไซส์ (เช่น 9US / 42.5EU)
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E5E5E0]">
                <div className="w-8 h-8 rounded-full bg-[#F4F4F0] text-[#111111] flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-sm text-[#555555] font-sans">
                  <strong className="text-[#111111] block font-heading mb-1 text-base">กรอกช่องทางติดต่อที่สะดวก</strong>
                  เบอร์โทรศัพท์, LINE ID หรือ Facebook เพื่อให้แอดมินแจ้งยอดราคาเน็ต
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5E5E0] text-sm font-medium text-[#666666] font-sans flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span>ระบบส่งข้อมูลเข้ารหัส ปลอดภัย มั่นใจได้ของแท้ 100%</span>
          </div>
        </div>

        {/* Right Side: Requisition Form */}
        <div className="lg:col-span-7 bg-white border border-[#D4D4CE] p-6 sm:p-10 rounded-2xl shadow-xs text-left">
          
          {success ? (
            <div className="text-center py-6 font-sans">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto mb-4 border border-[#A7F3D0]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] mb-2 font-heading">
                ส่งความต้องการสำเร็จแล้ว
              </h3>
              <p className="text-base text-[#555555] max-w-md mx-auto leading-relaxed mb-6 font-normal">
                เราได้รับข้อมูลเรียบร้อยแล้ว ทีมงานจะรีบตรวจสอบราคาแหล่งซื้อและติดต่อกลับโดยเร็วที่สุดครับ
              </p>

              {/* Echo / Summary Box of Submitted Inquiry */}
              {submittedData && (
                <div className="bg-[#FBFBFA] border border-[#E5E5E0] p-5 rounded-xl text-left text-sm space-y-3 mb-8 max-w-lg mx-auto">
                  <div className="font-semibold text-xs text-[#777777] uppercase tracking-wider border-b border-[#E5E5E0] pb-2 font-heading flex justify-between items-center">
                    <span>สรุปรายการที่คุณส่งประเมินราคา:</span>
                    <span className="text-[#059669] font-bold">บันทึกเรียบร้อย</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666]">ประเภทสินค้า:</span>
                    <span className="font-bold text-[#111111]">{submittedData.category}</span>
                  </div>
                  <div className="border-t border-[#E5E5E0] pt-2">
                    <span className="text-[#666666] block mb-1">รายละเอียด / ลิงก์สินค้า:</span>
                    <div className="bg-white p-3 rounded-lg border border-[#E5E5E0] font-medium text-[#111111] break-all leading-relaxed">
                      {submittedData.details}
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#E5E5E0] pt-2">
                    <span className="text-[#666666]">ช่องทางติดต่อกลับ:</span>
                    <span className="font-bold text-[#059669]">{submittedData.contact}</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://lin.ee/ByS27YW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs font-heading tracking-wide uppercase tactile-btn cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  ทักคุยแอดมินทาง LINE OA
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="py-3.5 px-6 border border-[#D4D4CE] bg-[#FBFBFA] hover:bg-[#F4F4F0] text-[#111111] text-sm font-semibold rounded-xl transition-all font-heading tactile-btn cursor-pointer"
                >
                  ส่งรายการเพิ่มอีกรายการ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              
              {/* Category Selector */}
              <div>
                <label className="block text-sm font-bold text-[#111111] mb-3 font-heading">
                  ประเภทสินค้าที่ต้องการหา
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                      className={`py-3 px-3 text-sm border rounded-xl transition-all cursor-pointer font-sans tactile-btn text-center ${
                        category === cat.id
                          ? 'bg-[#111111] border-[#111111] text-white font-bold shadow-2xs'
                          : 'bg-[#FBFBFA] border-[#D4D4CE] text-[#444444] hover:border-[#111111]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <label htmlFor="details" className="block text-sm font-bold text-[#111111] mb-2 font-heading">
                  รายละเอียดสินค้า ลิงก์ ชื่อรุ่น หรือไซส์ที่ต้องการ
                </label>
                <textarea
                  id="details"
                  rows={4}
                  required
                  placeholder="เช่น: Nike Dunk Low Travis Scott ไซส์ 9US หรือวางลิงก์สินค้าจากเว็บไซต์ต่างประเทศ"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  className="w-full bg-[#FBFBFA] border border-[#D4D4CE] focus:border-[#111111] focus:bg-white text-[#111111] rounded-xl p-4 text-base placeholder-[#888888] outline-none transition-all font-sans"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="contact" className="block text-sm font-bold text-[#111111] mb-2 font-heading">
                  ช่องทางติดต่อกลับ (เบอร์โทร, LINE ID หรือ Facebook)
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  placeholder="เช่น เบอร์โทร: 08x-xxx-xxxx / LINE ID: somchai"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full h-12 bg-[#FBFBFA] border border-[#D4D4CE] focus:border-[#111111] focus:bg-white text-[#111111] rounded-xl px-4 text-base placeholder-[#888888] outline-none transition-all font-sans"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-sm p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#DC2626]" />
                  <div className="leading-relaxed">
                    <p>{errorMsg}</p>
                    {errorMsg.includes('LINE OA') && (
                      <div className="mt-3">
                        <a
                          href="https://lin.ee/ByS27YW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#059669] text-white text-sm font-bold rounded-lg inline-flex items-center gap-1.5 hover:bg-[#047857] transition-colors font-heading shadow-2xs"
                        >
                          <MessageCircle className="w-4 h-4" /> ทัก LINE OA
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
                  className="w-full h-14 bg-[#111111] hover:bg-[#222222] text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs cursor-pointer font-heading tracking-wide uppercase tactile-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      กำลังส่งข้อมูล...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
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
