'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

const ExploreListRentPage = () => {
  const t = useTranslations('rent.exploreList');

  const exploreOptions = [
    { label: t('options.daily'), href: '/rent/result?durationType=daily' },
    { label: t('options.monthly'), href: '/rent/result?durationType=monthly' },
    { label: t('options.yearly'), href: '/rent/result?durationType=yearly' },
  ];

  return (
    <section className='bg-sand'>
      <BaseContainer>
        <div className='flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16'>
          <div className='flex flex-col gap-2 lg:max-w-md'>
            <h2 className='whitespace-pre-line text-ink'>{t('title')}</h2>
            <p className='text-ink-soft'>{t('subtitle')}</p>
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:gap-4'>
            {exploreOptions.map((option) => (
              <Button key={option.href} variant='primary' asChild>
                <Link
                  href={option.href}
                  className='flex items-center gap-2 whitespace-nowrap'
                >
                  <span>{option.label}</span>
                  <RiArrowRightUpLine size={18} />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default ExploreListRentPage;
