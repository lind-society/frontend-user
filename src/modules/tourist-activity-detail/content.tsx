'use client';

import { addDays, format } from 'date-fns';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';

import { TouristActivity } from '@/modules/tourist-activity/constant';

interface ContentProps {
  activity: TouristActivity;
  onGetTicket: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

// No availability calendar exists yet — this just gives real, upcoming dates
// to pick from instead of the same fixed "Sat 11 May" repeated 14 times.
const upcomingDates = Array.from({ length: 14 }).map((_, index) =>
  addDays(new Date(), index)
);

const Content: React.FC<ContentProps> = ({
  activity,
  onGetTicket,
  selectedDate,
  onSelectDate,
}) => {
  const t = useTranslations('touristActivityDetail');
  const hasDiscount = activity.originalPrice
    ? activity.originalPrice > activity.price
    : false;
  const ticketsLeftToday =
    activity.dailyLimit !== undefined
      ? Math.max(activity.dailyLimit - (activity.bookedToday ?? 0), 0)
      : null;

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          ...(activity.category
            ? [
                {
                  // No category filter exists on the listing page yet — this
                  // just names the category, same as it does in the design;
                  // it still links somewhere sensible rather than nowhere.
                  label: activity.category,
                  href: '/tourist-activity',
                  isActive: false,
                },
              ]
            : []),
          {
            label: activity.name,
            href: `/tourist-activity/${activity.id}`,
            isActive: true,
          },
        ]}
      />

      {/* Title & Info */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2 bg-cream-light rounded p-4 border gap-y-4'>
        <div className='flex flex-col gap-1'>
          <h5 className='font-bold text-primary'>{activity.name}</h5>
          {ticketsLeftToday !== null && (
            <span
              className={`text-xs font-medium ${
                ticketsLeftToday === 0 ? 'text-red-600' : 'text-ink-muted'
              }`}
            >
              {ticketsLeftToday === 0
                ? t('soldOutToday')
                : t('ticketsLeftToday', { count: ticketsLeftToday })}
            </span>
          )}
        </div>
        <div className='flex sm:items-end  flex-col gap-2 gap-y-4'>
          {activity.mapLink ? (
            <Button
              asChild
              variant='primary'
              className='bg-green-100 text-green-800'
            >
              <a href={activity.mapLink} target='_blank' rel='noreferrer'>
                {activity.location} / {t('viewOnMap')}
              </a>
            </Button>
          ) : (
            <Button variant='primary' className='bg-green-100 text-green-800'>
              {activity.location}
            </Button>
          )}
          {activity.openingHour && activity.closingHour && (
            <span className='flex items-center gap-1 text-xs text-ink-muted'>
              <Clock className='w-4 h-4' /> {t('open')} | {activity.openingHour}
              -{activity.closingHour}
            </span>
          )}
        </div>
      </div>

      {/* Tabs — jump to the section below rather than swap panels, since
          every section is short enough to keep visible at once anyway. */}
      <div className=' border-bronze/25 mb-4 bg-cream-light rounded  border'>
        <nav className='grid grid-cols-4 gap-6'>
          <button
            type='button'
            onClick={() => scrollToSection('activity-description')}
            className='py-2 px-1 border-b-2 border-primary text-primary font-semibold'
          >
            {t('description')}
          </button>
          <button
            type='button'
            onClick={() => scrollToSection('activity-ticket')}
            className='py-2 px-1 text-ink-muted hover:text-primary'
          >
            {t('ticket')}
          </button>
          <button
            type='button'
            onClick={() => scrollToSection('activity-schedule')}
            className='py-2 px-1 text-ink-muted hover:text-primary'
          >
            {t('openSchedule')}
          </button>
          <button
            type='button'
            onClick={() => scrollToSection('activity-location')}
            className='py-2 px-1 text-ink-muted hover:text-primary'
          >
            {t('locationAndMap')}
          </button>
        </nav>
      </div>

      {/* Description */}
      <div
        id='activity-description'
        className='mb-6 bg-cream-light rounded p-4 border'
      >
        <p className='text-[22px] text-primary font-semibold mb-2'>
          {t('description')}
        </p>
        <p className='text-ink-soft'>{activity.description}</p>
      </div>

      {/* Ticket */}
      <div id='activity-ticket' className=' bg-cream-light rounded p-4 border'>
        <p className='text-[22px] font-semibold mb-2 text-primary'>
          {t('ticket')}
        </p>
        <div className='flex gap-2 items-center w-full overflow-x-auto'>
          {upcomingDates.map((date, index) => {
            const isSelected =
              format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

            return (
              <button
                type='button'
                key={index}
                onClick={() => onSelectDate(date)}
                className={`flex flex-col gap-2 items-center p-2 border rounded min-w-20 transition-colors ${
                  isSelected
                    ? 'bg-primary text-cream border-primary'
                    : 'hover:bg-sand/40'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isSelected ? 'text-cream' : 'text-primary'
                  }`}
                >
                  {format(date, 'EEE')}
                </span>
                <span
                  className={`font-semibold ${
                    isSelected ? 'text-cream' : 'text-primary'
                  }`}
                >
                  {format(date, 'd MMM')}
                </span>
              </button>
            );
          })}
        </div>
        <div className='flex flex-col md:flex-row md:items-center gap-4 border p-2 rounded'>
          <div className='flex gap-2 items-center'>
            <Ticket className='w-5 h-5 text-primary' />
            <span className='font-medium'>{t('entranceTicket')}</span>
            <Badge className='bg-sand/40 text-ink-soft'>
              {t('seeDetails')}
            </Badge>
          </div>
          <div className='flex-1 flex flex-wrap gap-2 items-center gap-y-4 sm:justify-between md:justify-end'>
            <span className='text-lg font-bold text-primary'>
              {activity.currency} {activity.price.toLocaleString()}
              <span className='text-sm font-normal text-ink-muted'>
                /{activity.priceUnit}
              </span>
            </span>
            {hasDiscount && activity.originalPrice && (
              <>
                <span className='line-through text-ink-muted text-sm'>
                  {activity.currency} {activity.originalPrice.toLocaleString()}
                </span>
                <Badge className='bg-green-100 text-green-800'>
                  -
                  {Math.round(
                    ((activity.originalPrice - activity.price) /
                      activity.originalPrice) *
                      100
                  )}
                  %
                </Badge>
              </>
            )}
            <Button onClick={onGetTicket} className='bg-primary text-cream'>
              {t('getTicket')}
            </Button>
          </div>
        </div>
      </div>

      {/* Open Schedule */}
      <div
        id='activity-schedule'
        className=' bg-cream-light rounded p-4 border'
      >
        <p className='text-[22px] text-primary font-semibold mb-4 sm:mb-2'>
          {t('openSchedule')}
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex items-center gap-2 border p-2 rounded'>
            <Calendar className='w-5 h-5 text-primary' />
            <span>
              {t('openingHour')} {activity.openingHour || '—'}
            </span>
          </div>
          <div className='flex items-center gap-2 border p-2 rounded'>
            <Calendar className='w-5 h-5 text-primary' />
            <span>
              {t('closingHour')} {activity.closingHour || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Location & Map */}
      <div id='activity-location' className='mb-6'>
        <h2 className='text-[22px] text-primary font-semibold mb-2'>
          {t('locationAndMap')}
        </h2>
        <div className='mb-2 text-ink-soft'>{activity.location}</div>
        {activity.mapLink ? (
          <a
            href={activity.mapLink}
            target='_blank'
            rel='noreferrer'
            className='w-full h-64 bg-sand rounded flex flex-col items-center justify-center gap-2 hover:bg-sand/80 transition-colors'
          >
            <MapPin className='w-8 h-8 text-primary' />
            <span className='text-primary font-medium'>{t('viewOnMap')}</span>
          </a>
        ) : (
          <div className='w-full h-64 bg-sand rounded flex items-center justify-center'>
            <span className='text-ink-muted'>{t('locationAndMap')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
