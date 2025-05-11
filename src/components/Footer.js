import React from 'react'
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="neu-flat mt-12 py-8">
      <div className="neu-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}          <div className="col-span-1 md:col-span-2">            
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon.svg" alt="Jumptern Logo" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Jumptern
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Your gateway to job listings, internship opportunities, and valuable career advice. Find your next professional step with Jumptern.
            </p>            <div className="flex gap-4 mt-6">
              <a href="https://github.com/xeeshann" target="_blank" rel="noopener noreferrer" className="neu-btn p-2 rounded-full">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shokeen-teeli-186871222/" target="_blank" rel="noopener noreferrer" className="neu-btn p-2 rounded-full">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/mxeeshann/" target="_blank" rel="noopener noreferrer" className="neu-btn p-2 rounded-full">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="neu-card">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">              <li><Link href="/" className="text-gray-600 hover:text-primary-color transition-colors">Home</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-primary-color transition-colors">All Posts</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-primary-color transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary-color transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="neu-card">            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/blog/category/technology" className="text-gray-600 hover:text-primary-color transition-colors">Technology</Link></li>
              <li><Link href="/blog/category/business" className="text-gray-600 hover:text-primary-color transition-colors">Business</Link></li>
              <li><Link href="/blog/category/internships" className="text-gray-600 hover:text-primary-color transition-colors">Internships</Link></li>
              <li><Link href="/blog/category/careers" className="text-gray-600 hover:text-primary-color transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
          <div className="mt-12 pt-8 text-center text-gray-500 p-4 rounded-lg">
          <p>© {currentYear} Jumptern. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;