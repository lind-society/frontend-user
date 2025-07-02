'use client';

import {
  Bath,
  Bed,
  Calendar,
  Home,
  MapPin,
  Plane,
  Star,
  Users,
  Users2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface SearchResultItemProps {
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
  onClick?: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  id,
  title,
  location,
  price,
  period,
  rating,
  reviews,
  image,
  type,
  bedrooms,
  bathrooms,
  guests,
  size,
  duration,
  groupSize,
  onClick,
}) => {
  const t = useTranslations('SearchResultItem');
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rent':
        return <Home className='w-4 h-4' />;
      case 'buy':
        return <Home className='w-4 h-4' />;
      case 'tourist-activity':
        return <Plane className='w-4 h-4' />;
      default:
        return <Home className='w-4 h-4' />;
    }
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'buy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'tourist-activity':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price: string) => {
    // Remove "Rp " prefix and convert to number for formatting
    const numericPrice = price.replace('Rp ', '').replace(/\./g, '');
    const num = parseInt(numericPrice);

    if (isNaN(num)) return price;

    // Format with dots for thousands
    const formatted = num.toLocaleString('id-ID');
    return `Rp ${formatted}`;
  };

  return (
    <Link href={`/${type}/${id}`} onClick={onClick}>
      <Card className='p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200 shadow-sm hover:shadow-md'>
        <div className='flex gap-4'>
          {/* Image */}
          <div className='flex-shrink-0'>
            <div className='relative'>
              <Image
                src={image}
                alt={title}
                width={80}
                height={80}
                className='rounded-lg object-cover w-20 h-20'
              />
              <Badge
                className={`absolute -top-2 -right-2 text-xs border ${getTypeColor(
                  type
                )}`}
              >
                {getTypeIcon(type)}
                <span className='ml-1'>{getTypeLabel(type)}</span>
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            {/* Title and Rating */}
            <div className='flex items-start justify-between mb-2'>
              <h4 className='font-semibold text-gray-900 text-sm leading-tight line-clamp-2'>
                {title}
              </h4>
              <div className='flex items-center text-xs ml-2'>
                <Star className='w-3 h-3 text-yellow-400 fill-current mr-1' />
                <span className='font-medium text-gray-700'>{rating}</span>
                <span className='text-gray-500 ml-1'>({reviews})</span>
              </div>
            </div>

            {/* Location */}
            <div className='flex items-center text-xs text-gray-500 mb-3'>
              <MapPin className='w-3 h-3 mr-1 flex-shrink-0' />
              <span className='truncate'>{location}</span>
            </div>

            {/* Details based on type */}
            <div className='flex items-center gap-4 text-xs text-gray-600 mb-3'>
              {type === 'rent' && (
                <>
                  <div className='flex items-center'>
                    <Bed className='w-3 h-3 mr-1' />
                    <span>
                      {bedrooms} {t('bedrooms')}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Bath className='w-3 h-3 mr-1' />
                    <span>
                      {bathrooms} {t('bathrooms')}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Users className='w-3 h-3 mr-1' />
                    <span>
                      {guests} {t('guests')}
                    </span>
                  </div>
                </>
              )}

              {type === 'buy' && (
                <>
                  <div className='flex items-center'>
                    <Bed className='w-3 h-3 mr-1' />
                    <span>
                      {bedrooms} {t('bedrooms')}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Bath className='w-3 h-3 mr-1' />
                    <span>
                      {bathrooms} {t('bathrooms')}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='font-medium'>{size}</span>
                  </div>
                </>
              )}

              {type === 'tourist-activity' && (
                <>
                  <div className='flex items-center'>
                    <Calendar className='w-3 h-3 mr-1' />
                    <span>{duration}</span>
                  </div>
                  <div className='flex items-center'>
                    <Users2 className='w-3 h-3 mr-1' />
                    <span>{groupSize}</span>
                  </div>
                </>
              )}
            </div>

            {/* Price */}
            <div className='flex items-center justify-between'>
              <div className='text-right'>
                <div className='font-bold text-sm text-gray-900'>
                  {formatPrice(price)}
                </div>
                <div className='text-xs text-gray-500'>{period}</div>
              </div>

              {/* Quick action button */}
              <div className='text-xs'>
                <span className='text-primary font-medium'>
                  {t('viewDetails')} →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SearchResultItem;
