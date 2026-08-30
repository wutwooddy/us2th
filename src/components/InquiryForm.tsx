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
    <section id="inquiry" className="w-full bg-white py-24 px-4 md:px-8 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Information & Instructions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">[ บริการสั่งซื้อตามความต้องการ ]</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              ฝากหาของ / เช็คราคา
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-8">
              เมื่อไอเทมที่คุณตามหาไม่มีวางจำหน่ายในประเทศไทย หรือหาซื้อได้ยาก... เราพร้อมช่วยจัดซื้อและนำส่งตรงถึงหน้าบ้านคุณ ด้วยระบบบริการแบบเหมาจ่ายเบ็ดเสร็จ ไม่มีค่าใช้จ่ายแอบแฝงเพิ่มเติมภายหลังแน่นอนครับ
            </p>
            
            <div className="space-y-5 border-t border-slate-100 pt-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-650 leading-relaxed font-semibold">
                  1. เลือกหมวดหมู่ประเภทสินค้าที่ต้องการ
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-650 leading-relaxed font-semibold">
                  2. ระบุลิงก์สินค้า, ชื่อรุ่น, รหัส หรือไซส์ที่ต้องการ (เช่น 9US / 42.5EU)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-650 leading-relaxed font-semibold">
                  3. กรอกช่องทางติดต่อที่สะดวก (เช่น LINE ID หรือเบอร์โทรศัพท์)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 pt-6 border-t border-slate-100 text-xs font-bold text-slate-400">
            ระบบส่งข้อมูลเข้ารหัส ปลอดภัย มั่นใจได้ของแท้ 100%
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 bg-slate-50/40 border border-slate-100 p-6 md:p-10 rounded-3xl shadow-sm">
          
          {success ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ส่งความต้องการสำเร็จแล้ว!
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-8">
                เราได้รับข้อมูลของคุณเรียบร้อยแล้ว ทีมงานแอดมินจะรีบตรวจสอบราคาแหล่งซื้อและติดต่อกลับโดยเร็วที่สุดครับ
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://lin.ee/ByS27YW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  ทักแชทสอบถามทาง LINE
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="py-3 px-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-full transition-all shadow-sm"
                >
                  ส่งรายการเพิ่มอีกรายการ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category Selector */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 font-heading">
                  01 / เลือกประเภทสินค้า
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Sneakers', label: 'รองเท้าสนีกเกอร์' },
                    { id: 'Apparel', label: 'เสื้อผ้าแฟชั่น' },
                    { id: 'Collectibles', label: 'ของสะสมหายาก' },
                    { id: 'Others', label: 'อื่น ๆ' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`py-3 px-4 text-xs md:text-sm font-bold border rounded-xl transition-all cursor-pointer font-heading ${
                        category === cat.id
                          ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <label htmlFor="details" className="block text-sm font-bold text-slate-700 mb-3 font-heading">
                  02 / รายละเอียดสินค้า ลิงก์ ชื่อรุ่น หรือไซส์ที่ต้องการ
                </label>
                <textarea
                  id="details"
                  rows={4}
                  required
                  placeholder="เช่น: Nike Dunk Low สี Panda ไซส์ 9.5US หรือวางลิงก์สินค้าจากเว็บต่างประเทศ..."
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-slate-800 rounded-xl p-4 text-sm placeholder-slate-400 outline-none transition-colors font-medium"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="contact" className="block text-sm font-bold text-slate-700 mb-3 font-heading">
                  03 / ช่องทางการติดต่อกลับ (LINE ID, เบอร์โทร หรือ Facebook)
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  placeholder="เช่น LINE ID: @ชื่อไอดี / เบอร์โทร: 08x-xxx-xxxx"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full h-12 bg-white border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-slate-800 rounded-xl px-4 text-sm placeholder-slate-400 outline-none transition-colors font-medium"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-100 text-red-800 text-xs md:text-sm font-bold p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <div>
                    <p className="leading-snug">{errorMsg}</p>
                    {errorMsg.includes('DB_CONNECTION_FAILED') && (
                      <div className="mt-3">
                        <a
                          href="https://lin.ee/ByS27YW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-brand-green text-white text-xs font-bold rounded-lg inline-flex items-center gap-1.5 hover:bg-brand-green-hover transition-colors shadow-sm font-heading"
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
                  className="w-full h-12 bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer font-heading"
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
