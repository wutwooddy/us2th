import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

interface FeedItem {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  imgUrl?: string;
}

// Helper to fetch and parse RSS from Sneaker News and Hypebeast
async function fetchNewsFromRSS(): Promise<FeedItem[]> {
  const feeds = [
    'https://sneakernews.com/feed/',
    'https://hypebeast.com/footwear/feed'
  ];

  const items: FeedItem[] = [];

  for (const url of feeds) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        next: { revalidate: 0 }
      });

      if (!res.ok) continue;
      const text = await res.text();

      const rawItems = text.match(/<item>([\s\S]*?)<\/item>/g) || [];
      for (const raw of rawItems.slice(0, 5)) {
        const titleMatch = raw.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || raw.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = raw.match(/<link>([\s\S]*?)<\/link>/);
        const descMatch = raw.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || raw.match(/<description>([\s\S]*?)<\/description>/);
        const imgMatch = raw.match(/url="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/) || raw.match(/src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/);

        const title = titleMatch?.[1]?.replace(/&#\d+;/g, '')?.trim();
        const link = linkMatch?.[1]?.trim();
        const description = descMatch?.[1]?.replace(/<[^>]+>/g, '')?.replace(/&#\d+;/g, '')?.trim();
        const imgUrl = imgMatch?.[1];

        if (title && link) {
          items.push({
            title,
            link,
            description,
            imgUrl: imgUrl || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200'
          });
        }
      }
    } catch (e) {
      console.warn(`Error fetching RSS feed ${url}:`, e);
    }
  }

  return items;
}

export async function GET(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Fetch recent articles from RSS feeds
    const newsItems = await fetchNewsFromRSS();
    if (newsItems.length === 0) {
      return NextResponse.json({ error: 'ไม่พบรายการข่าวจาก RSS Feeds ในขณะนี้' }, { status: 500 });
    }

    // 2. Query existing articles from Supabase to prevent duplicate posts
    const { data: existingArticles } = await supabase
      .from('articles')
      .select('title, slug')
      .order('created_at', { ascending: false })
      .limit(30);

    const existingTitles = new Set(existingArticles?.map(a => a.title.toLowerCase()) || []);
    const existingSlugs = new Set(existingArticles?.map(a => a.slug.toLowerCase()) || []);

    // Find first news item that has not been written yet
    const candidate = newsItems.find(item => {
      const basicSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return !existingTitles.has(item.title.toLowerCase()) && !existingSlugs.has(basicSlug);
    }) || newsItems[0];

    // 3. Translate & Rewrite using Gemini API if key exists, or generate high quality curated article
    let articleData = {
      title: candidate.title,
      slug: candidate.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50),
      excerpt: candidate.description?.slice(0, 160) || 'อัปเดตข่าวสารสินค้าสตรีทแวร์และสนีกเกอร์รุ่นใหม่ล่าสุดจากต่างประเทศ พร้อมบริการสั่งซื้อเหมาจ่ายเบ็ดเสร็จกับ US2TH',
      content: `${candidate.description || ''}\n\nสำหรับผู้ที่สนใจสินค้าสตรีทแวร์และสนีกเกอร์รุ่นนี้ สามารถนำลิงก์สินค้าส่งมาให้ทีมงาน US2TH ตรวจสอบราคาเหมาจ่ายเบ็ดเสร็จรวมส่งถึงหน้าบ้านผ่าน LINE OA หรือ Facebook ได้ทันทีครับ`,
      category: 'SNEAKER NEWS',
      read_time: '4 min read',
      img_url: candidate.imgUrl || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200'
    };

    if (apiKey) {
      const prompt = `คุณคือนักข่าวและนักเขียนบทความแฟชั่นสตรีทแวร์และสนีกเกอร์ระดับไฮเอนด์ (Luxury Streetwear & Sneaker Journalist) ของเว็บไซต์ US2TH
หน้าที่ของคุณคือ: นำข่าวภาษาอังกฤษต่อไปนี้ มาแปล เรียบเรียง และเขียนบทความใหม่เป็นภาษาไทยที่อ่านสนุก น่าติดตาม เข้าถึงกลุ่มนักสะสมและคนรักสตรีทแวร์ชาวไทย (วัยรุ่นและผู้ใหญ่ 40+ ที่ชอบรองเท้าหายาก)

ข้อมูลข่าวต้นฉบับ:
หัวข้อข่าว: ${candidate.title}
เนื้อหาข่าวเบื้องต้น: ${candidate.description}
ลิงก์ต้นฉบับ: ${candidate.link}

ให้ตอบกลับในรูปแบบ JSON เท่านั้น (Strict JSON) โดยมีโครงสร้างฟิลด์ดังนี้:
{
  "title": "พาดหัวข่าวภาษาไทยที่กระชับ ดึงดูดความสนใจ ไม่เกิน 60 ตัวอักษร (ห้ามใช้อีโมจิและห้ามใช้เครื่องหมาย em-dash —)",
  "slug": "url-slug-ภาษาอังกฤษ-ตัวพิมพ์เล็กคั่นด้วยขีดกลาง-เช่น-nike-gt-cut-4-sunset",
  "excerpt": "บทนำสรุปสั้นๆ 2-3 บรรทัด เล่าถึงความน่าสนใจของรุ่นนี้ จุดเด่น หรือวันวางจำหน่าย",
  "content": "เนื้อหาบทความฉบับเต็มภาษาไทย ความยาวอย่างน้อย 3-4 ย่อหน้า เล่าประวัติ ความพิเศษของคู่สี/วัสดุ วันวางจำหน่าย และคำแนะนำสำหรับนักสะสม ปิดท้ายด้วยการเชิญชวนให้นำลิงก์มาฝากสั่งซื้อเหมาจ่ายกับ US2TH",
  "category": "หมวดหมู่ภาษาอังกฤษ (เช่น SNEAKER NEWS, STREETWEAR, หรือ RELEASE REPORT)",
  "read_time": "ระยะเวลาในการอ่าน (เช่น 4 min read)"
}`;

      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                responseMimeType: 'application/json'
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawJsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawJsonText) {
            const parsed = JSON.parse(rawJsonText);
            articleData = {
              title: parsed.title || articleData.title,
              slug: (parsed.slug || articleData.slug) + '-' + Math.floor(1000 + Math.random() * 9000),
              excerpt: parsed.excerpt || articleData.excerpt,
              content: parsed.content || articleData.content,
              category: parsed.category || articleData.category,
              read_time: parsed.read_time || articleData.read_time,
              img_url: candidate.imgUrl || articleData.img_url
            };
          }
        }
      } catch (geminiError) {
        console.error('Gemini API synthesis error:', geminiError);
      }
    }

    // 4. Insert newly generated article into Supabase
    const thaiMonthsShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const now = new Date();
    const formattedDate = `${now.getDate()} ${thaiMonthsShort[now.getMonth()]} ${now.getFullYear() + 543}`;

    const { data: inserted, error: insertError } = await supabase
      .from('articles')
      .insert([
        {
          title: articleData.title,
          slug: articleData.slug,
          excerpt: articleData.excerpt,
          content: articleData.content,
          category: articleData.category,
          read_time: articleData.read_time,
          img_url: articleData.img_url,
          featured: false,
        }
      ])
      .select();

    if (insertError) {
      console.error('Error saving article to Supabase:', insertError);
      return NextResponse.json({
        success: false,
        error: insertError.message,
        preview: articleData
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'สร้างและเผยแพร่บทความข่าวสารสตรีทแวร์ใหม่เรียบร้อยแล้ว',
      article: inserted?.[0] || articleData
    });

  } catch (error: any) {
    console.error('Fetch news error:', error);
    return NextResponse.json({ error: error?.message || 'เกิดข้อผิดพลาดในการดึงข่าว' }, { status: 500 });
  }
}
