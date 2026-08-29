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
    <section className="relative w-full bg-dark-bg border-b border-neutral-900">
      
      {/* 2-Column Split Lookbook Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[600px] items-stretch">
        
        {/* Left Column: Sourcing Terminal & Copy */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-12 lg:border-r lg:border-neutral-900 relative">
          
          <div className="mb-10">
            {/* Meta Tags */}
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-6">
              <span>[ INDEX-001 ]</span>
              <span>✦</span>
              <span className="text-brand-orange">[ EXCLUSIVE SOURCING ]</span>
            </div>

            {/* Massive brutalist typography */}
            <h1 className="text-5xl sm:text-6xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-6">
              US<span className="text-brand-orange">2</span>TH <br />
              RARE <br />
              <span className="text-neutral-500 font-light">SOURCING</span>
            </h1>

            {/* Sub-headline */}
            <p className="max-w-lg text-sm font-mono tracking-wide text-neutral-400 leading-relaxed mb-8">
              PREMIUM GLOBAL IMPORT SERVICE. WE SOURCE SNEAKERS & STREETWEAR FROM THE WORLD’S MOST EXCLUSIVE STORES AND DELIVER DOOR-TO-DOOR. ALL-INCLUSIVE CUSTOMS CLEARANCE.
            </p>

            {/* Terminal Sourcing Price Checker */}
            <div className="w-full max-w-xl bg-black border-2 border-neutral-900 rounded-none p-5 relative overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-orange" />
                  <span className="font-mono text-xs font-black tracking-widest text-white">
                    [SOURCING_TERMINAL.EXE]
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse" />
              </div>

              <div className="space-y-4 font-mono">
                <div className="text-[10px] text-neutral-500 flex justify-between">
                  <span>SYSTEM: STANDBY</span>
                  <span>LOCATIONS: GLOBAL_NET</span>
                </div>

                <form onSubmit={handleCheckPrice} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="PASTE PRODUCT URL HERE (StockX, Nike, etc.)"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setError('');
                      }}
                      className="flex-grow h-11 bg-neutral-950 border border-neutral-800 text-white rounded-none px-4 text-xs focus:border-brand-orange outline-none font-mono tracking-wider transition-colors placeholder:text-neutral-700"
                    />
                    <button
                      type="submit"
                      className="h-11 px-6 bg-white hover:bg-neutral-200 text-black text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-1.5 transition-all flex-shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                      {copied ? 'COPIED' : 'CHECK_PRICE'}
                    </button>
                  </div>
                </form>

                {error && (
                  <p className="text-[10px] text-brand-orange font-bold">
                    {error}
                  </p>
                )}

                <div className="text-[9px] text-neutral-500 leading-normal border-t border-neutral-900 pt-3">
                  *PASTING AND SUBMITTING WILL PRE-FORMAT AND COPY SOURCING TEXT, OPENING THE DIRECT CHANNEL TO AN ADMIN.
                </div>
              </div>
            </div>

          </div>

          {/* Operational Quick stats in monospaced grids */}
          <div className="grid grid-cols-3 border-t border-neutral-900 pt-8 gap-4 font-mono">
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">[ AUTHENTICITY ]</span>
              <span className="block text-xs font-black text-white mt-1">100% GENUINE</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">[ ESTIMATED TIMELINE ]</span>
              <span className="block text-xs font-black text-white mt-1">20-30 DAYS</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">[ TAX/DUTY ]</span>
              <span className="block text-xs font-black text-white mt-1">ALL-INCLUSIVE</span>
            </div>
          </div>

        </div>

        {/* Right Column: Split grid lookbook images */}
        <div className="lg:col-span-5 grid grid-cols-2 bg-neutral-950 min-h-[400px] lg:min-h-0 border-t border-neutral-900 lg:border-t-0">
          <div className="relative border-r border-neutral-900 overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=600" 
              alt="Streetwear Lookbook 1"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <span className="absolute bottom-4 left-4 font-mono text-[9px] text-neutral-400 uppercase tracking-widest">[ SOURCED ITEM 01 ]</span>
          </div>
          
          <div className="relative overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600" 
              alt="Streetwear Lookbook 2"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <span className="absolute bottom-4 left-4 font-mono text-[9px] text-neutral-400 uppercase tracking-widest">[ SOURCED ITEM 02 ]</span>
          </div>
        </div>

      </div>

      {/* Sleek moving marquee text banner */}
      <div className="w-full border-t border-neutral-900 bg-black py-4 overflow-hidden select-none">
        <div className="relative w-full flex items-center justify-center">
          <div className="flex whitespace-nowrap animate-marquee text-xs md:text-sm font-mono font-black uppercase tracking-[0.25em] text-white">
            {Array(4).fill(
              <span className="mx-8">
                GLOBAL SOURCING ✦ US, JP, UK, KR, CN ✦ 100% AUTHENTIC GUARANTEED ✦ DOOR-TO-DOOR INCLUSIVE PRICING ✦ DOOR-TO-DOOR DELIVERY ✦
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Checker Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-6 rounded-none shadow-2xl relative text-left">
            <h3 className="text-md font-mono font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-brand-emerald" /> [COPY_SUCCESSFUL]
            </h3>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed mb-4">
              ระบบได้คัดลอกข้อความและลิงก์เรียบร้อยแล้ว กรุณาทักแชทหลักด้านล่างเพื่อตรวจสอบราคา:
            </p>
            
            <div className="bg-neutral-900 border border-neutral-850 p-4 rounded-none text-xs font-mono text-neutral-300 break-all mb-5">
              {`สวัสดีครับ อยากเช็กราคานำเข้าสินค้านี้ครับ:\n${url}`}
            </div>

            <p className="text-xs font-mono text-brand-orange font-bold uppercase tracking-widest mb-4">
              ➔ SELECT CHAT CHANNEL TO ADMIN
            </p>
            
            <div className="flex flex-col gap-2.5 font-mono">
              <a
                href="https://lin.ee/ByS27YW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="w-full h-11 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                LINE @hij2541a
              </a>
              <a
                href="https://m.me/us2th"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="w-full h-11 bg-white hover:bg-neutral-200 text-black text-xs font-black tracking-widest uppercase rounded-none flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                FB MESSENGER
              </a>
            </div>

            <button
              onClick={closeModal}
              className="w-full text-center text-xs font-mono text-neutral-500 hover:text-white transition-colors mt-5 py-1 uppercase tracking-widest"
            >
              [ CLOSE_WINDOW ]
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
