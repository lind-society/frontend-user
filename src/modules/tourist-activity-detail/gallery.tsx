'use client';

import Image from 'next/image';
import React from 'react';

interface GalleryProps {
  images: string[];
  selectedImage: string;
  onSelectImage: (image: string) => void;
  onMainImageClick: () => void;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  selectedImage,
  onSelectImage,
  onMainImageClick,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
      <div className='md:col-span-3'>
        <button
          onClick={onMainImageClick}
          className='w-full h-full block cursor-pointer'
        >
          <Image
            src={selectedImage}
            alt='Main Activity'
            width={800}
            height={400}
            className='rounded-lg w-full h-[320px] object-cover'
            priority
            sizes='100vw'
          />
        </button>
      </div>
      <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-2'>
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => onSelectImage(img)}
            className={`border rounded-lg overflow-hidden focus:outline-none ${
              selectedImage === img ? 'border-primary' : 'border-gray-200'
            }`}
          >
            <Image
              src={img}
              alt={`Gallery ${idx + 1}`}
              width={120}
              height={80}
              sizes='100vw'
              className='object-cover w-full h-[156px]'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
