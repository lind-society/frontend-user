/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SearchIcon, SortAsc } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import SearchResultItem from '@/components/ui/search-result-item';

// Data dummy yang sama dengan SearchBar
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

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'rent' | 'buy' | 'tourist-activity'
  >('all');
  const [sortBy, setSortBy] = useState<
    'relevance' | 'price' | 'rating' | 'reviews'
  >('relevance');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        const allResults: SearchResult[] = [
          ...dummyData.rent,
          ...dummyData.buy,
          ...dummyData.tourist,
        ];

        const filtered = allResults.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.location.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setFilteredResults(filtered);
        setIsLoading(false);
      }, 500);
    }
  }, [query]);

  useEffect(() => {
    let filtered = results;

    // Apply type filter
    if (activeFilter !== 'all') {
      filtered = results.filter((result) => result.type === activeFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price':
        filtered = [...filtered].sort((a, b) => {
          const priceA = parseInt(
            a.price.replace('Rp ', '').replace(/\./g, '')
          );
          const priceB = parseInt(
            b.price.replace('Rp ', '').replace(/\./g, '')
          );
          return priceA - priceB;
        });
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
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
  //       return 'bg-gray-100 text-gray-800 border-gray-200';
  //   }
  // };

  const groupedResults = {
    rent: results.filter((result) => result.type === 'rent'),
    buy: results.filter((result) => result.type === 'buy'),
    tourist: results.filter((result) => result.type === 'tourist-activity'),
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <BaseContainer>
          <div className='py-8'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
              <p className='mt-4 text-gray-600'>Mencari hasil...</p>
            </div>
          </div>
        </BaseContainer>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <BaseContainer>
        <div className='py-8'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <SearchIcon className='w-6 h-6 text-primary' />
              <h1 className='text-2xl font-bold text-gray-900'>
                Hasil Pencarian
              </h1>
            </div>
            <p className='text-gray-600'>
              Menampilkan hasil untuk "{query}" - {results.length} item
              ditemukan
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
            <div className='flex flex-wrap gap-4 items-center justify-between'>
              {/* Type Filters */}
              <div className='flex gap-2'>
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
                <SortAsc className='w-4 h-4 text-gray-400' />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className='border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
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
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center'>
              <SearchIcon className='w-12 h-12 mx-auto mb-4 text-gray-300' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Tidak ada hasil ditemukan
              </h3>
              <p className='text-gray-600 mb-4'>
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
