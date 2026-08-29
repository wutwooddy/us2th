'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Send, CheckCircle2, AlertTriangle, Loader2, Info } from 'lucide-react';

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
    <section id="inquiry" className="w-full bg-dark-bg py-24 px-4 md:px-8 border-b border-neutral-900">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Information & Instructions */}
        <div className="lg:col-span-5 flex flex-col justify-between font-mono">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-brand-orange" />
              <span className="text-xs font-black text-brand-orange uppercase tracking-widest">[ SUBMISSION PROTOCOL ]</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-6">
              SOURCING REQUEST
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-8 uppercase tracking-wide">
              SUBMIT A SPECIFIC REQUEST FOR SNEAKERS, APPAREL, OR EXCLUSIVE TOYS NOT PRESENT IN LOCAL STORES. OUR AGENTS WILL SOURCE THE BEST PRICED OPTIONS GLOBALLY.
            </p>
            
            <div className="space-y-4 border-t border-neutral-900 pt-6">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-normal">
                  1. SELECT THE PRODUCT SEGMENT APPROPRIATELY.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-normal">
                  2. INCLUDE LINKS, CODES, AND SPECIFIC SIZES (US/EU).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-normal">
                  3. LEAVE A SECURE RETURN CONTACT FIELD (LINE_ID PREFERRED).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 pt-6 border-t border-neutral-900 font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
            FORM STATE: SECURE_POST // RLS_ACTIVE
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 bg-black border border-neutral-900 p-6 md:p-10 relative">
          
          {success ? (
            <div className="text-center py-12 font-mono animate-fade-in">
              <div className="w-12 h-12 rounded-none bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mx-auto mb-6 border border-brand-emerald/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-3">
                [REQUEST_SUBMITTED]
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed mb-8 uppercase tracking-wide">
                WE RECEIVED YOUR REQUEST. AN ADMIN WILL REVIEW THE CASE DETAILS AND CONTACT YOU SHORTLY.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://lin.ee/ByS27YW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-1.5 transition-all"
                >
                  TALK VIA LINE
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="py-3 px-6 border border-neutral-800 hover:bg-neutral-900 text-white text-xs font-black tracking-widest uppercase rounded-none transition-all"
                >
                  ADD ANOTHER REQUEST
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              
              {/* Category Selector */}
              <div>
                <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">
                  01 / PRODUCT CATEGORY
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Sneakers', 'Apparel', 'Collectibles', 'Others'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-3 px-4 text-xs font-bold uppercase tracking-widest border rounded-none transition-all ${
                        category === cat
                          ? 'bg-white border-white text-black font-black'
                          : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <label htmlFor="details" className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">
                  02 / LINKS, CODES, SIZE &amp; CASE DETAILS
                </label>
                <textarea
                  id="details"
                  rows={4}
                  required
                  placeholder="เช่น: NIKE DUNK LOW GALAXY SIZE 9.5US OR PASTE SECURE SITE LINK HERE..."
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white rounded-none p-4 text-xs placeholder-neutral-700 outline-none tracking-widest uppercase transition-colors"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="contact" className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">
                  03 / SECURE CONTACT RETURN FIELD (LINE, PHONE, FB)
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  placeholder="LINE_ID: @USERID / PHONE: 08XXXXXXXX"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full h-11 bg-neutral-950 border border-neutral-900 focus:border-white text-white rounded-none px-4 text-xs placeholder-neutral-700 outline-none tracking-widest uppercase transition-colors"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold p-4 rounded-none flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="tracking-wide">{errorMsg}</p>
                    {errorMsg.includes('DB_CONNECTION_FAILED') && (
                      <div className="mt-3 flex gap-2">
                        <a
                          href="https://lin.ee/ByS27YW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 bg-brand-orange text-white text-[10px] font-black tracking-widest uppercase rounded-none flex items-center gap-1.5 hover:bg-brand-orange-hover"
                        >
                          OPEN LINE LINK
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
                  className="w-full h-12 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed orange-glow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      SUBMITTING_CASE...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      SUBMIT REQUEST FORM
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
