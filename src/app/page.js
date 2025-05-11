import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { getFeaturedPosts, getRecentPosts } from '@/lib/blogService';

export const metadata = {
  title: 'Jumptern - Jobs & Internships Platform',
  description: 'Find your next career opportunity with Jumptern. Browse job listings, internship opportunities, and career advice for professionals at all levels.',
  keywords: 'jobs, internships, career advice, employment, professional development, job search, internship search',
  openGraph: {
    title: 'Jumptern - Jobs & Internships Platform',
    description: 'Find your next career opportunity with Jumptern. Browse job listings, internship opportunities, and career advice.',
    url: 'https://jumptern.tech',
    siteName: 'Jumptern',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default async function Home() {
  // Fetch data for the page
  const featuredPosts = await getFeaturedPosts(3);
  const recentPosts = await getRecentPosts(6);
  
  return (
    <>
      {/* Hero Section */}
      <section className="md:py-4 py-2">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:pr-12 p-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Jumptern</span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {' '}Job Listings and Internship posts.
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Explore our curated job listings, internship opportunities, and posts to kickstart your career.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/blog" className="neu-btn px-6 py-3 text-black font-medium rounded-full flex items-center gap-2">
                  Browse Opportunities <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="neu-btn px-6 py-3 text-gray-900 font-medium rounded-full transition-all">
                  About Us
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex md:items-center md:justify-between mb-12 p-4 rounded-lg flex-col md:flex-row">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Featured</span> Posts
              </h2>
              <Link href="/blog" className="neu-btn text-sm flex items-center gap-2 text-primary-color hover:text-primary-dark transition-colors font-light">
                View All <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <BlogCard key={post.$id} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      

      {/* Recent Articles */}
      {recentPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex md:items-center md:justify-between mb-12 p-4 rounded-lg flex-col md:flex-row">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Recent</span> Posts
              </h2>
              <Link href="/blog" className="neu-btn text-sm flex items-center gap-2 text-primary-color hover:text-primary-dark transition-colors font-light">
                View All <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map(post => (
                <BlogCard key={post.$id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="w-full mx-auto text-center neu-card p-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
            <p className="text-lg opacity-90 mb-8">
              Get the latest job listings, internship opportunities, and career advice delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="neu-input flex-grow px-6 py-3 rounded-full focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="neu-btn-primary px-6 py-3 text-white font-medium rounded-full transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between neu-card p-8 md:p-12">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Creative Journey?</h2>
              <p className="text-lg text-gray-600">
                Join our community of creative thinkers and get inspired by the latest trends, ideas, and insights.
              </p>
            </div>
            <div>
              <Link 
                href="/blog" 
                className="neu-btn-primary px-8 py-4 text-white font-medium rounded-full transition-all inline-block"
              >
                Explore Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}