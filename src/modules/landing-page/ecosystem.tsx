import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'use-intl';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';

// Photos and script logos are the artwork from the "New Design" landing page.
const BRANDS = [
  {
    key: 'architecture',
    href: '/about-us',
    photo: '/images/ecosystem-architecture.jpg',
    logo: '/images/ecosystem-logo-lind-way.jpg',
    logoWidth: 'w-[88px]',
    cta: 'viewMore',
  },
  {
    key: 'wedding',
    href: '/about-us',
    photo: '/images/ecosystem-wedding.jpg',
    logo: '/images/ecosystem-logo-linda-wiryani.jpg',
    logoWidth: 'w-[124px]',
    cta: 'viewMore',
  },
  {
    key: 'fashion',
    href: '/media',
    photo: '/images/ecosystem-fashion.jpg',
    logo: '/images/ecosystem-logo-lind-way.jpg',
    logoWidth: 'w-[88px]',
    cta: 'viewAllMedia',
  },
] as const;

/**
 * "A World of Beautiful Living" — the sand-toned band introducing the sister
 * brands in the LIND ecosystem. Three cards sit flush to the right edge of the
 * page, each with its own photo bleeding off the card's right side.
 */
const Ecosystem = () => {
  const t = useTranslations('landingPage.ecosystem');

  return (
    <section className='overflow-hidden bg-gradient-to-r from-[#EADCCB] to-[#E5D5C4]'>
      <div className='flex flex-col lg:flex-row lg:items-stretch'>
        <div className='flex flex-col justify-center gap-3 px-4 py-10 sm:px-6 lg:w-[40%] lg:py-0 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-8'>
          <span className='font-heading text-base text-[#6B5F54]'>
            {t('subtitle')}
          </span>
          <h2 className='font-heading text-3xl font-medium leading-tight text-[#5C534B] md:text-[40px]'>
            {t('title')}
          </h2>
          <p className='max-w-md text-sm leading-relaxed text-[#6B5F54] md:text-base'>
            {t('description')}
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 lg:w-[60%]'>
          {BRANDS.map(({ key, href, photo, logo, logoWidth, cta }) => (
            <Link
              key={key}
              href={href}
              className='group relative flex h-[200px] overflow-hidden sm:h-[224px]'
            >
              <div className='relative z-10 flex w-[58%] flex-col justify-between py-6 pl-5 pr-2'>
                <img
                  src={logo}
                  alt=''
                  aria-hidden
                  className={`${logoWidth} h-auto mix-blend-darken`}
                />
                <div className='flex flex-col gap-3'>
                  <span className='font-heading text-[15px] leading-snug text-[#5C534B]'>
                    {t(`items.${key}.title`)}
                  </span>
                  <span className='inline-flex items-center gap-1.5 text-xs text-bronze-600 transition-colors group-hover:text-bronze-700'>
                    {t(cta)}
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              <img
                src={photo}
                alt=''
                aria-hidden
                loading='lazy'
                className='absolute inset-y-0 right-0 h-full w-[48%] object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
