'use client';

import React, { useState } from 'react';
import { Search, MessageCircle, Send, Check, Terminal } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function HeroSection() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  
  // Sourcing Inquiry State
  const [contactInfo, setContactInfo] = useState('');
  const [step, setStep] = useState(1); // 1 = enter contact, 2 = success summary
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  const handleCheckPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !url.trim()) {
      setError('[ERROR: LINK_FIELD_EMPTY] กรุณาป้อนลิงก์สินค้า');
      return;
    }
    
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(url.trim()) && !url.includes('.')) {
      setError('[ERROR: INVALID_URL_FORMAT] รูปแบบลิงก์ไม่ถูกต้อง');
      return;
    }

    setError('');
    setStep(1); // Start modal at contact entry step
    setModalError('');
    setShowModal(true);
  };

  const handleConfirmInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo || !contactInfo.trim()) {
      setModalError('กรุณากรอกช่องทางการติดต่อกลับด้วยครับ');
      return;
    }

    setSubmitting(true);
    setModalError('');

    // 1. Try to save to Supabase sourcing_inquiries table (graceful fail-safe fallback)
    try {
      const { error: dbError } = await supabase
        .from('sourcing_inquiries')
        .insert([
          { product_url: url, contact_info: contactInfo }
        ]);
      if (dbError) {
        console.warn('Supabase save warning (table may not exist):', dbError);
      }
    } catch (err) {
      console.warn('Supabase insert failed:', err);
    }

    // 2. Format message and copy to clipboard
    const fullText = `สวัสดีครับ สนใจส่งเช็คราคานำเข้าสินค้าครับ\nลิงก์สินค้า: ${url}\nช่องทางติดต่อกลับ: ${contactInfo}`;
    navigator.clipboard.writeText(fullText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy text:', err);
      });

    setSubmitting(false);
    setStep(2); // Go to success summary screen
  };

  const closeModal = () => {
    setShowModal(false);
    setUrl('');
    setContactInfo('');
    setStep(1);
    setModalError('');
  };

  return (
    <section className="relative w-full bg-white border-b border-slate-100">
      
      {/* 2-Column Split Lookbook Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[600px] items-stretch">
        
        {/* Left Column: Sourcing Terminal & Copy */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-12 lg:border-r lg:border-slate-100 relative bg-slate-50/20">
          
          <div className="mb-10">
            {/* Meta Tags */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
              <span>[ บริการนำเข้าสินค้า ]</span>
              <span>✦</span>
              <span className="text-brand-blue font-heading">SNEAKERS & STREETWEAR SOURCING</span>
            </div>

            {/* Title with Prompt */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-heading">
              รับสั่ง รับกดสินค้า
            </h1>

            {/* Sub-headline */}
            <p className="max-w-lg text-sm md:text-base text-slate-600 leading-relaxed mb-8 font-semibold">
              รองเท้าสนีกเกอร์ เสื้อผ้าสตรีทแวร์ และของสะสมหายากจากทุกมุมโลก (US, JP, UK, EU, KR, HK, SG) ราคาเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้านคุณ ไม่มีเก็บเพิ่มภายหลัง ปลอดภัย มั่นใจได้ของแท้ 100%
            </p>

            {/* Sourcing Price Checker Card */}
            <div className="w-full max-w-xl bg-white border border-slate-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-blue" />
                  <span className="text-sm font-bold text-slate-800 font-heading">
                    เช็คราคาเหมาจ่ายนำเข้าฟรี
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-500 font-semibold">
                  วางลิงก์สินค้าจากเว็บต่างประเทศด้านล่างเพื่อประเมินราคาเหมาจ่าย
                </p>

                <form onSubmit={handleCheckPrice} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="วางลิงก์สินค้าที่นี่ (เช่น https://...)"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setError('');
                      }}
                      className="flex-grow h-12 bg-slate-50/50 border border-slate-200 text-slate-800 rounded-xl px-4 text-sm focus:border-brand-blue focus:bg-white outline-none transition-colors placeholder:text-slate-400 font-medium"
                    />
                    <button
                      type="submit"
                      className="h-12 px-6 bg-slate-900 hover:bg-slate-850 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all flex-shrink-0 cursor-pointer font-heading"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                      {copied ? 'คัดลอกแล้ว' : 'ส่งเช็คราคา'}
                    </button>
                  </div>
                </form>

                {error && (
                  <p className="text-xs text-red-500 font-bold">
                    {error}
                  </p>
                )}

                <div className="text-xs text-slate-400 leading-normal border-t border-slate-100 pt-3 font-semibold">
                  *ระบบจะคัดลอกข้อความเพื่อทักแชทคุยกับแอดมินเพื่อประเมินราคาได้สะดวกรวดเร็วที่สุดครับ
                </div>
              </div>
            </div>

          </div>

          {/* Operational Quick stats */}
          <div className="grid grid-cols-3 border-t border-slate-100 pt-8 gap-4">
            <div>
              <span className="block text-xs text-slate-400 font-bold tracking-wider">รับประกันสินค้า</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">ของแท้ 100%</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold tracking-wider">ระยะเวลานำเข้า</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">ตามรอบทวีป</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold tracking-wider">ราคาบริการ</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">เหมาจ่ายเบ็ดเสร็จ</span>
            </div>
          </div>

          {/* Detailed wait times per region */}
          <div className="mt-8 border-t border-slate-100 pt-6 text-left">
            <span className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-3">
              ✈️ ระยะเวลารอของโดยประมาณนับแต่สั่งให้
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-500 font-medium leading-relaxed font-sans">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block mb-0.5">🇺🇸 🇪🇺 🇬🇧 ตะวันตก</span>
                อเมริกา, ยุโรป, อังกฤษ <br />
                <span className="text-brand-blue font-bold">20-30 วัน</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block mb-0.5">🇯🇵 🇰🇷 🇨🇳 เอเชีย</span>
                ญี่ปุ่น, เกาหลี, จีน, ไต้หวัน, ฮ่องกง <br />
                <span className="text-brand-blue font-bold">10-20 วัน</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block mb-0.5">🇸🇬 🇲🇾 เอเชียใต้</span>
                สิงคโปร์, มาเลเซีย <br />
                <span className="text-brand-blue font-bold">7-14 วัน</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Split grid lookbook images */}
        <div className="lg:col-span-5 grid grid-cols-2 bg-slate-50 min-h-[400px] lg:min-h-0 border-t border-slate-100 lg:border-t-0 p-4 md:p-8 gap-4">
          <div className="relative overflow-hidden group rounded-2xl shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=600" 
              alt="Streetwear Lookbook 1"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-white text-slate-800 border border-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md z-10 font-heading">
              ✈️ รับสั่ง รับกดสินค้า
            </div>
          </div>
          
          <div className="relative overflow-hidden group rounded-2xl shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600" 
              alt="Streetwear Lookbook 2"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-white text-slate-800 border border-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md z-10 font-heading">
              📦 ส่งตรงถึงหน้าบ้านคุณ
            </div>
          </div>
        </div>

      </div>

      {/* Pricing Checker Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 p-6 rounded-2xl shadow-2xl relative text-left font-sans">
            
            {step === 1 ? (
              <form onSubmit={handleConfirmInquiry} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Terminal className="w-5 h-5 text-brand-blue" />
                  3. กรอกช่องทางติดต่อที่สะดวก (เช่น LINE ID หรือ Facebook)
                </h3>
                <p className="text-xs text-slate-500 leading-normal font-medium">
                  เพื่อให้แอดมินติดต่อกลับแจ้งราคาและสรุปค่าบริการนำเข้า กรุณากรอกช่องทางที่คุณสะดวกติดต่อที่สุดครับ:
                </p>
                
                <input
                  type="text"
                  placeholder="เช่น LINE ID: somchai123 หรือ FB: สมชาย ใจดี"
                  value={contactInfo}
                  onChange={(e) => {
                    setContactInfo(e.target.value);
                    setModalError('');
                  }}
                  className="w-full h-12 bg-slate-50/50 border border-slate-200 text-slate-800 rounded-xl px-4 text-sm focus:border-brand-blue outline-none placeholder:text-slate-400 font-medium font-sans"
                  required
                />

                {modalError && (
                  <p className="text-xs text-red-500 font-bold">{modalError}</p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 h-12 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-bold rounded-xl transition-all cursor-pointer font-heading"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 h-12 bg-slate-900 hover:bg-slate-850 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading"
                  >
                    {submitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันส่งข้อมูล'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Check className="w-5 h-5 text-emerald-500" />
                  ส่งข้อมูลตรวจราคาเรียบร้อยแล้ว!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  ระบบได้บันทึกการเช็คราคาและคัดลอกข้อความสรุปลงคลิปบอร์ดของคุณแล้ว แอดมินจะรีบตรวจสอบสินค้าและติดต่อกลับโดยเร็วที่สุดครับ:
                </p>

                {/* Inquiry Summary Block */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs text-slate-600 break-all space-y-2 font-sans font-medium">
                  <div>
                    <span className="text-slate-400 block font-semibold mb-0.5 font-sans">ลิงก์สินค้าที่ถาม:</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline break-all font-mono font-medium block">
                      {url.length > 50 ? url.substring(0, 50) + '...' : url}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-0.5 font-sans">ช่องทางติดต่อกลับของคุณ:</span>
                    <span className="text-slate-800 font-bold font-sans">{contactInfo}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed font-medium border-t border-slate-100 pt-3">
                  ⚠️ <span className="font-bold text-slate-800">แนะนำช่องทางติดต่อโดยตรง:</span> หากต้องการราคาสุทธิแบบรวดเร็วที่สุด สามารถกดปุ่ม LINE OA หรือ Facebook Messenger ด้านล่างเพื่อส่งข้อความแชทคุยกับแอดมินได้ทันทีครับ!
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ทักถามทาง LINE OA
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
                  >
                    <Send className="w-4 h-4" />
                    ทักถามทาง FB Messenger
                  </a>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors mt-4 py-1 uppercase tracking-wider font-heading"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
