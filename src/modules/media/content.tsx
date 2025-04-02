'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaExpand, FaTimes } from 'react-icons/fa';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';

const ContentMedia = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>('');

  const openLightbox = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  // Media gallery data with heights preserved
  const columns = [
    // First column
    [
      {
        src: '/images/media-1.png',
        alt: 'Luxurious villa exterior',
        height: 'h-[619px]',
      },
      {
        src: '/images/media-2.png',
        alt: 'Modern interior design',
        height: 'h-[302px]',
      },
      {
        src: '/images/media-3.png',
        alt: 'Villa swimming pool',
        height: 'h-[504px]',
      },
      {
        src: '/images/media-4.png',
        alt: 'Outdoor dining area',
        height: 'h-[258px]',
      },
      {
        src: '/images/media-6.png',
        alt: 'Elegant bathroom',
        height: 'h-[384px]',
      },
    ],
    // Second column
    [
      {
        src: '/images/media-6.png',
        alt: 'Villa bedroom',
        height: 'h-[524.5px]',
      },
      {
        src: '/images/media-7.png',
        alt: 'Kitchen and dining area',
        height: 'h-[524.5px]',
      },
      {
        src: '/images/media-8.png',
        alt: 'Beachfront view',
        height: 'h-[524.5px]',
      },
      {
        src: '/images/blog-1.png',
        alt: 'Garden landscape',
        height: 'h-[524.5px]',
      },
    ],
    // Third column
    [
      {
        src: '/images/discover-1.png',
        alt: 'Aerial villa view',
        height: 'h-[301px]',
      },
      {
        src: '/images/discover-5.jpeg',
        alt: 'Sunset from villa',
        height: 'h-[691px]',
      },
      {
        src: '/images/discover-3.jpeg',
        alt: 'Living room interior',
        height: 'h-[415px]',
      },
      {
        src: '/images/discover-4.jpeg',
        alt: 'Master bedroom',
        height: 'h-[691px]',
      },
    ],
  ];

  return (
    <div className='py-[32px] md:py-10 lg:py-14 bg-bg'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <BreadcrumbLayout
            items={[
              { label: 'Home', href: '/' },
              {
                label: 'Media',
                href: '/media',
                isActive: true,
              },
            ]}
          />

          <div className='flex flex-col gap-2 items-center text-center'>
            <h4 className='text-primary'>Moments Captured, Memories Made</h4>
            <span className='text-text text-xl md:text-2xl font-semibold'>
              Guest Experiences Through the Lens.
            </span>
          </div>

          {/* Desktop view (3 columns) - only visible on lg and up */}
          <div className='hidden lg:grid lg:grid-cols-3 gap-8'>
            {columns.map((column, colIndex) => (
              <div key={`col-${colIndex}`} className='flex flex-col gap-8'>
                {column.map((image, imgIndex) => (
                  <div
                    key={`desktop-${colIndex}-${imgIndex}`}
                    className='relative rounded-lg overflow-hidden group cursor-pointer'
                    onClick={() => openLightbox(image.src, image.alt)}
                  >
                    <Image
                      height={0}
                      sizes='(min-width: 1024px) 33vw, 100vw'
                      width={0}
                      src={image.src}
                      alt={image.alt}
                      className={`w-full ${image.height} object-cover transition-transform duration-300 group-hover:scale-105`}
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                      <FaExpand className='text-white text-2xl' />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Tablet view (2 columns) - only visible on md-lg */}
          <div className='hidden md:grid md:grid-cols-2 lg:hidden gap-6'>
            {/* First tablet column */}
            <div className='flex flex-col gap-6'>
              {[...columns[0].slice(0, 3), ...columns[1].slice(0, 2)].map(
                (image, index) => (
                  <div
                    key={`tablet-col1-${index}`}
                    className='relative rounded-lg overflow-hidden group cursor-pointer'
                    onClick={() => openLightbox(image.src, image.alt)}
                  >
                    <Image
                      height={0}
                      sizes='(min-width: 768px) 50vw, 100vw'
                      width={0}
                      src={image.src}
                      alt={image.alt}
                      className={`w-full ${
                        index === 0
                          ? 'h-[400px]'
                          : index === 1
                          ? 'h-[280px]'
                          : index === 2
                          ? 'h-[350px]'
                          : 'h-[320px]'
                      } object-cover transition-transform duration-300 group-hover:scale-105`}
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                      <FaExpand className='text-white text-2xl' />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Second tablet column */}
            <div className='flex flex-col gap-6'>
              {[
                ...columns[2].slice(0, 2),
                ...columns[1].slice(2, 4),
                ...columns[0].slice(3, 5),
              ].map((image, index) => (
                <div
                  key={`tablet-col2-${index}`}
                  className='relative rounded-lg overflow-hidden group cursor-pointer'
                  onClick={() => openLightbox(image.src, image.alt)}
                >
                  <Image
                    height={0}
                    sizes='(min-width: 768px) 50vw, 100vw'
                    width={0}
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${
                      index === 0
                        ? 'h-[280px]'
                        : index === 1
                        ? 'h-[420px]'
                        : index === 2
                        ? 'h-[320px]'
                        : 'h-[330px]'
                    } object-cover transition-transform duration-300 group-hover:scale-105`}
                  />
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                    <FaExpand className='text-white text-2xl' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile view (1 column) - only visible on sm and down */}
          <div className='grid grid-cols-1 md:hidden gap-5'>
            {/* Flatten all columns into one for mobile */}
            {[
              columns[0][0], // Start with eye-catching ones
              columns[2][1],
              columns[1][0],
              columns[0][2],
              columns[2][0],
              columns[1][2],
              columns[0][1],
              columns[2][2],
              ...columns[0].slice(3),
              ...columns[1].slice(1, 2),
              ...columns[1].slice(3),
              columns[2][3],
            ].map((image, index) => (
              <div
                key={`mobile-${index}`}
                className='relative rounded-lg overflow-hidden group cursor-pointer'
                onClick={() => openLightbox(image.src, image.alt)}
              >
                <Image
                  height={0}
                  sizes='100vw'
                  width={0}
                  src={image.src}
                  alt={image.alt}
                  className={`w-full ${
                    index % 3 === 0
                      ? 'h-[380px]'
                      : index % 3 === 1
                      ? 'h-[320px]'
                      : 'h-[280px]'
                  } object-cover transition-transform duration-300 group-hover:scale-105`}
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                  <FaExpand className='text-white text-2xl' />
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox for fullscreen view */}
          {selectedImage && (
            <div
              className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
              onClick={closeLightbox}
            >
              <button
                className='absolute top-6 right-6 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors'
                onClick={closeLightbox}
                aria-label='Close image preview'
              >
                <FaTimes size={24} />
              </button>
              <div
                className='relative max-w-5xl max-h-[90vh] w-full'
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt={selectedAlt}
                  width={1200}
                  height={800}
                  className='object-contain mx-auto max-h-[90vh]'
                />
                <p className='text-white text-center mt-2 text-sm'>
                  {selectedAlt}
                </p>
              </div>
            </div>
          )}
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentMedia;
