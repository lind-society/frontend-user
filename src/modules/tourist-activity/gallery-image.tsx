import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

const GalleryImageTourist = () => {
  return (
    <div className='py-8 md:py-12 lg:py-[64px]'>
      <BaseContainer>
        <>
          {/* Mobile view (1 column) */}
          <div className='grid grid-cols-1 gap-4 sm:hidden'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className='aspect-[4/3]'>
                <Image
                  src={`/images/tourist-${num}.jpeg`}
                  alt={`Tourist destination ${num}`}
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
            ))}
          </div>

          {/* Tablet view (2 columns) */}
          <div className='hidden sm:grid md:hidden grid-cols-2 gap-4'>
            <div className='space-y-4'>
              {[1, 3, 5, 7].map((num) => (
                <div key={num} className='aspect-[4/3]'>
                  <Image
                    src={`/images/tourist-${num}.jpeg`}
                    alt={`Tourist destination ${num}`}
                    width={0}
                    height={0}
                    sizes='50vw'
                    className='w-full h-full object-cover rounded'
                  />
                </div>
              ))}
            </div>
            <div className='space-y-4'>
              {[2, 4, 6, 8].map((num) => (
                <div key={num} className='aspect-[4/3]'>
                  <Image
                    src={`/images/tourist-${num}.jpeg`}
                    alt={`Tourist destination ${num}`}
                    width={0}
                    height={0}
                    sizes='50vw'
                    className='w-full h-full object-cover rounded'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop view (4 columns with 2:3 ratio) */}
          <div className='hidden md:grid grid-cols-4 gap-4 lg:gap-8 '>
            {/* Column 1: 2:3 ratio (2 parts top, 3 parts bottom) */}
            <div className='col-span-1 grid grid-rows-5 gap-4 lg:gap-8 h-[550px]'>
              <div className='row-span-2 h-full'>
                <Image
                  src='/images/tourist-1.jpeg'
                  alt='Tourist destination 1'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                  priority
                />
              </div>
              <div className='row-span-3 h-full'>
                <Image
                  src='/images/tourist-2.jpeg'
                  alt='Tourist destination 2'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
            </div>

            {/* Column 2: 3:2 ratio (3 parts top, 2 parts bottom) */}
            <div className='col-span-1 grid grid-rows-5 gap-4 lg:gap-8 h-[550px]'>
              <div className='row-span-3 h-full'>
                <Image
                  src='/images/tourist-3.jpeg'
                  alt='Tourist destination 3'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
              <div className='row-span-2 h-full'>
                <Image
                  src='/images/tourist-4.jpeg'
                  alt='Tourist destination 4'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
            </div>

            {/* Column 3: 2:3 ratio (2 parts top, 3 parts bottom) */}
            <div className='col-span-1 grid grid-rows-5 gap-4 lg:gap-8 h-[550px]'>
              <div className='row-span-2 h-full'>
                <Image
                  src='/images/tourist-5.jpeg'
                  alt='Tourist destination 5'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
              <div className='row-span-3 h-full'>
                <Image
                  src='/images/tourist-6.jpeg'
                  alt='Tourist destination 6'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
            </div>

            {/* Column 4: 3:2 ratio (3 parts top, 2 parts bottom) */}
            <div className='col-span-1 grid grid-rows-5 gap-4 lg:gap-8 h-[550px]'>
              <div className='row-span-3 h-full'>
                <Image
                  src='/images/tourist-7.jpeg'
                  alt='Tourist destination 7'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
              <div className='row-span-2 h-full'>
                <Image
                  src='/images/tourist-8.jpeg'
                  alt='Tourist destination 8'
                  width={0}
                  height={0}
                  sizes='25vw'
                  className='w-full h-full object-cover rounded'
                />
              </div>
            </div>
          </div>
        </>
      </BaseContainer>
    </div>
  );
};

export default GalleryImageTourist;
