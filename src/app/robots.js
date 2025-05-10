import { MetadataRoute } from 'next';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/login', '/admin/dashboard'],
    },
    sitemap: 'https://jumptern.tech/sitemap.xml',
  };
}
