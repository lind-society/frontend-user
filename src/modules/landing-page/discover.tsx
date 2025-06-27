import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import { ExperienceCard } from '@/components/ui/card/experience';

const DiscoverUnforgottableLandingPage = () => {
  const t = useTranslations('landingPage.discover');

  return (
    <div className='py-10 md:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-center text-primary text-2xl md:text-3xl font-semibold'>
              {t('title')}
            </h3>
            <p className='text-text font-normal text-center px-4 md:px-0'>
              {t('subtitle')}
            </p>
          </div>

          {/* Mobile view - Stack cards vertically for small screens */}
          <div className='block sm:hidden space-y-4'>
            <ExperienceCard
              title={t('experiences.journey.title')}
              count={t('experiences.journey.count')}
              image='/images/discover-1.png'
            />
            <ExperienceCard
              title={t('experiences.adventures.title')}
              count={t('experiences.adventures.count')}
              image='/images/discover-5.jpeg'
            />
            <ExperienceCard
              title={t('experiences.wellness.title')}
              count={t('experiences.wellness.count')}
              image='/images/discover-4.jpeg'
            />
            <ExperienceCard
              title={t('experiences.culture.title')}
              count={t('experiences.culture.count')}
              image='/images/discover-2.png'
            />
            <ExperienceCard
              title={t('experiences.culinaries.title')}
              count={t('experiences.culinaries.count')}
              image='/images/discover-3.jpeg'
            />
            <ExperienceCard
              title={t('experiences.specialEvents.title')}
              count={t('experiences.specialEvents.count')}
              image='/images/discover-6.jpeg'
            />
          </div>

          {/* Tablet view - Simplified grid for medium screens */}
          <div className='hidden sm:grid md:hidden grid-cols-2 gap-4 auto-rows-[180px]'>
            <div className='col-span-2'>
              <ExperienceCard
                title={t('experiences.journey.title')}
                count={t('experiences.journey.count')}
                image='/images/discover-1.png'
              />
            </div>
            <div className='col-span-1 row-span-2'>
              <ExperienceCard
                title={t('experiences.wellness.title')}
                count={t('experiences.wellness.count')}
                image='/images/discover-4.jpeg'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title={t('experiences.adventures.title')}
                count={t('experiences.adventures.count')}
                image='/images/discover-5.jpeg'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title={t('experiences.culture.title')}
                count={t('experiences.culture.count')}
                image='/images/discover-2.png'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title={t('experiences.culinaries.title')}
                count={t('experiences.culinaries.count')}
                image='/images/discover-3.jpeg'
              />
            </div>
            <div className='col-span-1'>
              <ExperienceCard
                title={t('experiences.specialEvents.title')}
                count={t('experiences.specialEvents.count')}
                image='/images/discover-6.jpeg'
              />
            </div>
          </div>

          {/* Desktop view - Original layout preserved exactly */}
          <div className='hidden md:grid grid-cols-4 grid-rows-2 gap-4 md:gap-8 h-auto md:h-[500px] lg:h-[636px]'>
            <div className='col-span-2 row-span-1'>
              <ExperienceCard
                title={t('experiences.journey.title')}
                count={t('experiences.journey.count')}
                image='/images/discover-1.png'
              />
            </div>
            <div className='col-span-1 row-start-1 row-span-1'>
              <ExperienceCard
                title={t('experiences.adventures.title')}
                count={t('experiences.adventures.count')}
                image='/images/discover-5.jpeg'
              />
            </div>
            <div className='col-span-1 row-start-1 row-span-2'>
              <ExperienceCard
                title={t('experiences.wellness.title')}
                count={t('experiences.wellness.count')}
                image='/images/discover-4.jpeg'
              />
            </div>
            <div className='col-span-1 row-start-2 row-span-1'>
              <ExperienceCard
                title={t('experiences.culture.title')}
                count={t('experiences.culture.count')}
                image='/images/discover-2.png'
              />
            </div>
            <div className='col-span-1 row-start-2 row-span-1'>
              <ExperienceCard
                title={t('experiences.culinaries.title')}
                count={t('experiences.culinaries.count')}
                image='/images/discover-3.jpeg'
              />
            </div>
            <div className='col-span-1 row-start-2 row-span-1'>
              <ExperienceCard
                title={t('experiences.specialEvents.title')}
                count={t('experiences.specialEvents.count')}
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
