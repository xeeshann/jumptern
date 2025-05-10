import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | Jumptern',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
            <Link 
            href="/blog" 
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-full border border-gray-300 transition-colors"
          >
            Browse Opportunities
          </Link>
        </div>
      </div>
    </div>
  );
}