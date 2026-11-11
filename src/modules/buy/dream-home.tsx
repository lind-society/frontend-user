import React from 'react';
import { MdHomeWork, MdOutlineSupport } from 'react-icons/md';
import { RiHome4Fill } from 'react-icons/ri';
import { TbUserStar } from 'react-icons/tb';
import { useTranslations } from 'use-intl';

import Image from '@/components/image';
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
  <div className='flex h-full flex-col gap-4 bg-ink p-5 sm:p-6 md:p-7'>
    <div className='flex items-center gap-4'>
      <div className='flex h-10 w-10 shrink-0 items-center justify-center text-bronze-300'>
        {icon}
      </div>
      <span className='font-heading text-lg font-semibold text-cream sm:text-xl'>
        {title}
      </span>
    </div>
    <p className='text-sm text-cream/70'>{description}</p>
  </div>
);

const DreamHomeBuyPage = () => {
  const t = useTranslations('buy.dreamHome');

  const features = [
    {
      icon: <RiHome4Fill className='h-7 w-7' />,
      title: t('features.hundredsProperties.title'),
      description: t('features.hundredsProperties.description'),
    },
    {
      icon: <MdOutlineSupport className='h-7 w-7' />,
      title: t('features.knowWhatWorks.title'),
      description: t('features.knowWhatWorks.description'),
    },
    {
      icon: <TbUserStar className='h-7 w-7' />,
      title: t('features.notJustAgents.title'),
      description: t('features.notJustAgents.description'),
    },
    {
      icon: <MdHomeWork className='h-7 w-7' />,
      title: t('features.allPropertyServices.title'),
      description: t('features.allPropertyServices.description'),
    },
  ];

  return (
    <div className='py-12 md:py-16 lg:py-[64px]'>
      <BaseContainer>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
          {/* Left column with image and description */}
          <div className='flex flex-col h-full'>
            <div className='relative w-full aspect-[3/2] lg:h-[500px] xl:h-[680px]'>
              <Image
                src='/images/dream-home.jpeg'
                alt='Dream Home'
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover'
              />
            </div>
            <div className='flex flex-col gap-4 bg-ink p-6 md:gap-5 md:p-8'>
              <h2 className='font-heading text-xl text-cream md:text-2xl lg:text-3xl'>
                {t('title')}
              </h2>
              <p className='text-sm text-cream/80 md:text-base'>
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Right column with features */}
          <div className='grid grid-cols-1  gap-6 text-cream h-full'>
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

export default DreamHomeBuyPage;
