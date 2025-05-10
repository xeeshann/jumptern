// src/components/PostEditor.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Upload, Loader2, AlertCircle, Info } from 'lucide-react';
import { createPost, updatePost, uploadImage, getImageUrl } from '@/lib/blogService';

export default function PostEditor({ post = null }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [seoScore, setSeoScore] = useState(0);
  const [seoTips, setSeoTips] = useState([]);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    status: 'published',
    featured: false,
    featuredImage: '',
    metaKeywords: '',
  });

  // If post data is provided, it's an edit
  const isEdit = !!post;

  // Set initial form data if editing
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        category: post.category || '',
        status: post.status || 'published',
        featured: post.featured || false,
        featuredImage: post.featuredImage || '',
        metaKeywords: post.metaKeywords || '',
      });

      if (post.featuredImage) {
        setImagePreview(getImageUrl(post.featuredImage));
      }
      
      // Initial SEO evaluation
      evaluateSEO({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        featuredImage: post.featuredImage || '',
        metaKeywords: post.metaKeywords || '',
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };
    
    setFormData(newFormData);

    // Auto-generate slug from title
    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-'),
      }));
    }
    
    // Evaluate SEO score for content-related fields
    if (['title', 'content', 'excerpt', 'metaKeywords'].includes(name)) {
      evaluateSEO(newFormData);
    }
  };
  
  const evaluateSEO = (data) => {
    let score = 0;
    const tips = [];
    
    // Title length (recommended 50-60 characters)
    if (data.title.length > 0) {
      score += 10;
      if (data.title.length < 30) {
        tips.push("Title is too short. Aim for 50-60 characters for optimal SEO.");
      } else if (data.title.length > 70) {
        tips.push("Title is too long. Keep it under 60 characters for better search engine display.");
      } else {
        score += 10;
      }
    } else {
      tips.push("Add a descriptive title for your post.");
    }
    
    // Excerpt (meta description, recommended 140-160 characters)
    if (data.excerpt.length > 0) {
      score += 10;
      if (data.excerpt.length < 100) {
        tips.push("Meta description is too short. Aim for 140-160 characters.");
      } else if (data.excerpt.length > 170) {
        tips.push("Meta description is too long. Keep it under 160 characters for better search engine display.");
      } else {
        score += 10;
      }
    } else {
      tips.push("Add a compelling meta description (excerpt) to improve click-through rates.");
    }
    
    // Content length (at least 300 words for SEO)
    const wordCount = data.content.split(/\s+/).filter(Boolean).length;
    if (wordCount > 0) {
      score += 10;
      if (wordCount < 300) {
        tips.push(`Content is only ${wordCount} words. Aim for at least 300 words for better SEO.`);
      } else if (wordCount >= 800) {
        score += 20;
      } else {
        score += 10;
      }
    } else {
      tips.push("Add detailed, valuable content to your post.");
    }
    
    // Featured image
    if (data.featuredImage || imageFile) {
      score += 15;
    } else {
      tips.push("Add a featured image to improve engagement and social sharing.");
    }
    
    // Keywords
    if (data.metaKeywords && data.metaKeywords.length > 0) {
      score += 15;
    } else {
      tips.push("Add relevant keywords to help search engines understand your content.");
    }
    
    // Set the final score and tips
    setSeoScore(Math.min(100, score));
    setSeoTips(tips);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('image/')) {
      setError('Please select an image file.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    evaluateSEO({ ...formData, featuredImage: 'new-image' });
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFormData(prev => ({ ...prev, featuredImage: '' }));
    evaluateSEO({ ...formData, featuredImage: '' });
  };

  const suggestContentStructure = () => {
    const sampleStructure = `
<h2>Introduction</h2>
<p>Start with a compelling introduction that hooks the reader and briefly outlines what they'll learn.</p>

<h2>Main Point 1</h2>
<p>Develop your first key point with clear explanations and examples.</p>

<h3>Subpoint A</h3>
<p>Add supporting details, facts, or examples.</p>

<h3>Subpoint B</h3>
<p>Continue building on your main point with additional information.</p>

<h2>Main Point 2</h2>
<p>Move on to your next important point, following a logical structure.</p>

<h2>Practical Tips</h2>
<ul>
  <li>First actionable tip for readers</li>
  <li>Second actionable tip with explanation</li>
  <li>Third tip with an example</li>
</ul>

<h2>Conclusion</h2>
<p>Summarize the main points and provide a thoughtful closing that encourages engagement.</p>
`;

    const currentContent = formData.content;
    if (!currentContent || currentContent.trim() === '') {
      setFormData(prev => ({ ...prev, content: sampleStructure }));
    } else if (window.confirm('This will replace your current content with a structured template. Continue?')) {
      setFormData(prev => ({ ...prev, content: sampleStructure }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.title || !formData.slug || !formData.content || !formData.category) {
        throw new Error('Please fill in all required fields.');
      }

      // Upload image if selected
      let imageId = formData.featuredImage;
      if (imageFile) {
        imageId = await uploadImage(imageFile);
      }

      const postData = {
        ...formData,
        featuredImage: imageId,
      };

      // Create or update post
      if (isEdit && post.$id) {
        await updatePost(post.$id, postData);
        setSuccess('Post updated successfully!');
      } else {
        await createPost(postData);
        setSuccess('Post created successfully!');
      }

      // Redirect after short delay
      setTimeout(() => {
        router.push('/admin/posts');
      }, 1500);
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error.message || 'An error occurred while saving the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-600 rounded-md text-sm">
          {success}
        </div>
      )}
      
      {/* SEO Score Indicator */}
      <div className="neu-card p-5 rounded-lg">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-medium">SEO Score</h3>
          <span className={`text-sm font-semibold ${
            seoScore >= 80 ? 'text-green-600' : 
            seoScore >= 50 ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {seoScore}/100
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              seoScore >= 80 ? 'bg-green-600' : 
              seoScore >= 50 ? 'bg-yellow-500' : 
              'bg-red-600'
            }`} 
            style={{ width: `${seoScore}%` }}
          ></div>
        </div>
        
        {seoTips.length > 0 && (
          <div className="mt-3">
            <details className="text-sm">
              <summary className="flex items-center gap-1 cursor-pointer text-primary-color">
                <AlertCircle size={16} />
                <span className="font-medium">SEO Improvement Tips ({seoTips.length})</span>
              </summary>
              <ul className="mt-2 pl-5 space-y-1 list-disc text-gray-600">
                {seoTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </details>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="neu-pressed w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Enter post title"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.title.length}/60 characters (50-60 is ideal for SEO)
            </p>
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="neu-pressed inline-flex items-center px-3 rounded-l-md border-r border-gray-300 bg-gray-50 text-gray-500 text-sm">
                /blog/
              </span>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="neu-pressed w-full px-4 py-2 rounded-r-md focus:outline-none"
                placeholder="post-url-slug"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Auto-generated from title, but you can customize it
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="neu-pressed w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="e.g. Design, Technology, Inspiration"
              required
            />
          </div>

          {/* Excerpt / Meta Description */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description / Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="neu-pressed w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Write a compelling description for search engines and social media (150-160 characters ideal)"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              {formData.excerpt.length}/160 characters (140-160 is ideal for search results)
            </p>
          </div>
          
          {/* Meta Keywords */}
          <div>
            <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Keywords (comma separated)
            </label>
            <input
              type="text"
              id="metaKeywords"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleInputChange}
              className="neu-pressed w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="e.g. design, creative, blog, art"
            />
            <p className="mt-1 text-xs text-gray-500">
              Add 3-5 relevant keywords, separated by commas
            </p>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image
            </label>
            <div className="space-y-2">
              <div
                className="neu-card p-4 rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                {imagePreview ? (
                  <div className="relative w-full h-40">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={40} className="text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Post Status & Options */}
          <div className="neu-card p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-3">Post Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Feature this post (show in homepage)
                </label>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="neu-pressed w-full px-4 py-2 rounded-md"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Content */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content <span className="text-red-500">*</span>
              </label>
              <button 
                type="button"
                className="text-xs bg-primary-color text-white px-2 py-1 rounded hover:bg-primary-dark transition"
                onClick={suggestContentStructure}
              >
                Get Content Structure Template
              </button>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={20}
              className="neu-pressed w-full px-4 py-2 rounded-md focus:outline-none font-mono"
              placeholder="Write your post content here. You can use HTML tags for formatting."
              required
            ></textarea>
            <div className="mt-1 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {formData.content.split(/\s+/).filter(Boolean).length} words 
                (min. 300 words recommended for SEO)
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Info size={14} />
                <span>Supports HTML tags</span>
              </div>
            </div>
          </div>
          
          {/* Writing Tips */}
          <div className="neu-card p-5 rounded-lg bg-blue-50">
            <h3 className="font-medium text-blue-800 mb-3">Tips for SEO-Friendly, Creative Content</h3>
            <ul className="text-sm text-blue-700 space-y-2 list-disc pl-5">
              <li>Use H2 and H3 headings to structure your content for better readability and SEO</li>
              <li>Include your main keyword in the title, first paragraph, and at least one heading</li>
              <li>Write in a conversational tone and keep paragraphs short (2-3 sentences)</li>
              <li>Use bullet points or numbered lists for easily scannable content</li>
              <li>Add relevant images with descriptive alt text</li>
              <li>Include internal links to other relevant blog posts</li>
              <li>End with a question or call-to-action to encourage engagement</li>
              <li>Aim for at least 800 words for comprehensive topics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="neu-btn-primary px-6 py-2 text-white rounded-md flex items-center transition-all"
        >
          {isSubmitting && <Loader2 size={16} className="mr-2 animate-spin" />}
          {isEdit ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}