'use client';

import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Send, Check, Terminal, Zap, ExternalLink, Star, Quote, Sparkles, Clipboard, Bot, Hash, ShieldCheck, ArrowRight } from 'lucide-react';
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

  // Discord-style Reactions State
  const [reactions, setReactions] = useState<{ fire: number; gem: number; heart: number }>({
    fire: 48,
    gem: 19,
    heart: 32,
  });
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({});

  const toggleReaction = (type: 'fire' | 'gem' | 'heart') => {
    setReactions((prev) => ({
      ...prev,
      [type]: userReacted[type] ? prev[type] - 1 : prev[type] + 1,
    }));
    setUserReacted((prev) => ({ ...prev, [type]: !prev[type] }));
  };

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
    <section className="relative w-full bg-[#0A0D3A] border-b border-[#5865F2]/20 text-[#F2F3F5] overflow-hidden">
      
      {/* Discord Ambient Animated Gradient Mesh Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5865F2]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#EC48BD]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-80 bg-[#23A55A]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* 2-Column Split Layout */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px] items-stretch relative z-10">
        
        {/* Left Column: Sourcing Terminal & Discord Copy */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-12 lg:border-r lg:border-[#5865F2]/20 relative bg-[#0E122B]/75 backdrop-blur-sm">
          
          <div className="mb-10">
            {/* Meta Tags - Discord Channel Tag style */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#949BA4] mb-6 font-heading flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#F2F3F5] font-black tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#5865F2]" />
                [ SOURCING // DISCORD HUB ]
              </span>
              <span className="text-white/20">✦</span>
              <span className="text-[#DBDEE1] uppercase tracking-wider text-[11px]">PREMIUM STREETWEAR & RARE ARCHIVES</span>
            </div>

            {/* Title with Kanit Discord Display Font */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F2F3F5] mb-4 font-heading leading-[1.15]">
              รับสั่ง รับกดสินค้า
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] via-[#00B0F4] to-[#35ED7E]">
                แบรนด์เนมทั่วโลก
              </span>
            </h1>

            {/* Sub-headline with Cross-Platform Friendly Flags in Discord Dark Cards */}
            <div className="max-w-xl text-sm md:text-base text-[#DBDEE1] leading-relaxed mb-8 font-normal font-sans">
              <span className="block mb-2 text-[#F2F3F5] font-semibold">
                สนีกเกอร์รุ่นลิมิเต็ด เสื้อผ้าสตรีทแวร์ และของสะสมหายากส่งตรงถึงหน้าบ้านคุณ:
              </span>
              <div className="flex flex-wrap items-center gap-2 mb-3 bg-[#1E2353]/60 p-2.5 rounded-2xl border border-[#5865F2]/25 shadow-lg w-fit">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0A0D3A]/60">
                  <img src="https://flagcdn.com/16x12/us.png" alt="US" className="w-4.5 h-3 rounded-xs object-cover" title="United States" />
                  <span className="text-[10px] font-black text-[#F2F3F5] font-heading">US</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0A0D3A]/60">
                  <img src="https://flagcdn.com/16x12/jp.png" alt="JP" className="w-4.5 h-3 rounded-xs object-cover" title="Japan" />
                  <span className="text-[10px] font-black text-[#F2F3F5] font-heading">JP</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0A0D3A]/60">
                  <img src="https://flagcdn.com/16x12/gb.png" alt="UK" className="w-4.5 h-3 rounded-xs object-cover" title="United Kingdom" />
                  <span className="text-[10px] font-black text-[#F2F3F5] font-heading">UK</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0A0D3A]/60">
                  <img src="https://flagcdn.com/16x12/eu.png" alt="EU" className="w-4.5 h-3 rounded-xs object-cover" title="Europe" />
                  <span className="text-[10px] font-black text-[#F2F3F5] font-heading">EU</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0A0D3A]/60">
                  <img src="https://flagcdn.com/16x12/kr.png" alt="KR" className="w-4.5 h-3 rounded-xs object-cover" title="South Korea" />
                  <span className="text-[10px] font-black text-[#F2F3F5] font-heading">KR</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0A0D3A]/60">
                  <img src="https://flagcdn.com/16x12/hk.png" alt="HK" className="w-4.5 h-3 rounded-xs object-cover" title="Hong Kong" />
                  <span className="text-[10px] font-black text-[#F2F3F5] font-heading">HK</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0A0D3A]/60">
                  <img src="https://flagcdn.com/16x12/sg.png" alt="SG" className="w-4.5 h-3 rounded-xs object-cover" title="Singapore" />
                  <span className="text-[10px] font-black text-[#F2F3F5] font-heading">SG</span>
                </div>
              </div>
              <p className="text-[#DBDEE1] leading-relaxed">
                ราคาเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้านคุณ ไม่มีเก็บเพิ่มภายหลัง ปลอดภัย มั่นใจได้ของแท้ 100%
              </p>
            </div>

            {/* Sourcing Price Checker Discord Terminal Card */}
            <div className="w-full max-w-xl bg-[#1E1F22] border border-[#5865F2]/35 rounded-2xl p-6 shadow-2xl relative overflow-hidden discord-embed-blurple">
              <div className="flex items-center justify-between border-b border-[#35373C] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded font-heading">
                    BOT
                  </span>
                  <Hash className="w-4 h-4 text-[#5865F2]" />
                  <span className="text-sm font-bold text-[#F2F3F5] font-heading tracking-wide">
                    เช็คราคาเหมาจ่ายฟรี (PRICE CHECKER)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#23A55A] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#23A55A] animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-[#949BA4] font-medium font-sans flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#5865F2]" />
                  <span>วางลิงก์สินค้าจากต่างประเทศเพื่อประเมินราคาเหมาจ่ายรวมส่งถึงบ้าน:</span>
                </p>

                <form onSubmit={handleCheckPrice} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        placeholder="วางลิงก์สินค้าที่นี่ (เช่น https://stockx.com/...)"
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value);
                          setError('');
                        }}
                        className="w-full h-12 bg-[#111214] border border-[#383A40] text-[#F2F3F5] rounded-xl px-4 text-sm focus:border-[#5865F2] focus:bg-[#111214] focus:ring-1 focus:ring-[#5865F2] outline-none transition-all placeholder:text-[#80848E] font-medium font-sans"
                      />
                      {url && (
                        <button
                          type="button"
                          onClick={() => setUrl('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#80848E] hover:text-white text-xs font-bold px-1.5 py-0.5 rounded cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="h-12 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-black rounded-xl flex items-center justify-center gap-1.5 transition-all flex-shrink-0 cursor-pointer font-heading tracking-wide shadow-md hover:shadow-[#5865F2]/30 active:scale-98"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#35ED7E]" /> : <Search className="w-4 h-4" />}
                      <span>{copied ? 'คัดลอกแล้ว' : 'ส่งเช็คราคา'}</span>
                    </button>
                  </div>
                </form>

                {error && (
                  <p className="text-xs text-[#ED4245] font-bold bg-[#ED4245]/10 p-2.5 rounded-lg border border-[#ED4245]/20 font-sans">
                    {error}
                  </p>
                )}

                <div className="text-[11px] text-[#949BA4] leading-relaxed border-t border-[#35373C] pt-3 font-medium font-sans">
                  💡 *ระบบจะคัดลอกข้อความสรุป เพื่อให้คุณส่งแชทปรึกษาแอดมินทาง LINE หรือ FB ได้ทันที สะดวกรวดเร็วที่สุดครับ
                </div>
              </div>
            </div>

          </div>

          {/* Operational Quick stats */}
          <div className="grid grid-cols-3 border-t border-[#5865F2]/20 pt-8 gap-4">
            <div>
              <span className="block text-xs text-[#949BA4] font-bold tracking-wider font-heading uppercase">รับประกันสินค้า</span>
              <span className="block text-sm md:text-base font-bold text-[#F2F3F5] mt-1 font-heading">ของแท้ 100%</span>
            </div>
            <div>
              <span className="block text-xs text-[#949BA4] font-bold tracking-wider font-heading uppercase">ระยะเวลาโดยประมาณ</span>
              <span className="block text-sm md:text-base font-bold text-[#F2F3F5] mt-1 font-heading">ตามรอบประเทศ</span>
            </div>
            <div>
              <span className="block text-xs text-[#949BA4] font-bold tracking-wider font-heading uppercase">ราคาบริการ</span>
              <span className="block text-sm md:text-base font-bold text-[#35ED7E] mt-1 font-heading">เหมาจ่ายเบ็ดเสร็จ</span>
            </div>
          </div>

          {/* Detailed wait times per region in Discord Ping Server Cards */}
          <div className="mt-8 border-t border-[#5865F2]/20 pt-6 text-left">
            <span className="block text-xs md:text-sm font-bold text-[#DBDEE1] uppercase tracking-wider mb-3 font-heading flex items-center gap-1.5">
              ✈️ ระยะเวลารอของโดยประมาณนับแต่สั่งให้ (REGIONAL HUBS)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm font-medium font-sans">
              
              <div className="bg-[#1E2353]/60 p-3.5 rounded-2xl border border-[#5865F2]/20 shadow-md hover:border-[#5865F2]/50 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#F2F3F5] block font-heading">โซนตะวันตก</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/us.png" alt="US" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/eu.png" alt="EU" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/gb.png" alt="GB" className="w-4 h-2.5 rounded-xs object-cover" />
                  </div>
                </div>
                <span className="text-[#949BA4] font-medium block text-[11px] mb-1 leading-snug">อเมริกา, ยุโรป, อังกฤษ</span>
                <span className="text-[#35ED7E] font-black text-sm block font-heading">20-30 วัน</span>
              </div>

              <div className="bg-[#1E2353]/60 p-3.5 rounded-2xl border border-[#5865F2]/20 shadow-md hover:border-[#5865F2]/50 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#F2F3F5] block font-heading">โซนเอเชีย</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/jp.png" alt="JP" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/kr.png" alt="KR" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/cn.png" alt="CN" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/hk.png" alt="HK" className="w-4 h-2.5 rounded-xs object-cover" />
                  </div>
                </div>
                <span className="text-[#949BA4] font-medium block text-[11px] mb-1 leading-snug">ญี่ปุ่น, เกาหลี, จีน, ฮ่องกง</span>
                <span className="text-[#35ED7E] font-black text-sm block font-heading">10-20 วัน</span>
              </div>

              <div className="bg-[#1E2353]/60 p-3.5 rounded-2xl border border-[#5865F2]/20 shadow-md hover:border-[#5865F2]/50 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#F2F3F5] block font-heading">โซนเอเชียใต้</span>
                  <div className="flex items-center gap-1">
                    <img src="https://flagcdn.com/16x12/sg.png" alt="SG" className="w-4 h-2.5 rounded-xs object-cover" />
                    <img src="https://flagcdn.com/16x12/my.png" alt="MY" className="w-4 h-2.5 rounded-xs object-cover" />
                  </div>
                </div>
                <span className="text-[#949BA4] font-medium block text-[11px] mb-1 leading-snug">สิงคโปร์, มาเลเซีย</span>
                <span className="text-[#35ED7E] font-black text-sm block font-heading">7-14 วัน</span>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Testimonial + Banners + Latest Live Deal Card */}
        <div className="lg:col-span-5 flex flex-col justify-center bg-[#0B0E24]/85 border-t border-[#5865F2]/20 lg:border-t-0 p-4 md:p-8 gap-4">
          
          {/* Top Testimonial Quote - Discord Chat Bubble format */}
          {selectedTestimonial && (
            <div className="bg-[#1E2353]/70 border border-[#5865F2]/30 p-5 rounded-3xl shadow-xl text-left flex flex-col justify-between font-sans">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(selectedTestimonial.stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FEE75C] text-[#FEE75C]" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-[#5865F2]/60 flex-shrink-0" />
                </div>
                <p className="text-xs md:text-sm text-[#DBDEE1] leading-relaxed font-medium mb-4 font-sans">
                  "{selectedTestimonial.comment}"
                </p>
              </div>
              <div className="border-t border-[#5865F2]/20 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-[10px] font-bold">
                    {selectedTestimonial.name.charAt(0)}
                  </div>
                  <span className="block text-xs font-bold text-[#F2F3F5] font-heading">
                    {selectedTestimonial.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#35ED7E] font-bold uppercase tracking-wider bg-[#23A55A]/15 px-2.5 py-0.5 rounded-lg border border-[#23A55A]/30 font-heading">
                  @VERIFIED CLIENT
                </span>
              </div>
            </div>
          )}

          {/* Top Discord feature tags */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1E2353]/50 border border-[#5865F2]/20 p-3 rounded-2xl text-xs font-bold text-[#DBDEE1] shadow-md flex items-center justify-center gap-1.5 font-heading">
              <span>✈️ รับสั่ง รับกดสินค้า</span>
            </div>
            <div className="bg-[#1E2353]/50 border border-[#5865F2]/20 p-3 rounded-2xl text-xs font-bold text-[#DBDEE1] shadow-md flex items-center justify-center gap-1.5 font-heading">
              <span>📦 ส่งตรงถึงหน้าบ้านคุณ</span>
            </div>
          </div>

          {/* Live active deal display card - Discord Rich Embed */}
          {loadingDeal ? (
            <div className="w-full aspect-[4/3] bg-white/5 animate-pulse rounded-3xl" />
          ) : latestDeal ? (
            <div className="w-full bg-[#1E1F22] border border-[#5865F2]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all discord-embed-blurple">
              
              {/* Product Poster Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111214] flex-shrink-0">
                {latestDeal.img_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={latestDeal.img_url} 
                    alt={latestDeal.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#111214] flex items-center justify-center text-[#80848E] text-xs">
                    ไม่มีรูปภาพประกอบ
                  </div>
                )}

                {/* Badge top-left - Discord Nitro Magenta */}
                <div className="absolute top-3 left-3 bg-[#EC48BD] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-lg z-10 flex items-center gap-1 font-heading">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  🔥 ดีลล่าสุดแนะนำ
                </div>

                {/* Large price badge top-right */}
                <div className="absolute top-3 right-3 bg-[#111214]/90 backdrop-blur-md text-[#F2F3F5] px-3.5 py-1.5 rounded-2xl shadow-2xl z-10 flex flex-col items-center justify-center font-heading border border-[#5865F2]/40">
                  <span className="text-[9px] text-[#949BA4] font-bold uppercase tracking-wider -mb-0.5 font-heading">NET PRICE</span>
                  <span className="text-lg font-black tracking-tight text-[#35ED7E]">{formatPriceString(latestDeal.deal_price)}</span>
                </div>

                {/* Bottom title text overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#111214] via-[#111214]/85 to-transparent p-4 pt-12 text-left">
                  <div className="text-[#F2F3F5] text-sm font-bold tracking-wide font-sans mb-1 leading-snug line-clamp-1">
                    {latestDeal.title}
                  </div>
                  {latestDeal.description && (
                    <p className="text-[#DBDEE1]/80 text-[11px] font-medium leading-relaxed font-sans line-clamp-1 mb-0.5">
                      {latestDeal.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Sizes and info display details block */}
              <div className="p-4 bg-[#1E1F22] text-left space-y-2 flex-grow">
                <div className="text-[11px] text-[#DBDEE1] font-normal leading-relaxed font-sans">
                  <span className="text-[#949BA4] font-medium flex-shrink-0 font-sans">ไซส์ที่มี:</span>{' '}
                  <span className="text-[#F2F3F5] font-bold font-sans">{latestDeal.sizes || 'Free Size / One Size'}</span>
                </div>
                <div className="text-[11px] text-[#DBDEE1] font-normal leading-relaxed font-sans">
                  <span className="text-[#949BA4] font-medium flex-shrink-0 font-sans">การส่ง:</span>{' '}
                  <span className="text-[#35ED7E] font-bold font-sans">{latestDeal.shipping_time || '✈️ พรีออเดอร์ 20-30 วัน'}</span>
                </div>
                {latestDeal.original_price && (
                  <div className="text-[11px] text-[#949BA4] font-normal leading-relaxed font-sans flex items-baseline gap-1.5">
                    <span className="text-[#80848E] font-medium flex-shrink-0 font-sans">ราคาปกติ:</span>
                    <span className="text-[#80848E] line-through font-medium font-sans">{latestDeal.original_price}</span>
                  </div>
                )}
                <p className="text-[10px] text-[#80848E] font-medium leading-relaxed font-sans border-t border-[#35373C] pt-2 mt-1">
                  *ราคาเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้าน ไม่มีเก็บเงินเพิ่มภายหลัง
                </p>
              </div>

              {/* Discord Interactive Community Reaction Pills */}
              <div className="px-4 py-2 bg-[#17181B] border-t border-[#35373C] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleReaction('fire')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    userReacted.fire
                      ? 'bg-[#5865F2]/30 border border-[#5865F2] text-[#F2F3F5]'
                      : 'bg-[#2B2D31] hover:bg-[#35373C] text-[#DBDEE1]'
                  }`}
                  title="React with Fire"
                >
                  <span>🔥</span>
                  <span>{reactions.fire}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleReaction('gem')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    userReacted.gem
                      ? 'bg-[#5865F2]/30 border border-[#5865F2] text-[#F2F3F5]'
                      : 'bg-[#2B2D31] hover:bg-[#35373C] text-[#DBDEE1]'
                  }`}
                  title="React with Gem"
                >
                  <span>💎</span>
                  <span>{reactions.gem}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleReaction('heart')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    userReacted.heart
                      ? 'bg-[#5865F2]/30 border border-[#5865F2] text-[#F2F3F5]'
                      : 'bg-[#2B2D31] hover:bg-[#35373C] text-[#DBDEE1]'
                  }`}
                  title="React with Heart"
                >
                  <span>❤️</span>
                  <span>{reactions.heart}</span>
                </button>
              </div>

              {/* Action Buttons - Electric Green Primary */}
              <div className="p-4 pt-2 flex flex-col gap-1.5 bg-[#1E1F22] rounded-b-3xl">
                <button
                  onClick={() => handleOrderDeal(latestDeal)}
                  className="w-full h-12 bg-[#23A55A] hover:bg-[#1F924F] text-white text-sm font-black rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg hover:shadow-[#23A55A]/25 cursor-pointer font-heading tracking-wider uppercase active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-white text-white" />
                  ฝากสั่งซื้อด่วน
                </button>
                
                {(latestDeal.affiliate_url || getSizeChartUrl(latestDeal)) && (
                  <div className="flex gap-1.5 w-full">
                    {getSizeChartUrl(latestDeal) && (
                      <button
                        onClick={() => setSizeChartModalUrl(getSizeChartUrl(latestDeal))}
                        className="flex-grow h-9 bg-[#FEE75C] hover:bg-[#E3CE52] text-[#060607] rounded-xl text-[10px] font-black flex items-center justify-center transition-all cursor-pointer font-heading tracking-wider uppercase"
                      >
                        ตารางไซส์
                      </button>
                    )}
                    {latestDeal.affiliate_url && (
                      <a
                        href={latestDeal.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow h-9 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl text-[10px] font-bold flex items-center justify-center transition-all shadow-sm font-heading"
                      >
                        ดูโพสต์เดิม <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="w-full aspect-[4/3] border border-dashed border-[#5865F2]/20 rounded-3xl flex items-center justify-center text-[#80848E] text-sm bg-[#1E1F22] font-sans">
              ไม่มีดีลลดราคาแสดงในขณะนี้
            </div>
          )}

        </div>

      </div>

      {/* Pricing Checker Discord Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#1E1F22] border border-[#5865F2]/40 p-6 rounded-3xl shadow-2xl relative text-left font-sans text-[#F2F3F5]">
            
            {step === 1 ? (
              <form onSubmit={handleConfirmInquiry} className="space-y-4">
                <h3 className="text-base font-bold text-[#F2F3F5] flex items-center gap-2 font-heading">
                  <Terminal className="w-5 h-5 text-[#5865F2]" />
                  กรอกช่องทางติดต่อที่สะดวก (LINE หรือ FB)
                </h3>
                <p className="text-xs text-[#DBDEE1] leading-relaxed font-medium">
                  เพื่อให้แอดมินติดต่อกลับแจ้งราคาสุทธิและสรุปค่าบริการนำเข้า กรุณากรอกช่องทางที่คุณสะดวกติดต่อที่สุดครับ:
                </p>
                
                <input
                  type="text"
                  placeholder="เช่น LINE ID: somchai123 หรือ FB: สมชาย ใจดี"
                  value={contactInfo}
                  onChange={(e) => {
                    setContactInfo(e.target.value);
                    setModalError('');
                  }}
                  className="w-full h-12 bg-[#111214] border border-[#383A40] text-[#F2F3F5] rounded-xl px-4 text-sm focus:border-[#5865F2] outline-none placeholder:text-[#80848E] font-medium font-sans"
                  required
                />

                {modalError && (
                  <p className="text-xs text-[#ED4245] font-bold">{modalError}</p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 h-12 border border-[#383A40] hover:bg-white/5 text-[#949BA4] text-sm font-bold rounded-xl transition-all cursor-pointer font-heading"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-black rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading tracking-wider"
                  >
                    {submitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันส่งข้อมูล'}
                  </button>
                </div>
              </form>
            ) : step === 2 ? (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#F2F3F5] flex items-center gap-2 font-heading">
                  <Check className="w-5 h-5 text-[#23A55A]" />
                  ส่งข้อมูลตรวจราคาเรียบร้อยแล้ว!
                </h3>
                <p className="text-xs text-[#DBDEE1] leading-relaxed font-medium">
                  ระบบได้บันทึกการเช็คราคาและคัดลอกข้อความสรุปลงคลิปบอร์ดของคุณแล้ว แอดมินจะรีบตรวจสอบสินค้าและติดต่อกลับโดยเร็วที่สุดครับ:
                </p>

                {/* Inquiry Summary Block */}
                <div className="bg-[#111214] border border-[#383A40] p-4 rounded-2xl text-xs text-[#DBDEE1] break-all space-y-2 font-sans font-medium">
                  <div>
                    <span className="text-[#949BA4] block font-semibold mb-0.5 font-sans">ลิงก์สินค้าที่ถาม:</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#00B0F4] underline break-all font-mono font-medium block">
                      {url.length > 50 ? url.substring(0, 50) + '...' : url}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#949BA4] block font-semibold mb-0.5 font-sans">ช่องทางติดต่อกลับของคุณ:</span>
                    <span className="text-[#F2F3F5] font-bold font-sans">{contactInfo}</span>
                  </div>
                </div>

                <div className="text-xs text-[#DBDEE1] leading-relaxed font-medium border-t border-[#35373C] pt-3">
                  💬 <span className="font-bold text-[#F2F3F5]">แนะนำส่งต่อให้แอดมินทันที:</span> กดปุ่ม LINE OA หรือ Facebook Messenger ด้านล่างเพื่อส่งข้อความแชทคุยราคาได้ทันทีครับ!
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#23A55A] hover:bg-[#1F924F] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ทักถามทาง LINE OA
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    ทักถามทาง FB Messenger
                  </a>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full text-center text-xs font-semibold text-[#949BA4] hover:text-[#F2F3F5] transition-colors mt-4 py-1 uppercase tracking-wider font-heading cursor-pointer"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#F2F3F5] flex items-center gap-2 font-heading">
                  <Check className="w-5 h-5 text-[#23A55A]" />
                  คัดลอกรายละเอียดดีลสำเร็จ!
                </h3>
                <p className="text-xs text-[#DBDEE1] leading-relaxed font-medium">
                  ระบบได้คัดลอกรายละเอียดข้อมูลดีลส่วนลดนี้ลงคลิปบอร์ดของคุณแล้ว กรุณาทักคุยกับแอดมินเพื่อยืนยันขนาดไซส์และแจ้งความประสงค์สั่งซื้อได้เลยครับ:
                </p>

                {/* Deal Order Summary Block */}
                <div className="bg-[#111214] border border-[#383A40] p-4 rounded-2xl text-xs text-[#DBDEE1] break-all space-y-2 font-sans font-medium">
                  <div>
                    <span className="text-[#949BA4] block font-semibold mb-0.5 font-sans">สินค้าดีลที่เลือก:</span>
                    <span className="text-[#F2F3F5] font-bold block">{orderedDealTitle}</span>
                  </div>
                  <div>
                    <span className="text-[#949BA4] block font-semibold mb-0.5 font-sans">ราคาสุทธิ:</span>
                    <span className="text-[#35ED7E] font-black text-sm block">{formatPriceString(orderedDealPrice)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#23A55A] hover:bg-[#1F924F] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ส่งดีลสั่งซื้อทาง LINE OA
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-heading tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    ส่งดีลสั่งซื้อทาง FB Messenger
                  </a>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full text-center text-xs font-semibold text-[#949BA4] hover:text-[#F2F3F5] transition-colors mt-4 py-1 uppercase tracking-wider font-heading cursor-pointer"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Brand Size Chart Full-Screen Lightbox Modal */}
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
