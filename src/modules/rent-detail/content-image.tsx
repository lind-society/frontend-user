'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import { VillaCard } from '@/components/ui/card/villa';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { nearbyVillas } from '@/modules/rent-detail/constant';
import { villaImages } from '@/modules/rent-detail/constant';

// Define proper type interfaces
interface ImageData {
  id: string;
  src: string;
  alt: string;
  count: number;
  title: string;
  description: string;
  viewMoreLink: string;
}

interface ImageCardProps {
  image: ImageData;
}

// Image card component with proper typing
const ImageCard = ({ image }: ImageCardProps) => (
  <div className='flex flex-col gap-3 px-2'>
    <div className='h-[220px] w-full relative'>
      <Image
        src={image.src}
        alt={image.alt}
        width={0}
        height={0}
        sizes='100vw'
        className='h-[220px] w-full object-cover rounded-md'
      />
      <div className='absolute bottom-0 left-0 bg-primary rounded-tr-lg py-2 px-4 text-white'>
        {image.count} pictures
      </div>
    </div>
    <span className='text-text text-lg font-semibold'>{image.title}</span>
    <span className='text-text'>{image.description}</span>
    <Link
      href={image.viewMoreLink}
      className='underline text-text text-sm font-medium'
    >
      View More
    </Link>
  </div>
);

interface ImageGallerySectionProps {
  title: string;
  images: ImageData[];
}

// Image gallery section component with proper typing
const ImageGallerySection = ({ title, images }: ImageGallerySectionProps) => {
  const [, setApi] = useState<CarouselApi | null>(null);

  return (
    <div className='px-4 sm:px-6 py-4 flex flex-col gap-6 bg-white rounded-md border'>
      <span className='text-xl text-primary font-semibold'>{title}</span>

      <div className='relative'>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className='w-full'
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className='sm:basis-1/2 md:basis-1/3 lg:basis-1/3'
              >
                <ImageCard image={image} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-0 bg-white/80 hover:bg-white border-primary text-primary' />
          <CarouselNext className='right-0 bg-white/80 hover:bg-white border-primary text-primary' />
        </Carousel>
      </div>
    </div>
  );
};

const ContentImage = () => {
  // Handler for favorite toggle in nearby villas
  const handleFavoriteToggle = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(`Toggled favorite for villa ${id}`);
    // In a real application, you would use a state management solution or context
    // to track and update the favorites
  };

  return (
    <div className='py-8 bg-gray-50'>
      <BaseContainer>
        <div className='flex flex-col gap-8 pb-8'>
          {/* 360 Video Tour Section */}
          <div className='px-4 sm:px-6 py-4 flex flex-col gap-2 bg-white rounded-md border'>
            <span className='text-xl text-primary font-semibold'>
              360 Video Tour
            </span>
            <Image
              className='h-full w-full object-contain rounded-md object-top'
              width={0}
              height={0}
              sizes='100vw'
              alt='360 Video Tour'
              src='/images/360-image.png'
            />
          </div>

          {/* Outdoor Areas Section */}
          <ImageGallerySection
            title='Outdoor Areas'
            images={villaImages.outdoorAreas}
          />

          {/* Indoor Areas Section */}
          <ImageGallerySection
            title='Indoor Areas'
            images={villaImages.indoorAreas}
          />

          {/* More Pictures Section */}
          <ImageGallerySection
            title='More Pictures'
            images={villaImages.morePictures}
          />

          {/* Nearby Villas Section */}
          <div className='px-4 sm:px-6 py-4 flex flex-col gap-6 bg-white rounded-md border'>
            <span className='text-xl text-primary font-semibold'>
              Nearby Villas
            </span>
            <p className='text-text'>
              Discover other beautiful properties in the Canggu area that might
              interest you.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {nearbyVillas.map((villa) => (
                <VillaCard
                  key={villa.id}
                  villa={villa}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentImage;
