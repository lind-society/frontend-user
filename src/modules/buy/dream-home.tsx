import Image from 'next/image';
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
  const features = [
    {
      icon: <RiHome4Fill className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Hundreds of properties to choose from',
      description:
        'Browse our exclusive collection of handpicked properties tailored to your unique needs and preferences, with options ranging from beachfront villas to mountain retreats.',
    },
    {
      icon: <MdOutlineSupport className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'We know what works best',
      description:
        "With years of local expertise, our team understands the market inside out. We'll guide you to the properties that best match your investment goals and lifestyle requirements.",
    },
    {
      icon: <TbUserStar className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'Not just agents, experts',
      description:
        'Our professionals combine deep local knowledge with industry expertise to offer strategic advice that goes beyond standard agent services, helping you make informed decisions.',
    },
    {
      icon: <MdHomeWork className='text-primary w-6 h-6 md:w-8 md:h-8' />,
      title: 'All property services in one place',
      description:
        'From search to closing and beyond, we handle everything including legal guidance, financing assistance, property management, and ongoing investment support.',
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
                Find Your Dream Home in One Place
              </h2>
              <p className='text-white text-base md:text-lg lg:text-xl font-medium md:font-semibold'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore.
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
