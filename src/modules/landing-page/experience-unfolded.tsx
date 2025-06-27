import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/ui/card/blog';

import { blogPosts } from '@/modules/landing-page/constant';

const ExperienceUnfolded = () => {
  const t = useTranslations('landingPage.experienceUnfolded');

  return (
    <div className='py-10 md:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          {/* Section Header */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-center text-primary text-2xl md:text-3xl font-semibold'>
              {t('title')}
            </h3>
            <p className='text-text font-normal text-center px-4 md:px-0'>
              {t('subtitle')}
            </p>
          </div>

          {/* Section Title and Button - Responsive */}
          <div className='flex flex-col sm:flex-row justify-between gap-4 sm:items-center'>
            <div className='flex flex-col gap-2'>
              <h4 className='text-primary font-bold text-xl md:text-2xl lg:text-3xl'>
                {t('journalHub.title')}
              </h4>
              <p className='text-base md:text-lg lg:text-[22px] text-text font-normal'>
                {t('journalHub.subtitle')}
              </p>
            </div>
            <Button variant='primary-outline' asChild>
              <Link
                href='/blog'
                className='flex gap-2 items-center self-start sm:self-center whitespace-nowrap'
              >
                <span>{t('viewAllBlogs')}</span>
                <RiArrowRightUpLine size={20} />
              </Link>
            </Button>
          </div>

          {/* Blog Grid - Responsive */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Mobile View More Button - Only on Mobile */}
          <div className='flex justify-center lg:hidden mt-2'>
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

export default ExperienceUnfolded;
