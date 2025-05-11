import { getAllPosts, getCategories } from '@/lib/blogService';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { Tag } from 'lucide-react';

export const metadata = {
  title: 'Jobs & Internships | Jumptern',
  description: 'Explore our collection of job listings, internship opportunities, and career advice. Find your next professional step.',
  keywords: 'jobs, internships, career advice, employment opportunities, job search, internship search',
  openGraph: {
    title: 'Jobs & Internships | Jumptern',
    description: 'Explore our collection of job listings, internship opportunities, and career advice.',
    url: 'https://jumptern.tech/blog',
    siteName: 'Jumptern',
    type: 'website',
  },
};

export default async function BlogPage() {
  // Fetch all posts and categories
  const posts = await getAllPosts();
  const categories = await getCategories();
  
  return (
    <div className="container mx-auto md:px-4 py-4 md:py-12">
      <header className="mb-12 text-center neu-card p-8">        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Jobs &</span> Internship Posts
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          Explore our collection of job listings, internship opportunities, and tech related posts.
        </p>
        
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Link 
                key={`${category}-${index}`}
                href={`/blog/category/${typeof category === 'string' ? category.toLowerCase() : category}`}
                className="neu-btn inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                <Tag size={16} />
                {category}
              </Link>
            ))}
          </div>
        )}
      </header>
      
      {/* Blog Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard key={post.$id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 neu-pressed p-8 rounded-xl">          <h3 className="text-2xl font-medium text-gray-600">No opportunities found</h3>
          <p className="mt-2 text-gray-500">Check back soon for new opportunities!</p>
        </div>
      )}
    </div>
  );
}