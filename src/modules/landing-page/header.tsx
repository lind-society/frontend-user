'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import {
  SearchPanel,
  SearchTab,
  SearchTabs,
} from '@/components/ui/search-panel';

import BuySearch from '@/modules/landing-page/buy-search';
import StaySearch from '@/modules/landing-page/stay-search';
import TouristSearch from '@/modules/landing-page/tourist-search';

type TabType = 'stay' | 'buy' | 'tourist';

const HeaderLandingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stay');
  const router = useRouter();
  const t = useTranslations('landingPage.header');

  // Handle search button click based on active tab
  const handleSearch = (searchParams: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });

    switch (activeTab) {
      case 'stay':
        router.push(`/rent/result?${params.toString()}`);
        break;
      case 'buy':
        router.push(`/buy/result?${params.toString()}`);
        break;
      case 'tourist':
        router.push(`/tourist-activity?${params.toString()}`);
        break;
    }
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'stay', label: t('tabs.stay') },
    { id: 'buy', label: t('tabs.buy') },
    { id: 'tourist', label: t('tabs.touristActivity') },
  ];

  return (
    <section className='relative isolate flex min-h-[760px] flex-col justify-end overflow-hidden pb-10 pt-[72px] lg:min-h-[820px] lg:pt-[92px]'>
      <Image
        src='/images/header-landing-page.png'
        alt=''
        fill
        priority
        sizes='100vw'
        aria-hidden
        className='-z-10 object-cover'
      />
      {/* Gradient keeps the serif headline legible over the photograph */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/60'
      />

      <BaseContainer>
        <div className='flex flex-col gap-10'>
          {/* Headline */}
          <div className='flex max-w-3xl flex-col gap-6 pt-16'>
            <h1 className='whitespace-pre-line text-cream'>{t('title')}</h1>
            <p className='border-l-2 border-cream pl-5 text-base leading-relaxed text-cream/90 md:text-lg'>
              {t('subtitle')}
            </p>
          </div>

          {/* Booking panel */}
          <SearchPanel>
            <SearchTabs className='mb-4'>
              {tabs.map(({ id, label }) => (
                <SearchTab
                  key={id}
                  isActive={activeTab === id}
                  onClick={() => setActiveTab(id)}
                >
                  {label}
                </SearchTab>
              ))}
            </SearchTabs>

            {activeTab === 'stay' && <StaySearch onSearch={handleSearch} />}
            {activeTab === 'buy' && <BuySearch onSearch={handleSearch} />}
            {activeTab === 'tourist' && (
              <TouristSearch onSearch={handleSearch} />
            )}
          </SearchPanel>
        </div>
      </BaseContainer>
    </section>
  );
};

export default HeaderLandingPage;
