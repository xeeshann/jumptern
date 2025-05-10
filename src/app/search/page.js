'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import SearchInput from '@/components/SearchInput';
import { getAllPosts } from '@/lib/blogService';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      setIsLoading(true);
      try {
        // Get all posts
        const allPosts = await getAllPosts();
        
        // Filter posts based on search term
        const filtered = allPosts.filter(post => {
          const searchLower = queryParam.toLowerCase();
          return (
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.category.toLowerCase().includes(searchLower) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchLower))
          );
        });
        
        setSearchResults(filtered);
      } catch (error) {
        console.error('Error searching posts:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    setSearchTerm(queryParam);
    fetchSearchResults();
  }, [queryParam]);
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to blog link */}
      <div className="mb-8">        <Link href="/blog" className="neu-btn inline-flex items-center gap-2 text-gray-600 hover:text-primary-color transition-colors">
          <ArrowLeft size={18} />
          <span>Back to all opportunities</span>
        </Link>
      </div>
      
      <header className="mb-12 neu-card p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Search Results for: <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{searchTerm}</span>
        </h1>
        <div className="max-w-xl">
          <SearchInput className="w-full" />
        </div>
      </header>
      
      {/* Search Results */}
      {isLoading ? (
        <div className="text-center py-12 neu-pressed p-8 rounded-xl">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-color border-r-transparent align-[-0.125em]"></div>          <p className="mt-4 text-gray-600">Searching for opportunities...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <>
          <p className="mb-8 text-gray-600 neu-flat p-4 rounded-lg">Found {searchResults.length} opportunity/opportunities</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map(post => (
              <BlogCard key={post.$id} post={post} />
            ))}
          </div>
        </>
      ) : (        <div className="text-center py-12 neu-card">
          <h3 className="text-2xl font-medium text-gray-600 mb-4">No opportunities found</h3>
          <p className="text-gray-500 mb-8">
            We couldn't find any opportunities matching your search term. Try different keywords or browse all opportunities.
          </p>
          <Link 
            href="/blog" 
            className="neu-btn px-6 py-3 text-white font-medium rounded-full transition-all inline-block"
          >
            Browse All Opportunities
          </Link>
        </div>
      )}
    </div>
  );
}