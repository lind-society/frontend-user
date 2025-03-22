import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

const ContentImage = () => {
  return (
    <div>
      <BaseContainer>
        <div className='flex flex-col gap-8 pb-8'>
          <div className='px-4 sm:px-6 py-4 flex flex-col gap-2 bg-white rounded-md border'>
            <span className='text-xl text-primary font-semibold'>
              360 Video Tour
            </span>
            <Image
              className='h-full w-full object-contain rounded-md object-top'
              width={0}
              height={0}
              sizes='100vw'
              alt='360 Video Tour'
              src='/images/360-image.png'
            />
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentImage;
