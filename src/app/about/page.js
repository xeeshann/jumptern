import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | Jumptern',
  description: 'Learn more about Jumptern. Our mission to connect job seekers with opportunities and provide valuable career resources.',
  keywords: 'about, jumptern, career platform, job opportunities, internships, team, mission',
  openGraph: {
    title: 'About Us | Jumptern',
    description: 'Learn more about Jumptern. Our mission to connect job seekers with opportunities and provide valuable career resources.',
    url: 'https://jumptern.tech/about',
    siteName: 'Jumptern',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Header Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center neu-card p-8">            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Jumptern</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              We're passionate about connecting talented individuals with job and internship opportunities to help them advance their careers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
           
            <div className="w-full neu-card">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">                Jumptern started in 2025 with a simple mission: to bridge the gap between job seekers and employers, with a special focus on internship opportunities for students and early-career professionals.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Today, we've evolved into a comprehensive platform that provides job listings, internship opportunities, and valuable career advice across various industries and sectors.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team of career experts and industry professionals are dedicated to helping individuals at all career stages find their next professional opportunity and develop their skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center p-8 rounded-xl">            <h2 className="text-xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              To connect talented individuals with meaningful job and internship opportunities, provide valuable career guidance, and help professionals at all stages achieve their career goals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="neu-card p-8 rounded-xl">
                <div className="w-14 h-14 neu-convex text-primary-color rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Inspire</h3>
                <p className="text-gray-600 text-center">
                  We curate content that sparks imagination and encourages creative thinking.
                </p>
              </div>
              
              <div className="neu-card p-8 rounded-xl">
                <div className="w-14 h-14 neu-convex text-primary-color rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Educate</h3>
                <p className="text-gray-600 text-center">
                  We provide practical knowledge and insights that our readers can apply to their projects.
                </p>
              </div>
              
              <div className="neu-card p-8 rounded-xl">
                <div className="w-14 h-14 neu-convex text-primary-color rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="m4.93 4.93 2.83 2.83"></path>
                    <path d="m16.24 16.24 2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="m4.93 19.07 2.83-2.83"></path>
                    <path d="m16.24 7.76 2.83-2.83"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Connect</h3>
                <p className="text-gray-600 text-center">
                  We build a community of creative thinkers who share ideas and inspire each other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center neu-card p-8">
            <h2 className="text-3xl font-bold mb-6">Join Our Creative Journey</h2>
            <p className="text-lg text-gray-700 mb-8">
              Explore our articles, join our newsletter, and become part of our growing community of creative thinkers.
            </p>
            <Link 
              href="/blog" 
              className="neu-btn-primary px-8 py-4 text-white font-medium rounded-full inline-flex items-center gap-2"
            >
              Explore Articles <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}