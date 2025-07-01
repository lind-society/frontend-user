'use client';

import { Calendar, Clock, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';

import { TouristActivity } from '@/modules/tourist-activity/constant';

interface ContentProps {
  activity: TouristActivity;
  onGetTicket: () => void;
}

const Content: React.FC<ContentProps> = ({ activity, onGetTicket }) => {
  const t = useTranslations('touristActivityDetail');

  return (
    <div className='flex-1 min-w-0 flex flex-col gap-4'>
      {/* Breadcrumbs */}
      <BreadcrumbLayout
        items={[
          {
            label: 'Home',
            href: '/',
            isActive: false,
          },
          {
            label: 'Tourist Activity',
            href: '/tourist-activity',
            isActive: false,
          },
          {
            label: activity.name,
            href: `/tourist-activity/${activity.id}`,
            isActive: true,
          },
        ]}
      />

      {/* Title & Info */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2 bg-white rounded-md p-4 border gap-y-4'>
        <h5 className=' font-bold text-primary'>{activity.name}</h5>
        <div className='flex sm:items-end  flex-col gap-2 gap-y-4'>
          <Button variant='primary' className='bg-green-100 text-green-800'>
            {activity.location} / {t('viewOnMap')}
          </Button>
          <span className='flex items-center gap-1 text-xs text-gray-500'>
            <Clock className='w-4 h-4' /> {t('open')} | Sel, 17:00-18:00
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className=' border-gray-200 mb-4 bg-white rounded-md  border'>
        <nav className='grid grid-cols-4 gap-6'>
          <button className='py-2 px-1 border-b-2 border-primary text-primary font-semibold'>
            {t('description')}
          </button>
          <button className='py-2 px-1 text-gray-500'>{t('ticket')}</button>
          <button className='py-2 px-1 text-gray-500'>
            {t('openSchedule')}
          </button>
          <button className='py-2 px-1 text-gray-500'>
            {t('locationAndMap')}
          </button>
        </nav>
      </div>

      {/* Description */}
      <div className='mb-6 bg-white rounded-md p-4 border'>
        <p className='text-[22px] text-primary font-semibold mb-2'>
          {t('description')}
        </p>
        <p className='text-gray-700 mb-2'>{activity.description}</p>
        <ul className='list-disc pl-5 text-gray-700 space-y-1'>
          <li>
            Watch the legendary Kecak and Fire Dance live at Uluwatu Temple
          </li>
          <li>
            Enjoy the view of the Ramayana, performed with the breathtaking
            sunset as the backdrop—truly spectacular
          </li>
          <li>
            Feel the excitement of being part of the performance by chanting
            "chak-chak" along with the dancers and the crowd
          </li>
          <li>
            Don't forget to snap some photos—capture the beautiful temple and
            dancers, perfect for your social media feed!
          </li>
        </ul>
      </div>

      {/* Ticket */}
      <div className=' bg-white rounded-md p-4 border'>
        <p className='text-[22px] font-semibold mb-2 text-primary'>
          {t('ticket')}
        </p>
        <div className='flex gap-2 items-center w-full overflow-x-auto'>
          {Array.from({ length: 14 }).map((_, index) => (
            <div
              key={index}
              className='flex flex-col gap-2 items-center p-2 border rounded-md min-w-20'
            >
              <span className='text-primary text-sm font-medium'>Sat</span>
              <span className='font-semibold text-primary '>11 May</span>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row md:items-center gap-4 border p-2 rounded-md'>
          <div className='flex gap-2 items-center'>
            <Ticket className='w-5 h-5 text-primary' />
            <span className='font-medium'>{t('entranceTicket')}</span>
            <Badge className='bg-gray-100 text-gray-700'>
              {t('seeDetails')}
            </Badge>
          </div>
          <div className='flex-1 flex flex-wrap gap-2 items-center gap-y-4 sm:justify-between md:justify-end'>
            <span className='text-lg font-bold text-primary'>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(activity.price)}
              <span className='text-sm font-normal text-gray-500'>
                {t('pax')}
              </span>
            </span>
            <span className='line-through text-gray-400 text-sm'>
              IDR 150,000
            </span>
            <Badge className='bg-green-100 text-green-800'>-10%</Badge>
            <Button onClick={onGetTicket} className='bg-primary text-white'>
              {t('getTicket')}
            </Button>
          </div>
        </div>
      </div>

      {/* Open Schedule */}
      <div className=' bg-white rounded-md p-4 border'>
        <p className='text-[22px] text-primary font-semibold mb-4 sm:mb-2'>
          {t('openSchedule')}
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex items-center gap-2 border p-2 rounded-md'>
            <Calendar className='w-5 h-5 text-primary' />
            <span>{t('openingHour')} 09:00 am</span>
          </div>
          <div className='flex items-center gap-2 border p-2 rounded-md'>
            <Calendar className='w-5 h-5 text-primary' />
            <span>{t('closingHour')} 09:00 pm</span>
          </div>
        </div>
      </div>

      {/* Location & Map */}
      <div className='mb-6'>
        <h2 className='text-[22px] text-primary font-semibold mb-2'>
          {t('locationAndMap')}
        </h2>
        <div className='mb-2 text-gray-700'>{activity.location}</div>
        <div className='w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center'>
          <span className='text-gray-500'>[Map Placeholder]</span>
        </div>
      </div>
    </div>
  );
};

export default Content;
