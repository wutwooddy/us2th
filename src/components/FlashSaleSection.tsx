'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Zap, Check, MessageCircle, Send, Timer, X, ArrowRight, ExternalLink } from 'lucide-react';

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
  'on cloud': 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/on.jpg',
  on: 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/on.jpg'
};

const formatPriceString = (price: string) => {
  const num = price.replace(/[^0-9]/g, '');
  if (!num) return price;
  return `฿${parseInt(num).toLocaleString('th-TH')}`;
};

export default function FlashSaleSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeDealTitle, setActiveDealTitle] = useState('');
  const [activeDealPrice, setActiveDealPrice] = useState('');
  const [sizeChartModalUrl, setSizeChartModalUrl] = useState<string | null>(null);

  const getSizeChartUrl = (deal: Promotion) => {
    if (deal.size_chart_url) return deal.size_chart_url;
    const titleLower = deal.title.toLowerCase();
    const brandsSorted = Object.keys(BRAND_SIZE_CHARTS).sort((a, b) => b.length - a.length);
    for (const brand of brandsSorted) {
      const escapedBrand = brand.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedBrand}\\b`, 'i');
      if (regex.test(titleLower)) {
        return BRAND_SIZE_CHARTS[brand];
      }
    }
    return null;
  };
  
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  }, []);

  const handleOrderDeal = (deal: Promotion) => {
    const text = `สวัสดีครับ สนใจสั่งซื้อสินค้าดีลโปรโมชั่นนี้ครับ:\n\n${deal.title}\nราคาพิเศษ: ${deal.deal_price}\n${deal.sizes ? `ไซส์: ${deal.sizes}\n` : ''}${deal.shipping_time ? `ระยะเวลาจัดส่ง: ${deal.shipping_time}\n` : ''}`;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setActiveDealTitle(deal.title);
        setActiveDealPrice(deal.deal_price);
        setShowModal(true);
      })
      .catch((err) => {
        console.error('Failed to copy deal text:', err);
      });
  };

  const getCountdown = (endTimeStr: string | null) => {
    if (!endTimeStr) return null;
    const end = new Date(endTimeStr).getTime();
    const diff = end - now;

    if (diff <= 0) {
      return 'EXPIRED';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const zeroPad = (num: number) => String(num).padStart(2, '0');

    if (days > 0) {
      return `${days}d ${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
    }
    return `${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
  };

  if (loading) {
    return (
      <div className="w-full bg-[#090A0C] py-16 text-center text-xs text-[#60646E] font-sans">
        กำลังโหลดข้อมูลดีลโปรโมชั่น...
      </div>
    );
  }

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section id="flashsale" className="w-full bg-[#090A0C] py-20 md:py-24 px-4 md:px-8 border-b border-white/[0.07] text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.15em] font-mono">
                LIMITED FLASH DEALS
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#F4F4F2] font-heading">
              ดีลพิเศษวันนี้
            </h2>
            <p className="text-xs md:text-sm text-[#9B9FA8] mt-1.5 max-w-lg leading-relaxed font-sans">
              สินค้าราคาส่วนลดพิเศษจากต่างประเทศ ประเมินรวมค่าส่งเหมาจ่ายเบ็ดเสร็จ
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-1.5 text-xs text-[#10B981] font-medium font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>ALL-INCLUSIVE PRICES</span>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((deal) => {
            const countdown = getCountdown(deal.end_time);
            const isExpired = countdown === 'EXPIRED';

            return (
              <div 
                key={deal.id}
                className={`flex flex-col bg-[#12141A] border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isExpired 
                    ? 'border-white/[0.04] opacity-50' 
                    : 'border-white/[0.08] hover:border-white/[0.16]'
                }`}
              >
                {/* Poster Block */}
                <div className="aspect-[4/3] relative w-full overflow-hidden bg-[#090A0C] border-b border-white/[0.06]">
                  {deal.img_url ? (
                    <img 
                      src={deal.img_url} 
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#60646E]">
                      ไม่มีรูปภาพสินค้า
                    </div>
                  )}
                  
                  {/* Active Timer badge */}
                  {deal.end_time && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-mono font-medium bg-[#090A0C]/90 backdrop-blur-md border border-white/[0.1] text-[#F4F4F2]">
                      <Timer className="w-3 h-3 text-[#10B981]" />
                      <span>{countdown}</span>
                    </div>
                  )}

                  {/* Price Tag Badge */}
                  {!isExpired && (
                    <div className="absolute top-3 right-3 bg-[#10B981] text-black px-3 py-1 rounded-sm text-xs md:text-sm font-bold font-mono">
                      {formatPriceString(deal.deal_price)}
                    </div>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/70 to-transparent p-4 pt-8 text-left">
                    <div className="text-xs md:text-sm font-semibold text-[#F4F4F2] font-sans line-clamp-1">
                      {deal.title}
                    </div>
                    {deal.description && (
                      <p className="text-[11px] text-[#9B9FA8] font-normal line-clamp-1 mt-0.5">
                        {deal.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details Block */}
                <div className="p-4 space-y-1.5 text-left text-xs font-sans">
                  {deal.sizes && (
                    <div className="flex justify-between">
                      <span className="text-[#60646E]">ไซส์:</span>
                      <span className="text-[#F4F4F2] font-medium">{deal.sizes}</span>
                    </div>
                  )}
                  {deal.shipping_time && (
                    <div className="flex justify-between">
                      <span className="text-[#60646E]">การจัดส่ง:</span>
                      <span className="text-[#10B981] font-mono">{deal.shipping_time}</span>
                    </div>
                  )}
                  {deal.original_price && (
                    <div className="flex justify-between">
                      <span className="text-[#60646E]">ราคาปกติ:</span>
                      <span className="text-[#60646E] line-through font-mono">{deal.original_price}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => handleOrderDeal(deal)}
                    disabled={isExpired}
                    className={`flex-1 h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all font-heading tracking-wider uppercase tactile-btn cursor-pointer ${
                      isExpired
                        ? 'bg-white/[0.04] text-[#60646E] cursor-not-allowed'
                        : 'bg-[#10B981] hover:bg-[#059669] text-black shadow-sm'
                    }`}
                  >
                    <span>{isExpired ? 'หมดช่วงโปร' : 'ฝากสั่งซื้อด่วน'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  
                  {!isExpired && (deal.affiliate_url || getSizeChartUrl(deal)) && (
                    <>
                      {getSizeChartUrl(deal) && (
                        <button
                          onClick={() => setSizeChartModalUrl(getSizeChartUrl(deal))}
                          className="px-3 h-10 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#F4F4F2] rounded-xl text-[11px] font-semibold transition-all cursor-pointer font-heading tactile-btn"
                        >
                          ตารางไซส์
                        </button>
                      )}
                      
                      {deal.affiliate_url && (
                        <a
                          href={deal.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 h-10 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#9B9FA8] hover:text-[#F4F4F2] rounded-xl text-xs flex items-center justify-center transition-all tactile-btn"
                          title="ดูโพสต์ต้นฉบับ"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Promotion Checkout Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#12141A] border border-white/[0.12] p-6 rounded-2xl shadow-2xl relative text-left text-[#F4F4F2] font-sans">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#60646E] hover:text-[#F4F4F2] p-1 transition-colors"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F4F2] mb-2 flex items-center gap-2 font-heading">
              <Check className="w-4 h-4 text-[#10B981]" /> คัดลอกรายละเอียดดีลสำเร็จ
            </h3>
            <p className="text-xs text-[#9B9FA8] leading-relaxed mb-4">
              ระบบได้คัดลอกรายละเอียดเรียบร้อยแล้ว กรุณาทักแชทคุยกับแอดมินเพื่อตรวจสอบและยืนยันการสั่งซื้อครับ
            </p>
            
            <div className="bg-[#090A0C] border border-white/[0.08] p-3.5 rounded-xl text-xs text-[#9B9FA8] break-all mb-4 font-mono space-y-1">
              <div className="text-[#F4F4F2] font-semibold">{activeDealTitle}</div>
              <div className="text-[#10B981] font-bold">{activeDealPrice}</div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href="https://lin.ee/ByS27YW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-11 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading tracking-wider uppercase tactile-btn"
              >
                <MessageCircle className="w-4 h-4" />
                คุยทาง LINE OA (@hij2541a)
              </a>
              <a
                href="https://m.me/us2th"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-11 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#F4F4F2] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wider uppercase tactile-btn"
              >
                <Send className="w-4 h-4 text-[#9B9FA8]" />
                คุยทาง Facebook Messenger
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sizing Chart Modal */}
      {sizeChartModalUrl && (
        <div 
          onClick={() => setSizeChartModalUrl(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#12141A] border border-white/[0.12] rounded-2xl p-5 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
              <span className="text-xs font-bold text-[#F4F4F2] uppercase tracking-wider font-heading">
                ตารางเทียบขนาดมาตรฐาน (SIZE CHART)
              </span>
              <button
                onClick={() => setSizeChartModalUrl(null)}
                className="text-[#60646E] hover:text-[#F4F4F2] p-1 transition-colors"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full max-h-[75vh] overflow-auto rounded-xl bg-[#090A0C]">
              <img
                src={sizeChartModalUrl}
                alt="Brand Size Chart"
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
