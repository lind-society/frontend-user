'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FaBath, FaBed } from 'react-icons/fa';
import { LuRuler } from 'react-icons/lu';

import { formatCurrency } from '@/modules/buy-result/price-range';

interface PropertyFeatures {
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

interface PropertyCardProps {
  property: {
    id: number;
    name: string;
    location: string;
    images: string[];
    price: number;
    features: PropertyFeatures;
    ownership: string;
    description: string;
    tags?: string[];
    isFavorite?: boolean;
    tagIcons?: Record<string, React.ReactNode>;
  };
  onFavoriteToggle: (id: number) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavoriteToggle,
}) => {
  const {
    id,
    name,
    location,
    images,
    price,
    features,
    ownership,
    description,
    tags = [],
    isFavorite = false,
    tagIcons = {},
  } = property;

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle(id);
  };

  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
      {/* Image */}
      <div className='relative w-full aspect-[4/3]'>
        <Image
          src={images[0] || '/images/placeholder-property.jpeg'}
          alt={name}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        <div className='absolute top-2 right-2 z-10'>
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-full ${
              isFavorite ? 'bg-primary text-white' : 'bg-white text-primary'
            } shadow-md hover:scale-105 transition-transform`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Ownership type badge */}
        <div className='absolute top-2 left-2 z-10'>
          <span className='bg-white px-2 py-1 rounded-md text-xs font-medium shadow-md'>
            {ownership}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-4'>
        <div className='flex flex-col gap-2'>
          {/* Property name and price */}
          <div className='flex justify-between items-start'>
            <h3 className='font-bold text-lg line-clamp-1'>{name}</h3>
            <p className='font-bold text-primary'>
              {formatCurrency(price, formatOptions)}
            </p>
          </div>

          {/* Location */}
          <p className='text-gray-500 text-sm'>{location}</p>

          {/* Features */}
          <div className='flex gap-4 mt-2'>
            {features.bedrooms && (
              <div className='flex items-center gap-1'>
                <FaBed className='text-primary' />
                <span className='text-sm'>{features.bedrooms}</span>
              </div>
            )}
            {features.bathrooms && (
              <div className='flex items-center gap-1'>
                <FaBath className='text-primary' />
                <span className='text-sm'>{features.bathrooms}</span>
              </div>
            )}
            {features.area && (
              <div className='flex items-center gap-1'>
                <LuRuler className='text-primary' />
                <span className='text-sm'>{features.area} m²</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className='flex flex-wrap gap-1 mt-3'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-gray-100 text-primary text-xs px-2 py-1 rounded-md flex items-center gap-1'
                >
                  {tagIcons[tag]}
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
