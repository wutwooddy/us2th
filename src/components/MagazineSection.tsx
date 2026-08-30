'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BookOpen, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';

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
  date?: string; // Fallback mock date
}

// Fallback mockup articles in case database is empty initially
const mockArticles: Article[] = [
  {
    id: 1,
    title: 'สวรรค์คนรักแบรนด์เนม: เจาะลึกวิธีสั่งซื้อสินค้าจาก Nordstrom ส่งตรงถึงบ้านคุณ',
    excerpt: 'พาไปดูวิธีเลือกซื้อเสื้อผ้า รองเท้า และกระเป๋าแบรนด์เนมสุดหรูที่ Nordstrom ห้างสรรพสินค้าชั้นนำของสหรัฐอเมริกา พร้อมแชร์เคล็ดลับการบริการจัดซื้อและประเมินราคาแบบเหมาจ่ายเบ็ดเสร็จ ส่งตรงถึงหน้าบ้านโดยไม่มีค่าใช้จ่ายแอบแฝงเพิ่มเติมภายหลังแน่นอน...',
    category: 'SOURCING GUIDE',
    read_time: '5 min read',
    img_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    slug: 'sourcing-guide-nordstrom',
    created_at: new Date('2026-08-31T00:00:00Z').toISOString(),
    date: 'AUG 31, 2026'
  },
  {
    id: 2,
    title: 'ล่าไอเทมหาสุดขอบโลก: คู่มือค้นหาและประเมินสินค้าแท้บน eBay อย่างปลอดภัย',
    excerpt: 'อยากสะสมโมเดล Bearbrick หรือสนีกเกอร์รุ่นวินเทจใน eBay แต่กลัวเจอของปลอม? อ่านคู่มือฉบับนี้เพื่อดูวิธีตรวจเช็คเครดิตคนขาย การสังเกตรายละเอียดสินค้าจริง และข้อควรระวังสำคัญสำหรับนักสะสมชาวไทย...',
    category: 'AUTHENTIC TIPS',
    read_time: '7 min read',
    img_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
    featured: false,
    slug: 'authentic-tips-ebay',
    created_at: new Date('2026-08-29T00:00:00Z').toISOString(),
    date: 'AUG 29, 2026'
  },
  {
    id: 3,
    title: '5 แบรนด์เสื้อผ้าสตรีทแวร์นอกกระแสจากโตเกียว ที่กำลังมาแรงในยุคนี้',
    excerpt: 'เจาะลึกแบรนด์ดีไซเนอร์สตรีทแวร์สัญชาติญี่ปุ่นที่เปี่ยมไปด้วยเอกลักษณ์เฉพาะตัว แต่ยังไม่มีตัวแทนจำหน่ายอย่างเป็นทางการในไทย พาไปชมประวัติความเป็นมาและวิธีพรีออร์เดอร์แบบเหมาจ่ายจบครบทุกขั้นตอน...',
    category: 'STREET CULTURE',
    read_time: '4 min read',
    img_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    featured: false,
    slug: 'street-wear-tokyo',
    created_at: new Date('2026-08-26T00:00:00Z').toISOString(),
    date: 'AUG 26, 2026'
  },
  {
    id: 4,
    title: 'เตรียมตัวรับโปรเด็ด: วางแผนพรีออร์เดอร์เทศกาล Black Friday อย่างไรให้คุ้มค่าที่สุด',
    excerpt: 'เปิดโผปฏิทินเทศกาลเซลครั้งใหญ่ประจำปีของฝั่งอเมริกาและยุโรป พร้อมแนะเทคนิคการเตรียมตัวกดสั่งซื้อและจัดหาของแบรนด์เนม เสื้อผ้าสตรีทแวร์ในช่วงลดราคากระหน่ำปลายปีให้ทันไซส์ในราคาคุ้มที่สุด...',
    category: 'SMART SHOPPING',
    read_time: '6 min read',
    img_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    featured: false,
    slug: 'black-friday-preorder-guide',
    created_at: new Date('2026-08-20T00:00:00Z').toISOString(),
    date: 'AUG 20, 2026'
  },
  {
    id: 5,
    title: 'เบื้องหลังกระแส Art Toy & ของสะสมหายาก ทำไมต้องสั่งจากตลาดฮ่องกงและสิงคโปร์?',
    excerpt: 'หาคำตอบว่าทำไมโมเดลของสะสมหายากและของเล่นรุ่นลิมิเต็ดถึงหลั่งไหลเข้าสู่ตลาดเอเชียผ่านทางฮ่องกงและสิงคโปร์ พร้อมแนะนำวิธีจัดหาและนำพรีออร์เดอร์ส่งตรงถึงไทยแบบเหมาจ่ายเคลียร์จบทุกเรื่อง...',
    category: 'COLLECTIBLES',
    read_time: '5 min read',
    img_url: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=800',
    featured: false,
    slug: 'art-toy-collectible-markets',
    created_at: new Date('2026-08-15T00:00:00Z').toISOString(),
    date: 'AUG 15, 2026'
  },
];

export default function MagazineSection() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setArticles(data);
        }
      } catch (err) {
        console.error('Error fetching articles from Supabase: ', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const normalArticles = articles.filter(a => a.id !== (featuredArticle?.id));

  const formatDate = (dateStr: string, mockDateStr?: string) => {
    if (mockDateStr) return mockDateStr;
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  };

  return (
    <section id="magazine" className="w-full bg-[#fbfbfb] py-24 px-4 md:px-8 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">[ นิตยสารช้อปปิ้งออนไลน์ ]</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-heading">
              US2TH Journal
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-lg leading-relaxed font-semibold">
              บทความแนะนำแบรนด์ วิธีการช้อปปิ้งต่างประเทศ และอัปเดตเทรนด์แฟชั่นหายากเพื่อส่งเสริมความรู้ในการสั่งซื้อ
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>นิตยสารออนไลน์เพื่อคนรักของหายาก</span>
          </div>
        </div>

        {/* Featured Article Layout (Read The Cloud Style - Large horizontal card) */}
        {featuredArticle && (
          <Link href={`/journal/${featuredArticle.slug}`} className="block mb-16 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side */}
              <div className="lg:col-span-7 min-h-[300px] lg:min-h-[480px] relative overflow-hidden">
                {featuredArticle.img_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={featuredArticle.img_url} 
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                )}
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-bold text-brand-green tracking-wider mb-6 font-heading">
                    <span>{featuredArticle.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-450 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.read_time}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6 group-hover:text-brand-blue transition-colors leading-tight font-heading">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-semibold">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="text-xs font-bold text-slate-400">{formatDate(featuredArticle.created_at, featuredArticle.date)}</span>
                  <span className="text-xs font-bold text-brand-blue flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    อ่านต่อ <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          </Link>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {normalArticles.map((article) => (
            <Link 
              key={article.id}
              href={`/journal/${article.slug}`}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image top */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  {article.img_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={article.img_url} 
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-550 ease-out"
                    />
                  )}
                </div>

                {/* Text body */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] font-bold text-brand-green tracking-wider mb-4 font-heading">
                    <span>{article.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-450 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.read_time}
                    </span>
                  </div>
                  
                  <h4 className="text-base font-bold text-slate-850 mb-3 group-hover:text-brand-blue transition-colors leading-snug font-heading">
                    {article.title}
                  </h4>
                  
                  {article.excerpt && (
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3 font-semibold">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-50/50 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-400">{formatDate(article.created_at, article.date)}</span>
                <span className="text-[11px] font-bold text-brand-blue flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  อ่านเพิ่มเติม <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
