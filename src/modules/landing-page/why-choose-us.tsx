import { Tag } from 'lucide-react';
import React from 'react';
import { MdRoomService } from 'react-icons/md';
import { Ri24HoursFill } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Separator } from '@/components/ui/separator';

// Create a feature item component for reusability
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureProps) => (
  <div className='flex flex-col items-center gap-3 px-4 md:px-6 text-center'>
    <div className='mb-1'>{icon}</div>
    <p className='text-lg md:text-xl text-bg font-bold'>{title}</p>
    <p className='text-sm md:text-base text-bg text-center max-w-[250px] line-clamp-1'>
      {description}
    </p>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Tag size={40} className='text-bg' />,
      title: 'Best Rates Guaranteed',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptatibus.',
    },
    {
      icon: <MdRoomService size={40} className='text-bg' />,
      title: 'Excellent Services',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptatibus.',
    },
    {
      icon: <Ri24HoursFill size={40} className='text-bg' />,
      title: '24/7 Support',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptatibus.',
    },
  ];

  return (
    <div className='bg-primary py-8 md:py-12 lg:py-[48px]'>
      <BaseContainer>
        <div className='flex flex-col items-center gap-6 md:gap-8'>
          <h3 className='text-tertiary text-2xl md:text-3xl font-semibold text-center'>
            Why Choose Us?
          </h3>

          {/* Mobile view: stacked items */}
          <div className='flex flex-col gap-8 md:hidden w-full'>
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <FeatureItem
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
                {index < features.length - 1 && (
                  <Separator className='bg-tertiary/30 h-[1px]' />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Tablet and desktop view: horizontal with separators */}
          <div className='hidden md:flex w-full justify-between items-stretch'>
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <FeatureItem
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
                {index < features.length - 1 && (
                  <div className='flex items-center'>
                    <Separator
                      orientation='vertical'
                      className='h-auto bg-tertiary/30 w-[2px]'
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

export default WhyChooseUs;
