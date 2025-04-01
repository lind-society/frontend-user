import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

const Content1AboutUs = () => {
  return (
    <section className='py-10 md:py-16 lg:py-24'>
      <BaseContainer>
        <div className='flex flex-col lg:flex-row gap-8 md:gap-12 items-center'>
          {/* Text content - stacked on mobile, side-by-side on desktop */}
          <div className='flex flex-col gap-4 md:gap-6 w-full lg:w-1/2 order-2 lg:order-1'>
            <h2 className='text-2xl md:text-3xl font-semibold text-primary'>
              Who We Are
            </h2>
            <div className='space-y-4 text-text'>
              <p className='text-base md:text-lg'>
                We are a premium platform that delivers exclusive stay
                experiences and the best property management services. We
                provide a wide selection of homes & villas that have been
                carefully curated to meet the needs of travelers, while for
                property owners, we offer property management solutions that
                maximize the potential of their investment.
              </p>
              <p className='text-base md:text-lg'>
                With over 10 years of experience in the property industry, we
                ensure that each property is managed with the highest level of
                expertise and attention to detail.
              </p>
            </div>
          </div>

          {/* Image container - optimized for all screens */}
          <div className='w-full lg:w-1/2 order-1 lg:order-2'>
            <div className='relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg'>
              <Image
                src='/images/content-about-1.jpeg'
                alt='LIND Society Team'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default Content1AboutUs;
