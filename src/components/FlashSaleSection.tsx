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
      return 'หมดเขต';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const zeroPad = (num: number) => String(num).padStart(2, '0');

    if (days > 0) {
      return `${days} วัน ${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
    }
    return `${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
  };

  if (loading) {
    return (
      <div className="w-full bg-[#FBFBFA] py-16 text-center text-sm text-[#777777] font-sans">
        กำลังโหลดข้อมูลดีลโปรโมชั่น...
      </div>
    );
  }

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section id="flashsale" className="w-full bg-[#FBFBFA] py-20 md:py-24 px-4 md:px-8 border-b border-[#E5E5E0] text-[#111111] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E0] pb-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider font-heading">
                ดีลพิเศษราคาเน็ตจบหน้าบ้าน
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#111111] font-heading">
              ดีลพิเศษวันนี้
            </h2>
            <p className="text-base text-[#555555] mt-2 max-w-xl leading-relaxed font-sans">
              คัดสรรสินค้าราคาส่วนลดพิเศษจากต่างประเทศ ประเมินรวมค่าส่งเหมาจ่ายเบ็ดเสร็จ ของแท้ 100%
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-[#059669] font-semibold font-sans bg-[#ECFDF5] px-4 py-2 rounded-full border border-[#A7F3D0]">
            <Zap className="w-4 h-4 text-[#059669]" />
            <span>ราคารวมเคลียร์ภาษีเบ็ดเสร็จ</span>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((deal) => {
            const countdown = getCountdown(deal.end_time);
            const isExpired = countdown === 'หมดเขต';

            return (
              <div 
                key={deal.id}
                className={`flex flex-col bg-white border rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 ${
                  isExpired 
                    ? 'border-[#E5E5E0] opacity-50' 
                    : 'border-[#D4D4CE]'
                }`}
              >
                {/* Image Block */}
                <div className="aspect-[4/3] relative w-full overflow-hidden bg-[#F4F4F0] border-b border-[#E5E5E0]">
                  {deal.img_url ? (
                    <img 
                      src={deal.img_url} 
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-[#777777]">
                      ไม่มีรูปภาพสินค้า
                    </div>
                  )}
                  
                  {/* Countdown badge */}
                  {deal.end_time && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold bg-[#111111] text-white shadow-xs">
                      <Timer className="w-3.5 h-3.5 text-[#059669]" />
                      <span>{countdown}</span>
                    </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow text-left">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#111111] leading-snug font-heading line-clamp-2 mb-2">
                      {deal.title}
                    </h3>
                    
                    {deal.description && (
                      <p className="text-sm text-[#555555] line-clamp-2 font-normal leading-relaxed font-sans mb-3">
                        {deal.description}
                      </p>
                    )}

                    {/* BIG PROMINENT PRICE TAG FOR 40+ LEGIBILITY */}
                    <div className="bg-[#FBFBFA] border border-[#E5E5E0] p-4 rounded-xl my-4">
                      <span className="text-xs text-[#666666] font-medium block mb-1">
                        ราคาเหมาจ่ายจบหน้าบ้าน:
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl sm:text-3xl font-black text-[#111111] font-mono tracking-tight">
                          {formatPriceString(deal.deal_price)}
                        </span>
                        {deal.original_price && (
                          <span className="text-sm text-[#777777] line-through font-mono">
                            {deal.original_price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="space-y-1.5 text-sm font-sans mb-5">
                      {deal.sizes && (
                        <div className="flex justify-between">
                          <span className="text-[#666666]">ไซส์ที่มี:</span>
                          <span className="text-[#111111] font-semibold">{deal.sizes}</span>
                        </div>
                      )}
                      {deal.shipping_time && (
                        <div className="flex justify-between">
                          <span className="text-[#666666]">ระยะเวลานำส่ง:</span>
                          <span className="text-[#059669] font-medium">{deal.shipping_time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-3 border-t border-[#E5E5E0]">
                    <button
                      onClick={() => handleOrderDeal(deal)}
                      disabled={isExpired}
                      className={`flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all font-heading tracking-wide uppercase tactile-btn cursor-pointer ${
                        isExpired
                          ? 'bg-[#E5E5E0] text-[#777777] cursor-not-allowed'
                          : 'bg-[#059669] hover:bg-[#047857] text-white shadow-2xs'
                      }`}
                    >
                      <span>{isExpired ? 'หมดช่วงโปร' : 'ฝากสั่งซื้อทันที'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    {!isExpired && getSizeChartUrl(deal) && (
                      <button
                        onClick={() => setSizeChartModalUrl(getSizeChartUrl(deal))}
                        className="px-4 h-12 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#111111] rounded-xl text-sm font-semibold transition-all cursor-pointer font-heading tactile-btn"
                      >
                        ตารางไซส์
                      </button>
                    )}

                    {!isExpired && deal.affiliate_url && (
                      <a
                        href={deal.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 h-12 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#555555] hover:text-[#111111] rounded-xl text-sm flex items-center justify-center transition-all tactile-btn"
                        title="ดูโพสต์ต้นฉบับ"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Promotion Checkout Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#D4D4CE] p-6 sm:p-8 rounded-2xl shadow-xl relative text-left text-[#111111] font-sans">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#111111] p-1.5 transition-colors"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#111111] mb-2 flex items-center gap-2 font-heading">
              <Check className="w-5 h-5 text-[#059669]" /> คัดลอกรายละเอียดดีลสำเร็จ
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed mb-4">
              ระบบได้คัดลอกรายละเอียดเรียบร้อยแล้ว กรุณาทักแชทคุยกับแอดมินเพื่อตรวจสอบและยืนยันการสั่งซื้อครับ
            </p>
            
            <div className="bg-[#FBFBFA] border border-[#E5E5E0] p-4 rounded-xl text-sm text-[#444444] break-all mb-5 font-mono space-y-1">
              <div className="text-[#111111] font-bold text-base">{activeDealTitle}</div>
              <div className="text-[#059669] font-bold text-xl">{activeDealPrice}</div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href="https://lin.ee/ByS27YW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-12 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs font-heading tracking-wide uppercase tactile-btn"
              >
                <MessageCircle className="w-4 h-4" />
                คุยทาง LINE OA
              </a>
              <a
                href="https://m.me/us2th"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-12 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#111111] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wide uppercase tactile-btn"
              >
                <Send className="w-4 h-4 text-[#555555]" />
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
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-8"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white border border-[#D4D4CE] rounded-2xl p-6 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-3 mb-4">
              <span className="text-base font-bold text-[#111111] uppercase tracking-wider font-heading">
                ตารางเทียบขนาดมาตรฐาน (SIZE CHART)
              </span>
              <button
                onClick={() => setSizeChartModalUrl(null)}
                className="text-[#777777] hover:text-[#111111] p-1.5 transition-colors"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full max-h-[75vh] overflow-auto rounded-xl bg-white border border-[#E5E5E0]">
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
