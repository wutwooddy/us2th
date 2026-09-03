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
    <div className="flex flex-col min-h-screen bg-[#0A0D3A] text-[#DBDEE1] font-sans antialiased selection:bg-[#5865F2] selection:text-white">
      {/* Safety warning banner */}
      <SafetyBanner />

      {/* Main navigation header */}
      <Header />
      
      <main className="flex-grow max-w-[840px] w-full mx-auto px-4 py-16">
        <Link 
          href="/#magazine" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#949BA4] hover:text-[#00B0F4] transition-colors mb-8 font-heading uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-[#5865F2]" /> กลับไปอ่าน Journal ทั้งหมด
        </Link>

        <article className="bg-[#1E1F22] border border-[#5865F2]/25 p-6 md:p-12 rounded-3xl shadow-2xl discord-embed-blurple">
          {/* Article Header Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#35ED7E] tracking-wider mb-6 font-heading">
            <span className="bg-[#23A55A]/15 border border-[#23A55A]/30 px-2.5 py-0.5 rounded-md">
              {article.category}
            </span>
            <span className="text-[#35373C]">•</span>
            <span className="text-[#949BA4] flex items-center gap-1 font-sans font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="text-[#35373C]">•</span>
            <span className="text-[#949BA4] flex items-center gap-1 font-sans font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.read_time}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl md:text-4xl font-black text-[#F2F3F5] leading-tight mb-8 font-heading">
            {article.title}
          </h1>

          {/* Featured Image */}
          {article.img_url && (
            <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden mb-10 bg-[#111214] border border-[#35373C]">
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
            <div className="border-l-4 border-[#5865F2] bg-[#111214] p-4 rounded-r-xl text-[#DBDEE1] text-sm md:text-base italic leading-relaxed mb-8 font-medium font-sans">
              {article.excerpt}
            </div>
          )}

          {/* Content Body */}
          <div 
            className="text-[#DBDEE1] text-base leading-[1.8] whitespace-pre-line font-medium space-y-6 font-sans"
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
