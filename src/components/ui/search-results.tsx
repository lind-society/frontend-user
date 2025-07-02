'use client';

import { Filter, SearchIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import SearchResultItem from '@/components/ui/search-result-item';

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

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onClose: () => void;
  onViewAll: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  onClose,
  onViewAll,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'rent' | 'buy' | 'tourist-activity'
  >('all');
  const t = useTranslations('SearchResults');

  // Group results by type
  const groupedResults = {
    rent: results.filter((result) => result.type === 'rent'),
    buy: results.filter((result) => result.type === 'buy'),
    tourist: results.filter((result) => result.type === 'tourist-activity'),
  };

  const getFilteredResults = () => {
    if (activeFilter === 'all') {
      return results;
    }
    return results.filter((result) => result.type === activeFilter);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'rent':
        return t('rent');
      case 'buy':
        return t('buy');
      case 'tourist-activity':
        return t('activity');
      default:
        return t('property');
    }
  };

  const filteredResults = getFilteredResults();

  return (
    <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[600px] overflow-hidden'>
      {/* Header */}
      <div className='p-4 border-b border-gray-100'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <SearchIcon className='w-4 h-4 text-gray-400' />
            <span className='text-sm font-medium text-gray-700'>
              {t('resultsFor', { query })}
            </span>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-2'>
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveFilter('all')}
            className='text-xs'
          >
            {t('all', { count: results.length })}
          </Button>
          <Button
            variant={activeFilter === 'rent' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveFilter('rent')}
            className='text-xs'
          >
            {t('rent')} ({groupedResults.rent.length})
          </Button>
          <Button
            variant={activeFilter === 'buy' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveFilter('buy')}
            className='text-xs'
          >
            {t('buy')} ({groupedResults.buy.length})
          </Button>
          <Button
            variant={
              activeFilter === 'tourist-activity' ? 'default' : 'outline'
            }
            size='sm'
            onClick={() => setActiveFilter('tourist-activity')}
            className='text-xs'
          >
            {t('activity')} ({groupedResults.tourist.length})
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className='overflow-y-auto max-h-[400px]'>
        {filteredResults.length > 0 ? (
          <div className='p-2 space-y-2'>
            {filteredResults.map((result) => (
              <SearchResultItem key={result.id} {...result} onClick={onClose} />
            ))}
          </div>
        ) : (
          <div className='p-8 text-center text-gray-500'>
            <Filter className='w-8 h-8 mx-auto mb-2 text-gray-300' />
            <p>
              {t('noResultsForFilter', { filter: getTypeLabel(activeFilter) })}
            </p>
            <p className='text-sm mt-1'>{t('tryAnotherFilter')}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='p-3 border-t border-gray-100 bg-gray-50'>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>
            {t('showingResults', {
              count: filteredResults.length,
              total: results.length,
            })}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={onViewAll}
            className='text-xs'
          >
            {t('viewAllResults')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
