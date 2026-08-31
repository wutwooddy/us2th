'use client';

import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Send, Check, Terminal, Zap, ExternalLink, Star, Quote } from 'lucide-react';
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
      setError('[ERROR: LINK_FIELD_EMPTY] กรุณาป้อนลิงก์สินค้า');
      return;
    }
    
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(url.trim()) && !url.includes('.')) {
      setError('[ERROR: INVALID_URL_FORMAT] รูปแบบลิงก์ไม่ถูกต้อง');
      return;
    }

    setError('');
    setStep(1); // Start modal at contact entry step
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
    setStep(2); // Go to success summary screen
  };

  const handleOrderDeal = (deal: Promotion) => {
    const text = `สวัสดีครับ สนใจสั่งซื้อสินค้าดีลโปรโมชั่นนี้ครับ:\n\n${deal.title}\nราคาพิเศษ: ${deal.deal_price}\n${deal.sizes ? `ไซส์: ${deal.sizes}\n` : ''}${deal.shipping_time ? `ระยะเวลาจัดส่ง: ${deal.shipping_time}\n` : ''}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        setOrderedDealTitle(deal.title);
        setOrderedDealPrice(deal.deal_price);
        setStep(3); // Go to deal order success summary
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
    <section className="relative w-full bg-white border-b border-slate-100">
      
      {/* 2-Column Split Layout */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[600px] items-stretch">
        
        {/* Left Column: Sourcing Terminal & Copy */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-12 lg:border-r lg:border-slate-100 relative bg-slate-50/20">
          
          <div className="mb-10">
            {/* Meta Tags */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
              <span>[ บริการจัดหาและสั่งกด ]</span>
              <span>✦</span>
              <span className="text-brand-blue font-heading">SNEAKERS & STREETWEAR SOURCING</span>
            </div>

            {/* Title with Prompt */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-heading">
              รับสั่ง รับกดสินค้า
            </h1>

            {/* Sub-headline with Cross-Platform Friendly Flags */}
            <div className="max-w-lg text-sm md:text-base text-slate-600 leading-relaxed mb-8 font-semibold">
              <span className="block mb-2">รองเท้าสนีกเกอร์ เสื้อผ้าสตรีทแวร์ และของสะสมหายากจากทุกมุมโลก:</span>
              <div className="flex flex-wrap items-center gap-2 mb-3 bg-white p-2.5 rounded-2xl border border-slate-200/60 shadow-xs w-fit">
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/16x12/us.png" alt="US" className="w-4.5 h-3 rounded-xs object-cover border border-slate-200" title="United States" />
                  <span className="text-[10px] font-black text-slate-400 font-heading">US</span>
                </div>
                <span className="text-slate-200">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/16x12/jp.png" alt="JP" className="w-4.5 h-3 rounded-xs object-cover border border-slate-200" title="Japan" />
                  <span className="text-[10px] font-black text-slate-400 font-heading">JP</span>
                </div>
                <span className="text-slate-200">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/16x12/gb.png" alt="UK" className="w-4.5 h-3 rounded-xs object-cover border border-slate-200" title="United Kingdom" />
                  <span className="text-[10px] font-black text-slate-400 font-heading">UK</span>
                </div>
                <span className="text-slate-200">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/16x12/eu.png" alt="EU" className="w-4.5 h-3 rounded-xs object-cover border border-slate-200" title="Europe" />
                  <span className="text-[10px] font-black text-slate-400 font-heading">EU</span>
                </div>
                <span className="text-slate-200">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/16x12/kr.png" alt="KR" className="w-4.5 h-3 rounded-xs object-cover border border-slate-200" title="South Korea" />
                  <span className="text-[10px] font-black text-slate-400 font-heading">KR</span>
                </div>
                <span className="text-slate-200">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/16x12/hk.png" alt="HK" className="w-4.5 h-3 rounded-xs object-cover border border-slate-200" title="Hong Kong" />
                  <span className="text-[10px] font-black text-slate-400 font-heading">HK</span>
                </div>
                <span className="text-slate-200">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/16x12/sg.png" alt="SG" className="w-4.5 h-3 rounded-xs object-cover border border-slate-200" title="Singapore" />
                  <span className="text-[10px] font-black text-slate-400 font-heading">SG</span>
                </div>
              </div>
              <p className="leading-relaxed">
                ราคาเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้านคุณ ไม่มีเก็บเพิ่มภายหลัง ปลอดภัย มั่นใจได้ของแท้ 100%
              </p>
            </div>

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
                  วางลิงก์สินค้าจากเว็บต่างประเทศด้านล่างเพื่อประเมินราคาเหมาจ่าย
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
              <span className="block text-xs text-slate-400 font-bold tracking-wider">รับประกันสินค้า</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">ของแท้ 100%</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold tracking-wider">ระยะเวลาโดยประมาณ</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">ตามรอบประเทศ</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold tracking-wider">ราคาบริการ</span>
              <span className="block text-sm md:text-base font-bold text-slate-800 mt-1 font-heading">เหมาจ่ายเบ็ดเสร็จ</span>
            </div>
          </div>

          {/* Detailed wait times per region with Cross-Platform CDN flags */}
          <div className="mt-8 border-t border-slate-100 pt-6 text-left">
            <span className="block text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
              ✈️ ระยะเวลารอของโดยประมาณนับแต่สั่งให้
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm font-semibold leading-relaxed font-sans">
              
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-extrabold text-slate-900 block font-sans">ตะวันตก</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/us.png" alt="US" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                    <img src="https://flagcdn.com/16x12/eu.png" alt="EU" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                    <img src="https://flagcdn.com/16x12/gb.png" alt="GB" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                  </div>
                </div>
                <span className="text-slate-500 font-semibold block text-[11px] mb-1 leading-snug">อเมริกา, ยุโรป, อังกฤษ</span>
                <span className="text-brand-blue font-black text-sm block">20-30 วัน</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-extrabold text-slate-900 block font-sans">เอเชีย</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/jp.png" alt="JP" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                    <img src="https://flagcdn.com/16x12/kr.png" alt="KR" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                    <img src="https://flagcdn.com/16x12/cn.png" alt="CN" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                    <img src="https://flagcdn.com/16x12/hk.png" alt="HK" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                  </div>
                </div>
                <span className="text-slate-500 font-semibold block text-[11px] mb-1 leading-snug">ญี่ปุ่น, เกาหลี, จีน, ฮ่องกง</span>
                <span className="text-brand-blue font-black text-sm block">10-20 วัน</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-extrabold text-slate-900 block font-sans">เอเชียใต้</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/sg.png" alt="SG" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                    <img src="https://flagcdn.com/16x12/my.png" alt="MY" className="w-4.5 h-3 rounded-xs object-cover border border-slate-100" />
                  </div>
                </div>
                <span className="text-slate-500 font-semibold block text-[11px] mb-1 leading-snug">สิงคโปร์, มาเลเซีย</span>
                <span className="text-brand-blue font-black text-sm block">7-14 วัน</span>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Testimonial + Banners + Latest Live Deal Card */}
        <div className="lg:col-span-5 flex flex-col justify-center bg-slate-50 border-t border-slate-100 lg:border-t-0 p-4 md:p-8 gap-4">
          
          {/* Top Testimonial Quote display (Deduplicated, Client Role Omitted) */}
          {selectedTestimonial && (
            <div className="bg-white border border-slate-200/60 p-5 rounded-3xl shadow-xs text-left flex flex-col justify-between font-sans">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(selectedTestimonial.stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-200 flex-shrink-0" />
                </div>
                <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-semibold mb-4 font-sans">
                  "{selectedTestimonial.comment}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="block text-xs font-bold text-slate-800 font-heading">
                  {selectedTestimonial.name}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50 px-2.5 py-0.5 rounded-lg border border-slate-150">
                  รีวิวจริงจากลูกค้า
                </span>
              </div>
            </div>
          )}

          {/* Top white text badges banner tags */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-100 p-3 rounded-2xl text-xs font-bold text-slate-850 shadow-sm flex items-center justify-center gap-1.5 font-heading">
              <span>✈️ รับสั่ง รับกดสินค้า</span>
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded-2xl text-xs font-bold text-slate-850 shadow-sm flex items-center justify-center gap-1.5 font-heading">
              <span>📦 ส่งตรงถึงหน้าบ้านคุณ</span>
            </div>
          </div>

          {/* Live active deal display card */}
          {loadingDeal ? (
            <div className="w-full aspect-[4/3] bg-slate-200 animate-pulse rounded-3xl" />
          ) : latestDeal ? (
            <div className="w-full bg-white border border-slate-200/80 rounded-3xl shadow-md overflow-hidden flex flex-col transition-all">
              
              {/* Product Poster Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 flex-shrink-0">
                {latestDeal.img_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={latestDeal.img_url} 
                    alt={latestDeal.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                    ไม่มีรูปภาพประกอบ
                  </div>
                )}

                {/* Badge top-left */}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md z-10 flex items-center gap-1 font-heading">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  🔥 ดีลล่าสุดแนะนำ
                </div>

                {/* Large price badge top-right */}
                <div className="absolute top-3 right-3 bg-white text-brand-green border border-slate-100 px-3.5 py-1.5 rounded-2xl shadow-lg z-10 flex flex-col items-center justify-center font-heading">
                  <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider -mb-0.5 font-sans">THB PRICE</span>
                  <span className="text-lg font-black tracking-tight">{formatPriceString(latestDeal.deal_price)}</span>
                </div>

                {/* Bottom title text overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-4 pt-12 text-left">
                  <div className="text-white text-sm font-bold tracking-wide font-sans mb-1 leading-snug line-clamp-1">
                    {latestDeal.title}
                  </div>
                  {latestDeal.description && (
                    <p className="text-white/70 text-[11px] font-medium leading-relaxed font-sans line-clamp-1 mb-0.5">
                      {latestDeal.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Sizes and info display details block */}
              <div className="p-4 bg-white text-left space-y-2 flex-grow">
                <div className="text-[11px] text-slate-500 font-normal leading-relaxed font-sans">
                  <span className="text-slate-400 font-normal flex-shrink-0 font-sans">ไซส์ที่มี:</span>{' '}
                  <span className="text-slate-800 font-bold font-sans">{latestDeal.sizes || 'Free Size / One Size'}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-normal leading-relaxed font-sans">
                  <span className="text-slate-400 font-normal flex-shrink-0 font-sans">การส่ง:</span>{' '}
                  <span className="text-brand-blue font-bold font-sans">{latestDeal.shipping_time || '✈️ พรีออเดอร์ 20-30 วัน'}</span>
                </div>
                {latestDeal.original_price && (
                  <div className="text-[11px] text-slate-500 font-normal leading-relaxed font-sans flex items-baseline gap-1.5">
                    <span className="text-slate-400 font-normal flex-shrink-0 font-sans">ราคาปกติ:</span>
                    <span className="text-slate-550 line-through font-normal font-sans">{latestDeal.original_price}</span>
                  </div>
                )}
                <p className="text-[10px] text-slate-400 font-normal leading-relaxed font-sans border-t border-slate-100 pt-2 mt-1">
                  *ราคาเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้าน ไม่มีเก็บเงินเพิ่มภายหลัง
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex flex-col gap-1.5 bg-white rounded-b-3xl">
                <button
                  onClick={() => handleOrderDeal(latestDeal)}
                  className="w-full h-12 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-extrabold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer font-heading"
                >
                  <Zap className="w-3.5 h-3.5" />
                  ฝากสั่งซื้อด่วน
                </button>
                
                {(latestDeal.affiliate_url || getSizeChartUrl(latestDeal)) && (
                  <div className="flex gap-1.5 w-full">
                    {getSizeChartUrl(latestDeal) && (
                      <button
                        onClick={() => setSizeChartModalUrl(getSizeChartUrl(latestDeal))}
                        className="flex-grow h-9 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer font-heading"
                      >
                        ตารางไซส์
                      </button>
                    )}
                    {latestDeal.affiliate_url && (
                      <a
                        href={latestDeal.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow h-9 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl text-[10px] font-bold flex items-center justify-center transition-all shadow-sm font-heading"
                      >
                        ดูโพสต์เดิม <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="w-full aspect-[4/3] border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 text-sm bg-white font-sans">
              ไม่มีดีลลดราคาแสดงในขณะนี้
            </div>
          )}

        </div>

      </div>

      {/* Pricing Checker Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 p-6 rounded-2xl shadow-2xl relative text-left font-sans">
            
            {step === 1 ? (
              <form onSubmit={handleConfirmInquiry} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Terminal className="w-5 h-5 text-brand-blue" />
                  3. กรอกช่องทางติดต่อที่สะดวก (เช่น LINE ID หรือ Facebook)
                </h3>
                <p className="text-xs text-slate-500 leading-normal font-medium">
                  เพื่อให้แอดมินติดต่อกลับแจ้งราคาและสรุปค่าบริการนำเข้า กรุณากรอกช่องทางที่คุณสะดวกติดต่อที่สุดครับ:
                </p>
                
                <input
                  type="text"
                  placeholder="เช่น LINE ID: somchai123 หรือ FB: สมชาย ใจดี"
                  value={contactInfo}
                  onChange={(e) => {
                    setContactInfo(e.target.value);
                    setModalError('');
                  }}
                  className="w-full h-12 bg-slate-50/50 border border-slate-200 text-slate-800 rounded-xl px-4 text-sm focus:border-brand-blue outline-none placeholder:text-slate-400 font-medium font-sans"
                  required
                />

                {modalError && (
                  <p className="text-xs text-red-500 font-bold">{modalError}</p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 h-12 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-bold rounded-xl transition-all cursor-pointer font-heading"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 h-12 bg-slate-900 hover:bg-slate-850 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading"
                  >
                    {submitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันส่งข้อมูล'}
                  </button>
                </div>
              </form>
            ) : step === 2 ? (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Check className="w-5 h-5 text-emerald-500" />
                  ส่งข้อมูลตรวจราคาเรียบร้อยแล้ว!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  ระบบได้บันทึกการเช็คราคาและคัดลอกข้อความสรุปลงคลิปบอร์ดของคุณแล้ว แอดมินจะรีบตรวจสอบสินค้าและติดต่อกลับโดยเร็วที่สุดครับ:
                </p>

                {/* Inquiry Summary Block */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs text-slate-600 break-all space-y-2 font-sans font-medium">
                  <div>
                    <span className="text-slate-400 block font-semibold mb-0.5 font-sans">ลิงก์สินค้าที่ถาม:</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline break-all font-mono font-medium block">
                      {url.length > 50 ? url.substring(0, 50) + '...' : url}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-0.5 font-sans">ช่องทางติดต่อกลับของคุณ:</span>
                    <span className="text-slate-800 font-bold font-sans">{contactInfo}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed font-medium border-t border-slate-100 pt-3">
                  ⚠️ <span className="font-bold text-slate-800">แนะนำช่องทางติดต่อโดยตรง:</span> หากต้องการราคาสุทธิแบบรวดเร็วที่สุด สามารถกดปุ่ม LINE OA หรือ Facebook Messenger ด้านล่างเพื่อส่งข้อความแชทคุยกับแอดมินได้ทันทีครับ!
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ทักถามทาง LINE OA
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
                  >
                    <Send className="w-4 h-4" />
                    ทักถามทาง FB Messenger
                  </a>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors mt-4 py-1 uppercase tracking-wider font-heading"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Check className="w-5 h-5 text-emerald-500" />
                  คัดลอกรายละเอียดดีลสำเร็จ!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  ระบบได้คัดลอกรายละเอียดข้อมูลดีลส่วนลดนี้ลงคลิปบอร์ดของคุณแล้ว กรุณาทักคุยกับแอดมินเพื่อยืนยันขนาดไซส์และแจ้งความประสงค์สั่งซื้อได้เลยครับ:
                </p>

                {/* Deal Order Summary Block */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs text-slate-600 break-all space-y-2 font-sans font-medium">
                  <div>
                    <span className="text-slate-400 block font-semibold mb-0.5 font-sans">สินค้าดีลที่เลือก:</span>
                    <span className="text-slate-800 font-bold block">{orderedDealTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-0.5 font-sans">ราคาสุทธิ:</span>
                    <span className="text-brand-green font-black text-sm block">{formatPriceString(orderedDealPrice)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ส่งดีลสั่งซื้อทาง LINE OA
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-heading"
                  >
                    <Send className="w-4 h-4" />
                    ส่งดีลสั่งซื้อทาง FB Messenger
                  </a>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors mt-4 py-1 uppercase tracking-wider font-heading"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Brand Size Chart Modal */}
      {sizeChartModalUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 animate-fade-in">
          {/* Relative wrapper around the image to place close button in its top-right */}
          <div className="relative max-w-full max-h-screen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sizeChartModalUrl}
              alt="Brand Size Chart"
              className="max-w-full max-h-screen object-contain select-none rounded-2xl shadow-2xl bg-white"
            />
            <button
              onClick={() => setSizeChartModalUrl(null)}
              className="absolute top-4 right-4 z-50 bg-slate-950/85 hover:bg-slate-950 text-white text-xs font-black px-3.5 py-2 rounded-full shadow-lg border border-white/10 backdrop-blur-xs flex items-center gap-1 font-heading cursor-pointer"
            >
              ปิด [X]
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
