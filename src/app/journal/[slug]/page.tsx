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
    <div className="flex flex-col min-h-screen bg-[#FBFBFA] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-white">
      {/* Safety warning banner */}
      <SafetyBanner />

      {/* Main navigation header */}
      <Header />
      
      <main className="flex-grow max-w-[860px] w-full mx-auto px-4 py-12 md:py-16 text-left">
        <Link 
          href="/#magazine" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#666666] hover:text-[#111111] transition-colors mb-8 font-heading uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-[#059669]" /> กลับไปอ่าน Journal ทั้งหมด
        </Link>

        <article className="bg-white border border-[#D4D4CE] p-6 md:p-12 rounded-2xl shadow-xs">
          {/* Article Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#059669] mb-6 font-mono uppercase">
            <span className="bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded">
              {article.category}
            </span>
            <span className="text-[#999999]">•</span>
            <span className="text-[#666666] flex items-center gap-1 font-sans">
              <Calendar className="w-4 h-4 text-[#666666]" />
              {formattedDate}
            </span>
            <span className="text-[#999999]">•</span>
            <span className="text-[#666666] flex items-center gap-1 font-sans">
              <Clock className="w-4 h-4 text-[#666666]" />
              {article.read_time}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl font-bold text-[#111111] leading-tight mb-6 font-heading">
            {article.title}
          </h1>

          {/* Featured Image */}
          {article.img_url && (
            <div className="w-full aspect-[16/10] relative rounded-xl overflow-hidden mb-8 bg-[#F4F4F0] border border-[#E5E5E0]">
              <img 
                src={article.img_url} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <div className="border border-[#E5E5E0] bg-[#FBFBFA] px-6 py-4 rounded-xl text-[#444444] text-base leading-relaxed mb-8 font-sans">
              {article.excerpt}
            </div>
          )}

          {/* Content Body - comfortable 17px/18px font size for 40+ */}
          <div 
            className="text-[#333333] text-base sm:text-lg leading-[1.85] whitespace-pre-line space-y-6 font-sans"
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
