import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const SearchInput = ({ responsive = false, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>      <input
        type="text"
        placeholder="Search opportunities..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`neu-input w-full py-2 px-4 pr-10 rounded-full focus:outline-none ${
          responsive ? 'text-text-color md:text-text-color' : ''
        }`}
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-color transition-colors"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchInput;