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
import TitleSection from '@/components/ui/title-section';

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
  <div className='flex flex-col gap-4 bg-ink px-7 py-7'>
    <div className='text-bronze-200'>{icon}</div>
    <h3 className='text-cream-dim'>{title}</h3>
    <p className='line-clamp-5 text-[15px] font-light leading-6 text-cream-dim/85'>
      {description}
    </p>
  </div>
);

const WhyChooseLindRentPage = () => {
  const t = useTranslations('rent.whyChoose');

  const iconClass = 'h-8 w-8';

  const features = [
    {
      icon: <RiVerifiedBadgeFill className={iconClass} />,
      key: 'verifiedListings',
    },
    {
      icon: <FaHandshake className={iconClass} />,
      key: 'outstandingHospitality',
    },
    { icon: <MdVilla className={iconClass} />, key: 'bestPrice' },
    { icon: <MdHomeWork className={iconClass} />, key: 'homesSetup' },
    { icon: <MdPersonalInjury className={iconClass} />, key: 'stayOnTerms' },
    { icon: <MdSupportAgent className={iconClass} />, key: 'conciergeService' },
  ];

  return (
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-10'>
          <TitleSection title={t('title')} subTitle={t('subtitle')} />

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature) => (
              <FeatureCard
                key={feature.key}
                icon={feature.icon}
                title={t(`features.${feature.key}.title`)}
                description={t(`features.${feature.key}.description`)}
              />
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default WhyChooseLindRentPage;
