import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Tag, Share2, ArrowLeft } from 'lucide-react';
import { getPost, getRecentPosts, getImageUrl } from '@/lib/blogService';
import BlogCard from '@/components/BlogCard';
import TableOfContents from '@/components/TableOfContents';

// Function to extract headings from HTML content and generate TOC data
function extractTOC(htmlContent) {
  const headingRegex = /<h([1-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // Remove any HTML tags from the heading text
    const text = match[3].replace(/<[^>]*>/g, '');
    
    toc.push({ level, id, text });
  }

  return toc;
}

// Function to ensure all headings have IDs for TOC links
function ensureHeadingIds(htmlContent) {
  // First pass: Add ids to headings if they don't have them
  // Regex to match h1, h2 and h3 tags
  const headingRegex = /<h([1-3])([^>]*)>(.*?)<\/h\1>/g;
  
  return htmlContent.replace(headingRegex, (match, level, attributes, content) => {
    // Check if the heading already has an id attribute
    if (attributes.includes('id="')) {
      return match;
    }
    
    // Create a slug from the content (removing HTML tags)
    const plainText = content.replace(/<[^>]*>/g, '');
    const slug = plainText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-');     // Remove consecutive hyphens
    
    // Return the heading with an added id attribute and appropriate styling class
    return `<h${level}${attributes} id="${slug}">${content}</h${level}>`;
  });
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }  return {
    title: `${post.title} | Jumptern`,
    description: post.excerpt || post.content.substring(0, 160),
    keywords: `${typeof post.category === 'string' ? post.category : ''}, jobs, internships, career advice, jumptern, ${post.title.toLowerCase()}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      url: `/blog/${post.slug}`,
      siteName: 'Jumptern',
      images: [
        {
          url: post.featuredImage 
            ? getImageUrl(post.featuredImage) 
            : `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category || 'Jumptern')}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],      locale: 'en-US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ['Jumptern'],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: [post.featuredImage 
        ? getImageUrl(post.featuredImage) 
        : `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category || 'Jumptern')}`],
      creator: '@jumptern',
    },
  };
}

// Function to generate JSON-LD structured data
function generateJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    image: post.featuredImage ? getImageUrl(post.featuredImage) : '/next.svg',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,    author: {
      '@type': 'Organization',
      name: 'Jumptern',
      url: '/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jumptern',
      logo: {
        '@type': 'ImageObject',
        url: '/next.svg',
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/blog/${post.slug}`,
    },
    keywords: [post.category, 'jobs', 'internships', 'career advice', post.title.toLowerCase()].filter(Boolean).join(', ')
  };
}

export default async function BlogPostPage({ params }) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Validate that slug exists
  if (!slug) {
    notFound();
  }
  
  const post = await getPost(slug);
  
  // If post is null, redirect to 404 page
  if (!post) {
    notFound();
  }
  
  try {
    // Calculate read time (approximately 200 words per minute)
    const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
    
    // Format date
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
      // Get related posts (here we're just getting recent posts, but you could filter by category)
    const relatedPosts = await getRecentPosts(3);
    
    // Get image URL
    const imageUrl = post.featuredImage ? getImageUrl(post.featuredImage) : '/next.svg';

    // Generate JSON-LD structured data
    const jsonLd = generateJsonLd(post);
    
    // Process content to ensure headings have IDs
    const processedContent = ensureHeadingIds(post.content);
    
    // Extract TOC data from the processed content
    const tocData = extractTOC(processedContent);
    
    return (
      <div className="container mx-auto px-4 py-12">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Back to blog link */}
        <div className="mb-8">          <Link href="/blog" className="neu-btn inline-flex items-center gap-2 text-gray-600 hover:text-primary-color transition-colors">
            <ArrowLeft size={18} />
            <span>Back to all opportunities</span>
          </Link>
        </div>
        
        {/* Article Header */}
        <header className="mb-12 neu-flat p-6 rounded-xl">
          <div className="mx-auto w-full">
            {/* Category */}
            <Link 
              href={`/blog/category/${typeof post.category === 'string' ? post.category.toLowerCase() : post.category}`}
              className="neu-btn-primary inline-flex items-center gap-1 px-4 py-1 text-white rounded-full text-sm font-medium mb-4"
            >
              <Tag size={14} />
              {post.category}
            </Link>
            
            {/* Title */}
            <h1 className="text-sm md:text-xl lg:text-2xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm mb-8 neu-pressed p-4 rounded-lg">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{readTime} min read</span>
              </div>
              <button className="neu-btn flex items-center gap-1 text-primary-color hover:text-primary-dark transition-colors ml-auto">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative h-[300px] md:h-[500px] w-full neu-card rounded-2xl overflow-hidden mb-6">
            <Image 
              src={imageUrl} 
              alt={post.title} 
              fill
              priority
              className="object-fit"
            />
          </div>
        </header>

        {/* Article Content with Table of Contents */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents (sticky sidebar) */}
          {tocData && tocData.length > 0 && (
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-8">
                <TableOfContents tocData={tocData} />
              </div>
            </div>
          )}
            {/* Main Content */}
          <div className={`${tocData && tocData.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'} order-1 lg:order-2`}>
            <article className="neu-card p-6 rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            </article>
          </div>
        </div>
          
        {/* Tags */}
        <div className="mt-12 pt-8 p-4 rounded-lg max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 font-medium">Tags:</span>
            <Link 
              href={`/blog/category/${typeof post.category === 'string' ? post.category.toLowerCase() : post.category}`} 
              className="neu-btn px-3 py-1 rounded-full text-sm transition-all"
            >
              {post.category}
            </Link>
          </div>
        </div>
       
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-24">
            <div className="max-w-6xl mx-auto">              <h2 className="text-2xl md:text-3xl font-bold mb-8 p-4 rounded-lg">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Related</span> Opportunities
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts
                  .filter(relatedPost => relatedPost.$id !== post.$id)
                  .slice(0, 3)
                  .map(relatedPost => (
                    <BlogCard key={relatedPost.$id} post={relatedPost} />
                  ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}