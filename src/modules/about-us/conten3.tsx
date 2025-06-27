'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

// Service item component for cleaner code
interface ServiceItemProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  reversed?: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
  reversed = false,
}) => (
  <div
    className={`flex flex-col ${
      reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
    } gap-8 md:gap-10 items-center`}
  >
    {/* Image container */}
    <div className='w-full lg:w-1/2'>
      <div className='relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md'>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'
          className='object-cover'
        />
      </div>
    </div>

    {/* Text container */}
    <div className='w-full lg:w-1/2 flex flex-col gap-4 md:gap-5'>
      <h3 className='text-xl md:text-2xl font-semibold text-primary'>
        {title}
      </h3>
      <p className='text-base md:text-lg text-text'>{description}</p>
      <Link
        href={linkHref}
        className='text-primary font-medium hover:underline inline-flex items-center gap-1 mt-2'
      >
        {linkText}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z'
          />
          <path
            fillRule='evenodd'
            d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z'
          />
        </svg>
      </Link>
    </div>
  </div>
);

const Content3AboutUs = () => {
  const t = useTranslations('aboutUs.content3');

  // Services data
  const services = [
    {
      imageSrc: '/images/service-1.jpeg',
      title: t('services.booking.title'),
      description: t('services.booking.description'),
      linkText: t('services.booking.linkText'),
      linkHref: '/rent',
    },
    {
      imageSrc: '/images/explore-2.png',
      title: t('services.buying.title'),
      description: t('services.buying.description'),
      linkText: t('services.buying.linkText'),
      linkHref: '/buy',
      reversed: true,
    },
    {
      imageSrc: '/images/media-7.png',
      title: t('services.management.title'),
      description: t('services.management.description'),
      linkText: t('services.management.linkText'),
      linkHref: '/manage-property',
    },
  ];

  return (
    <section className='py-10 md:py-16 lg:py-24'>
      <BaseContainer>
        <div className='flex flex-col gap-10 md:gap-16 lg:gap-20'>
          {/* Section title */}
          <div className='text-center'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-primary'>
              {t('title')}
            </h2>
          </div>

          {/* Services list */}
          <div className='flex flex-col gap-16 md:gap-20'>
            {services.map((service, index) => (
              <ServiceItem
                key={index}
                imageSrc={service.imageSrc}
                title={service.title}
                description={service.description}
                linkText={service.linkText}
                linkHref={service.linkHref}
                reversed={service.reversed}
              />
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default Content3AboutUs;
