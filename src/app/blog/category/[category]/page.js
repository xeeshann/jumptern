import { getPostsByCategory } from '@/lib/blogService';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  // Check if params.category is defined before accessing its properties
  const category = params?.category ? 
    params.category.charAt(0).toUpperCase() + params.category.slice(1) : 
    'All Categories';
  
  return {
    title: `${category} Opportunities | Jumptern`,
    description: `Explore our collection of ${category.toLowerCase()} opportunities and resources. Find jobs, internships, and career advice.`,
    keywords: `${category.toLowerCase()} jobs, ${category.toLowerCase()} internships, ${category.toLowerCase()} career advice, ${category.toLowerCase()} opportunities`,
    openGraph: {
      title: `${category} Opportunities | Jumptern`,
      description: `Explore our collection of ${category.toLowerCase()} opportunities and resources.`,
      url: `https://jumptern.tech/blog/category/${params.category}`,
      siteName: 'Jumptern',
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(category)}&subtitle=${encodeURIComponent('Opportunities and Resources')}`,
          width: 1200,
          height: 630,
          alt: `${category} Opportunities`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category} Opportunities | Jumptern`,
      description: `Explore our collection of ${category.toLowerCase()} opportunities and resources.`,
      images: [`/api/og?title=${encodeURIComponent(category)}&subtitle=${encodeURIComponent('Opportunities and Resources')}`],
      creator: '@jumptern',
    },
  };
}

export default async function CategoryPage({ params }) {
  // Check if params.category is defined before accessing its properties
  const category = params?.category ? 
    params.category.charAt(0).toUpperCase() + params.category.slice(1) : 
    'All Categories';
    
  // Safely handle potentially undefined category
  const posts = await getPostsByCategory(category);
    
  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Opportunities | Jumptern`,
    description: `Explore our collection of ${category.toLowerCase()} opportunities and resources. Find jobs, internships, and career advice.`,
    url: `https://jumptern.tech/blog/category/${params.category}`,    publisher: {
      '@type': 'Organization',
      name: 'Jumptern',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jumptern.tech/icon.svg'
      }
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({        '@type': 'ListItem',
        position: index + 1,
        url: `https://jumptern.tech/blog/${post.slug}`
      }))
    }
  };
    return (
    <div className="container mx-auto px-4 py-12">
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Back to blog link */}
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">          <ArrowLeft size={18} />
          <span>Back to all opportunities</span>
        </Link>
      </div>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{category}</span> Opportunities
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Explore our collection of {category.toLowerCase()} job listings, internship opportunities, and career resources.
        </p>
      </header>
      
      {/* Blog Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard key={post.$id} post={post} />
          ))}
        </div>
      ) : (        <div className="text-center py-12">
          <h3 className="text-2xl font-medium text-gray-600">No opportunities found in this category</h3>
          <p className="mt-2 text-gray-500">
            Check back soon for new listings or browse our <Link href="/blog" className="text-purple-600 hover:text-purple-700 transition-colors">other opportunities</Link>.
          </p>
        </div>
      )}
    </div>
  );
}