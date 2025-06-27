import { useTranslations } from 'next-intl';
import React from 'react';
import { FaHandshake } from 'react-icons/fa';
import {
  MdHomeWork,
  MdPersonalInjury,
  MdSupportAgent,
  MdVilla,
} from 'react-icons/md';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

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

const WhyChooseLindRentPage = () => {
  const t = useTranslations('rent.whyChoose');

  const features = [
    {
      icon: <MdVilla className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.verifiedListings.title'),
      description: t('features.verifiedListings.description'),
    },
    {
      icon: <FaHandshake className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.outstandingHospitality.title'),
      description: t('features.outstandingHospitality.description'),
    },
    {
      icon: (
        <RiVerifiedBadgeFill className='text-primary w-6 h-6 md:w-8 md:h-8' />
      ),
      title: t('features.bestPrice.title'),
      description: t('features.bestPrice.description'),
    },
    {
      icon: <MdHomeWork className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.homesSetup.title'),
      description: t('features.homesSetup.description'),
    },
    {
      icon: <MdPersonalInjury className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.stayOnTerms.title'),
      description: t('features.stayOnTerms.description'),
    },
    {
      icon: <MdSupportAgent className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.conciergeService.title'),
      description: t('features.conciergeService.description'),
    },
  ];

  return (
    <BaseContainer>
      <div className='flex flex-col gap-6 md:gap-8 py-8 md:py-12 lg:py-16'>
        <div className='flex flex-col gap-2 md:gap-3 text-center'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-primary'>
            {t('title')}
          </h2>
          <p className='text-base md:text-lg lg:text-[22px] text-text'>
            {t('subtitle')}
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
  );
};

export default WhyChooseLindRentPage;
