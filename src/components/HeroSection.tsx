'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

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

export default function HeroSection({ selectedTestimonial }: { selectedTestimonial?: any }) {
  // Latest Promotion State
  const [latestDeal, setLatestDeal] = useState<Promotion | null>(null);
  const [loadingDeal, setLoadingDeal] = useState(true);
  const [sizeChartModalUrl, setSizeChartModalUrl] = useState<string | null>(null);

  // Deal order copy details
  const [showDealModal, setShowDealModal] = useState(false);
  const [orderedDealTitle, setOrderedDealTitle] = useState('');
  const [orderedDealPrice, setOrderedDealPrice] = useState('');

  useEffect(() => {
    async function fetchLatestDeal() {
      try {
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);
        if (!error && data && data.length > 0) {
          setLatestDeal(data[0]);
        }
      } catch (err) {
        console.error('Error fetching latest deal for Hero:', err);
      } finally {
        setLoadingDeal(false);
      }
    }
    fetchLatestDeal();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showDealModal) setShowDealModal(false);
        if (sizeChartModalUrl) setSizeChartModalUrl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDealModal, sizeChartModalUrl]);

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

  const formatPriceString = (price: string) => {
    const clean = price.replace(/[^0-9]/g, '');
    if (!clean) return price;
    return `฿${Number(clean).toLocaleString('th-TH')}`;
  };

  const handleOrderDeal = (deal: Promotion) => {
    const text = `สวัสดีครับ สนใจสั่งซื้อสินค้าดีลโปรโมชั่นนี้ครับ:\n\n${deal.title}\nราคาพิเศษ: ${deal.deal_price}\n${deal.sizes ? `ไซส์: ${deal.sizes}\n` : ''}${deal.shipping_time ? `ระยะเวลาจัดส่ง: ${deal.shipping_time}\n` : ''}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        setOrderedDealTitle(deal.title);
        setOrderedDealPrice(deal.deal_price);
        setShowDealModal(true);
      })
      .catch((err) => {
        console.error('Failed to copy deal text:', err);
      });
  };

  return (
    <section className="relative w-full bg-[#FBFBFA] border-b border-[#E5E5E0] text-[#111111] overflow-hidden pt-12 md:pt-16 pb-16 md:pb-24">
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Editorial Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4D4CE] text-xs font-semibold text-[#111111] mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span className="tracking-wide uppercase font-heading">บริการรับสั่งซื้อและนำเข้าของแท้ 100%</span>
          </div>

          {/* Headline - Big, Clear & High Contrast for 40+ Readers */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.2] mb-5 font-heading">
            สั่งซื้อและนำเข้าของสะสมหายาก
            <span className="block text-[#555555] font-normal mt-1 text-2xl sm:text-4xl lg:text-5xl">
              สนีกเกอร์ลิมิเต็ดจากทั่วทุกมุมโลก
            </span>
          </h1>

          {/* Subtext - 18px comfortable body */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#444444] leading-relaxed font-sans mb-8">
            บริการรับกดและเคลียร์ภาษีเบ็ดเสร็จ ส่งตรงถึงหน้าบ้านคุณในราคาเหมาจ่ายยอดเดียวจบ ไร้กังวลเรื่องค่าใช้จ่ายเพิ่มเติมภายหลัง
          </p>

          {/* Clean Primary Actions (No duplicate input form) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#inquiry"
              className="h-14 px-8 bg-[#111111] hover:bg-[#222222] text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wide shadow-2xs tactile-btn"
            >
              <span>ฝากหาของ / เช็คราคาฟรี</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="https://lin.ee/ByS27YW"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 bg-[#059669] hover:bg-[#047857] text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wide shadow-2xs tactile-btn"
            >
              <MessageCircle className="w-5 h-5" />
              <span>ทักแชท LINE OA</span>
            </a>
          </div>

        </div>

        {/* 3 Core Value Pillars - Clear White Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white border border-[#E5E5E0] p-6 rounded-2xl shadow-2xs text-left">
            <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-heading">
              การันตีของแท้ 100%
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed font-sans">
              ตรวจสอบประวัติผู้ขายและสภาพสินค้าอย่างเข้มงวดทุกรายการ หากพบสินค้าปลอมยินดีคืนเงินเต็มจำนวนทันที
            </p>
          </div>

          <div className="bg-white border border-[#E5E5E0] p-6 rounded-2xl shadow-2xs text-left">
            <div className="w-10 h-10 rounded-xl bg-[#F4F4F0] text-[#111111] flex items-center justify-center font-bold mb-4 font-mono">
              ฿
            </div>
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-heading">
              ราคาเหมาจ่ายเบ็ดเสร็จ
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed font-sans">
              รวมค่าสินค้า ค่ากด ค่าส่งข้ามประเทศ และเคลียร์ภาษีศุลกากรครบ จบในยอดเดียว ไม่มีบวกเพิ่มหน้าบ้านแน่นอน
            </p>
          </div>

          <div className="bg-white border border-[#E5E5E0] p-6 rounded-2xl shadow-2xs text-left">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xl">🇺🇸</span>
              <span className="text-xl">🇯🇵</span>
              <span className="text-xl">🇪🇺</span>
              <span className="text-xl">🇬🇧</span>
              <span className="text-xl">🇰🇷</span>
            </div>
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-heading">
              สั่งได้ทั่วทุกมุมโลก
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed font-sans">
              มีโกดังรับของในสหรัฐอเมริกา ญี่ปุ่น อังกฤษ ยุโรป เกาหลีใต้ และฮ่องกง พร้อมรอบบินตรงถึงไทยสม่ำเสมอ
            </p>
          </div>

        </div>

        {/* Featured Deal Section */}
        {latestDeal && (
          <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 md:p-8 shadow-xs max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E5E0]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#F4F4F0] text-xs font-bold text-[#111111] uppercase tracking-wider font-heading">
                  ดีลแนะนำวันนี้
                </span>
                <span className="text-sm text-[#666666] font-sans">สินค้าราคาพิเศษพร้อมส่งมอบ</span>
              </div>
              <span className="text-xs font-semibold text-[#059669] font-mono">AUTHENTIC VERIFIED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F4F0] border border-[#E5E5E0]">
                {latestDeal.img_url ? (
                  <img
                    src={latestDeal.img_url}
                    alt={latestDeal.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-[#777777]">
                    ไม่มีรูปภาพ
                  </div>
                )}
              </div>

              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111111] leading-snug mb-3 font-heading">
                    {latestDeal.title}
                  </h3>
                  
                  {latestDeal.description && (
                    <p className="text-sm text-[#555555] leading-relaxed mb-4 font-sans">
                      {latestDeal.description}
                    </p>
                  )}

                  {/* HUGE, PROMINENT PRICE TAG FOR 40+ LEGIBILITY */}
                  <div className="bg-[#FBFBFA] border border-[#E5E5E0] p-4 rounded-xl mb-6">
                    <span className="text-xs text-[#666666] font-medium block mb-1">ราคาเหมาจ่ายรวมส่งถึงหน้าบ้าน:</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-[#111111] font-mono tracking-tight">
                        {formatPriceString(latestDeal.deal_price)}
                      </span>
                      {latestDeal.original_price && (
                        <span className="text-base text-[#777777] line-through font-mono">
                          {latestDeal.original_price}
                        </span>
                      )}
                    </div>
                    {latestDeal.sizes && (
                      <div className="text-xs text-[#555555] mt-2">
                        <strong className="text-[#111111]">ไซส์ที่มี:</strong> {latestDeal.sizes}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleOrderDeal(latestDeal)}
                    className="flex-1 min-w-[200px] h-12 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wide tactile-btn shadow-2xs"
                  >
                    <span>ฝากสั่งซื้อดีลนี้ทันที</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {getSizeChartUrl(latestDeal) && (
                    <button
                      onClick={() => setSizeChartModalUrl(getSizeChartUrl(latestDeal))}
                      className="px-5 h-12 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#111111] text-sm font-semibold rounded-xl transition-all cursor-pointer font-heading tactile-btn"
                    >
                      ตารางไซส์
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Deal Order Modal */}
      {showDealModal && (
        <div 
          onClick={() => setShowDealModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white border border-[#D4D4CE] p-6 sm:p-8 rounded-2xl shadow-xl relative text-left font-sans text-[#111111]"
          >
            <button
              onClick={() => setShowDealModal(false)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#111111] p-1.5 transition-colors"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div>
                <span className="text-xs text-[#059669] font-bold uppercase tracking-wider block mb-1">
                  สั่งซื้อดีลพิเศษ
                </span>
                <h3 className="text-xl font-bold text-[#111111] font-heading">
                  คัดลอกรายละเอียดดีลสำเร็จ
                </h3>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed">
                ระบบได้คัดลอกข้อมูลดีลส่วนลดนี้ลงคลิปบอร์ดแล้ว ทักแชทคุยกับแอดมินเพื่อจองสั่งซื้อได้ทันทีครับ:
              </p>

              <div className="bg-[#FBFBFA] border border-[#E5E5E0] p-4 rounded-xl text-sm space-y-1 font-sans">
                <span className="text-[#777777] block font-medium">รายการดีล:</span>
                <div className="text-[#111111] font-bold text-base">{orderedDealTitle}</div>
                <div className="text-[#059669] font-mono font-bold text-lg">{orderedDealPrice}</div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href="https://lin.ee/ByS27YW"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowDealModal(false)}
                  className="w-full h-12 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs font-heading tracking-wide uppercase tactile-btn"
                >
                  <MessageCircle className="w-5 h-5" />
                  ส่งดีลสั่งซื้อทาง LINE OA
                </a>
                <a
                  href="https://m.me/us2th"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowDealModal(false)}
                  className="w-full h-12 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#111111] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wide uppercase tactile-btn"
                >
                  <Send className="w-4 h-4 text-[#555555]" />
                  ส่งดีลสั่งซื้อทาง Messenger
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Size Chart Modal */}
      {sizeChartModalUrl && (
        <div
          onClick={() => setSizeChartModalUrl(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white border border-[#D4D4CE] rounded-2xl p-5 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-3 mb-4">
              <span className="text-sm font-bold text-[#111111] uppercase tracking-wider font-heading">
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
