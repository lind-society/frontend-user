import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import TitleSection from '@/components/ui/title-section';

/**
 * Guest photography wall. Two rows where one tile per row runs double width,
 * matching the rhythm of the redesign's masonry block.
 */
const MEDIA_ITEMS = [
  { id: 1, src: '/images/media-1.png', span: 'lg:col-span-1' },
  { id: 2, src: '/images/media-2.png', span: 'lg:col-span-2' },
  { id: 3, src: '/images/media-3.png', span: 'lg:col-span-1' },
  { id: 4, src: '/images/media-4.png', span: 'lg:col-span-1' },
  { id: 5, src: '/images/media-5.jpeg', span: 'lg:col-span-1' },
  { id: 6, src: '/images/media-6.png', span: 'lg:col-span-1' },
  { id: 7, src: '/images/media-7.png', span: 'lg:col-span-2' },
  { id: 8, src: '/images/media-8.png', span: 'lg:col-span-1' },
];

const MomentsLandingPage = () => {
  const t = useTranslations('landingPage.moments');

  return (
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-10'>
          <TitleSection
            align='start'
            title={t('title')}
            subTitle={t('subtitle')}
            link='/media'
            linkLabel={t('viewAllMedia')}
          />

          <div className='grid auto-rows-[150px] grid-cols-2 gap-4 sm:grid-cols-3 md:auto-rows-[190px] lg:grid-cols-5 lg:gap-5'>
            {MEDIA_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`${item.span} group relative h-full overflow-hidden`}
              >
                <Image
                  src={item.src}
                  alt=''
                  fill
                  aria-hidden
                  sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default MomentsLandingPage;
