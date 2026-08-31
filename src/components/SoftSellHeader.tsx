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
    <section className="w-full bg-[#fafafa] py-12 px-4 md:px-8 border-b border-slate-100 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-heading">
            [ นิตยสารแฟชั่น & ช้อปปิ้งสตรีทแวร์ ]
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-8 font-heading text-left">
          บทความน่าสนใจ & อัปเดตเทรนด์แฟชั่น
        </h3>

        {/* 4 Articles Grid - Highly Mobile Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-full aspect-[4/3] bg-slate-200 animate-pulse rounded-2xl" />
            ))
          ) : (
            articles.map((art) => (
              <Link 
                href={`/journal/${art.slug}`} 
                key={art.id}
                className="group flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-350 transition-all duration-300"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={art.img_url} 
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow text-left">
                  <div>
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-wider mb-1 block">
                      {art.category || 'LIFESTYLE'}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors font-sans mb-4">
                      {art.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 flex items-center gap-0.5 mt-auto">
                    อ่านต่อ <ArrowRight className="w-3 h-3" />
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
