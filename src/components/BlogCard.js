import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { getImageUrl } from '@/lib/blogService';

const BlogCard = ({ post, featured = false }) => {
  // Handle safely when post might be undefined
  if (!post) {
    return null;
  }
  
  // Safely access post properties and provide fallbacks
  const imageUrl = post.featuredImage ? getImageUrl(post.featuredImage) : '/next.svg';
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'No date';

  // Calculate read time (approximately 200 words per minute)
  const readTime = post.content ? Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200)) : 1;

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="group neu-card rounded-xl overflow-hidden transition-all duration-300 h-full">
          <div className="relative h-48 w-full">
            <Image 
              src={imageUrl} 
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-fit transition-transform duration-500 rounded-md group-hover:scale-105"
              priority={featured}
            />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="neu-btn-primary text-xs font-medium text-white px-2 py-1 rounded-full transition-all">
                {post.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-color transition-colors">
              {post.title}
            </h2>
            <p className="mb-4 line-clamp-2">
              {post.excerpt || post.content.substring(0, 120) + '...'}
            </p>
            <div className="neu-pressed p-3 rounded-lg flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="group neu-card rounded-xl overflow-hidden transition-all duration-300">
        <div className="relative h-48 w-full">
          <Image 
            src={imageUrl} 
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-fit transition-transform rounded-md duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="neu-btn-primary text-xs font-medium text-white px-2 py-1 rounded-full transition-all">
              {post.category}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-color transition-colors">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2">
            {post.excerpt || post.content.substring(0, 120) + '...'}
          </p>
          <div className="neu-pressed p-3 rounded-lg flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;