'use client'

import React from 'react'
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import SearchInput from './SearchInput';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 hd py-4 mb-8">
      <div className="neu-container">        <div className="flex items-center justify-between">          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.svg" alt="Jumptern Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Jumptern
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium neu-btn hover:text-primary-color transition-colors">
              Home
            </Link>            <Link href="/blog" className="font-medium neu-btn hover:text-primary-color transition-colors">
              All Posts
            </Link>            <Link href="/about" className="font-medium neu-btn hover:text-primary-color transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-medium neu-btn hover:text-primary-color transition-colors">
              Contact
            </Link>
            <SearchInput className="w-64" />
            
            {/* Dark Mode Toggle Button */}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            
            <button 
              className="neu-btn p-2 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-6 flex flex-col gap-4 md:hidden neu-pressed p-4 rounded-lg">
            <Link href="/" className="font-medium py-2 hover:text-primary-color transition-colors">
              Home
            </Link>            <Link href="/blog" className="font-medium py-2 hover:text-primary-color transition-colors">
              All Posts
            </Link>            <Link href="/about" className="font-medium py-2 hover:text-primary-color transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-medium py-2 hover:text-primary-color transition-colors">
              Contact
            </Link>
            <SearchInput />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;