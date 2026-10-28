/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SearchIcon, SortAsc } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  activityToSearchResult,
  propertyToSearchResult,
  villaToSearchResult,
} from '@/lib/mappers/search';
import { useActivities } from '@/hooks/api/useActivity';
import { useProperties } from '@/hooks/api/useProperty';
import { useVillas } from '@/hooks/api/useVilla';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import SearchResultItem from '@/components/ui/search-result-item';

import { SearchResult } from '@/types/search-result';

const RESULTS_PER_TYPE = 20;

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'rent' | 'buy' | 'tourist-activity'
  >('all');
  const [sortBy, setSortBy] = useState<
    'relevance' | 'price' | 'rating' | 'reviews'
  >('relevance');

  /**
   * The results page renders full cards (price, photo, rating), which the thin
   * `GET /search` projection cannot supply. So it queries the three per-type
   * list endpoints instead — each exposes `name`/`secondaryName`/`address`/
   * `country` as searchable columns — and merges them client-side.
   */
  const enabled = Boolean(query);

  const villas = useVillas(
    enabled ? { page: 1, limit: RESULTS_PER_TYPE, search: query } : {}
  );
  const properties = useProperties(
    enabled ? { page: 1, limit: RESULTS_PER_TYPE, search: query } : {}
  );
  const activities = useActivities(
    enabled ? { page: 1, limit: RESULTS_PER_TYPE, search: query } : {}
  );

  const isLoading =
    villas.isLoading || properties.isLoading || activities.isLoading;

  const results = React.useMemo<SearchResult[]>(
    () => [
      ...(villas.data?.data.data ?? []).map(villaToSearchResult),
      ...(properties.data?.data.data ?? []).map(propertyToSearchResult),
      ...(activities.data?.data.data ?? []).map(activityToSearchResult),
    ],
    [villas.data, properties.data, activities.data]
  );

  useEffect(() => {
    let filtered = results;

    // Apply type filter
    if (activeFilter !== 'all') {
      filtered = results.filter((result) => result.type === activeFilter);
    }

    // Apply sorting. Price/rating/reviews are optional on the shared model
    // (properties carry no rating, for one), so missing values sort last
    // instead of coercing to NaN.
    const parsePrice = (value?: string) => {
      if (!value) return Number.POSITIVE_INFINITY;
      const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10);
      return Number.isNaN(numeric) ? Number.POSITIVE_INFINITY : numeric;
    };

    switch (sortBy) {
      case 'price':
        filtered = [...filtered].sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        );
        break;
      case 'rating':
        filtered = [...filtered].sort(
          (a, b) => (b.rating ?? -1) - (a.rating ?? -1)
        );
        break;
      case 'reviews':
        filtered = [...filtered].sort(
          (a, b) => (b.reviews ?? -1) - (a.reviews ?? -1)
        );
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredResults(filtered);
  }, [results, activeFilter, sortBy]);

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
  //       return 'bg-blue-100 text-blue-800 border-blue-200';
  //     case 'buy':
  //       return 'bg-green-100 text-green-800 border-green-200';
  //     case 'tourist-activity':
  //       return 'bg-purple-100 text-purple-800 border-purple-200';
  //     default:
  //       return 'bg-sand/40 text-ink border-bronze/25';
  //   }
  // };

  const groupedResults = {
    rent: results.filter((result) => result.type === 'rent'),
    buy: results.filter((result) => result.type === 'buy'),
    tourist: results.filter((result) => result.type === 'tourist-activity'),
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-bone'>
        <BaseContainer>
          <div className='py-8'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
              <p className='mt-4 text-ink-soft'>Mencari hasil...</p>
            </div>
          </div>
        </BaseContainer>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-bone'>
      <BaseContainer>
        <div className='py-8'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <SearchIcon className='w-6 h-6 text-primary' />
              <h1 className='text-2xl font-bold text-ink'>Hasil Pencarian</h1>
            </div>
            <p className='text-ink-soft'>
              Menampilkan hasil untuk "{query}" - {results.length} item
              ditemukan
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className='bg-cream-light rounded shadow-sm border border-bronze/25 p-4 mb-6'>
            <div className='flex flex-wrap gap-4 items-center justify-between'>
              {/* Type Filters */}
              <div className='flex flex-wrap gap-2'>
                <Button
                  variant={activeFilter === 'all' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setActiveFilter('all')}
                >
                  Semua ({results.length})
                </Button>
                <Button
                  variant={activeFilter === 'rent' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setActiveFilter('rent')}
                >
                  Sewa ({groupedResults.rent.length})
                </Button>
                <Button
                  variant={activeFilter === 'buy' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setActiveFilter('buy')}
                >
                  Beli ({groupedResults.buy.length})
                </Button>
                <Button
                  variant={
                    activeFilter === 'tourist-activity' ? 'default' : 'outline'
                  }
                  size='sm'
                  onClick={() => setActiveFilter('tourist-activity')}
                >
                  Aktivitas ({groupedResults.tourist.length})
                </Button>
              </div>

              {/* Sorting */}
              <div className='flex items-center gap-2'>
                <SortAsc className='w-4 h-4 text-ink-muted' />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className='border border-bronze/30 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                >
                  <option value='relevance'>Relevansi</option>
                  <option value='price'>Harga Terendah</option>
                  <option value='rating'>Rating Tertinggi</option>
                  <option value='reviews'>Ulasan Terbanyak</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredResults.length > 0 ? (
            <div className='grid gap-4'>
              {filteredResults.map((result) => (
                <SearchResultItem key={result.id} {...result} />
              ))}
            </div>
          ) : (
            <div className='bg-cream-light rounded shadow-sm border border-bronze/25 p-12 text-center'>
              <SearchIcon className='w-12 h-12 mx-auto mb-4 text-ink-muted/60' />
              <h3 className='text-lg font-medium text-ink mb-2'>
                Tidak ada hasil ditemukan
              </h3>
              <p className='text-ink-soft mb-4'>
                Tidak ada hasil untuk "{query}" dengan filter yang dipilih
              </p>
              <Button variant='outline' onClick={() => setActiveFilter('all')}>
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </BaseContainer>
    </div>
  );
};

export default SearchPage;
