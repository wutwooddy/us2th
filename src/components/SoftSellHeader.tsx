'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { mockArticles, Article } from '@/lib/mockArticles';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SoftSellHeader() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        if (!error && data && data.length >= 4) {
          setArticles(data);
        } else {
          setArticles(mockArticles.slice(0, 4));
        }
      } catch (err) {
        setArticles(mockArticles.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  return (
    <section className="w-full bg-[#0A0D3A] py-14 px-4 md:px-8 border-b border-[#5865F2]/20 font-sans text-[#F2F3F5] relative">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse" />
          <span className="text-xs font-bold text-[#5865F2] uppercase tracking-widest font-heading">
            [ #COMMUNITY-JOURNAL // FASHION ARCHIVES ]
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <h3 className="text-2xl md:text-3xl font-black text-[#F2F3F5] font-heading text-left tracking-tight">
            บทความแนะนำ & อัปเดตเทรนด์สตรีทแวร์
          </h3>
          <Link
            href="#magazine"
            className="text-xs font-bold text-[#00B0F4] hover:text-[#5865F2] flex items-center gap-1 font-heading uppercase tracking-wide transition-colors"
          >
            ดูบทความทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Articles Grid - Discord Forum Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-full aspect-[4/3] bg-[#1E2353]/40 animate-pulse rounded-2xl border border-[#5865F2]/20" />
            ))
          ) : (
            articles.map((art) => (
              <Link 
                href={`/journal/${art.slug}`} 
                key={art.id}
                className="group flex flex-col bg-[#1E2353]/50 border border-[#5865F2]/20 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#5865F2]/50 hover:bg-[#1E2353]/80 transition-all duration-300 discord-embed-blurple"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[#111214] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={art.img_url} 
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D3A]/90 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow text-left">
                  <div>
                    <span className="text-[10px] font-black text-[#EC48BD] uppercase tracking-widest mb-2 inline-block px-2 py-0.5 rounded-md bg-[#EC48BD]/10 border border-[#EC48BD]/20 font-heading">
                      {art.category || 'LIFESTYLE'}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-[#F2F3F5] line-clamp-2 leading-relaxed group-hover:text-[#00B0F4] transition-colors font-sans mb-4">
                      {art.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-[#949BA4] group-hover:text-[#F2F3F5] flex items-center gap-1 mt-auto font-heading uppercase tracking-wider">
                    อ่านเนื้อหา <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#5865F2]" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
