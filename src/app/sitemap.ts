import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vatikasweets.com';

  const routes = [
    '',
    '/sweets',
    '/cakes',
    '/bakery',
    '/festivals',
    '/gallery',
    '/custom-orders',
    '/about',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
