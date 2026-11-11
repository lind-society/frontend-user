import React from 'react';

import Image from '@/components/image';
import BaseContainer from '@/components/layouts/container';

/** Hero of the Property Management page: the same editorial headline as the landing page. */
const HeaderManageProperty = () => {
  return (
    <div className='relative py-24 md:pb-[170px] md:pt-[150px]'>
      <Image
        src='/images/header-manage-property.jpeg'
        width={0}
        height={0}
        sizes='100vw'
        className='absolute left-0 top-0 h-full w-full object-cover'
        alt=''
      />
      <div className='absolute left-0 top-0 h-full w-full bg-ink/40' />

      <BaseContainer>
        <div className='relative flex max-w-[620px] flex-col gap-6 md:gap-8'>
          <h1 className='h0 font-heading text-cream'>
            Curated Homes.
            <br />
            Extraordinary Stays.
            <br />
            Beautiful Living.
          </h1>
          <div className='border-l-2 border-solid border-white px-3 text-lg text-cream md:px-5 md:text-[20px]'>
            Handpicked villas, unique experiences, and timeless moments in Bali
            and beyond.
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default HeaderManageProperty;
