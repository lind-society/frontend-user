import React from 'react';
import { MdVilla } from 'react-icons/md';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';

const WhyChooseLindBuyPage = () => {
  return (
    <BaseContainer>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2 text-center'>
          <h4 className='text-primary'>
            Why Choose LIND Society for Your Stay
          </h4>
          <p className='text-[22px] text-text'>
            Stay in the finest vacation homes at the best value with LIND
            Society!
          </p>
        </div>
        <div className='grid grid-cols-3 gap-8'>
          <div className='bg-primary px-8 py-6 flex flex-col gap-5 rounded'>
            <div className='h-[64px] w-[64px] bg-tertiary flex items-center justify-center rounded-full '>
              <MdVilla className='text-primary w-8 h-8' />
            </div>
            <div className='flex flex-col gap-3 text-white'>
              <p className='text-xl font-bold'>Over 1000+ verified listings</p>
              <p className='font-semibold line-clamp-4 overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                reprehenderit dolore asperiores inventore recusandae repellendus
                dicta distinctio cum temporibus velit.
              </p>
            </div>
          </div>

          <div className='bg-primary px-8 py-6 flex flex-col gap-5 rounded'>
            <div className='h-[64px] w-[64px] bg-tertiary flex items-center justify-center rounded-full '>
              <MdVilla className='text-primary w-8 h-8' />
            </div>
            <div className='flex flex-col gap-3 text-white'>
              <p className='text-xl font-bold'>Outstanding Hospitality</p>
              <p className='font-semibold line-clamp-4 overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                reprehenderit dolore asperiores inventore recusandae repellendus
                dicta distinctio cum temporibus velit.
              </p>
            </div>
          </div>
          <div className='bg-primary px-8 py-6 flex flex-col gap-5 rounded'>
            <div className='h-[64px] w-[64px] bg-tertiary flex items-center justify-center rounded-full '>
              <RiVerifiedBadgeFill className='text-primary w-8 h-8' />
            </div>
            <div className='flex flex-col gap-3 text-white'>
              <p className='text-xl font-bold'>Best price guarantee</p>
              <p className='font-semibold line-clamp-4 overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                reprehenderit dolore asperiores inventore recusandae repellendus
                dicta distinctio cum temporibus velit.
              </p>
            </div>
          </div>
          <div className='bg-primary px-8 py-6 flex flex-col gap-5 rounded'>
            <div className='h-[64px] w-[64px] bg-tertiary flex items-center justify-center rounded-full '>
              <MdVilla className='text-primary w-8 h-8' />
            </div>
            <div className='flex flex-col gap-3 text-white'>
              <p className='text-xl font-bold'>Homes setup for living</p>
              <p className='font-semibold line-clamp-4 overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                reprehenderit dolore asperiores inventore recusandae repellendus
                dicta distinctio cum temporibus velit.
              </p>
            </div>
          </div>
          <div className='bg-primary px-8 py-6 flex flex-col gap-5 rounded'>
            <div className='h-[64px] w-[64px] bg-tertiary flex items-center justify-center rounded-full '>
              <MdVilla className='text-primary w-8 h-8' />
            </div>
            <div className='flex flex-col gap-3 text-white'>
              <p className='text-xl font-bold'>Stay on your terms</p>
              <p className='font-semibold line-clamp-4 overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                reprehenderit dolore asperiores inventore recusandae repellendus
                dicta distinctio cum temporibus velit.
              </p>
            </div>
          </div>
          <div className='bg-primary px-8 py-6 flex flex-col gap-5 rounded'>
            <div className='h-[64px] w-[64px] bg-tertiary flex items-center justify-center rounded-full '>
              <RiVerifiedBadgeFill className='text-primary w-8 h-8' />
            </div>
            <div className='flex flex-col gap-3 text-white'>
              <p className='text-xl font-bold'>
                24/7 concierge service and guest support
              </p>
              <p className='font-semibold line-clamp-4 overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                reprehenderit dolore asperiores inventore recusandae repellendus
                dicta distinctio cum temporibus velit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default WhyChooseLindBuyPage;
