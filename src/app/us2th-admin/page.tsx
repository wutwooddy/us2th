'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Lock, Trash2, Plus, Clock, ArrowLeft, BookOpen, Zap, LogOut, CheckCircle, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';

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

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  read_time: string | null;
  img_url: string | null;
  featured: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Tabs: 'deals' | 'articles'
  const [activeTab, setActiveTab] = useState<'deals' | 'articles'>('deals');

  // Supabase lists
  const [deals, setDeals] = useState<Promotion[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  // Form states - Deals
  const [dealTitle, setDealTitle] = useState('');
  const [dealPrice, setDealPrice] = useState('');
  const [dealOrigPrice, setDealOrigPrice] = useState('');
  const [dealImgUrl, setDealImgUrl] = useState('');
  const [dealAffiliateUrl, setDealAffiliateUrl] = useState('');
  const [dealDurationHours, setDealDurationHours] = useState('24');
  const [dealShippingTime, setDealShippingTime] = useState('✈️ พรีออเดอร์ 20-30 วัน');
  const [dealDescription, setDealDescription] = useState('');
  const [dealSizes, setDealSizes] = useState('');
  const [dealSizeChartUrl, setDealSizeChartUrl] = useState('');
  const [dealSaveLoading, setDealSaveLoading] = useState(false);
  const [dealSuccessMsg, setDealSuccessMsg] = useState('');

  // Form states - Articles
  const [artTitle, setArtTitle] = useState('');
  const [artSlug, setArtSlug] = useState('');
  const [artCategory, setArtCategory] = useState('SOURCING GUIDE');
  const [artReadTime, setArtReadTime] = useState('5 min read');
  const [artImgUrl, setArtImgUrl] = useState('');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artSaveLoading, setArtSaveLoading] = useState(false);
  const [artSuccessMsg, setArtSuccessMsg] = useState('');

  useEffect(() => {
    // Check local session storage for authorization
    const session = sessionStorage.getItem('us2th_admin_session');
    if (session === 'authorized') {
      setIsAuthorized(true);
      fetchData();
    }
    setCheckingAuth(false);
  }, [isAuthorized]);

  async function fetchData() {
    setLoadingList(true);
    try {
      // Fetch deals
      const { data: dealsData } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });
      if (dealsData) setDeals(dealsData);

      // Fetch articles
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (articlesData) setArticles(articlesData);
    } catch (err) {
      console.error('Error fetching admin list data: ', err);
    } finally {
      setLoadingList(false);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem('us2th_admin_session', 'authorized');
        setIsAuthorized(true);
      } else {
        setAuthError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      setAuthError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('us2th_admin_session');
    setIsAuthorized(false);
    setPassword('');
  };

  // Submit Deal
  const handleSaveDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setDealSaveLoading(true);
    setDealSuccessMsg('');
    try {
      const endTime = new Date(Date.now() + parseInt(dealDurationHours) * 60 * 60 * 1000).toISOString();
      const { error } = await supabase.from('promotions').insert({
        title: dealTitle,
        deal_price: dealPrice.startsWith('฿') ? dealPrice : `฿${dealPrice}`,
        original_price: dealOrigPrice ? (dealOrigPrice.startsWith('฿') ? dealOrigPrice : `฿${dealOrigPrice}`) : null,
        img_url: dealImgUrl || null,
        affiliate_url: dealAffiliateUrl || null,
        end_time: endTime,
        is_active: true,
        shipping_time: dealShippingTime,
        description: dealDescription || null,
        sizes: dealSizes || null,
        size_chart_url: dealSizeChartUrl || null,
      });

      if (error) throw error;

      setDealSuccessMsg('บันทึกโปรโมชั่นด่วนสำเร็จแล้ว!');
      // Reset form
      setDealTitle('');
      setDealPrice('');
      setDealOrigPrice('');
      setDealImgUrl('');
      setDealAffiliateUrl('');
      setDealShippingTime('✈️ พรีออเดอร์ 20-30 วัน');
      setDealDescription('');
      setDealSizes('');
      setDealSizeChartUrl('');
      fetchData();
    } catch (err: any) {
      alert(`Error saving promotion: ${err.message}`);
    } finally {
      setDealSaveLoading(false);
    }
  };

  // Delete Deal
  const handleDeleteDeal = async (id: number) => {
    if (!confirm('ยืนยันที่จะลบโปรโมชั่นนี้ใช่หรือไม่?')) return;
    try {
      const { error } = await supabase.from('promotions').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert(`Error deleting deal: ${err.message}`);
    }
  };

  // Submit Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setArtSaveLoading(true);
    setArtSuccessMsg('');
    try {
      // Auto-generate slug if empty
      let finalSlug = artSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!finalSlug) {
        finalSlug = artTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
      }

      const { error } = await supabase.from('articles').insert({
        title: artTitle,
        slug: finalSlug,
        category: artCategory,
        read_time: artReadTime,
        img_url: artImgUrl || null,
        excerpt: artExcerpt || null,
        content: artContent,
        featured: false,
      });

      if (error) throw error;

      setArtSuccessMsg('เขียนบทความใหม่และบันทึกลงระบบสำเร็จแล้ว!');
      setArtTitle('');
      setArtSlug('');
      setArtImgUrl('');
      setArtExcerpt('');
      setArtContent('');
      fetchData();
    } catch (err: any) {
      alert(`Error saving article: ${err.message}`);
    } finally {
      setArtSaveLoading(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: number) => {
    if (!confirm('ยืนยันที่จะลบบทความนี้ออกจากเว็บไซต์ใช่หรือไม่?')) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert(`Error deleting article: ${err.message}`);
    }
  };

  // AI News Agent Generator
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResultMsg, setAiResultMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleGenerateAiArticle = async () => {
    setAiGenerating(true);
    setAiResultMsg(null);
    try {
      const res = await fetch('/api/cron/fetch-news');
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'ไม่สามารถดึงข้อมูลข่าวสารได้');
      }
      setAiResultMsg({
        type: 'success',
        text: `สร้างบทความสำเร็จ: "${data.article?.title}" เผยแพร่ลงหน้าเว็บเรียบร้อยแล้ว!`
      });
      fetchData();
    } catch (err: any) {
      setAiResultMsg({
        type: 'error',
        text: `เกิดข้อผิดพลาด: ${err.message}`
      });
    } finally {
      setAiGenerating(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-semibold text-slate-400">
        กำลังตรวจสอบความปลอดภัย...
      </div>
    );
  }

  // --- Password Lock Screen ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 font-heading">US2TH Admin Panel</h1>
            <p className="text-xs text-slate-400 mt-1 font-semibold">กรุณากรอกรหัสผ่านเพื่อเข้าใช้งานหลังบ้าน</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="ป้อนรหัสผ่านหลังบ้าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-800 focus:bg-white focus:border-brand-blue outline-none transition-all placeholder:text-slate-400 font-semibold"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-500 font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading shadow-md"
            >
              เข้าสู่ระบบหลังบ้าน
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6 text-center">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-blue transition-colors font-heading">
              <ArrowLeft className="w-3.5 h-3.5" /> กลับสู่หน้าหลักร้านค้า
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Authenticated Admin Dashboard ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Header bar */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 font-heading">US2TH <span className="text-brand-blue">Admin</span></span>
            <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">BACK OFFICE</span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-blue transition-colors font-heading"
            >
              <ArrowLeft className="w-4 h-4" /> ดูหน้าเว็บจริง
            </Link>
            <button 
              onClick={handleLogout}
              className="h-9 px-3 border border-slate-200 hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-heading"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>ออกระบบ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex-grow max-w-[1400px] w-full mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          
          {/* Tab Selector */}
          <div className="flex border-b border-slate-100 pb-4 mb-6 gap-2">
            <button
              onClick={() => {
                setActiveTab('deals');
                setDealSuccessMsg('');
                setArtSuccessMsg('');
              }}
              className={`flex-grow md:flex-initial h-10 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading ${
                activeTab === 'deals'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              ดีลโปรโมชั่นด่วน
            </button>
            <button
              onClick={() => {
                setActiveTab('articles');
                setDealSuccessMsg('');
                setArtSuccessMsg('');
              }}
              className={`flex-grow md:flex-initial h-10 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-heading ${
                activeTab === 'articles'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              เขียนบทความ SEO
            </button>
          </div>

          {/* TAB 1: DEAL PROMOTION FORM */}
          {activeTab === 'deals' && (
            <form onSubmit={handleSaveDeal} className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900 font-heading">กรอกโปรโมชั่น / Flash Sale ชิ้นใหม่</h2>
                <p className="text-xs text-slate-400 mt-0.5 font-semibold">ข้อมูลจะอัปเดตและเริ่มตัวจับเวลาบนหน้าแรกของเว็ปไซต์ทันที</p>
              </div>

              {dealSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs md:text-sm font-bold p-4 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{dealSuccessMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ชื่อสินค้า/แบรนด์ (หัวข้อโปรโมชั่น)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น Off-White Sunglasses & Eyewear"
                    value={dealTitle}
                    onChange={(e) => setDealTitle(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ราคาดีลพิเศษ (THB)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น 5990"
                    value={dealPrice}
                    onChange={(e) => setDealPrice(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ราคาปกติ (ถ้ามี)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น 12900"
                    value={dealOrigPrice}
                    onChange={(e) => setDealOrigPrice(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ที่อยู่รูปภาพสินค้า (วางลิงก์รูปเฟซบุ๊กที่ก๊อปมา)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="วางลิงก์ไฟล์รูปภาพ (เช่น https://scontent... หรือ Unsplash)"
                    value={dealImgUrl}
                    onChange={(e) => setDealImgUrl(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                    *วิธีเอารูป: คลิกขวาที่รูปภาพจากเพจ Facebook หรือแหล่งอื่น กด "คัดลอกที่อยู่รูปภาพ" (Copy Image Address) แล้วนำมาวาง
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ลิงก์โพสต์ต้นฉบับบน Facebook Page
                  </label>
                  <input
                    type="text"
                    placeholder="วางลิงก์โพสต์ (เช่น https://www.facebook.com/us2th/posts/...)"
                    value={dealAffiliateUrl}
                    onChange={(e) => setDealAffiliateUrl(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    คำอธิบายดีลสั้นๆ (Description - ถ้ามี)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น มีสองสี ฟ้า และ แดง หรือ มีสินค้าพร้อมส่งเลย"
                    value={dealDescription}
                    onChange={(e) => setDealDescription(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ขนาดไซส์ที่มี (Sizes - ถ้ามี)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น XL 2XL 3XL หรือ US 7 - 13"
                    value={dealSizes}
                    onChange={(e) => setDealSizes(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                  
                  {/* Sizing Quick Presets */}
                  <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-slate-400 font-bold mr-1">คลิกเลือกเพื่อใส่เทมเพลตไซส์ด่วน:</span>
                    <button
                      type="button"
                      onClick={() => setDealSizes('S M L XL 2XL')}
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      🧥 เสื้อ (S-2XL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDealSizes('XS S M L XL 2XL 3XL')}
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      🧥 เสื้อ (XS-3XL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDealSizes('US 7 / 8 / 8.5 / 9 / 9.5 / 10 / 10.5 / 11 / 12 / 13')}
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      👟 รองเท้า (US 7-13)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDealSizes('US 8 / 8.5 / 9 / 9.5 / 10 / 10.5 / 11 / 12')}
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      👟 รองเท้า (US 8-12)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDealSizes('One Size')}
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      🧢 One Size
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ลิงก์รูปภาพตารางไซส์ประกอบ (Size Chart URL - เสื้อผ้า/กำหนดเอง)
                  </label>
                  <input
                    type="text"
                    placeholder="วางลิงก์รูปตารางไซส์สำหรับเสื้อผ้า หรือยี่ห้อเฉพาะ (ปล่อยว่างหากต้องการใช้ตารางรองเท้ามาตรฐาน)"
                    value={dealSizeChartUrl}
                    onChange={(e) => setDealSizeChartUrl(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                    *สำหรับรองเท้าแบรนด์ดัง (เช่น Nike, Jordan, Adidas, New Balance, On Running) ระบบจะดึงตารางไซส์มาตรฐานขึ้นมาให้ลูกค้าตรวจเช็คได้อัตโนมัติโดยที่คุณไม่ต้องใส่ช่องนี้ครับ
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ระยะเวลานับถอยหลังโปรโมชั่น (ชั่วโมง)
                  </label>
                  <select
                    value={dealDurationHours}
                    onChange={(e) => setDealDurationHours(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all font-semibold"
                  >
                    <option value="12">12 ชั่วโมง</option>
                    <option value="24">24 ชั่วโมง (1 วัน)</option>
                    <option value="48">48 ชั่วโมง (2 วัน)</option>
                    <option value="72">72 ชั่วโมง (3 วัน)</option>
                    <option value="96">96 ชั่วโมง (4 วัน)</option>
                    <option value="168">168 ชั่วโมง (7 วัน)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ระยะเวลาการจัดส่ง / ประเภทดีล
                  </label>
                  <select
                    value={dealShippingTime}
                    onChange={(e) => setDealShippingTime(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all font-semibold"
                  >
                    <option value="✈️ พรีออเดอร์ 20-30 วัน">✈️ พรีออเดอร์ 20-30 วัน (USA/UK/EU)</option>
                    <option value="✈️ พรีออเดอร์ 15-20 วัน">✈️ พรีออเดอร์ 15-20 วัน (JP/KR/CN)</option>
                    <option value="📦 พร้อมส่งในไทย 2-5 วัน">📦 พร้อมส่งในไทย 2-5 วัน (สินค้าอยู่ไทย)</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={dealSaveLoading}
                  className="w-full h-12 bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer font-heading"
                >
                  <Plus className="w-5 h-5" />
                  {dealSaveLoading ? 'กำลังบันทึกลงฐานข้อมูล...' : 'บันทึกดีลสินค้าและเปิดขาย'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ARTICLE JOURNAL FORM */}
          {activeTab === 'articles' && (
            <div className="space-y-8">
              {/* AI Auto-News Generator Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI NEWS AGENT
                    </div>
                    <h3 className="text-lg font-bold text-white font-heading">
                      ดึงข่าวสตรีทแวร์และเขียนบทความอัตโนมัติด้วย AI
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl font-sans leading-relaxed">
                      ระบบจะดึงข่าวสนีกเกอร์และแฟชั่นเปิดตัวใหม่ล่าสุดจาก Hypebeast และ Sneaker News แปลและเรียบเรียงเป็นบทความภาษาไทยให้อัตโนมัติ พร้อมรูปภาพความละเอียดสูง
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateAiArticle}
                    disabled={aiGenerating}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm flex-shrink-0"
                  >
                    {aiGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>AI กำลังเขียนข่าว...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>ดึงข่าวและสร้างบทความใหม่ทันที</span>
                      </>
                    )}
                  </button>
                </div>

                {aiResultMsg && (
                  <div className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    aiResultMsg.type === 'success' 
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' 
                      : 'bg-red-500/20 border border-red-500/30 text-red-300'
                  }`}>
                    {aiResultMsg.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                    <span>{aiResultMsg.text}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 font-heading">หรือเขียนบทความเองด้วยตนเอง</h2>
                  <p className="text-xs text-slate-400 mt-0.5 font-semibold">เมื่อเขียนเสร็จ ระบบจะนำข้อมูลไปอัปเดตและสร้างลิงก์ Sitemap สำหรับ Google ให้อัตโนมัติ</p>
                </div>

                {artSuccessMsg && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs md:text-sm font-bold p-4 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{artSuccessMsg}</span>
                  </div>
                )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    หัวข้อบทความ (Article Title)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น เจาะลึกกระแสแบรนด์หรูพรีออร์เดอร์สุดฮิต..."
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ลิงก์ Slug (คำสั้นสำหรับลิงก์ URL ภาษาอังกฤษ)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น off-white-glasses-deal (หากปล่อยว่างจะสร้างให้เอง)"
                    value={artSlug}
                    onChange={(e) => setArtSlug(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    เวลาที่ใช้อ่าน (Read Time)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น 5 min read"
                    value={artReadTime}
                    onChange={(e) => setArtReadTime(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    หมวดหมู่บทความ (Category)
                  </label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all font-semibold"
                  >
                    <option value="SOURCING GUIDE">SOURCING GUIDE</option>
                    <option value="STREET CULTURE">STREET CULTURE</option>
                    <option value="AUTHENTIC TIPS">AUTHENTIC TIPS</option>
                    <option value="SMART SHOPPING">SMART SHOPPING</option>
                    <option value="COLLECTIBLES">COLLECTIBLES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    ที่อยู่รูปภาพประกอบ (Image URL)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="วางลิงก์รูปภาพประกอบหลัก"
                    value={artImgUrl}
                    onChange={(e) => setArtImgUrl(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    บทนำย่อสั้นๆ (Excerpt - แสดงผลในการ์ดหน้าแรก)
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="เขียนสลุปสั้นๆ ดึงดูดความสนใจของลูกค้า..."
                    value={artExcerpt}
                    onChange={(e) => setArtExcerpt(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl p-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-650 mb-1.5 uppercase tracking-wider font-heading">
                    เนื้อหาบทความฉบับเต็ม (Content - รองรับการเว้นวรรคและย่อหน้าได้ปกติ)
                  </label>
                  <textarea
                    rows={10}
                    required
                    placeholder="พิมพ์เนื้อหาข่าวสาร หรือบทความแนะนำแบรนด์แบบละเอียด..."
                    value={artContent}
                    onChange={(e) => setArtContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue rounded-xl p-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-450 font-medium"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={artSaveLoading}
                  className="w-full h-12 bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer font-heading"
                >
                  <Plus className="w-5 h-5" />
                  {artSaveLoading ? 'กำลังบันทึกลงฐานข้อมูล...' : 'เผยแพร่บทความขึ้นเว็บไซต์'}
                </button>
              </div>
            </form>
          </div>
        )}

        </div>

        {/* Right Side: Existing Data List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          
          <div className="border-b border-slate-100 pb-3 mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">รายการที่มีอยู่ในระบบ</h2>
              <p className="text-[10px] text-slate-400 font-semibold">ดึงข้อมูลจริงจาก Supabase Database</p>
            </div>
            <button
              onClick={fetchData}
              className="text-[10px] font-bold text-brand-blue border border-brand-blue/20 hover:bg-brand-blue/5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-heading"
            >
              รีเฟรชข้อมูล
            </button>
          </div>

          {loadingList ? (
            <div className="text-center py-10 text-xs font-bold text-slate-400">
              กำลังโหลดข้อมูล...
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* --- Flash Sale Deals List --- */}
              {activeTab === 'deals' && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-heading">[ รายการดีล Flash Sale ]</h3>
                  {deals.length === 0 ? (
                    <p className="text-xs text-slate-500 font-semibold italic text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      ไม่มีรายการโปรโมชั่นในระบบ
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                      {deals.map((deal) => (
                        <div 
                          key={deal.id}
                          className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl justify-between"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {deal.img_url && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img 
                                src={deal.img_url} 
                                alt={deal.title}
                                className="w-10 h-10 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <span className="block text-xs font-bold text-slate-800 truncate leading-snug font-heading" title={deal.title}>
                                {deal.title}
                              </span>
                              <div className="flex gap-2 items-center mt-0.5">
                                <span className="text-[10px] font-black text-brand-blue font-heading">
                                  {deal.deal_price}
                                </span>
                                {deal.shipping_time && (
                                  <span className="text-[9px] font-bold text-slate-400">
                                    • {deal.shipping_time}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteDeal(deal.id)}
                            className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-lg transition-colors cursor-pointer"
                            title="ลบดีลนี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- Articles List --- */}
              {activeTab === 'articles' && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-heading">[ รายการวารสาร / Articles ]</h3>
                  {articles.length === 0 ? (
                    <p className="text-xs text-slate-500 font-semibold italic text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      ไม่มีบทความอยู่ในระบบ
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                      {articles.map((art) => (
                        <div 
                          key={art.id}
                          className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl justify-between"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {art.img_url && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img 
                                src={art.img_url} 
                                alt={art.title}
                                className="w-10 h-10 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <span className="block text-xs font-bold text-slate-800 truncate leading-snug font-heading" title={art.title}>
                                {art.title}
                              </span>
                              <span className="text-[9px] text-slate-400 font-bold tracking-wider font-heading mt-0.5 block">
                                SLUG: {art.slug}
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-lg transition-colors cursor-pointer"
                            title="ลบบทความนี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </main>

      {/* Footer bar */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 mt-10">
        &copy; {new Date().getFullYear()} US2TH Admin Control Panel. ปลอดภัยด้วย API หลังบ้าน.
      </footer>
    </div>
  );
}
