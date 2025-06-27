import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

// Define media item interface for better type checking
interface MediaItem {
  id: number;
  src: string;
  alt: string;
  desktopSpan: string;
  tabletSpan: string;
}

const MomentsLandingPage = () => {
  const t = useTranslations('landingPage.moments');

  // Media items with their respective column spans
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      src: '/images/media-1.png',
      alt: 'Media 1',
      desktopSpan: 'md:col-span-1',
      tabletSpan: 'col-span-6 sm:col-span-3',
    },
    {
      id: 2,
      src: '/images/media-2.png',
      alt: 'Media 2',
      desktopSpan: 'md:col-span-2',
      tabletSpan: 'col-span-6 sm:col-span-3',
    },
    {
      id: 3,
      src: '/images/media-3.png',
      alt: 'Media 3',
      desktopSpan: 'md:col-span-1',
      tabletSpan: 'col-span-6 sm:col-span-3',
    },
    {
      id: 4,
      src: '/images/media-4.png',
      alt: 'Media 4',
      desktopSpan: 'md:col-span-1',
      tabletSpan: 'col-span-6 sm:col-span-3',
    },
    {
      id: 5,
      src: '/images/media-5.jpeg',
      alt: 'Media 5',
      desktopSpan: 'md:col-span-1',
      tabletSpan: 'col-span-6 sm:col-span-3',
    },
    {
      id: 6,
      src: '/images/media-6.png',
      alt: 'Media 6',
      desktopSpan: 'md:col-span-1',
      tabletSpan: 'col-span-6 sm:col-span-3',
    },
    {
      id: 7,
      src: '/images/media-7.png',
      alt: 'Media 7',
      desktopSpan: 'md:col-span-2',
      tabletSpan: 'col-span-6 sm:col-span-4',
    },
    {
      id: 8,
      src: '/images/media-8.png',
      alt: 'Media 8',
      desktopSpan: 'md:col-span-1',
      tabletSpan: 'col-span-6 sm:col-span-2',
    },
  ];

  return (
    <div className='pb-10 md:pb-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          {/* Header section - already responsive */}
          <div className='flex flex-col sm:flex-row justify-between gap-4 sm:items-center'>
            <div className='flex flex-col gap-2'>
              <h4 className='text-primary font-bold text-xl md:text-2xl lg:text-3xl'>
                {t('title')}
              </h4>
              <p className='text-base md:text-lg lg:text-[22px] text-text font-normal'>
                {t('subtitle')}
              </p>
            </div>
            <Button variant='primary-outline' asChild>
              <Link
                href='/media'
                className='flex gap-2 items-center self-start sm:self-center whitespace-nowrap'
              >
                <span>{t('viewAllMedia')}</span>
                <RiArrowRightUpLine size={20} />
              </Link>
            </Button>
          </div>

          {/* Responsive grid layout */}
          <div className='grid grid-cols-6 md:grid-cols-5 gap-4 md:gap-8'>
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className={`${item.tabletSpan} ${item.desktopSpan} group rounded-md overflow-hidden`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw'
                  width={0}
                  height={0}
                  className='w-full h-[160px] sm:h-[180px] md:h-[220px] object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
            ))}
          </div>

          {/* Mobile "Load More" button - only visible on mobile */}
          <div className='flex justify-center sm:hidden mt-4'>
            <Button
              variant='primary-outline'
              className='flex gap-2 items-center'
            >
              <span>{t('loadMore')}</span>
              <RiArrowRightUpLine size={20} />
            </Button>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default MomentsLandingPage;
