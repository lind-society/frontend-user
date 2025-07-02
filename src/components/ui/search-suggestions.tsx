'use client';

import { Home, MapPin, Plane, SearchIcon, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'location' | 'property' | 'activity';
  count: number;
}

const popularSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'Bali', type: 'location', count: 1240 },
  { id: '2', text: 'Jakarta', type: 'location', count: 890 },
  { id: '3', text: 'Bandung', type: 'location', count: 567 },
  { id: '4', text: 'Villa', type: 'property', count: 2340 },
  { id: '5', text: 'Apartment', type: 'property', count: 1560 },
  { id: '6', text: 'Tour', type: 'activity', count: 890 },
  { id: '7', text: 'Adventure', type: 'activity', count: 456 },
  { id: '8', text: 'Luxury', type: 'property', count: 789 },
];

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  onSuggestionClick,
}) => {
  const t = useTranslations('SearchSuggestions');
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'location':
        return <MapPin className='w-3 h-3' />;
      case 'property':
        return <Home className='w-3 h-3' />;
      case 'activity':
        return <Plane className='w-3 h-3' />;
      default:
        return <SearchIcon className='w-3 h-3' />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'location':
        return t('location');
      case 'property':
        return t('property');
      case 'activity':
        return t('activity');
      default:
        return t('search');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'location':
        return 'bg-blue-100 text-blue-800';
      case 'property':
        return 'bg-green-100 text-green-800';
      case 'activity':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 max-h-[500px] overflow-y-auto'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-4'>
        <TrendingUp className='w-4 h-4 text-gray-400' />
        <span className='text-sm font-medium text-gray-700'>
          {t('popularSearches')}
        </span>
      </div>

      {/* Suggestions Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {popularSuggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion.text)}
            className='flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-100'
          >
            <div className='flex items-center gap-2'>
              {getTypeIcon(suggestion.type)}
              <span className='text-sm font-medium text-gray-900'>
                {suggestion.text}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Badge className={`text-xs ${getTypeColor(suggestion.type)}`}>
                {getTypeLabel(suggestion.type)}
              </Badge>
              <span className='text-xs text-gray-500'>{suggestion.count}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Links */}
      <div className='mt-4 pt-4 border-t border-gray-100'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='text-sm font-medium text-gray-700'>
            {t('exploreCategories')}
          </span>
        </div>
        <div className='flex flex-col md:flex-row gap-2'>
          <Link
            href='/rent'
            className='flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
          >
            <Home className='w-4 h-4' />
            {t('rentVilla')}
          </Link>
          <Link
            href='/buy'
            className='flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors'
          >
            <Home className='w-4 h-4' />
            {t('buyProperty')}
          </Link>
          <Link
            href='/tourist-activity'
            className='flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors'
          >
            <Plane className='w-4 h-4' />
            {t('touristActivity')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
