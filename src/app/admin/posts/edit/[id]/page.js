// src/app/admin/posts/edit/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { databases } from '@/lib/appwrite';
import PostEditor from '@/components/PostEditor';

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      if (!params.id) {
        router.push('/admin/posts');
        return;
      }

      try {
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
        
        const response = await databases.getDocument(
          databaseId,
          collectionId,
          params.id
        );
        
        setPost(response);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post. It might have been deleted or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading post data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <h2 className="text-lg font-medium text-red-800">Error</h2>
        <p className="mt-1 text-sm text-red-700">{error}</p>
        <div className="mt-4">
          <button
            onClick={() => router.push('/admin/posts')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Return to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {post && <PostEditor post={post} />}
        </div>
      </div>
    </div>
  );
}