'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Send, CheckCircle2, AlertTriangle, HelpCircle, Loader2 } from 'lucide-react';

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
      setErrorMsg('กรุณากรอกข้อมูลสินค้าหรือวางลิงก์ที่ต้องการหา');
      return;
    }
    if (!contactInfo.trim()) {
      setErrorMsg('กรุณากรอกข้อมูลติดต่อกลับ (LINE ID, เบอร์โทร, อีเมล หรือ Facebook)');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      // Attempt insert into inquiries table in Supabase
      const { data, error } = await supabase
        .from('inquiries')
        .insert([
          {
            category: category,
            product_details: productDetails,
            contact_info: contactInfo,
            status: 'pending'
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      setSuccess(true);
      setProductDetails('');
      setContactInfo('');
    } catch (err: any) {
      console.error('Error inserting into Supabase: ', err);
      // Fallback: If Supabase connection fails (e.g. env variables unset during local testing/dev),
      // we still want to show a helpful message and allow them to click a direct link.
      setErrorMsg(
        'ไม่สามารถบันทึกข้อมูลเข้าระบบได้ชั่วคราว (เนื่องจากยังไม่ได้ตั้งค่า Supabase) แต่คุณสามารถส่งข้อมูลหาแอดมินได้โดยตรงทาง LINE ครับ'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry" className="w-full bg-[#0A0A0A] py-20 px-4 md:px-8 border-b border-dark-card-border relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black text-brand-orange uppercase tracking-widest block mb-2">QUICK QUOTE REQUEST</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            INQUIRY &amp; REQUEST FORM
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            ส่งข้อมูลแบรนด์ รุ่น ไซส์ หรือลิงก์สินค้าที่ต้องการหา แอดมินจะเช็กราคาค่าหิ้วและค่าส่งแบบรวมภาษีนำเข้าให้ทันที
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-neutral-950 border border-neutral-900 p-6 md:p-10 rounded-sm shadow-2xl relative">
          
          {success ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mb-2">
                ส่งคำขอสำเร็จ! 📦
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed mb-8">
                เราได้รับข้อมูลความต้องการของคุณแล้ว เจ้าหน้าที่กำลังเร่งประเมินราคาและจะติดต่อกลับผ่านช่องทางที่คุณให้ไว้โดยเร็วที่สุด
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://lin.ee/ByS27YW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  ทักซ้ำทาง LINE @hij2541a
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="py-2.5 px-6 border border-neutral-800 hover:bg-neutral-900 text-white text-xs font-black tracking-wider uppercase rounded-sm transition-all"
                >
                  ส่งคำขอเพิ่มอีกรายการ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  ประเภทสินค้า / Product Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Sneakers', 'Apparel', 'Collectibles', 'Others'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border rounded-sm transition-all ${
                        category === cat
                          ? 'bg-brand-orange border-brand-orange text-white'
                          : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      {cat === 'Sneakers' && '👟 Sneakers'}
                      {cat === 'Apparel' && '👕 Apparel'}
                      {cat === 'Collectibles' && '🧸 Collectibles'}
                      {cat === 'Others' && '📦 Others'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details Textarea */}
              <div>
                <label htmlFor="details" className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  ลิงก์สินค้า / รายละเอียดสินค้าที่ต้องการหา (เช่น รุ่น, ไซส์ US/EU)
                </label>
                <textarea
                  id="details"
                  rows={4}
                  required
                  placeholder="วางลิงก์สินค้าที่ต้องการหา หรือพิมพ์ยี่ห้อ รุ่น ไซส์ และรายละเอียดอื่นๆ เช่น:&#10;- Travis Scott Jordan 1 Low Size 10US&#10;- https://stockx.com/..."
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/50 text-white rounded-sm p-4 text-xs md:text-sm placeholder-neutral-600 outline-none transition-all"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="contact" className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  ข้อมูลติดต่อกลับของคุณ (LINE ID / เบอร์โทร / Facebook / อีเมล)
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  placeholder="เช่น LINE ID: @mylineid, โทร: 08x-xxx-xxxx"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full h-11 bg-neutral-900 border border-neutral-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/50 text-white rounded-sm px-4 text-xs md:text-sm placeholder-neutral-600 outline-none transition-all"
                />
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold p-3 rounded-sm flex items-start gap-2.5 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <p>{errorMsg}</p>
                    {errorMsg.includes('Supabase') && (
                      <div className="mt-2.5 flex gap-2">
                        <a
                          href="https://lin.ee/ByS27YW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-brand-orange text-white text-[10px] font-black tracking-wider uppercase rounded-sm flex items-center gap-1.5"
                        >
                          <Send className="w-3 h-3" /> ส่งแชทหาแอดมินโดยตรง
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
                  className="w-full h-12 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg orange-glow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      กำลังส่งข้อมูล...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      ส่งคำขอใบเสนอราคา / SUBMIT INQUIRY
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
