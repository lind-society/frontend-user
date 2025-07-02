'use client';

import { SearchIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import SearchResults from '@/components/ui/search-results';
import SearchSuggestions from '@/components/ui/search-suggestions';

// Data dummy untuk testing
const dummyData = {
  rent: [
    {
      id: 'rent-1',
      title: 'Villa Sunset Paradise',
      location: 'Bali, Indonesia',
      price: 'Rp 2.500.000',
      period: 'per malam',
      rating: 4.8,
      reviews: 124,
      image: '/images/discover-1.png',
      type: 'rent' as const,
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
    },
    {
      id: 'rent-2',
      title: 'Luxury Beach House',
      location: 'Lombok, Indonesia',
      price: 'Rp 3.200.000',
      period: 'per malam',
      rating: 4.9,
      reviews: 89,
      image: '/images/discover-2.png',
      type: 'rent' as const,
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
    },
    {
      id: 'rent-3',
      title: 'Mountain View Villa',
      location: 'Bandung, Indonesia',
      price: 'Rp 1.800.000',
      period: 'per malam',
      rating: 4.7,
      reviews: 156,
      image: '/images/discover-3.jpeg',
      type: 'rent' as const,
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
    },
  ],
  buy: [
    {
      id: 'buy-1',
      title: 'Premium Apartment Unit',
      location: 'Jakarta Selatan, Indonesia',
      price: 'Rp 2.500.000.000',
      period: 'total',
      rating: 4.6,
      reviews: 67,
      image: '/images/discover-4.jpeg',
      type: 'buy' as const,
      bedrooms: 2,
      bathrooms: 2,
      size: '85m²',
    },
    {
      id: 'buy-2',
      title: 'Luxury Villa Investment',
      location: 'Bali, Indonesia',
      price: 'Rp 8.500.000.000',
      period: 'total',
      rating: 4.8,
      reviews: 45,
      image: '/images/discover-5.jpeg',
      type: 'buy' as const,
      bedrooms: 5,
      bathrooms: 4,
      size: '350m²',
    },
    {
      id: 'buy-3',
      title: 'Modern Townhouse',
      location: 'Surabaya, Indonesia',
      price: 'Rp 1.800.000.000',
      period: 'total',
      rating: 4.5,
      reviews: 89,
      image: '/images/discover-6.jpeg',
      type: 'buy' as const,
      bedrooms: 3,
      bathrooms: 3,
      size: '120m²',
    },
  ],
  tourist: [
    {
      id: 'tourist-1',
      title: 'Bali Island Tour',
      location: 'Bali, Indonesia',
      price: 'Rp 850.000',
      period: 'per orang',
      rating: 4.9,
      reviews: 234,
      image: '/images/tourist-1.jpeg',
      type: 'tourist-activity' as const,
      duration: '1 hari',
      groupSize: '2-8 orang',
    },
    {
      id: 'tourist-2',
      title: 'Komodo Dragon Adventure',
      location: 'Labuan Bajo, Indonesia',
      price: 'Rp 1.200.000',
      period: 'per orang',
      rating: 4.8,
      reviews: 156,
      image: '/images/tourist-2.jpeg',
      type: 'tourist-activity' as const,
      duration: '2 hari',
      groupSize: '4-12 orang',
    },
    {
      id: 'tourist-3',
      title: 'Yogyakarta Cultural Tour',
      location: 'Yogyakarta, Indonesia',
      price: 'Rp 650.000',
      period: 'per orang',
      rating: 4.7,
      reviews: 189,
      image: '/images/tourist-3.jpeg',
      type: 'tourist-activity' as const,
      duration: '1 hari',
      groupSize: '2-6 orang',
    },
  ],
};

interface SearchResult {
  id: string;
  title: string;
  location: string;
  price: string;
  period: string;
  rating: number;
  reviews: number;
  image: string;
  type: 'rent' | 'buy' | 'tourist-activity';
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  size?: string;
  duration?: string;
  groupSize?: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('navbar');
  const t2 = useTranslations('SearchBar');

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    setIsLoading(true);
    setIsSearchOpen(true);

    // Simulate API call delay
    setTimeout(() => {
      const results: SearchResult[] = [];

      // Search in rent data
      dummyData.rent.forEach((item) => {
        if (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push(item);
        }
      });

      // Search in buy data
      dummyData.buy.forEach((item) => {
        if (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push(item);
        }
      });

      // Search in tourist data
      dummyData.tourist.forEach((item) => {
        if (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push(item);
        }
      });

      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim().length < 2) {
      setIsSearchOpen(true);
    }
  };

  // const getTypeIcon = (type: string) => {
  //   switch (type) {
  //     case 'rent':
  //       return <Home className='w-4 h-4' />;
  //     case 'buy':
  //       return <Home className='w-4 h-4' />;
  //     case 'tourist-activity':
  //       return <Plane className='w-4 h-4' />;
  //     default:
  //       return <Home className='w-4 h-4' />;
  //   }
  // };

  // const getTypeLabel = (type: string) => {
  //   switch (type) {
  //     case 'rent':
  //       return 'Sewa';
  //     case 'buy':
  //       return 'Beli';
  //     case 'tourist-activity':
  //       return 'Aktivitas Wisata';
  //     default:
  //       return 'Properti';
  //   }
  // };

  // const getTypeColor = (type: string) => {
  //   switch (type) {
  //     case 'rent':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'buy':
  //       return 'bg-green-100 text-green-800';
  //     case 'tourist-activity':
  //       return 'bg-purple-100 text-purple-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };

  return (
    <div className='relative w-full' ref={searchRef}>
      {/* Search Input */}
      <div className='flex h-[52px] '>
        <div className='relative flex-1'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('search.placeholder')}
            className='h-full w-full px-4 pr-10 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm'
            onFocus={handleInputFocus}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setIsSearchOpen(false);
              }}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <X className='w-4 h-4' />
            </button>
          )}
        </div>
        <Button className='bg-primary h-full px-4 rounded-r-md hover:bg-primary/90 rounded-l-none border-l-0'>
          <SearchIcon size={20} className='text-white' />
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {isSearchOpen && (
        <>
          {isLoading ? (
            <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4'>
              <div className='text-center text-gray-500'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto'></div>
                <p className='mt-2'>{t2('loading')}</p>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <SearchResults
              results={searchResults}
              query={searchQuery}
              onClose={() => setIsSearchOpen(false)}
              onViewAll={() => {
                setIsSearchOpen(false);
                // Navigate to search results page
                window.location.href = `/search?q=${encodeURIComponent(
                  searchQuery
                )}`;
              }}
            />
          ) : searchQuery.length >= 2 ? (
            <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4'>
              <div className='text-center text-gray-500'>
                <SearchIcon className='w-8 h-8 mx-auto mb-2 text-gray-300' />
                <p>{t2('noResults', { query: searchQuery })}</p>
                <p className='text-sm mt-1'>{t2('tryAnotherKeyword')}</p>
              </div>
            </div>
          ) : searchQuery.length === 0 ? (
            <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default SearchBar;
