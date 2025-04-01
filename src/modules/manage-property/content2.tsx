import React from 'react';
import {
  FaChartLine,
  FaClipboardCheck,
  FaHandshake,
  FaRegCalendarAlt,
  FaTools,
  FaWallet,
} from 'react-icons/fa';

import BaseContainer from '@/components/layouts/container';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className='bg-primary px-4 sm:px-6 md:px-8 py-6 flex flex-col gap-4 md:gap-5 rounded transition-transform hover:scale-[1.02]'>
    <div className='h-[48px] w-[48px] md:h-[64px] md:w-[64px] bg-tertiary flex items-center justify-center rounded-full shrink-0'>
      {icon}
    </div>
    <div className='flex flex-col gap-2 md:gap-3 text-white'>
      <h5 className='text-lg md:text-xl font-bold'>{title}</h5>
      <p className='font-medium md:font-semibold text-sm md:text-base line-clamp-4 overflow-hidden'>
        {description}
      </p>
    </div>
  </div>
);

const Content2ManageProperty = () => {
  const features = [
    {
      icon: <FaChartLine className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Maximized Revenue',
      description:
        "Optimize your villa's profitability with strategic pricing and marketing.",
    },
    {
      icon: <FaHandshake className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Hands-Free Management',
      description:
        'We handle guest communication, bookings, and maintenance for you.',
    },
    {
      icon: <FaTools className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Professional Maintenance',
      description:
        'Regular inspections and upkeep keep your villa in top shape.',
    },
    {
      icon: <FaRegCalendarAlt className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Flexible Usage',
      description:
        'Rent out your villa on your terms while enjoying personal stays.',
    },
    {
      icon: <FaClipboardCheck className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Real-Time Monitoring',
      description:
        'Access reports, bookings, and earnings anytime through our platform.',
    },
    {
      icon: <FaWallet className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Reliable Income Stream',
      description:
        'Enjoy consistent monthly payouts with transparent financial reporting.',
    },
  ];

  return (
    <div className='bg-bg py-8 md:py-12 lg:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          <div className='flex flex-col gap-2 md:gap-3 text-center'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-primary'>
              What You'll Get?
            </h2>
            <p className='text-base md:text-lg lg:text-[22px] text-text'>
              Here are some benefits from using our service
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Content2ManageProperty;
