'use client';

import React, { useState } from 'react';
import { Search, Globe, ShieldCheck, Truck, ExternalLink, MessageCircle, Send, Check } from 'lucide-react';

export default function HeroSection() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleCheckPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !url.trim()) {
      setError('กรุณาวางลิงก์สินค้าที่ต้องการเช็กราคา');
      return;
    }
    
    // Quick regex validation for URL
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(url.trim()) && !url.includes('.') ) {
      setError('รูปแบบลิงก์ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    setError('');
    const fullText = `สวัสดีครับ/ค่ะ อยากเช็กราคาและสั่งซื้อสินค้านี้ครับ:\n${url}`;
    
    // Copy text to clipboard
    navigator.clipboard.writeText(fullText)
      .then(() => {
        setCopied(true);
        setShowModal(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        // Still show modal even if copy fails
        setShowModal(true);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setUrl('');
  };

  return (
    <section className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-[#0A0A0A] to-[#0A0A0A] py-16 md:py-24 border-b border-dark-card-border">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Sourcing Location Badges */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-6">
          {['US 🇺🇸', 'Japan 🇯🇵', 'UK 🇬🇧', 'Europe 🇪🇺', 'Korea 🇰🇷', 'Hong Kong 🇭🇰', 'Singapore 🇸🇬', 'Taiwan 🇹🇼', 'China 🇨🇳'].map((country) => (
            <span 
              key={country} 
              className="text-[10px] md:text-xs font-bold tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800/80 px-2.5 py-1 rounded-sm uppercase"
            >
              {country}
            </span>
          ))}
        </div>

        {/* Headlines */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
          US<span className="text-brand-orange">2</span>TH — RARE ITEM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-500">&amp; SOURCING</span>
        </h1>
        
        <p className="max-w-2xl text-sm md:text-lg text-neutral-400 font-medium leading-relaxed mb-8">
          บริการรับสั่งซื้อและนำเข้า สินค้าแบรนด์เนม สนีกเกอร์ และสตรีทแวร์หายากจากต่างประเทศ <br className="hidden sm:inline" />
          <span className="text-white font-semibold">หมดปัญหาเว็บนอกไม่ส่งไทย</span> — นำเข้าเคลียร์ภาษีครบถ้วน ส่งตรงถึงหน้าบ้านคุณ (Door-to-Door)
        </p>

        {/* Sourcing Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
          <div className="flex items-center gap-3 bg-neutral-950/80 border border-neutral-900 p-4 rounded-sm">
            <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Global Sourcing</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">หาได้ทุกช็อปทั่วโลกตามงบ</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-950/80 border border-neutral-900 p-4 rounded-sm">
            <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">All-Inclusive Price</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">ราคาสุทธิรวมค่าขนส่ง+ภาษี</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-950/80 border border-neutral-900 p-4 rounded-sm">
            <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Door-To-Door Delivery</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">ส่งถึงบ้าน ปลอดภัย มีประกัน</p>
            </div>
          </div>
        </div>

        {/* Price Checker Input Form */}
        <div className="w-full max-w-xl bg-neutral-950/90 border border-neutral-800 p-4 md:p-6 rounded-sm shadow-2xl relative">
          <div className="absolute -top-3 left-4 bg-brand-orange text-white text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-sm uppercase">
            Quick Price Checker
          </div>
          
          <p className="text-left text-xs md:text-sm text-neutral-300 mb-3 font-semibold">
            วางลิงก์สินค้าเพื่อเช็กราคานำเข้าสุทธิ ทันที:
          </p>
          
          <form onSubmit={handleCheckPrice} className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="วางลิงก์สินค้า (เช่น StockX, Nike, Supreme, Converse, etc.)"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                className="w-full h-11 bg-neutral-900 border border-neutral-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/50 text-white rounded-sm px-4 pr-10 text-xs md:text-sm placeholder-neutral-500 outline-none transition-all"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="h-11 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
              {copied ? 'คัดลอกแล้ว!' : 'ตรวจสอบราคา'}
            </button>
          </form>
          
          {error && (
            <p className="text-left text-xs text-brand-orange mt-2 font-semibold">
              {error}
            </p>
          )}
          
          <p className="text-left text-[10px] text-neutral-500 mt-3 leading-relaxed">
            *ระบบจะคัดลอกลิงก์พร้อมข้อความขอใบเสนอราคา และนำทางไปยังช่องแชทหลักของร้านโดยอัตโนมัติ
          </p>
        </div>

      </div>

      {/* Pricing Checker Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-6 rounded-sm shadow-2xl relative text-left">
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">
              คัดลอกข้อความสำเร็จ! 📋
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              ระบบได้บันทึกข้อความ <span className="text-white font-medium">"อยากเช็กราคาและสั่งซื้อสินค้านี้..."</span> พร้อมลิงก์สินค้าของคุณลงในคลิปบอร์ดแล้ว
            </p>
            
            <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-sm text-xs font-mono text-neutral-300 break-all mb-5">
              {`อยากเช็กราคาและสั่งซื้อสินค้านี้ครับ:\n${url}`}
            </div>

            <p className="text-xs text-brand-orange font-bold uppercase tracking-wider mb-3">
              ขั้นตอนถัดไป: เลือกช่องทางการติดต่อเพื่อคุยกับแอดมิน
            </p>
            
            <div className="flex flex-col gap-2.5">
              <a
                href="https://lin.ee/ByS27YW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="w-full h-11 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                ส่งหาแอดมินผ่าน LINE (แนะนำ)
              </a>
              <a
                href="https://m.me/us2th"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="w-full h-11 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/80 text-white text-xs font-black tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                ส่งหาแอดมินผ่าน Messenger
              </a>
            </div>

            <button
              onClick={closeModal}
              className="w-full text-center text-xs text-neutral-500 hover:text-white transition-colors mt-4 py-1"
            >
              ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
