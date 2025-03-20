import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextCustom,
  CarouselPreviousCustom,
} from '@/components/ui/carousel';

const TrustedBuyerSection = () => {
  return (
    <div className='bg-white py-[64px]'>
      <BaseContainer>
        <div className='flex justify-between gap-10 items-center flex-col md:flex-row'>
          <div className='w-[400px]  flex flex-col gap-2'>
            <h4 className='text-primary'>
              Trusted Buyer’s Agent Representation
            </h4>
            <p className='text-text text-[22px]'>
              We are a dedicated team of expert agents, driven by a passion for
              real estate and exceptional service.
            </p>
          </div>
          <Carousel
            opts={{
              loop: true,
            }}
            className='flex-1 flex flex-col items-end gap-4'
          >
            <div className='flex gap-2'>
              <CarouselPreviousCustom />
              <CarouselNextCustom />
            </div>
            <CarouselContent>
              <CarouselItem className='basis-1/3'>
                <Image
                  className='w-full h-[320px] object-contain rounded-lg'
                  src='/images/trusted-1.png'
                  alt='Trusted Buyer 1'
                  width={0}
                  height={0}
                  sizes='100vw'
                />
              </CarouselItem>
              <CarouselItem className='basis-1/3'>
                <Image
                  className='w-full h-[320px] object-contain rounded-lg'
                  src='/images/trusted-2.png'
                  alt='Trusted Buyer 1'
                  width={0}
                  height={0}
                  sizes='100vw'
                />
              </CarouselItem>
              <CarouselItem className='basis-1/3'>
                <Image
                  className='w-full h-[320px] object-contain rounded-lg'
                  src='/images/trusted-3.png'
                  alt='Trusted Buyer 1'
                  width={0}
                  height={0}
                  sizes='100vw'
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </BaseContainer>
    </div>
  );
};

export default TrustedBuyerSection;
