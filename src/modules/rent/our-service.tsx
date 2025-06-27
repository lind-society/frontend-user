import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';

interface ServiceItemProps {
  text: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ text }) => (
  <div className='flex gap-2 items-center px-4 sm:px-6 py-3 border-b'>
    <RiVerifiedBadgeFill size={20} className='text-primary min-w-[20px]' />
    <p className='text-base sm:text-lg md:text-xl lg:text-[22px] font-semibold'>
      {text}
    </p>
  </div>
);

interface ServiceCardProps {
  title: string;
  imageSrc: string;
  services: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imageSrc,
  services,
}) => (
  <div className='flex flex-col shadow-sm hover:shadow-md transition-shadow'>
    <div className='relative aspect-[4/3] w-full'>
      <Image
        fill
        alt={`${title} service`}
        src={imageSrc}
        sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
        className='object-cover'
      />
    </div>
    <div className='px-4 sm:px-6 md:px-8 bg-primary py-4 sm:py-5 md:py-6 text-center text-white text-lg sm:text-xl md:text-2xl font-bold '>
      <span className='line-clamp-1'>{title}</span>
    </div>
    <div className='flex flex-col text-primary border'>
      {services.map((service, index) => (
        <ServiceItem key={index} text={service} />
      ))}
    </div>
  </div>
);

const OurServiceRentPage = () => {
  const t = useTranslations('rent.ourService');

  const serviceCards = [
    {
      title: t('services.beforeStay.title'),
      imageSrc: '/images/our-service-1.jpeg',
      services: [
        t('services.beforeStay.items.airportTransfers'),
        t('services.beforeStay.items.groceryShopping'),
        t('services.beforeStay.items.babyPrep'),
        t('services.beforeStay.items.babyProofing'),
        t('services.beforeStay.items.customRequest'),
      ],
    },
    {
      title: t('services.duringStay.title'),
      imageSrc: '/images/our-service-2.jpeg',
      services: [
        t('services.duringStay.items.dayTrip'),
        t('services.duringStay.items.personalChef'),
        t('services.duringStay.items.inVillaMassage'),
        t('services.duringStay.items.spaServices'),
        t('services.duringStay.items.touristActivities'),
        t('services.duringStay.items.restaurantReservations'),
        t('services.duringStay.items.businessSupport'),
        t('services.duringStay.items.childcareServices'),
      ],
    },
    {
      title: t('services.specialRequest.title'),
      imageSrc: '/images/our-service-3.jpeg',
      services: [
        t('services.specialRequest.items.partiesEvents'),
        t('services.specialRequest.items.romanticDinner'),
        t('services.specialRequest.items.surpriseOccasions'),
        t('services.specialRequest.items.yogaSessions'),
        t('services.specialRequest.items.customRequest'),
      ],
    },
  ];

  return (
    <section className='bg-gray-50 py-8 md:py-12 lg:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          {/* Header Section */}
          <div className='flex flex-col gap-2 md:gap-4 text-center'>
            <h4 className=' text-primary'>{t('title')}</h4>
            <p className='text-lg md:text-xl lg:text-[22px] text-text'>
              {t('subtitle')}
            </p>
          </div>

          {/* Service Cards - Responsive Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {serviceCards.map((card, index) => (
              <ServiceCard
                key={index}
                title={card.title}
                imageSrc={card.imageSrc}
                services={card.services}
              />
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default OurServiceRentPage;
