'use client';

import { SearchIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { toSearchResult } from '@/lib/mappers/search';
import { useSearch } from '@/hooks/api/useSearch';

import { Button } from '@/components/ui/button';
import SearchResults from '@/components/ui/search-results';
import SearchSuggestions from '@/components/ui/search-suggestions';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // debounced mirror of `searchQuery` — what actually hits the API
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('navbar');
  const t2 = useTranslations('SearchBar');

  // Debounce so typing does not fire one request per keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isFetching } = useSearch(
    { name: debouncedQuery, page: 1, limit: 10 },
    MIN_QUERY_LENGTH
  );

  const searchResults = React.useMemo(
    () => (data?.data.data ?? []).map(toSearchResult),
    [data]
  );

  const isLoading = isFetching;

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

  /**
   * Matching now happens server-side via GET /search; this only drives the
   * input value and dropdown visibility. `useSearch` stays disabled until the
   * debounced query reaches MIN_QUERY_LENGTH.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(query.trim().length >= MIN_QUERY_LENGTH);
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
  //       return 'bg-sand/40 text-ink';
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
            className='h-full w-full px-4 pr-10 border border-r-0 border-bronze/30 rounded-l focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm'
            onFocus={handleInputFocus}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-ink-muted hover:text-ink-soft'
            >
              <X className='w-4 h-4' />
            </button>
          )}
        </div>
        <Button className='bg-primary h-full px-4 rounded-r hover:bg-primary/90 rounded-l-none border-l-0'>
          <SearchIcon size={20} className='text-white' />
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {isSearchOpen && (
        <>
          {isLoading ? (
            <div className='absolute top-full left-0 right-0 mt-1 bg-cream-light border border-bronze/25 rounded-lg shadow-lg z-50 p-4'>
              <div className='text-center text-ink-muted'>
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
            <div className='absolute top-full left-0 right-0 mt-1 bg-cream-light border border-bronze/25 rounded-lg shadow-lg z-50 p-4'>
              <div className='text-center text-ink-muted'>
                <SearchIcon className='w-8 h-8 mx-auto mb-2 text-ink-muted/60' />
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
