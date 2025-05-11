// src/app/layout.js
import './globals.css'; // Tailwind imported here
import { Montserrat, Merriweather } from 'next/font/google';
import Header from '@/components/Header'; // Assuming path alias @/ to src/
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

// Heading font
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800']
});

// Body font
const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
  weight: ['300', '400', '700', '900']
});

export const metadata = {
  title: 'Jumptern - Jobs & Internships Resources',
  description: 'Jumptern - Your go-to platform for job listings, internship opportunities, career advice, and professional development resources',
  metadataBase: new URL('https://jumptern.tech'),
  keywords: 'jumptern, jobs, internships, career advice, job listings, internship opportunities, professional development, employment, career resources',
  authors: [{ name: 'Jumptern Team' }],
  creator: 'Jumptern',
  publisher: 'Jumptern',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Jumptern - Jobs & Internships Resources',
    description: 'Your go-to platform for job listings, internship opportunities, and career advice',
    url: 'https://jumptern.tech',
    siteName: 'Jumptern',
    images: [
      {
        url: 'https://jumptern.tech/icon.svg',
        width: 800,
        height: 600,
        alt: 'Jumptern Logo',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jumptern - Jobs & Internships Resources',
    description: 'Your go-to platform for job listings, internship opportunities, and career advice',
    images: ['https://jumptern.tech/icon.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${merriweather.variable}`} dir="ltr">
      <head>
        <link rel="canonical" href="https://jumptern.tech" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={merriweather.className}>
        <ThemeProvider>
          <div className="min-h-screen">
            <Header />
            <main className="neu-container py-8 px-4 sm:px-6 lg:px-8">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}