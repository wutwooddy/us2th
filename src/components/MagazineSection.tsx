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
    <section id="magazine" className="w-full bg-[#090A0C] py-20 md:py-24 px-4 md:px-8 border-b border-white/[0.07] text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.15em] font-mono">
                EDITORIAL & INSIGHTS
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#F4F4F2] font-heading">
              US2TH Journal
            </h2>
            <p className="text-xs md:text-sm text-[#9B9FA8] mt-1.5 max-w-lg leading-relaxed font-sans">
              คู่มือแนะนำแบรนด์ วิธีการช้อปปิ้งต่างประเทศ และอัปเดตเทรนด์แฟชั่นของสะสมหายาก
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-1.5 text-xs text-[#9B9FA8] font-sans">
            <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
            <span>นิตยสารออนไลน์เพื่อคนรักการสะสม</span>
          </div>
        </div>

        {/* Featured Article Layout */}
        {featuredArticle && (
          <Link 
            href={`/journal/${featuredArticle.slug}`} 
            className="block mb-12 bg-[#12141A] border border-white/[0.08] hover:border-white/[0.16] rounded-2xl overflow-hidden shadow-xl transition-all group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side */}
              <div className="lg:col-span-7 min-h-[280px] lg:min-h-[420px] relative overflow-hidden bg-[#090A0C]">
                {featuredArticle.img_url && (
                  <img 
                    src={featuredArticle.img_url} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-transparent opacity-60" />
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-[#12141A]">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-medium text-[#10B981] mb-4 font-mono uppercase">
                    <span className="bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-sm">
                      {featuredArticle.category}
                    </span>
                    <span className="text-[#60646E]">•</span>
                    <span className="text-[#9B9FA8] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredArticle.read_time}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#F4F4F2] mb-4 group-hover:text-white transition-colors leading-snug font-heading">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-[#9B9FA8] text-xs md:text-sm leading-relaxed mb-6 font-normal font-sans line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-white/[0.06] pt-4">
                  <span className="text-[11px] text-[#60646E] font-sans">{formatDate(featuredArticle.created_at, featuredArticle.date)}</span>
                  <span className="text-xs font-semibold text-[#F4F4F2] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-heading">
                    อ่านต่อ <ArrowUpRight className="w-3.5 h-3.5 text-[#10B981]" />
                  </span>
                </div>
              </div>

            </div>
          </Link>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {normalArticles.map((article) => (
            <Link 
              key={article.id}
              href={`/journal/${article.slug}`}
              className="bg-[#12141A] border border-white/[0.08] hover:border-white/[0.16] rounded-2xl overflow-hidden shadow-md transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image top */}
                <div className="aspect-[16/10] relative overflow-hidden bg-[#090A0C]">
                  {article.img_url && (
                    <img 
                      src={article.img_url} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  )}
                </div>

                {/* Text body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[10px] font-medium text-[#10B981] mb-3 font-mono uppercase">
                    <span>{article.category}</span>
                    <span className="text-[#60646E]">•</span>
                    <span className="text-[#60646E]">{article.read_time}</span>
                  </div>
                  
                  <h4 className="text-sm md:text-base font-semibold text-[#F4F4F2] mb-2 group-hover:text-white transition-colors leading-snug font-heading line-clamp-2">
                    {article.title}
                  </h4>
                  
                  {article.excerpt && (
                    <p className="text-[#9B9FA8] text-xs leading-relaxed line-clamp-2 font-normal font-sans">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] flex justify-between items-center text-xs">
                <span className="text-[11px] text-[#60646E] font-sans">{formatDate(article.created_at, article.date)}</span>
                <span className="font-semibold text-[#F4F4F2] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-heading">
                  อ่านบทความ <ArrowUpRight className="w-3 h-3 text-[#10B981]" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
