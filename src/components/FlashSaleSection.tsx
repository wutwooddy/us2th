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
  'on cloud': 'https://ftzmepexrmwiwhfjtgvp.supabase.co/storage/v1/object/public/assets/sizechart/on.jpg',
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
    
    // Sort brands by length descending to match longer strings first
    const brandsSorted = Object.keys(BRAND_SIZE_CHARTS).sort((a, b) => b.length - a.length);
    for (const brand of brandsSorted) {
      const escapedBrand = brand.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Use word boundary to prevent partial matches like 'on' matching inside 'moncler'
      const regex = new RegExp(`\\b${escapedBrand}\\b`, 'i');
      if (regex.test(titleLower)) {
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
          // Skip the first promotion since it is already displayed in the Hero section
          if (data.length > 1) {
            setPromotions(data.slice(1));
          } else {
            setPromotions([]);
          }
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
      <div className="w-full bg-[#0A0D3A] py-16 text-center text-sm font-semibold text-[#949BA4] font-sans">
        กำลังโหลดดีลโปรโมชั่นพิเศษ...
      </div>
    );
  }

  // If there are no active promotions in the database, don't render the section
  if (promotions.length === 0) {
    return null;
  }

  return (
    <section id="flashsale" className="w-full bg-[#0A0D3A] py-24 px-4 md:px-8 border-b border-[#5865F2]/20 relative overflow-hidden text-[#F2F3F5]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#EC48BD]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5865F2]/20 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#EC48BD] animate-ping" />
              <span className="text-xs font-bold text-[#EC48BD] uppercase tracking-widest font-heading">
                [ #DISCORD-NITRO // FLASH-DEALS ]
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F2F3F5] font-heading">
              โปรโมชั่นวันนี้ & Flash Sale
            </h2>
            <p className="text-sm md:text-base text-[#DBDEE1] mt-2 max-w-lg leading-relaxed font-medium font-sans">
              ดีลพิเศษแบรนด์เนมและสนีกเกอร์ ราคาเหมาจ่ายเบ็ดเสร็จ รีบตัดสินใจก่อนหมดเวลาโปรโมชั่น
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#35ED7E] font-heading bg-[#23A55A]/10 border border-[#23A55A]/30 px-3.5 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-[#35ED7E]" />
            <span>ดีลด่วนราคาเน็ต</span>
          </div>
        </div>

        {/* Promotions Grid */}
        {promotions.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#5865F2]/20 rounded-[32px] bg-[#1E1F22] text-[#949BA4] font-medium text-xs md:text-sm font-sans max-w-xl mx-auto w-full">
            ✨ ดีลจำกัดเวลาเพิ่มรอบอื่นอยู่ระหว่างการอัปเดต หรือสามารถชม "ดีลล่าสุดแนะนำ" ได้ในส่วนหน้าเว็บบนสุดครับ
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((deal) => {
            const countdown = getCountdown(deal.end_time);
            const isExpired = countdown === 'EXPIRED (หมดเขตดีล)';

            return (
              <div 
                key={deal.id}
                className={`flex flex-col bg-[#1E1F22] border rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 discord-embed-magenta ${
                  isExpired 
                    ? 'border-[#35373C] opacity-50' 
                    : 'border-[#5865F2]/25 hover:border-[#5865F2]/50 hover:bg-[#232529]'
                }`}
              >
                {/* Poster Block (Aspect 4/3) */}
                <div className="aspect-[4/3] relative w-full overflow-hidden bg-[#111214] border-b border-[#35373C]">
                  {deal.img_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={deal.img_url} 
                      alt={deal.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-[#80848E] font-medium bg-[#111214]">
                      ไม่มีรูปภาพสินค้า
                    </div>
                  )}
                  
                  {/* Active Timer badge (Top-Left) */}
                  {deal.end_time && (
                    <div className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md z-10 font-heading tracking-wide ${
                      isExpired 
                        ? 'bg-[#111214] text-[#80848E]' 
                        : 'bg-[#EC48BD] text-white animate-pulse'
                    }`}>
                      <Timer className="w-3.5 h-3.5" />
                      <span>{countdown}</span>
                    </div>
                  )}

                  {/* Price Tag Badge (Top-Right) */}
                  {!isExpired && (
                    <div className="absolute top-3 right-3 bg-[#111214]/90 backdrop-blur-md text-[#35ED7E] px-4 py-2 rounded-2xl text-lg md:text-xl font-black shadow-xl border border-[#5865F2]/30 z-10 font-heading tracking-tight flex items-center justify-center">
                      <span>{formatPriceString(deal.deal_price)}</span>
                    </div>
                  )}

                  {/* Bottom Semi-transparent Title Band */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111214] via-[#111214]/85 to-transparent p-4 pt-10 text-left flex flex-col gap-0.5 z-10 font-sans">
                    <div className="text-xs md:text-sm font-bold leading-relaxed text-[#F2F3F5] font-sans line-clamp-1">
                      {deal.title}
                    </div>
                    
                    {deal.description && (
                      <div className="text-[10px] text-[#DBDEE1]/80 font-medium leading-normal font-sans line-clamp-1">
                        {deal.description}
                      </div>
                    )}

                    {deal.shipping_time && (
                      <div className="text-[10px] font-medium text-[#35ED7E] font-sans mt-0.5 block">
                        {deal.shipping_time}
                      </div>
                    )}
                  </div>
                </div>

                {/* Below Image Details Block */}
                <div className="p-4 pb-0 text-left flex flex-col gap-1.5 bg-[#1E1F22] font-sans">
                  {deal.sizes && (
                    <div className="text-[11px] text-[#DBDEE1] font-normal leading-relaxed font-sans flex items-baseline gap-1.5">
                      <span className="text-[#949BA4] font-medium flex-shrink-0 font-sans">ไซส์:</span>
                      <span className="text-[#F2F3F5] font-bold font-sans">{deal.sizes}</span>
                    </div>
                  )}

                  {deal.original_price && (
                    <div className="text-[11px] text-[#949BA4] font-normal leading-relaxed font-sans flex items-baseline gap-1.5">
                      <span className="text-[#80848E] font-medium flex-shrink-0 font-sans">ราคาปกติ:</span>
                      <span className="text-[#80848E] line-through font-normal font-sans">{deal.original_price}</span>
                    </div>
                  )}

                  <p className="text-[10px] text-[#80848E] font-medium leading-relaxed font-sans border-t border-[#35373C] pt-2 mt-1">
                    *ราคารวมส่งถึงหน้าบ้าน ไม่มีเก็บเงินเพิ่มภายหลัง
                  </p>
                </div>

                {/* Stacked Action Buttons */}
                <div className="p-4 pt-2 flex flex-col gap-1.5 bg-[#1E1F22]">
                  <button
                    onClick={() => handleOrderDeal(deal)}
                    disabled={isExpired}
                    className={`w-full h-12 rounded-xl text-sm font-black flex items-center justify-center gap-1.5 transition-all shadow-md font-heading uppercase tracking-wide cursor-pointer ${
                      isExpired
                        ? 'bg-[#2B2D31] text-[#80848E] cursor-not-allowed'
                        : 'bg-[#23A55A] hover:bg-[#1F924F] text-white active:scale-98'
                    }`}
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    {isExpired ? 'หมดเขตช่วงโปร' : 'ฝากสั่งซื้อด่วน'}
                  </button>
                  
                  {!isExpired && (deal.affiliate_url || getSizeChartUrl(deal)) && (
                    <div className="flex gap-1.5 w-full">
                      {getSizeChartUrl(deal) && (
                        <button
                          onClick={() => setSizeChartModalUrl(getSizeChartUrl(deal))}
                          className="flex-grow h-9 bg-[#FEE75C] hover:bg-[#E3CE52] text-[#060607] rounded-xl text-[10px] font-black flex items-center justify-center transition-all cursor-pointer font-heading tracking-wider uppercase"
                        >
                          ตารางไซส์
                        </button>
                      )}
                      
                      {deal.affiliate_url && (
                        <a
                          href={deal.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow h-9 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer font-heading text-center shadow-sm"
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
        )}

      </div>

      {/* Promotion Checkout Success Modal - Discord Style */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#1E1F22] border border-[#5865F2]/40 p-6 rounded-3xl shadow-2xl relative text-left text-[#F2F3F5] font-sans">
            <h3 className="text-lg font-bold text-[#F2F3F5] mb-3 flex items-center gap-2 font-heading">
              <Check className="w-5 h-5 text-[#23A55A]" /> คัดลอกดีลสำเร็จ!
            </h3>
            <p className="text-sm text-[#DBDEE1] leading-relaxed mb-4 font-medium">
              ระบบได้คัดลอกรายละเอียดดีลนี้เรียบร้อยแล้ว กรุณาทักแชทคุยกับแอดมินเพื่อจองสั่งซื้อสินค้าต่อได้ทันทีครับ:
            </p>
            
            <div className="bg-[#111214] border border-[#383A40] p-4 rounded-xl text-xs text-[#DBDEE1] break-all mb-5 font-mono">
              {`สวัสดีครับ สนใจฝากกดดีลพิเศษนี้ครับ:\n[ ${activeDealTitle} ]\nราคาดีล: ${activeDealPrice}`}
            </div>

            <p className="text-xs font-bold text-[#00B0F4] uppercase tracking-wider mb-3 font-heading">
              ➔ เลือกช่องทางแชทคุยกับแอดมิน
            </p>
            
            <div className="flex flex-col gap-2.5">
              <a
                href="https://lin.ee/ByS27YW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-12 bg-[#23A55A] hover:bg-[#1F924F] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading"
              >
                <MessageCircle className="w-4 h-4" />
                คุยทาง LINE OA
              </a>
              <a
                href="https://m.me/us2th"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading"
              >
                <Send className="w-4 h-4" />
                คุยทาง FB Messenger
              </a>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full text-center text-xs font-semibold text-[#949BA4] hover:text-[#F2F3F5] transition-colors mt-5 py-1 uppercase tracking-wider font-heading cursor-pointer"
            >
              ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
      )}

      {/* Sizing Chart Modal */}
      {sizeChartModalUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="relative max-w-full max-h-screen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sizeChartModalUrl}
              alt="Brand Size Chart"
              className="max-w-full max-h-screen object-contain select-none rounded-2xl shadow-2xl bg-white"
            />
            <button
              onClick={() => setSizeChartModalUrl(null)}
              className="absolute top-4 right-4 z-50 bg-[#111214]/90 hover:bg-[#111214] text-white text-xs font-black px-3.5 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-xs flex items-center gap-1 font-heading cursor-pointer"
            >
              ปิด [X]
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
