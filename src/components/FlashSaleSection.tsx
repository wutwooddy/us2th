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
  description: string | null;
  sizes: string | null;
  size_chart_url: string | null;
}

const BRAND_SIZE_CHARTS: Record<string, string> = {
  nike: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/nike.jpg',
  jordan: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/nike.jpg',
  adidas: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/adidas.jpg',
  newbalance: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/newbalance.jpg',
  'new balance': 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/newbalance.jpg',
  asics: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/asics.jpg',
  converse: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/converse.jpg',
  diadora: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/diadora.jpg',
  hoka: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/hoka.jpg',
  mizuno: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/mizuno.jpg',
  salomon: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/salomon.jpg',
  vans: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/vans.jpg',
  puma: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/puma.jpg',
  reebok: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/reebok.jpg',
  'on running': 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/on.jpg',
  on: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/on.jpg'
};

const formatPriceString = (price: string) => {
  // Strip non-digits to get raw value
  const num = price.replace(/[^0-9]/g, '');
  if (!num) return price;
  // Format with comma
  const formatted = parseInt(num).toLocaleString('th-TH');
  return `฿${formatted}`;
};

export default function FlashSaleSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeDealTitle, setActiveDealTitle] = useState('');
  const [activeDealPrice, setActiveDealPrice] = useState('');
  const [sizeChartModalUrl, setSizeChartModalUrl] = useState<string | null>(null);

  const getSizeChartUrl = (deal: Promotion) => {
    if (deal.size_chart_url) return deal.size_chart_url;
    const titleLower = deal.title.toLowerCase();
    for (const brand in BRAND_SIZE_CHARTS) {
      if (titleLower.includes(brand)) {
        return BRAND_SIZE_CHARTS[brand];
      }
    }
    return null;
  };
  
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
                className={`flex flex-col bg-white border rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                  isExpired 
                    ? 'border-slate-100 opacity-60' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Poster Block (Aspect 4/3) */}
                <div className="aspect-[4/3] relative w-full overflow-hidden bg-slate-50 border-b border-slate-100">
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
                  
                  {/* Active Timer badge (Top-Left) */}
                  {deal.end_time && (
                    <div className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold shadow-md z-10 ${
                      isExpired 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-brand-green text-white animate-pulse'
                    }`}>
                      <Timer className="w-3 h-3" />
                      <span>{countdown}</span>
                    </div>
                  )}

                  {/* Price Tag Badge (Top-Right) */}
                  {!isExpired && (
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-brand-green px-3 py-1.5 rounded-2xl text-xs md:text-sm font-black shadow-md border border-slate-800 z-10 font-heading tracking-tight text-right flex flex-col items-end justify-center">
                      <span className="text-brand-green leading-tight">{formatPriceString(deal.deal_price)}</span>
                      {deal.original_price && (
                        <span className="text-[9px] text-slate-400 line-through font-bold leading-none mt-0.5">
                          {deal.original_price}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bottom Semi-transparent Title Band */}
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-950/70 backdrop-blur-xs p-3.5 text-left flex flex-col gap-1 z-10 border-t border-white/5">
                    <h3 className="text-xs md:text-sm font-extrabold leading-snug text-white font-heading">
                      {deal.title}
                    </h3>
                    
                    {deal.description && (
                      <p className="text-[10px] text-slate-300 font-semibold leading-normal">
                        {deal.description}
                      </p>
                    )}

                    {deal.shipping_time && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-400 font-heading mt-0.5">
                        {deal.shipping_time}
                      </span>
                    )}
                  </div>
                </div>

                {/* Below Image Details Block */}
                <div className="p-4 pb-0 text-left flex flex-col gap-2 bg-white">
                  {deal.sizes && (
                    <div className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans flex items-baseline gap-1.5">
                      <span className="text-slate-400 font-semibold flex-shrink-0">ไซส์:</span>
                      <span className="text-slate-700 font-bold font-heading">{deal.sizes}</span>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    *ราคารวมส่งถึงหน้าบ้าน ไม่มีเก็บเงินเพิ่มภายหลัง
                  </p>
                </div>

                {/* Stacked Action Buttons */}
                <div className="p-4 pt-2 flex flex-col gap-1.5 bg-white">
                  <button
                    onClick={() => handleOrderDeal(deal)}
                    disabled={isExpired}
                    className={`w-full h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      isExpired
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-brand-green hover:bg-brand-green-hover text-white cursor-pointer hover:shadow'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {isExpired ? 'หมดเขตช่วงโปร' : 'ฝากสั่งซื้อด่วน'}
                  </button>
                  
                  {!isExpired && (deal.affiliate_url || getSizeChartUrl(deal)) && (
                    <div className="flex gap-1.5 w-full">
                      {getSizeChartUrl(deal) && (
                        <button
                          onClick={() => setSizeChartModalUrl(getSizeChartUrl(deal))}
                          className="flex-grow h-9 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer font-heading"
                        >
                          ตารางไซส์
                        </button>
                      )}
                      
                      {deal.affiliate_url && (
                        <a
                          href={deal.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow h-9 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer font-heading text-center"
                          title="ดูโพสต์ต้นฉบับ"
                        >
                          ดูโพสต์
                        </a>
                      )}
                    </div>
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

      {/* Sizing Chart Modal */}
      {sizeChartModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-100 p-6 rounded-2xl shadow-2xl relative text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                ตารางเทียบไซส์สินค้า (Sizing Guide)
              </h3>
              <button
                onClick={() => setSizeChartModalUrl(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg cursor-pointer font-heading"
              >
                ปิด
              </button>
            </div>
            
            <div className="w-full overflow-auto max-h-[75vh] flex justify-center bg-slate-50 border border-slate-100 rounded-xl p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sizeChartModalUrl}
                alt="Sizing Chart"
                className="max-w-full h-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
