'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BookOpen, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { mockArticles, Article } from '@/lib/mockArticles';

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
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return mockDateStr || '';
    const day = date.getDate();
    const thaiMonthsShort = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const month = thaiMonthsShort[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  return (
    <section id="magazine" className="w-full bg-[#0A0D3A] py-24 px-4 md:px-8 border-b border-[#5865F2]/20 text-[#F2F3F5] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-10 right-10 w-96 h-96 bg-[#5865F2]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5865F2]/20 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse" />
              <span className="text-xs font-bold text-[#5865F2] uppercase tracking-widest font-heading">
                [ #COMMUNITY-JOURNAL // MAGAZINE ARCHIVE ]
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F2F3F5] font-heading">
              US2TH Journal
            </h2>
            <p className="text-sm md:text-base text-[#DBDEE1] mt-2 max-w-lg leading-relaxed font-medium font-sans">
              บทความแนะนำแบรนด์ วิธีการช้อปปิ้งต่างประเทศ และอัปเดตเทรนด์แฟชั่นหายากเพื่อส่งเสริมความรู้ในการสั่งซื้อ
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#949BA4] font-heading">
            <BookOpen className="w-4 h-4 text-[#5865F2]" />
            <span>นิตยสารออนไลน์เพื่อคนชอบช้อปปิ้ง</span>
          </div>
        </div>

        {/* Featured Article Layout - Discord Spotlight Card */}
        {featuredArticle && (
          <Link 
            href={`/journal/${featuredArticle.slug}`} 
            className="block mb-16 bg-[#1E1F22] border border-[#5865F2]/30 rounded-3xl overflow-hidden shadow-2xl hover:border-[#5865F2]/60 hover:shadow-[#5865F2]/15 transition-all group cursor-pointer discord-embed-blurple"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side */}
              <div className="lg:col-span-7 min-h-[300px] lg:min-h-[480px] relative overflow-hidden bg-[#111214]">
                {featuredArticle.img_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={featuredArticle.img_url} 
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1F22] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-[#1E1F22]">
                <div>
                  <div className="flex items-center gap-4 text-xs font-bold text-[#35ED7E] tracking-wider mb-6 font-heading">
                    <span className="bg-[#23A55A]/15 border border-[#23A55A]/30 px-2.5 py-0.5 rounded-md">
                      {featuredArticle.category}
                    </span>
                    <span className="text-[#35373C]">•</span>
                    <span className="text-[#949BA4] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.read_time}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F2F3F5] mb-6 group-hover:text-[#00B0F4] transition-colors leading-tight font-heading">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-[#DBDEE1] text-sm md:text-base leading-relaxed mb-8 font-medium font-sans">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#35373C] pt-6">
                  <span className="text-xs font-bold text-[#949BA4]">{formatDate(featuredArticle.created_at, featuredArticle.date)}</span>
                  <span className="text-xs font-bold text-[#00B0F4] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform font-heading">
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
              className="bg-[#1E2353]/50 border border-[#5865F2]/20 rounded-3xl overflow-hidden shadow-lg hover:border-[#5865F2]/50 hover:bg-[#1E2353]/80 transition-all group flex flex-col justify-between cursor-pointer discord-embed-blurple"
            >
              <div>
                {/* Image top */}
                <div className="aspect-[4/3] relative overflow-hidden bg-[#111214]">
                  {article.img_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={article.img_url} 
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D3A]/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Text body */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] font-bold text-[#35ED7E] tracking-wider mb-4 font-heading">
                    <span className="bg-[#23A55A]/15 px-2 py-0.5 rounded-md">{article.category}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#949BA4] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.read_time}
                    </span>
                  </div>
                  
                  <h4 className="text-base font-bold text-[#F2F3F5] mb-3 group-hover:text-[#00B0F4] transition-colors leading-snug font-heading">
                    {article.title}
                  </h4>
                  
                  {article.excerpt && (
                    <p className="text-[#DBDEE1] text-xs md:text-sm leading-relaxed line-clamp-3 font-medium font-sans">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-[#5865F2]/10 flex justify-between items-center">
                <span className="text-[11px] font-bold text-[#949BA4]">{formatDate(article.created_at, article.date)}</span>
                <span className="text-[11px] font-bold text-[#00B0F4] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-heading">
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
