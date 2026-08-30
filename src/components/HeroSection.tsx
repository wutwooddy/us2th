'use client';

import React, { useState } from 'react';
import { Search, ExternalLink, MessageCircle, Send, Check, Terminal, ShieldAlert } from 'lucide-react';

export default function HeroSection() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

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
    const fullText = `สวัสดีครับ อยากเช็กราคานำเข้าสินค้านี้ครับ:\n${url}`;
    
    navigator.clipboard.writeText(fullText)
      .then(() => {
        setCopied(true);
        setShowModal(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        setShowModal(true);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setUrl('');
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
                  วางลิงก์สินค้าจากเว็บต่างประเทศ (เช่น StockX, Nike, JP Web) ด้านล่างเพื่อประเมินราคาเหมาจ่าย
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
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">รับประกันสินค้า</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">ของแท้ 100%</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">ระยะเวลานำเข้า</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">20 - 30 วัน</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">ราคาบริการ</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">เหมาจ่ายเบ็ดเสร็จ</span>
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
          <div className="w-full max-w-md bg-white border border-slate-200 p-6 rounded-2xl shadow-2xl relative text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" /> คัดลอกข้อความสำเร็จ!
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              ระบบได้คัดลอกข้อความและลิงก์ความต้องการของแบรนด์เนมเรียบร้อยแล้ว กรุณาทักแชทแอดมินเพื่อเช็คราคาต่อได้เลยครับ:
            </p>
            
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-600 break-all mb-5 font-mono">
              {`สวัสดีครับ อยากเช็กราคานำเข้าสินค้านี้ครับ:\n${url}`}
            </div>

            <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-4">
              ➔ เลือกช่องทางแชทคุยกับแอดมิน
            </p>
            
            <div className="flex flex-col gap-2.5">
              <a
                href="https://lin.ee/ByS27YW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="w-full h-12 bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                คุยทาง LINE OA
              </a>
              <a
                href="https://m.me/us2th"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="w-full h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
                คุยทาง FB Messenger
              </a>
            </div>

            <button
              onClick={closeModal}
              className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors mt-5 py-1 uppercase tracking-wider"
            >
              ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
