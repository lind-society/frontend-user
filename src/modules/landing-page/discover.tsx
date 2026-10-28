import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import { ExperienceCard } from '@/components/ui/card/experience';
import TitleSection from '@/components/ui/title-section';

const EXPERIENCES = [
  { key: 'privateChef', image: '/images/discover-1.png' },
  { key: 'sunriseYoga', image: '/images/discover-5.jpeg' },
  { key: 'cultural', image: '/images/discover-2.png' },
  { key: 'wellness', image: '/images/discover-4.jpeg' },
  { key: 'history', image: '/images/discover-3.jpeg' },
] as const;

const DiscoverUnforgottableLandingPage = () => {
  const t = useTranslations('landingPage.discover');

  return (
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-10'>
          <TitleSection
            align='start'
            title={t('title')}
            subTitle={t('subtitle')}
            link='/tourist-activity'
            linkLabel={t('viewAll')}
          />

          {/* Horizontally scrollable below lg so all five stay on one line */}
          <div className='-mx-4 flex gap-5 overflow-x-auto px-4 pb-2 scrollbar-hide lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0'>
            {EXPERIENCES.map(({ key, image }) => (
              <div
                key={key}
                className='w-[60vw] shrink-0 sm:w-[38vw] lg:w-auto'
              >
                <ExperienceCard
                  title={t(`experiences.${key}.title`)}
                  count={t(`experiences.${key}.count`)}
                  image={image}
                />
              </div>
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default DiscoverUnforgottableLandingPage;
