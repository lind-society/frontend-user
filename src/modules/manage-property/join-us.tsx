import React from 'react';

import BaseContainer from '@/components/layouts/container';
import { Separator } from '@/components/ui/separator';

// Create a feature item component for reusability
interface FeatureProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureProps) => (
  <div className='flex flex-col items-center gap-3 px-4 md:px-6 text-center'>
    <h4 className=' text-bg font-bold'>{title}</h4>
    <p className='text-sm md:text-base text-bg text-center max-w-[250px] line-clamp-1'>
      {description}
    </p>
  </div>
);

const JoinUsManageProperty = () => {
  const features = [
    {
      title: '90+',
      description: 'Properties Managed',
    },
    {
      title: '10k+',
      description: 'Properties Sold',
    },
    {
      title: '250+',
      description: 'Distribution Partners Worldwide',
    },
  ];

  return (
    <div className='bg-primary py-8 md:py-12 lg:py-[48px]'>
      <BaseContainer>
        <div className='flex flex-col items-center gap-6 md:gap-8'>
          <h3 className='text-tertiary text-2xl md:text-3xl font-semibold text-center'>
            Join Us at LIND Society
          </h3>

          {/* Mobile view: stacked items */}
          <div className='flex flex-col gap-8 md:hidden w-full'>
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <FeatureItem
                  title={feature.title}
                  description={feature.description}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Tablet and desktop view: horizontal with separators */}
          <div className='hidden md:flex w-full justify-between items-stretch'>
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <FeatureItem
                  title={feature.title}
                  description={feature.description}
                />
                {index < features.length - 1 && (
                  <div className='flex items-center'>
                    <Separator
                      orientation='vertical'
                      className='h-full  w-[2px]'
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default JoinUsManageProperty;
