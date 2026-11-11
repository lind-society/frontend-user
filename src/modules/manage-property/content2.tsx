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
  <div className='bg-ink px-4 sm:px-6 md:px-8 py-6 flex flex-col gap-4 md:gap-5 rounded'>
    <div className='flex h-10 w-10 shrink-0 items-center justify-center text-bronze-300'>
      {icon}
    </div>
    <div className='flex flex-col gap-2 md:gap-3 text-cream'>
      <h5 className='font-heading text-lg font-semibold md:text-xl'>{title}</h5>
      <p className='text-sm text-cream/70 line-clamp-4 overflow-hidden'>
        {description}
      </p>
    </div>
  </div>
);

const Content2ManageProperty = () => {
  const features = [
    {
      icon: <FaChartLine className='h-7 w-7' />,
      title: 'Maximized Revenue',
      description:
        "Optimize your villa's profitability with strategic pricing and marketing.",
    },
    {
      icon: <FaHandshake className='h-7 w-7' />,
      title: 'Hands-Free Management',
      description:
        'We handle guest communication, bookings, and maintenance for you.',
    },
    {
      icon: <FaTools className='h-7 w-7' />,
      title: 'Professional Maintenance',
      description:
        'Regular inspections and upkeep keep your villa in top shape.',
    },
    {
      icon: <FaRegCalendarAlt className='h-7 w-7' />,
      title: 'Flexible Usage',
      description:
        'Rent out your villa on your terms while enjoying personal stays.',
    },
    {
      icon: <FaClipboardCheck className='h-7 w-7' />,
      title: 'Real-Time Monitoring',
      description:
        'Access reports, bookings, and earnings anytime through our platform.',
    },
    {
      icon: <FaWallet className='h-7 w-7' />,
      title: 'Reliable Income Stream',
      description:
        'Enjoy consistent monthly payouts with transparent financial reporting.',
    },
  ];

  return (
    <div className='py-8 md:py-12 lg:py-16'>
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
