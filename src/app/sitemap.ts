import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://us2th.vercel.app';

  // 1. Base Static URLs
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  // 2. Fetch dynamic articles from Supabase
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, created_at')
      .order('created_at', { ascending: false });

    if (articles && articles.length > 0) {
      const articleUrls = articles.map((article) => ({
        url: `${baseUrl}/journal/${article.slug}`,
        lastModified: new Date(article.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

      return [...staticUrls, ...articleUrls];
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap: ', error);
  }

  return staticUrls;
}
