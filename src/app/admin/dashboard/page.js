// src/app/admin/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts, getCategories } from '@/lib/blogService';
import { Plus, FileText, Layers, Tag } from 'lucide-react';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const allPosts = await getAllPosts();
        const allCategories = await getCategories();
        
        setPosts(allPosts);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Dashboard stats
  const stats = [
    { name: 'Total Posts', value: posts.length, icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { name: 'Categories', value: categories.length, icon: Tag, color: 'bg-purple-50 text-purple-600' },
    { name: 'Published Posts', value: posts.filter(post => post.status === 'published').length, icon: Layers, color: 'bg-green-50 text-green-600' },
  ];

  // Recent posts (last 5)
  const recentPosts = posts.slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 neu-pressed rounded-xl">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="neu-card overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 p-3 rounded-md neu-convex ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="neu-card mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Posts</h3>
          <Link
            href="/admin/posts/create"
            className="neu-btn-primary inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md"
          >
            <Plus size={16} className="mr-2" />
            New Post
          </Link>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post.$id} className="hover:neu-pressed transition-all">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-purple-600 truncate">{post.title}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="neu-btn-primary px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-white">
                        {post.status || 'published'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Tag className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {post.category}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Created {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                      <Link
                        href={`/admin/posts/edit/${post.$id}`}
                        className="neu-btn ml-4 text-purple-600 hover:text-purple-900 px-2 py-1 rounded-md"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500 neu-pressed m-4 rounded-lg">
              No posts yet. Create your first post.
            </li>
          )}
        </ul>
        {posts.length > 5 && (
          <div className="px-4 py-3 neu-pressed rounded-b-lg text-right sm:px-6">
            <Link
              href="/admin/posts"
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              View all posts
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        )}
      </div>

      <div className="neu-card">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Categories</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Categories used across your blog posts.</p>
        </div>
        <div className="px-4 py-3 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <span
                  key={`${category}-${index}`}
                  className="neu-btn inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))
            ) : (
              <p className="text-gray-500 neu-pressed p-3 rounded-lg">No categories found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}