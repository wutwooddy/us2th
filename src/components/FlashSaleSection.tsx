'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Zap, Check, MessageCircle, Send, Timer } from 'lucide-react';

interface Promotion {
  id: number;
  title: string;
  deal_price: string;
  original_price: string | null;
  img_url: string | null;
  affiliate_url: string | null;
  end_time: string | null;
  is_active: boolean;
  shipping_time: string | null;
}

export default function FlashSaleSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeDealTitle, setActiveDealTitle] = useState('');
  const [activeDealPrice, setActiveDealPrice] = useState('');
  
  // Timers state to trigger re-renders every second
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    async function fetchPromotions() {
      try {
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setPromotions(data);
        }
      } catch (err) {
        console.error('Error fetching promotions from Supabase: ', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPromotions();

    // Timer tick interval
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOrderDeal = (deal: Promotion) => {
    const text = `สวัสดีครับ สนใจฝากกดดีลพิเศษนี้ครับ:\n[ ${deal.title} ]\nราคาดีล: ${deal.deal_price}`;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(deal.id);
        setActiveDealTitle(deal.title);
        setActiveDealPrice(deal.deal_price);
        setShowModal(true);
        setTimeout(() => setCopiedId(null), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy deal text: ', err);
        setShowModal(true);
      });
  };

  // Helper function to format countdown time
  const getCountdown = (endTimeStr: string | null) => {
    if (!endTimeStr) return null;
    const end = new Date(endTimeStr).getTime();
    const diff = end - now;

    if (diff <= 0) {
      return 'EXPIRED (หมดเขตดีล)';
    }

    const secs = Math.floor((diff / 1000) % 60);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const zeroPad = (num: number) => String(num).padStart(2, '0');

    if (days > 0) {
      return `${days} วัน ${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
    }
    return `${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-16 text-center text-sm font-semibold text-slate-400">
        กำลังโหลดดีลโปรโมชั่นพิเศษ...
      </div>
    );
  }

  // If there are no active promotions in the database, don't render the section or show a placeholder
  if (promotions.length === 0) {
    return null;
  }

  return (
    <section id="flashsale" className="w-full bg-white py-24 px-4 md:px-8 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">[ ดีลจำกัดเวลาวันนี้ ]</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-heading">
              โปรโมชั่นวันนี้ & Flash Sale
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-lg leading-relaxed font-semibold">
              ดีลพิเศษนำเข้าสินค้าแฟชั่นแบรนด์เนมและสนีกเกอร์ยอดนิยม ราคาเหมาจ่ายเบ็ดเสร็จ รีบตัดสินใจก่อนหมดเวลาโปรโมชั่น
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400">
            <Zap className="w-4 h-4 text-brand-green" />
            <span>ดีลด่วนฝากกดราคาเน็ต</span>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((deal) => {
            const countdown = getCountdown(deal.end_time);
            const isExpired = countdown === 'EXPIRED (หมดเขตดีล)';

            return (
              <div 
                key={deal.id}
                className={`bg-[#fbfbfb] border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                  isExpired 
                    ? 'border-slate-100 opacity-60' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div>
                  {/* Image wrapper */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                    {deal.img_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={deal.img_url} 
                        alt={deal.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-semibold bg-slate-50">
                        ไม่มีรูปภาพสินค้า
                      </div>
                    )}
                    
                    {/* Active Timer badge */}
                    {deal.end_time && (
                      <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                        isExpired 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-brand-green text-white animate-pulse'
                      }`}>
                        <Timer className="w-3.5 h-3.5" />
                        <span>{countdown}</span>
                      </div>
                    )}
                  </div>

                  {/* Text details */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-850 mb-3 leading-snug font-heading">
                      {deal.title}
                    </h3>
                    
                    {deal.shipping_time && (
                      <div className="mb-4 inline-flex items-center gap-1 bg-slate-100/80 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 font-heading">
                        {deal.shipping_time}
                      </div>
                    )}
                    
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl font-black text-brand-blue font-heading">
                        {deal.deal_price}
                      </span>
                      {deal.original_price && (
                        <span className="text-sm font-semibold text-slate-400 line-through">
                          ปกติ {deal.original_price}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-400 font-semibold">
                      *ราคาเน็ตเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้าน ไม่มีเก็บเงินเพิ่มภายหลัง
                    </p>
                  </div>
                </div>

                {/* Card Button */}
                <div className="px-6 pb-6 pt-0 flex gap-2">
                  <button
                    onClick={() => handleOrderDeal(deal)}
                    disabled={isExpired}
                    className={`flex-grow h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      isExpired
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed w-full'
                        : 'bg-brand-green hover:bg-brand-green-hover text-white cursor-pointer hover:shadow'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    {isExpired ? 'หมดเขตช่วงโปร' : 'ฝากสั่งด่วน'}
                  </button>
                  
                  {deal.affiliate_url && !isExpired && (
                    <a
                      href={deal.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 h-12 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-550 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer font-heading"
                      title="ดูโพสต์ต้นฉบับ"
                    >
                      ดูโพสต์
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Promotion Checkout Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-slate-100 p-6 rounded-2xl shadow-2xl relative text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-heading">
              <Check className="w-5 h-5 text-brand-green" /> คัดลอกดีลสำเร็จ!
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              ระบบได้คัดลอกรายละเอียดดีลนี้เรียบร้อยแล้ว กรุณาทักแชทคุยกับแอดมินเพื่อจองสั่งซื้อสินค้าต่อได้ทันทีครับ:
            </p>
            
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-650 break-all mb-5 font-mono">
              {`สวัสดีครับ สนใจฝากกดดีลพิเศษนี้ครับ:\n[ ${activeDealTitle} ]\nราคาดีล: ${activeDealPrice}`}
            </div>

            <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-4 font-heading">
              ➔ เลือกช่องทางแชทคุยกับแอดมิน
            </p>
            
            <div className="flex flex-col gap-2.5">
              <a
                href="https://lin.ee/ByS27YW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-12 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
              >
                <MessageCircle className="w-4 h-4" />
                คุยทาง LINE OA
              </a>
              <a
                href="https://m.me/us2th"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-12 bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
              >
                <Send className="w-4 h-4" />
                คุยทาง FB Messenger
              </a>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors mt-5 py-1 uppercase tracking-wider font-heading"
            >
              ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
