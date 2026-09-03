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
  const [step, setStep] = useState(1);
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
    <section className="relative w-full bg-[#FBFBFA] border-b border-[#E5E5E0] text-[#111111] overflow-hidden pt-12 md:pt-16 pb-16 md:pb-24">
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Editorial Layout */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D4D4CE] text-xs font-semibold text-[#111111] mb-6 shadow-2xs">
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

          {/* Subtext - 18px readable body */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#444444] leading-relaxed font-sans mb-8">
            บริการรับกดและเคลียร์ภาษีเบ็ดเสร็จ ส่งตรงถึงหน้าบ้านคุณในราคาเหมาจ่ายยอดเดียวจบ ไร้กังวลเรื่องค่าใช้จ่ายเพิ่มเติมภายหลัง
          </p>

          {/* Sourcing Concierge Quote Box */}
          <div className="max-w-3xl mx-auto bg-white border border-[#D4D4CE] rounded-2xl p-4 sm:p-5 shadow-xs">
            <form onSubmit={handleCheckPrice} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="วางลิงก์สินค้าที่ต้องการเช็คราคา (เช่น StockX, GOAT, eBay, Kith)"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError('');
                  }}
                  className="w-full h-14 bg-[#FBFBFA] border border-[#D4D4CE] text-[#111111] rounded-xl px-5 text-base focus:border-[#111111] focus:bg-white outline-none transition-all placeholder:text-[#777777] font-medium font-sans"
                />
                {url && (
                  <button
                    type="button"
                    aria-label="ล้างข้อความในช่องค้นหา"
                    onClick={() => setUrl('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#111111] text-sm font-bold p-1 rounded cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="h-14 px-8 bg-[#111111] hover:bg-[#222222] text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all flex-shrink-0 cursor-pointer font-heading tracking-wide shadow-2xs tactile-btn"
              >
                {copied ? <Check className="w-5 h-5 text-[#059669]" /> : <Search className="w-5 h-5" />}
                <span>{copied ? 'คัดลอกแล้ว' : 'ส่งเช็คราคาฟรี'}</span>
              </button>
            </form>

            {error && (
              <p className="text-sm text-[#DC2626] font-medium bg-[#FEF2F2] p-3 rounded-lg border border-[#FCA5A5] font-sans mt-3 text-left">
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-[#E5E5E0] text-xs sm:text-sm text-[#666666] font-sans">
              <span>* ทีมงานจะประเมินราคาสุทธิรวมส่งถึงหน้าบ้านให้คุณทาง LINE หรือ Facebook ทันที</span>
              <span className="font-semibold text-[#111111]">ประเมินฟรี ไม่มีข้อผูกมัด</span>
            </div>
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

      {/* Sourcing Inquiry Modal */}
      {showModal && (
        <div 
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white border border-[#D4D4CE] p-6 sm:p-8 rounded-2xl shadow-xl relative text-left font-sans text-[#111111]"
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#111111] p-1.5 transition-colors"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 1 ? (
              <form onSubmit={handleConfirmInquiry} className="space-y-4">
                <div>
                  <span className="text-xs text-[#059669] font-bold uppercase tracking-wider block mb-1">
                    ขั้นตอนที่ 1 / ประเมินราคา
                  </span>
                  <h3 className="text-xl font-bold text-[#111111] font-heading">
                    ระบุช่องทางติดต่อกลับ
                  </h3>
                </div>
                
                <p className="text-sm text-[#555555] leading-relaxed">
                  เพื่อให้แอดมินแจ้งราคาสุทธิและสรุปค่าบริการนำเข้า กรุณากรอกเบอร์โทร, LINE ID หรือชื่อ Facebook ของคุณครับ:
                </p>
                
                <input
                  type="text"
                  placeholder="เช่น LINE ID: somchai / เบอร์โทร: 08x-xxx-xxxx"
                  value={contactInfo}
                  onChange={(e) => {
                    setContactInfo(e.target.value);
                    setModalError('');
                  }}
                  className="w-full h-12 bg-[#FBFBFA] border border-[#D4D4CE] text-[#111111] rounded-xl px-4 text-base focus:border-[#111111] focus:bg-white outline-none placeholder:text-[#777777] font-medium font-sans"
                  required
                />

                {modalError && (
                  <p className="text-sm text-[#DC2626] font-medium">{modalError}</p>
                )}

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 h-12 border border-[#D4D4CE] hover:bg-[#F4F4F0] text-[#555555] text-sm font-semibold rounded-xl transition-all cursor-pointer font-heading tactile-btn"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 h-12 bg-[#111111] hover:bg-[#222222] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading tracking-wide uppercase tactile-btn shadow-2xs"
                  >
                    {submitting ? 'กำลังบันทึก...' : 'ยืนยันข้อมูล'}
                  </button>
                </div>
              </form>
            ) : step === 2 ? (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-[#059669] font-bold uppercase tracking-wider block mb-1">
                    ขั้นตอนที่ 2 / บันทึกข้อมูลสำเร็จ
                  </span>
                  <h3 className="text-xl font-bold text-[#111111] flex items-center gap-2 font-heading">
                    <Check className="w-6 h-6 text-[#059669]" />
                    ส่งข้อมูลเรียบร้อยแล้ว
                  </h3>
                </div>

                <p className="text-sm text-[#555555] leading-relaxed">
                  ระบบได้บันทึกการเช็คราคาและคัดลอกข้อความสรุปลงคลิปบอร์ดแล้ว คุณสามารถกดปุ่มด้านล่างเพื่อทักแชทคุยกับแอดมินได้ทันทีครับ:
                </p>

                <div className="bg-[#FBFBFA] border border-[#E5E5E0] p-4 rounded-xl text-sm text-[#444444] break-all space-y-2 font-sans">
                  <div>
                    <span className="text-[#777777] block font-medium mb-0.5">ลิงก์สินค้า:</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#111111] underline break-all font-mono font-medium block">
                      {url.length > 50 ? url.substring(0, 50) + '...' : url}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#777777] block font-medium mb-0.5">ช่องทางติดต่อกลับของคุณ:</span>
                    <span className="text-[#111111] font-bold">{contactInfo}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <a
                    href="https://lin.ee/ByS27YW"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs font-heading tracking-wide uppercase tactile-btn"
                  >
                    <MessageCircle className="w-5 h-5" />
                    ทักสอบถามทาง LINE OA (@hij2541a)
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#111111] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wide uppercase tactile-btn"
                  >
                    <Send className="w-4 h-4 text-[#555555]" />
                    ทักสอบถามทาง Messenger
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-[#059669] font-bold uppercase tracking-wider block mb-1">
                    สั่งซื้อดีลพิเศษ
                  </span>
                  <h3 className="text-xl font-bold text-[#111111] flex items-center gap-2 font-heading">
                    <Check className="w-6 h-6 text-[#059669]" />
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
                    onClick={closeModal}
                    className="w-full h-12 bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs font-heading tracking-wide uppercase tactile-btn"
                  >
                    <MessageCircle className="w-5 h-5" />
                    ส่งดีลสั่งซื้อทาง LINE OA
                  </a>
                  <a
                    href="https://m.me/us2th"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className="w-full h-12 bg-white hover:bg-[#F4F4F0] border border-[#D4D4CE] text-[#111111] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-heading tracking-wide uppercase tactile-btn"
                  >
                    <Send className="w-4 h-4 text-[#555555]" />
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
