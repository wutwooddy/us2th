'use client';

import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Send, Check, ExternalLink, Star, Quote, ShieldCheck, ArrowRight, X } from 'lucide-react';
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
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  
  // Sourcing Inquiry State
  const [contactInfo, setContactInfo] = useState('');
  const [step, setStep] = useState(1); // 1 = enter contact, 2 = success summary, 3 = deal order success
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Latest Promotion State
  const [latestDeal, setLatestDeal] = useState<Promotion | null>(null);
  const [loadingDeal, setLoadingDeal] = useState(true);
  const [sizeChartModalUrl, setSizeChartModalUrl] = useState<string | null>(null);

  // Deal order copy details
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
        if (showModal) closeModal();
        if (sizeChartModalUrl) setSizeChartModalUrl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, sizeChartModalUrl]);

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

  const handleCheckPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !url.trim()) {
      setError('กรุณาระบุลิงก์สินค้าที่ต้องการเช็คราคาครับ');
      return;
    }
    
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(url.trim()) && !url.includes('.')) {
      setError('กรุณาระบุเป็นลิงก์เว็บไซต์ เช่น https://www.ebay.com/... หรือชื่อเว็บที่ถูกต้องครับ');
      return;
    }

    setError('');
    setStep(1);
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
    setStep(2);
  };

  const handleOrderDeal = (deal: Promotion) => {
    const text = `สวัสดีครับ สนใจสั่งซื้อสินค้าดีลโปรโมชั่นนี้ครับ:\n\n${deal.title}\nราคาพิเศษ: ${deal.deal_price}\n${deal.sizes ? `ไซส์: ${deal.sizes}\n` : ''}${deal.shipping_time ? `ระยะเวลาจัดส่ง: ${deal.shipping_time}\n` : ''}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        setOrderedDealTitle(deal.title);
        setOrderedDealPrice(deal.deal_price);
        setStep(3);
        setShowModal(true);
      })
      .catch((err) => {
        console.error('Failed to copy deal text:', err);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setUrl('');
    setContactInfo('');
    setStep(1);
    setModalError('');
    setOrderedDealTitle('');
    setOrderedDealPrice('');
  };

  return (
    <section className="relative w-full bg-[#090A0C] border-b border-white/[0.07] text-[#F4F4F2] overflow-hidden pt-10 md:pt-16 pb-16 md:pb-20">
      
      {/* 2-Column Split Layout */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
        
        {/* Left Column: Value Proposition & Sourcing Concierge Form */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          
          <div>
            {/* Eyebrow: Max 1 text element */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-white/[0.05] border border-white/[0.1] text-[#F4F4F2] text-[11px] font-semibold tracking-[0.15em] uppercase font-heading">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                GLOBAL SOURCING CONCIERGE
              </span>
              <span className="text-[#60646E] text-xs font-mono">•</span>
              <span className="text-[#9B9FA8] text-xs tracking-wider uppercase font-sans">100% AUTHENTIC GUARANTEE</span>
            </div>

            {/* Headline: Max 2 lines desktop */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F4F2] mb-4 font-heading leading-[1.12]">
              สั่งซื้อและนำเข้าของสะสมหายาก
              <span className="block text-[#9B9FA8] font-normal">สนีกเกอร์ลิมิเต็ดทั่วโลก</span>
            </h1>

            {/* Subtext: Max 20 words */}
            <p className="max-w-xl text-sm md:text-base text-[#9B9FA8] leading-relaxed mb-8 font-sans">
              บริการจัดซื้อและเคลียร์ภาษีเบ็ดเสร็จ ส่งตรงถึงหน้าบ้านคุณในราคาเหมาจ่ายยอดเดียวจบ การันตีของแท้ทุกชิ้น
            </p>

            {/* Sourcing Concierge Quote Box */}
            <div className="w-full max-w-xl bg-[#12141A] border border-white/[0.1] rounded-2xl p-5 md:p-6 shadow-xl relative mb-10">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider text-[#F4F4F2] uppercase font-heading">
                    เช็คราคาเหมาจ่ายฟรี
                  </span>
                  <span className="text-[10px] text-[#60646E] font-mono tracking-widest uppercase">
                    CONCIERGE QUOTE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] font-medium font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>ONLINE</span>
                </div>
              </div>

              <form onSubmit={handleCheckPrice} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="วางลิงก์สินค้าที่นี่ (เช่น StockX, GOAT, eBay)"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setError('');
                      }}
                      className="w-full h-12 bg-[#090A0C] border border-white/[0.12] text-[#F4F4F2] rounded-xl px-4 text-sm focus:border-[#10B981] outline-none transition-all placeholder:text-[#60646E] font-medium font-sans"
                    />
                    {url && (
                      <button
                        type="button"
                        aria-label="ล้างข้อความในช่องค้นหา"
                        onClick={() => setUrl('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#60646E] hover:text-[#F4F4F2] text-xs font-bold px-1.5 py-0.5 rounded cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="h-12 px-6 bg-[#F4F4F2] hover:bg-white text-[#090A0C] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all flex-shrink-0 cursor-pointer font-heading tracking-wider uppercase tactile-btn shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Search className="w-4 h-4" />}
                    <span>{copied ? 'คัดลอกแล้ว' : 'ส่งเช็คราคา'}</span>
                  </button>
                </div>
              </form>

              {error && (
                <p className="text-xs text-[#EF4444] font-medium bg-[#EF4444]/10 p-2.5 rounded-lg border border-[#EF4444]/20 font-sans mt-3">
                  {error}
                </p>
              )}

              <p className="text-[11px] text-[#60646E] leading-relaxed pt-3 border-t border-white/[0.06] mt-3 font-sans">
                ระบบจะสรุปข้อมูลเพื่อส่งต่อให้แอดมินประเมินราคาเหมาจ่ายทาง LINE OA หรือ Facebook ได้ทันที
              </p>
            </div>

          </div>

          {/* Operational Quick Stats */}
          <div className="grid grid-cols-3 border-t border-white/[0.08] pt-6 gap-4">
            <div>
              <span className="block text-[11px] text-[#60646E] font-medium tracking-wider font-heading uppercase">รับประกันสินค้า</span>
              <span className="block text-sm md:text-base font-semibold text-[#F4F4F2] mt-0.5 font-heading">ของแท้ 100%</span>
            </div>
            <div>
              <span className="block text-[11px] text-[#60646E] font-medium tracking-wider font-heading uppercase">ระยะเวลานำเข้า</span>
              <span className="block text-sm md:text-base font-semibold text-[#F4F4F2] mt-0.5 font-heading">ตามรอบประเทศ</span>
            </div>
            <div>
              <span className="block text-[11px] text-[#60646E] font-medium tracking-wider font-heading uppercase">ราคาบริการ</span>
              <span className="block text-sm md:text-base font-semibold text-[#10B981] mt-0.5 font-heading">เหมาจ่ายเบ็ดเสร็จ</span>
            </div>
          </div>

          {/* Regional Hubs Wait Times */}
          <div className="mt-8 border-t border-white/[0.08] pt-6">
            <span className="block text-xs font-semibold text-[#9B9FA8] uppercase tracking-wider mb-3 font-heading">
              ระยะเวลารอของโดยประมาณนับแต่สั่งซื้อ
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              
              <div className="bg-[#12141A] p-3.5 rounded-xl border border-white/[0.08]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#F4F4F2] font-heading">โซนตะวันตก</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/us.png" alt="US" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/eu.png" alt="EU" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/gb.png" alt="GB" className="w-4 h-2.5 rounded-xs object-cover" />
                  </div>
                </div>
                <span className="text-[#60646E] block text-[11px] mb-1">อเมริกา, ยุโรป, อังกฤษ</span>
                <span className="text-[#F4F4F2] font-semibold text-xs font-mono">20-30 วัน</span>
              </div>

              <div className="bg-[#12141A] p-3.5 rounded-xl border border-white/[0.08]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#F4F4F2] font-heading">โซนเอเชีย</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/jp.png" alt="JP" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/kr.png" alt="KR" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/hk.png" alt="HK" className="w-4 h-2.5 rounded-xs object-cover" />
                  </div>
                </div>
                <span className="text-[#60646E] block text-[11px] mb-1">ญี่ปุ่น, เกาหลี, ฮ่องกง</span>
                <span className="text-[#F4F4F2] font-semibold text-xs font-mono">10-20 วัน</span>
              </div>

              <div className="bg-[#12141A] p-3.5 rounded-xl border border-white/[0.08]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#F4F4F2] font-heading">โซนเอเชียใต้</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/sg.png" alt="SG" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/my.png" alt="MY" className="w-4 h-2.5 rounded-xs object-cover" />
                  </div>
                </div>
                <span className="text-[#60646E] block text-[11px] mb-1">สิงคโปร์, มาเลเซีย</span>
                <span className="text-[#F4F4F2] font-semibold text-xs font-mono">7-14 วัน</span>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Testimonial + Featured Deal Preview */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Top Testimonial Quote */}
          {selectedTestimonial && (
            <div className="bg-[#12141A] border border-white/[0.08] p-5 rounded-2xl shadow-lg text-left flex flex-col justify-between font-sans">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(selectedTestimonial.stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-[#60646E] flex-shrink-0" />
                </div>
                <p className="text-xs md:text-sm text-[#9B9FA8] leading-relaxed font-normal mb-4 font-sans">
                  "{selectedTestimonial.comment}"
                </p>
              </div>
              <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] text-[#F4F4F2] flex items-center justify-center text-[10px] font-bold font-mono">
                    {selectedTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#F4F4F2] font-heading">
                      {selectedTestimonial.name}
                    </span>
                    <span className="block text-[10px] text-[#60646E] font-sans">
                      {selectedTestimonial.role}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#10B981] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED
                </span>
              </div>
            </div>
          )}

          {/* Featured Deal Card */}
          {loadingDeal ? (
            <div className="w-full aspect-[4/3] border border-white/[0.08] rounded-2xl flex items-center justify-center text-[#60646E] text-xs bg-[#12141A] font-sans">
              กำลังโหลดข้อมูลดีลล่าสุด...
            </div>
          ) : latestDeal ? (
            <div className="bg-[#12141A] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
              
              {/* Product Poster Block */}
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-[#090A0C]">
                {latestDeal.img_url ? (
                  <img
                    src={latestDeal.img_url}
                    alt={latestDeal.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#60646E] text-xs">
                    ไม่มีรูปภาพ
                  </div>
                )}
                
                {/* Deal Tag */}
                <div className="absolute top-3 left-3 bg-[#090A0C]/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/[0.1] text-[10px] font-semibold tracking-wider text-[#F4F4F2] uppercase font-heading">
                  FEATURED DEAL
                </div>

                <div className="absolute top-3 right-3 bg-[#10B981] px-2.5 py-1 rounded-sm text-[11px] font-bold text-black font-mono">
                  {formatPriceString(latestDeal.deal_price)}
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/70 to-transparent p-4 pt-10 text-left">
                  <div className="text-[#F4F4F2] text-sm font-semibold tracking-wide font-sans mb-0.5 line-clamp-1">
                    {latestDeal.title}
                  </div>
                  {latestDeal.description && (
                    <p className="text-[#9B9FA8] text-[11px] font-normal leading-relaxed line-clamp-1">
                      {latestDeal.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Deal Meta */}
              <div className="p-4 space-y-2 text-left">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-[#60646E]">ไซส์ที่มี:</span>
                  <span className="text-[#F4F4F2] font-medium">{latestDeal.sizes || 'Free Size'}</span>
                </div>
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-[#60646E]">ระยะเวลาจัดส่ง:</span>
                  <span className="text-[#F4F4F2] font-mono">{latestDeal.shipping_time || '20-30 วัน'}</span>
                </div>
                {latestDeal.original_price && (
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#60646E]">ราคาปกติ:</span>
                    <span className="text-[#60646E] line-through font-mono">{latestDeal.original_price}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => handleOrderDeal(latestDeal)}
                  className="flex-1 h-10 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading tracking-wider uppercase tactile-btn"
                >
                  <span>ฝากสั่งซื้อทันที</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                {getSizeChartUrl(latestDeal) && (
                  <button
                    onClick={() => setSizeChartModalUrl(getSizeChartUrl(latestDeal))}
                    className="px-3.5 h-10 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#F4F4F2] text-xs font-medium rounded-xl transition-all cursor-pointer font-heading tactile-btn"
                  >
                    ตารางไซส์
                  </button>
                )}
                {latestDeal.affiliate_url && (
                  <a
                    href={latestDeal.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 h-10 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#9B9FA8] hover:text-[#F4F4F2] text-xs font-medium rounded-xl flex items-center justify-center transition-all tactile-btn"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          ) : (
            <div className="w-full aspect-[4/3] border border-white/[0.08] rounded-2xl flex items-center justify-center text-[#60646E] text-xs bg-[#12141A] font-sans">
              ไม่มีดีลลดราคาแสดงในขณะนี้
            </div>
          )}

        </div>

      </div>

      {/* Pricing Checker Modal */}
      {showModal && (
        <div 
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#12141A] border border-white/[0.12] p-6 rounded-2xl shadow-2xl relative text-left font-sans text-[#F4F4F2]"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#60646E] hover:text-[#F4F4F2] p-1 transition-colors"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-4 h-4" />
            </button>

            {step === 1 ? (
              <form onSubmit={handleConfirmInquiry} className="space-y-4">
                <div>
                  <span className="text-[10px] text-[#10B981] font-mono uppercase tracking-widest block mb-1">
                    STEP 1 / SOURCING INQUIRY
                  </span>
                  <h3 className="text-base font-bold text-[#F4F4F2] font-heading">
                    ระบุช่องทางติดต่อกลับ
                  </h3>
                </div>
                
                <p className="text-xs text-[#9B9FA8] leading-relaxed">
                  เพื่อให้แอดมินแจ้งราคาสุทธิและสรุปค่าบริการนำเข้า กรุณากรอกช่องทางที่คุณสะดวกติดต่อครับ
                </p>
                
                <input
                  type="text"
                  placeholder="LINE ID, เบอร์โทรศัพท์ หรือ Facebook"
                  value={contactInfo}
                  onChange={(e) => {
                    setContactInfo(e.target.value);
                    setModalError('');
                  }}
                  className="w-full h-12 bg-[#090A0C] border border-white/[0.12] text-[#F4F4F2] rounded-xl px-4 text-sm focus:border-[#10B981] outline-none placeholder:text-[#60646E] font-medium font-sans"
                  required
                />

                {modalError && (
                  <p className="text-xs text-[#EF4444] font-medium">{modalError}</p>
                )}

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 h-11 border border-white/[0.1] hover:bg-white/[0.05] text-[#9B9FA8] text-xs font-semibold rounded-xl transition-all cursor-pointer font-heading tactile-btn"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 h-11 bg-[#F4F4F2] hover:bg-white text-[#090A0C] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading tracking-wider uppercase tactile-btn"
                  >
                    {submitting ? 'กำลังบันทึก...' : 'ส่งข้อมูลประเมินราคา'}
                  </button>
                </div>
              </form>
            ) : step === 2 ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-[#10B981] font-mono uppercase tracking-widest block mb-1">
                    STEP 2 / CONFIRMATION
                  </span>
                  <h3 className="text-base font-bold text-[#F4F4F2] flex items-center gap-2 font-heading">
                    <Check className="w-5 h-5 text-[#10B981]" />
                    ส่งข้อมูลเรียบร้อยแล้ว
                  </h3>
                </div>

                <p className="text-xs text-[#9B9FA8] leading-relaxed">
                  ระบบได้บันทึกและคัดลอกข้อความสรุปลงคลิปบอร์ดแล้ว คุณสามารถกดทักแชทคุยกับแอดมินเพื่อเช็คราคาได้ทันทีครับ
                </p>

                {/* Inquiry Summary Block */}
                <div className="bg-[#090A0C] border border-white/[0.08] p-4 rounded-xl text-xs text-[#9B9FA8] break-all space-y-2 font-sans">
                  <div>
                    <span className="text-[#60646E] block font-medium mb-0.5">ลิงก์สินค้า:</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#F4F4F2] underline break-all font-mono block">
                      {url.length > 50 ? url.substring(0, 50) + '...' : url}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#60646E] block font-medium mb-0.5">ช่องทางติดต่อกลับ:</span>
                    <span className="text-[#F4F4F2] font-semibold">{contactInfo}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-11 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading tracking-wider uppercase tactile-btn"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ทักสอบถามทาง LINE OA (@hij2541a)
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-11 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#F4F4F2] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wider uppercase tactile-btn"
                  >
                    <Send className="w-4 h-4 text-[#9B9FA8]" />
                    ทักสอบถามทาง FB Messenger
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-[#10B981] font-mono uppercase tracking-widest block mb-1">
                    ORDER DEAL / CONFIRMATION
                  </span>
                  <h3 className="text-base font-bold text-[#F4F4F2] flex items-center gap-2 font-heading">
                    <Check className="w-5 h-5 text-[#10B981]" />
                    คัดลอกรายละเอียดดีลสำเร็จ
                  </h3>
                </div>

                <p className="text-xs text-[#9B9FA8] leading-relaxed">
                  ระบบได้คัดลอกข้อมูลดีลส่วนลดนี้ลงคลิปบอร์ดแล้ว ทักแชทแอดมินเพื่อแจ้งสั่งซื้อได้ทันทีครับ
                </p>

                <div className="bg-[#090A0C] border border-white/[0.08] p-4 rounded-xl text-xs space-y-1.5 font-sans">
                  <span className="text-[#60646E] block font-medium">รายการดีล:</span>
                  <div className="text-[#F4F4F2] font-semibold">{orderedDealTitle}</div>
                  <div className="text-[#10B981] font-mono font-bold">{orderedDealPrice}</div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-11 bg-[#10B981] hover:bg-[#059669] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading tracking-wider uppercase tactile-btn"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ส่งดีลสั่งซื้อทาง LINE OA
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-11 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#F4F4F2] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wider uppercase tactile-btn"
                  >
                    <Send className="w-4 h-4 text-[#9B9FA8]" />
                    ส่งดีลสั่งซื้อทาง Messenger
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brand Size Chart Modal */}
      {sizeChartModalUrl && (
        <div
          onClick={() => setSizeChartModalUrl(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
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
