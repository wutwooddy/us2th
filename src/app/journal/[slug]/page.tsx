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

  const date = new Date(article.created_at);
  const day = date.getDate();
  const thaiMonthsShort = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  const month = thaiMonthsShort[date.getMonth()];
  const year = date.getFullYear() + 543;
  const formattedDate = `${day} ${month} ${year}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#090A0C] text-[#F4F4F2] font-sans antialiased selection:bg-[#10B981] selection:text-black">
      {/* Safety warning banner */}
      <SafetyBanner />

      {/* Main navigation header */}
      <Header />
      
      <main className="flex-grow max-w-[840px] w-full mx-auto px-4 py-12 md:py-16">
        <Link 
          href="/#magazine" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9B9FA8] hover:text-[#F4F4F2] transition-colors mb-8 font-heading uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#10B981]" /> กลับไปอ่าน Journal ทั้งหมด
        </Link>

        <article className="bg-[#12141A] border border-white/[0.08] p-6 md:p-12 rounded-2xl shadow-xl">
          {/* Article Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#10B981] mb-6 font-mono uppercase">
            <span className="bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-sm">
              {article.category}
            </span>
            <span className="text-[#60646E]">•</span>
            <span className="text-[#9B9FA8] flex items-center gap-1 font-sans">
              <Calendar className="w-3.5 h-3.5 text-[#60646E]" />
              {formattedDate}
            </span>
            <span className="text-[#60646E]">•</span>
            <span className="text-[#9B9FA8] flex items-center gap-1 font-sans">
              <Clock className="w-3.5 h-3.5 text-[#60646E]" />
              {article.read_time}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-[#F4F4F2] leading-tight mb-6 font-heading">
            {article.title}
          </h1>

          {/* Featured Image */}
          {article.img_url && (
            <div className="w-full aspect-[16/10] relative rounded-xl overflow-hidden mb-8 bg-[#090A0C] border border-white/[0.08]">
              <img 
                src={article.img_url} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <div className="border border-white/[0.08] bg-[#090A0C] px-6 py-4 rounded-xl text-[#9B9FA8] text-xs md:text-sm leading-relaxed mb-8 font-sans">
              {article.excerpt}
            </div>
          )}

          {/* Content Body */}
          <div 
            className="text-[#9B9FA8] text-sm md:text-base leading-[1.8] whitespace-pre-line space-y-6 font-sans"
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
