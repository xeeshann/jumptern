import React from 'react';
import Link from 'next/link';

export default function TableOfContents({ tocData }) {
  // Parse TOC data if it's a string
  const toc = typeof tocData === 'string' ? JSON.parse(tocData) : tocData;
  
  // If no TOC data or empty array, don't render anything
  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <div className="neu-card p-5 rounded-xl mb-8">
      <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {toc.map((item, index) => (
            <li 
              key={index} 
              className={`${
                item.level === 2 ? 'ml-2' : 
                item.level === 3 ? 'ml-5' : ''
              } ${
                item.level === 1 ? 'font-bold text-base' : 
                item.level === 2 ? 'font-medium text-sm' : 'text-sm'
              }`}
            >
              <Link 
                href={`#${item.id}`}
                className="text-gray-700 hover:text-primary-color transition-colors flex items-center group"
              >
                <span className={`
                  w-2 h-2 rounded-full 
                  ${item.level === 1 ? 'bg-primary-color' : 'bg-gray-300'} 
                  group-hover:bg-primary-color mr-2 transition-colors
                `}></span>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}