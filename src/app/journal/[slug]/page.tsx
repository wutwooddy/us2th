import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SafetyBanner from '@/components/SafetyBanner';
import StickyMobileBottomBar from '@/components/StickyMobileBottomBar';
import { mockArticles } from '@/lib/mockArticles';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  let article = null;
  try {
    const { data } = await supabase
      .from('articles')
      .select('title, excerpt')
      .eq('slug', slug)
      .single();
    if (data) {
      article = data;
    }
  } catch (err) {
    // Ignore query error, will try fallback
  }

  // Fallback to mockup
  if (!article) {
    article = mockArticles.find((a) => a.slug === slug);
  }

  if (!article) {
    return {
      title: 'Not Found | US2TH',
    };
  }

  return {
    title: `${article.title} | US2TH Journal`,
    description: article.excerpt || 'อ่านบทความแนะนำด้านสตรีทแวร์ แบรนด์เนม และการนำเข้าสินค้าจากต่างประเทศกับ US2TH Journal',
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let article = null;
  try {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) {
      article = data;
    }
  } catch (err) {
    console.error('Supabase query error, fallback to mockup: ', err);
  }

  // Fallback check
  if (!article) {
    const mock = mockArticles.find((a) => a.slug === slug);
    if (mock) {
      article = mock;
    }
  }

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('th-TH', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfb] font-sans antialiased">
      {/* Safety warning banner */}
      <SafetyBanner />

      {/* Main navigation header */}
      <Header />
      
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4 py-16">
        <Link href="/#magazine" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-blue transition-colors mb-8 font-heading">
          <ArrowLeft className="w-4 h-4" /> กลับไปอ่านวารสารทั้งหมด
        </Link>

        <article className="bg-white border border-slate-100 p-6 md:p-12 rounded-3xl shadow-sm">
          {/* Article Header Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-brand-green tracking-wider mb-6 font-heading">
            <span>{article.category}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.read_time}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-8 font-heading">
            {article.title}
          </h1>

          {/* Featured Image */}
          {article.img_url && (
            <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden mb-10 bg-slate-50 border border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={article.img_url} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <div className="border-l-4 border-brand-blue pl-4 py-1.5 text-slate-600 text-sm md:text-base italic leading-relaxed mb-8 font-semibold">
              {article.excerpt}
            </div>
          )}

          {/* Content Body */}
          <div 
            className="text-slate-700 text-base leading-relaxed whitespace-pre-line font-semibold space-y-6"
          >
            {article.content}
          </div>
        </article>
      </main>

      {/* Footer & Mobile Navigation bar */}
      <Footer />
      <StickyMobileBottomBar />
    </div>
  );
}
