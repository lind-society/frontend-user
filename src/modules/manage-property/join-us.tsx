import React from 'react';

import BaseContainer from '@/components/layouts/container';

const STATS = [
  { value: '90+', label: 'Properties Managed' },
  { value: '10k+', label: 'Properties Sold' },
  { value: '250+', label: 'Distribution Partners Worldwide' },
];

/** "Join Us at LIND Society" — dark band with three figures split by hairlines. */
const JoinUsManageProperty = () => {
  return (
    <div className='bg-ink py-12 md:py-14'>
      <BaseContainer>
        <div className='flex flex-col items-center gap-10'>
          <h3 className='text-center font-heading text-2xl uppercase tracking-[0.12em] text-bronze-300 md:text-3xl'>
            Join Us at LIND Society
          </h3>

          <div className='grid w-full grid-cols-1 divide-y divide-cream/15 md:grid-cols-3 md:divide-x md:divide-y-0'>
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className='flex flex-col items-center gap-3 px-4 py-6 text-center md:py-2'
              >
                <span className='font-heading text-4xl text-bronze-200 md:text-5xl'>
                  {value}
                </span>
                <span className='text-sm text-cream/80 md:text-base'>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default JoinUsManageProperty;
