'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { FaChartLine, FaHeadset, FaShieldAlt, FaUserTie } from 'react-icons/fa';

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
  <div className='bg-primary px-5 py-6 rounded shadow-sm transition-transform hover:scale-[1.02]'>
    <div className='h-14 w-14 md:h-16 md:w-16 bg-tertiary flex items-center justify-center rounded-full mb-4'>
      {icon}
    </div>
    <div className='text-cream'>
      <h3 className='text-lg md:text-xl font-bold mb-2'>{title}</h3>
      <p className='text-sm md:text-base text-cream/90 line-clamp-4'>
        {description}
      </p>
    </div>
  </div>
);

const Content2AboutUs = () => {
  const t = useTranslations('aboutUs.content2');

  // Features with contextual icons
  const features = [
    {
      icon: <FaUserTie className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: t('features.professionalExperience.title'),
      description: t('features.professionalExperience.description'),
    },
    {
      icon: <FaChartLine className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: t('features.marketAnalysis.title'),
      description: t('features.marketAnalysis.description'),
    },
    {
      icon: <FaHeadset className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: t('features.customerService.title'),
      description: t('features.customerService.description'),
    },
    {
      icon: <FaShieldAlt className='text-primary w-6 h-6 md:w-7 md:h-7' />,
      title: t('features.transparency.title'),
      description: t('features.transparency.description'),
    },
  ];

  return (
    <section className='py-10 md:py-16 lg:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-10 md:gap-12 lg:gap-16'>
          {/* Section title */}
          <div className='text-center'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-primary'>
              {t('title')}
            </h2>
          </div>

          {/* Content container - fully responsive */}
          <div className='flex flex-col lg:flex-row gap-10 md:gap-12 items-center'>
            {/* Left column - stacks on mobile */}
            <div className='w-full lg:w-[40%] flex flex-col gap-4'>
              <h3 className='text-xl md:text-2xl font-bold text-primary'>
                {t('subtitle')}
              </h3>
              <p className='text-ink-soft text-base md:text-lg'>
                {t('description')}
              </p>
            </div>

            {/* Right column - feature grid */}
            <div className='w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-6'>
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
        </div>
      </BaseContainer>
    </section>
  );
};

export default Content2AboutUs;
