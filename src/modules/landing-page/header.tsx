'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';

import BuySearch from '@/modules/landing-page/buy-search';
import StaySearch from '@/modules/landing-page/stay-search';
import TouristSearch from '@/modules/landing-page/tourist-search';

type TabType = 'stay' | 'buy' | 'tourist';

const HeaderLandingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stay');
  const router = useRouter();
  const t = useTranslations('landingPage.header');

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Handle search button click based on active tab
  const handleSearch = (searchParams: Record<string, string>) => {
    // Convert the search parameters to query string
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });

    // Navigate to appropriate results page based on active tab
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

  return (
    <div className='py-6 md:py-10 relative'>
      <Image
        src='/images/header-landing-page.png'
        width={0}
        height={0}
        sizes='100vw'
        className='w-full h-full object-cover absolute top-0 left-0 -z-10'
        alt='header landing page'
      />
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8 justify-center'>
          {/* Responsive header content */}
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
            <div className='flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[567px] mb-8 lg:mb-0'>
              <h1 className='text-white h0 font-bold'>{t('title')}</h1>
              <div className='px-3 md:px-5 border-white border-solid border-l-2 text-white text-lg md:text-[22px]'>
                {t('subtitle')}
              </div>
            </div>

            {/* Stats - Hidden on smaller screens */}
            <div className='hidden md:flex flex-row lg:flex-col gap-6 text-white'>
              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className='font-bold'>12k+</h2>
                <span className='text-base md:text-xl'>
                  {t('stats.satisfiedVisitors')}
                </span>
              </div>

              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className='font-bold'>4.5k+</h2>
                <span className='text-base md:text-xl'>
                  {t('stats.tourGuides')}
                </span>
              </div>

              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className='font-bold'>2k+</h2>
                <span className='text-base md:text-xl'>
                  {t('stats.managedProperties')}
                </span>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className='bg-white rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col gap-3 md:gap-5'>
            {/* Tabs */}
            <div className='flex overflow-x-auto hideScrollbar'>
              <button
                onClick={() => handleTabClick('stay')}
                className={`px-4 md:px-6 pt-2 pb-4 font-semibold whitespace-nowrap ${
                  activeTab === 'stay'
                    ? 'border-b-primary border-b-2 text-primary'
                    : 'border-b-transparent border-b-2 text-gray-400'
                }`}
              >
                {t('tabs.stay')}
              </button>
              <button
                onClick={() => handleTabClick('buy')}
                className={`px-4 md:px-6 pt-2 pb-4 font-semibold whitespace-nowrap ${
                  activeTab === 'buy'
                    ? 'border-b-primary border-b-2 text-primary'
                    : 'border-b-transparent border-b-2 text-gray-400'
                }`}
              >
                {t('tabs.buy')}
              </button>
              <button
                onClick={() => handleTabClick('tourist')}
                className={`px-4 md:px-6 pt-2 pb-4 font-semibold whitespace-nowrap ${
                  activeTab === 'tourist'
                    ? 'border-b-primary border-b-2 text-primary'
                    : 'border-b-transparent border-b-2 text-gray-400'
                }`}
              >
                {t('tabs.touristActivity')}
              </button>
            </div>

            {/* Render appropriate search component based on active tab */}
            {activeTab === 'stay' && <StaySearch onSearch={handleSearch} />}
            {activeTab === 'buy' && <BuySearch onSearch={handleSearch} />}
            {activeTab === 'tourist' && (
              <TouristSearch onSearch={handleSearch} />
            )}
          </div>
        </div>
      </BaseContainer>

      {/* Responsive CSS for hiding scrollbar */}
      <style jsx global>{`
        .hideScrollbar::-webkit-scrollbar {
          display: none;
        }
        .hideScrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HeaderLandingPage;
