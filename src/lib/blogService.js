// src/lib/blogService.js
import { databases, storage, ID, Query } from '@/lib/appwrite';

// Database and collection IDs
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

export async function getAllPosts() {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        Query.equal('status', 'published'),
        Query.orderDesc('publishedAt'),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export async function getFeaturedPosts(limit = 3) {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        Query.equal('status', 'published'),
        Query.equal('featured', true),
        Query.orderDesc('publishedAt'),
        Query.limit(limit),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

export async function getRecentPosts(limit = 5) {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        Query.equal('status', 'published'),
        Query.orderDesc('publishedAt'),
        Query.limit(limit),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

export async function getPostsByCategory(category) {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        Query.equal('status', 'published'),
        Query.equal('category', category),
        Query.orderDesc('publishedAt'),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error(`Error fetching posts by category ${category}:`, error);
    return [];
  }
}

export async function getPost(slug) {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        Query.equal('slug', slug),
        Query.equal('status', 'published'),
      ]
    );
    
    if (response.documents.length === 0) {
      return null;
    }
    
    return response.documents[0];
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

export function getImageUrl(fileId) {
  return storage.getFileView(bucketId, fileId);
}

export async function getCategories() {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        Query.equal('status', 'published'),
      ]
    );
    
    // Extract unique categories
    const categoriesSet = new Set(
      response.documents.map(post => post.category)
    );
    
    return Array.from(categoriesSet);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function createPost(postData) {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt || '',
        featuredImage: postData.featuredImage || '',
        category: postData.category,
        publishedAt: new Date().toISOString(),
        status: postData.status || 'published',
        featured: postData.featured || false,
        metaKeywords: postData.metaKeywords || '',
        readingTime: calculateReadingTime(postData.content),
        toc: generateTableOfContents(postData.content),
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id, postData) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      collectionId,
      id,
      {
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt || '',
        featuredImage: postData.featuredImage || '',
        category: postData.category,
        status: postData.status || 'published',
        featured: postData.featured || false,
        metaKeywords: postData.metaKeywords || '',
        readingTime: calculateReadingTime(postData.content),
        toc: generateTableOfContents(postData.content),
        updatedAt: new Date().toISOString(),
      }
    );
    return response;
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
}

export async function deletePost(id) {
  try {
    await databases.deleteDocument(
      databaseId,
      collectionId,
      id
    );
    return true;
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
}

export async function uploadImage(file) {
  try {
    const response = await storage.createFile(
      bucketId,
      ID.unique(),
      file
    );
    return response.$id;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Helper function to calculate reading time
function calculateReadingTime(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200)); // Assuming 200 words per minute
  return readingTime;
}

// Helper function to generate a table of contents from HTML content
function generateTableOfContents(content) {
  try {
    // Extract headings with a regex pattern
    const headingPattern = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
    const toc = [];
    let match;
    let counter = 0;
    
    while ((match = headingPattern.exec(content)) !== null) {
      const level = parseInt(match[1], 10);
      const text = match[2].replace(/<\/?[^>]+(>|$)/g, ''); // Remove any HTML tags inside the heading
      const id = `heading-${counter}`;
      
      toc.push({
        id,
        text, 
        level,
      });
      
      counter++;
    }
    
    return JSON.stringify(toc);
  } catch (error) {
    console.error('Error generating table of contents:', error);
    return JSON.stringify([]);
  }
}