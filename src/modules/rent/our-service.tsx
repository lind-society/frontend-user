import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import TitleSection from '@/components/ui/title-section';

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
  <div className='flex flex-col'>
    <div className='relative aspect-[4/3] w-full'>
      <Image
        fill
        alt={title}
        src={imageSrc}
        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        className='object-cover'
      />
    </div>

    <div className='bg-bronze-600 px-6 py-4'>
      <span className='font-heading text-lg font-semibold text-cream'>
        {title}
      </span>
    </div>

    <ul className='flex flex-col border border-t-0 border-bronze/25 bg-cream-light'>
      {services.map((service) => (
        <li
          key={service}
          className='flex items-center gap-3 border-b border-bronze/15 px-5 py-3 last:border-b-0'
        >
          <RiCheckboxCircleFill
            size={20}
            className='shrink-0 text-bronze-600'
          />
          <span className='text-[22px] leading-[1.3] tracking-[0.1px] text-ink'>
            {service}
          </span>
        </li>
      ))}
    </ul>
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
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-10'>
          <TitleSection title={t('title')} subTitle={t('subtitle')} />

          <div className='grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {serviceCards.map((card) => (
              <ServiceCard
                key={card.title}
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
