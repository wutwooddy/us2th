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
    <section id="magazine" className="w-full bg-[#FBFBFA] py-20 md:py-24 px-4 md:px-8 border-b border-[#E5E5E0] text-[#111111] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E0] pb-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider font-heading">
                คู่มือและบทความแนะนำ
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#111111] font-heading">
              US2TH Journal
            </h2>
            <p className="text-base text-[#555555] mt-2 max-w-xl leading-relaxed font-sans">
              บทความให้ความรู้เรื่องการเช็คของแท้ วิธีสั่งซื้อสินค้าจากต่างประเทศ และเทรนด์ของสะสมระดับพรีเมียม
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-[#555555] font-sans">
            <BookOpen className="w-4 h-4 text-[#059669]" />
            <span>คลังความรู้สำหรับนักสะสม</span>
          </div>
        </div>

        {/* Featured Article Layout */}
        {featuredArticle && (
          <Link 
            href={`/journal/${featuredArticle.slug}`} 
            className="block mb-12 bg-white border border-[#D4D4CE] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side */}
              <div className="lg:col-span-7 min-h-[300px] lg:min-h-[440px] relative overflow-hidden bg-[#F4F4F0]">
                {featuredArticle.img_url && (
                  <img 
                    src={featuredArticle.img_url} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white text-left">
                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#059669] mb-4 font-mono uppercase">
                    <span className="bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded">
                      {featuredArticle.category}
                    </span>
                    <span className="text-[#999999]">•</span>
                    <span className="text-[#666666] flex items-center gap-1 font-sans">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.read_time}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mb-4 group-hover:text-[#059669] transition-colors leading-snug font-heading">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-6 font-normal font-sans line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#E5E5E0] pt-4">
                  <span className="text-sm text-[#777777] font-sans">{formatDate(featuredArticle.created_at, featuredArticle.date)}</span>
                  <span className="text-sm font-bold text-[#111111] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-heading">
                    อ่านต่อฉบับเต็ม <ArrowUpRight className="w-4 h-4 text-[#059669]" />
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
              className="bg-white border border-[#E5E5E0] hover:border-[#D4D4CE] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between cursor-pointer text-left"
            >
              <div>
                {/* Image top */}
                <div className="aspect-[16/10] relative overflow-hidden bg-[#F4F4F0]">
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
                  <div className="flex items-center gap-2 text-xs font-medium text-[#059669] mb-3 font-mono uppercase">
                    <span>{article.category}</span>
                    <span className="text-[#999999]">•</span>
                    <span className="text-[#777777] font-sans">{article.read_time}</span>
                  </div>
                  
                  <h4 className="text-base font-bold text-[#111111] mb-2 group-hover:text-[#059669] transition-colors leading-snug font-heading line-clamp-2">
                    {article.title}
                  </h4>
                  
                  {article.excerpt && (
                    <p className="text-[#555555] text-sm leading-relaxed line-clamp-2 font-normal font-sans">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-[#E5E5E0] flex justify-between items-center text-xs">
                <span className="text-[#777777] font-sans">{formatDate(article.created_at, article.date)}</span>
                <span className="font-bold text-[#111111] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-heading">
                  อ่านบทความ <ArrowUpRight className="w-3.5 h-3.5 text-[#059669]" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
