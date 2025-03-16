import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

// Reusable card component to reduce repetition while maintaining layout
interface ExperienceCardProps {
  title: string;
  count: string;
  image: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  count,
  image,
}) => (
  <div className='relative h-[300px] md:h-full w-full rounded-sm overflow-hidden group'>
    {/* Image with proper gradient overlay */}
    <div className='absolute inset-0 z-10 bg-gradient-to-b from-black/0 via-black/0 to-black/80'></div>
    <Image
      src={image}
      alt={`${title} - Discover Unforgettable Experiences`}
      fill
      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
      className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
    />

    {/* Location text overlay */}
    <div className='absolute bottom-0 left-0 z-20 p-3 md:p-5 flex flex-col text-white gap-1 md:gap-2'>
      <p className='text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap'>
        {title}
      </p>
      <p className='text-xs md:text-sm lg:text-base font-normal line-clamp-1 text-end'>
        {count}
      </p>
    </div>
  </div>
);

const DiscoverUnforgottableLandingPage = () => {
  return (
    <div className='py-10 md:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-center text-primary text-2xl md:text-3xl font-semibold'>
              Discover Unforgettable Experiences
            </h3>
            <p className='text-text font-normal text-center px-4 md:px-0'>
              Unveil the secrets of the world and embark on unforgettable
              journeys with LIND Society.
            </p>
          </div>

          {/* Mobile view - Stack cards vertically for small screens */}
          <div className='block sm:hidden space-y-4'>
            <ExperienceCard
              title='Journey'
              count='150+ journey'
              image='/images/discover-1.png'
            />
            <ExperienceCard
              title='Adventures'
              count='30+ spots'
              image='/images/discover-5.jpeg'
            />
            <ExperienceCard
              title='Wellness'
              count='50+ spots'
              image='/images/discover-4.jpeg'
            />
            <ExperienceCard
              title='Culture'
              count='10+ journey'
              image='/images/discover-2.png'
            />
            <ExperienceCard
              title='Culinaries'
              count='200+ spots'
              image='/images/discover-3.jpeg'
            />
            <ExperienceCard
              title='Special Events'
              count='10+ events'
              image='/images/discover-6.jpeg'
            />
          </div>

          {/* Tablet view - Simplified grid for medium screens */}
          <div className='hidden sm:grid md:hidden grid-cols-2 gap-4 auto-rows-[180px]'>
            <div className='col-span-2'>
              <ExperienceCard
                title='Journey'
                count='150+ journey'
                image='/images/discover-1.png'
              />
            </div>
            <div className='col-span-1 row-span-2'>
              <ExperienceCard
                title='Wellness'
                count='50+ spots'
                image='/images/discover-4.jpeg'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title='Adventures'
                count='30+ spots'
                image='/images/discover-5.jpeg'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title='Culture'
                count='10+ journey'
                image='/images/discover-2.png'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title='Culinaries'
                count='200+ spots'
                image='/images/discover-3.jpeg'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title='Special Events'
                count='10+ events'
                image='/images/discover-6.jpeg'
              />
            </div>
          </div>

          {/* Desktop view - Original layout preserved exactly */}
          <div className='hidden md:grid grid-cols-4 grid-rows-2 gap-4 md:gap-8 h-auto md:h-[500px] lg:h-[636px]'>
            <div className='col-span-2 row-span-1'>
              <ExperienceCard
                title='Journey'
                count='150+ journey'
                image='/images/discover-1.png'
              />
            </div>
            <div className='col-span-1 row-start-1 row-span-1'>
              <ExperienceCard
                title='Adventures'
                count='30+ spots'
                image='/images/discover-5.jpeg'
              />
            </div>
            <div className='col-span-1 row-start-1 row-span-2'>
              <ExperienceCard
                title='Wellness'
                count='50+ spots'
                image='/images/discover-4.jpeg'
              />
            </div>
            <div className='col-span-1 row-start-2 row-span-1'>
              <ExperienceCard
                title='Culture'
                count='10+ journey'
                image='/images/discover-2.png'
              />
            </div>
            <div className='col-span-1 row-start-2 row-span-1'>
              <ExperienceCard
                title='Culinaries'
                count='200+ spots'
                image='/images/discover-3.jpeg'
              />
            </div>
            <div className='col-span-1 row-start-2 row-span-1'>
              <ExperienceCard
                title='Special Events'
                count='10+ events'
                image='/images/discover-6.jpeg'
              />
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default DiscoverUnforgottableLandingPage;
