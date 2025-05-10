// src/app/admin/posts/create/page.js
'use client';

import PostEditor from '@/components/PostEditor';

export default function CreatePost() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <PostEditor />
        </div>
      </div>
    </div>
  );
}