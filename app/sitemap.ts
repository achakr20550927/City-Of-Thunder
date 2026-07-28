import type { MetadataRoute } from 'next';

const BASE = 'https://cityofthunder.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ['', '/lessons', '/book'].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}
