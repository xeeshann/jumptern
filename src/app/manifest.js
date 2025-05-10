import { MetadataRoute } from 'next';

export default function manifest() {
  return {
    name: 'Jumptern',
    short_name: 'Jumptern',
    description: 'Your go-to platform for job listings, internship opportunities, and career advice',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#764ba2',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/next.svg',
        sizes: '192x192',
        type: 'image/svg',
      },
      {
        src: '/next.svg',
        sizes: '512x512',
        type: 'image/svg',
      },
    ],
  };
}
