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
    <section className="w-full bg-[#090A0C] py-14 px-4 md:px-8 border-b border-white/[0.08] font-sans text-[#F4F4F2] relative">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.15em] font-mono">
            FEATURED ARTICLES
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <h3 className="text-xl md:text-2xl font-bold text-[#F4F4F2] font-heading text-left tracking-tight">
            บทความแนะนำ & อัปเดตเทรนด์สตรีทแวร์
          </h3>
          <Link
            href="#magazine"
            className="text-xs font-semibold text-[#9B9FA8] hover:text-[#F4F4F2] flex items-center gap-1 font-heading uppercase tracking-wide transition-colors"
          >
            ดูบทความทั้งหมด <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
          </Link>
        </div>

        {/* 4 Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-full aspect-[4/3] bg-[#12141A] rounded-2xl border border-white/[0.08]" />
            ))
          ) : (
            articles.map((art) => (
              <Link 
                href={`/journal/${art.slug}`} 
                key={art.id}
                className="group flex flex-col bg-[#12141A] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/[0.16] transition-all duration-300"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[#090A0C] flex-shrink-0">
                  <img 
                    src={art.img_url} 
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow text-left">
                  <div>
                    <span className="text-[10px] font-medium text-[#10B981] uppercase tracking-wider mb-1.5 inline-block font-mono">
                      {art.category || 'LIFESTYLE'}
                    </span>
                    <h4 className="text-xs md:text-sm font-semibold text-[#F4F4F2] line-clamp-2 leading-snug font-heading mb-3">
                      {art.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-medium text-[#60646E] group-hover:text-[#F4F4F2] flex items-center gap-1 mt-auto font-sans uppercase tracking-wider">
                    อ่านเนื้อหา <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#10B981]" />
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
