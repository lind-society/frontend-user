'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import { MdHomeWork, MdOutlineSupport } from 'react-icons/md';
import { RiHome4Fill } from 'react-icons/ri';
import { TbUserStar } from 'react-icons/tb';

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
  <div className='bg-primary p-5 sm:p-6 md:p-8 flex flex-col gap-5 h-full'>
    <div className='flex gap-4 md:gap-5 items-center'>
      <div className='w-[48px] h-[48px] md:w-[64px] md:h-[64px] bg-tertiary flex items-center justify-center rounded-full'>
        {icon}
      </div>
      <span className='font-bold text-lg sm:text-xl md:text-2xl'>{title}</span>
    </div>
    <p className='font-medium md:font-semibold text-base'>{description}</p>
  </div>
);

const DreamHomeBuyPage = () => {
  const t = useTranslations('buy.dreamHome');

  const features = [
    {
      icon: <RiHome4Fill className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.hundredsProperties.title'),
      description: t('features.hundredsProperties.description'),
    },
    {
      icon: <MdOutlineSupport className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.knowWhatWorks.title'),
      description: t('features.knowWhatWorks.description'),
    },
    {
      icon: <TbUserStar className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: t('features.notJustAgents.title'),
      description: t('features.notJustAgents.description'),
    },
    {
      icon: <MdHomeWork className='text-primary w-6 h-6 md:w-8 md:h-8' />,
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
            <div className='bg-primary p-6 md:p-8 flex flex-col gap-4 md:gap-5'>
              <h2 className='text-white text-xl md:text-2xl lg:text-3xl font-bold'>
                {t('title')}
              </h2>
              <p className='text-white text-base md:text-lg lg:text-xl font-medium md:font-semibold'>
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Right column with features */}
          <div className='grid grid-cols-1  gap-6 text-white h-full'>
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
