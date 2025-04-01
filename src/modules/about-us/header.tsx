import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

const HeaderAboutUs = () => {
  return (
    <div className='relative py-20 md:pt-28 md:pb-36 lg:pt-32 lg:pb-48 overflow-hidden'>
      {/* Background image with optimized loading */}
      <Image
        src='/images/header-about-us.jpeg'
        alt='LIND Society - About Us'
        priority
        fill
        sizes='100vw'
        className='object-cover object-center z-0'
        quality={85}
      />

      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-black/40 z-10'></div>

      <BaseContainer>
        <div className='relative z-20 flex flex-col items-center gap-4 md:gap-6 text-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl'>
            Unlimited Luxury Stays & Property Management
          </h1>
          <p className='text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-light'>
            Find exclusive residences and manage your property with professional
            services for the best hassle-free experience.
          </p>
        </div>
      </BaseContainer>
    </div>
  );
};

export default HeaderAboutUs;
