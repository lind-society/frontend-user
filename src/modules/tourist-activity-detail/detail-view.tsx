import { format } from 'date-fns';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';

import { formatPrice } from '@/lib/mappers/format';
import { useMapCoordinates } from '@/hooks/api/useRegion';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import Gallery from '@/modules/rent-detail/gallery';
import { TouristActivity } from '@/modules/tourist-activity/constant';

// Leaflet is heavy, so it is only downloaded once a map is shown.
const MapView = React.lazy(() => import('@/components/ui/map-view'));

const TABS = ['highlights', 'ticket', 'schedule', 'location'] as const;
type TabId = (typeof TABS)[number];

const PanelTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className='border-b border-bronze/25 pb-3 font-heading text-xl text-ink'>
    {children}
  </h2>
);

const Row = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className='flex items-center gap-4 rounded border border-bronze/15 bg-cream-light px-4 py-3 shadow-xs'>
    <span className='text-bronze-600'>{icon}</span>
    <span className='flex flex-col text-sm text-ink'>
      <span className='text-xs text-ink-soft'>{label}</span>
      {children}
    </span>
  </div>
);

interface DetailViewProps {
  activity: TouristActivity;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onGetTicket: () => void;
}

/** Activity detail page from the new design: gallery, booking card and four tabs. */
const DetailView = ({
  activity,
  selectedDate,
  onSelectDate,
  onGetTicket,
}: DetailViewProps) => {
  const t = useTranslations('touristActivityDetail.view');

  const fromHash = () => {
    const hash = window.location.hash.replace('#', '') as TabId;
    return TABS.includes(hash) ? hash : 'highlights';
  };
  const [active, setActive] = useState<TabId>(fromHash);
  useEffect(() => {
    window.history.replaceState(null, '', `#${active}`);
  }, [active]);

  const { data: coordinates } = useMapCoordinates(activity.mapLink);
  const hasCoordinates =
    coordinates?.latitude != null && coordinates?.longitude != null;

  const paragraphs = (activity.description ?? '')
    .split(/\n{2,}|\n/)
    .map((text) => text.trim())
    .filter(Boolean);

  const left =
    activity.dailyLimit != null
      ? Math.max(activity.dailyLimit - (activity.bookedToday ?? 0), 0)
      : null;

  const hasDiscount =
    activity.originalPrice != null && activity.originalPrice > activity.price;

  const dateLabel = format(selectedDate, 'dd MMM yyyy');

  return (
    <div className='bg-bg pb-16 pt-[96px]'>
      <BaseContainer>
        <div className='mb-4'>
          <BreadcrumbLayout
            items={[
              { label: t('home'), href: '/' },
              { label: t('experiences'), href: '/tourist-activity' },
              ...(activity.category
                ? [{ label: activity.category, href: '/tourist-activity' }]
                : []),
              {
                label: activity.name,
                href: `/tourist-activity/${activity.id}`,
                isActive: true,
              },
            ]}
          />
        </div>
      </BaseContainer>

      <Gallery name={activity.name} photos={activity.images} />

      <BaseContainer>
        <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_350px]'>
          <div className='flex min-w-0 flex-col gap-8'>
            <div className='flex flex-col gap-2 px-1'>
              {activity.location && (
                <span className='flex items-center gap-2 text-sm text-ink-soft'>
                  <MapPin size={16} className='text-bronze-600' />
                  {activity.location}
                </span>
              )}
              <h1 className='font-heading text-3xl text-ink'>
                {activity.name}
              </h1>
              {left != null && (
                <span className='mt-1 flex items-center gap-2 text-sm text-ink'>
                  <Ticket size={16} className='text-bronze-600' />
                  {left} {t('ticketsLeft')}
                </span>
              )}
            </div>

            <div className='flex flex-col gap-8'>
              <div
                role='tablist'
                className='flex gap-1 overflow-x-auto border-b border-bronze/25'
              >
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type='button'
                    role='tab'
                    aria-selected={active === tab}
                    onClick={() => setActive(tab)}
                    className={`-mb-px whitespace-nowrap border-b-2 px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
                      active === tab
                        ? 'border-bronze-600 text-ink'
                        : 'border-transparent text-ink-soft hover:text-ink'
                    }`}
                  >
                    {t(`tabs.${tab}`)}
                  </button>
                ))}
              </div>

              <div role='tabpanel'>
                {active === 'highlights' && (
                  <div className='flex flex-col gap-4'>
                    <PanelTitle>{t('descriptions')}</PanelTitle>
                    {paragraphs.length === 0 ? (
                      <p className='text-sm text-ink-soft'>
                        {t('noDescription')}
                      </p>
                    ) : (
                      paragraphs.map((text, index) => (
                        <p key={index} className='text-sm leading-7 text-ink'>
                          {text}
                        </p>
                      ))
                    )}
                  </div>
                )}

                {active === 'ticket' && (
                  <div className='flex flex-col gap-4'>
                    <PanelTitle>{t('tabs.ticket')}</PanelTitle>
                    <div className='grid gap-3 sm:grid-cols-2'>
                      <Row icon={<Ticket size={18} />} label={t('price')}>
                        <span className='font-semibold text-bronze-700'>
                          {formatPrice(activity.price, activity.currency)} /{' '}
                          {activity.priceUnit}
                        </span>
                        {hasDiscount && (
                          <span className='text-xs text-ink-muted line-through'>
                            {formatPrice(
                              activity.originalPrice as number,
                              activity.currency
                            )}
                          </span>
                        )}
                      </Row>
                      {activity.dailyLimit != null && (
                        <Row
                          icon={<CalendarDays size={18} />}
                          label={t('dailyQuota')}
                        >
                          {activity.dailyLimit} {t('perDay')}
                        </Row>
                      )}
                    </div>
                  </div>
                )}

                {active === 'schedule' && (
                  <div className='flex flex-col gap-4'>
                    <PanelTitle>{t('tabs.schedule')}</PanelTitle>
                    <div className='grid gap-3 sm:grid-cols-2'>
                      {activity.openingHour && (
                        <Row icon={<Clock size={18} />} label={t('opening')}>
                          {activity.openingHour}
                        </Row>
                      )}
                      {activity.closingHour && (
                        <Row icon={<Clock size={18} />} label={t('closing')}>
                          {activity.closingHour}
                        </Row>
                      )}
                      <Row
                        icon={<CalendarDays size={18} />}
                        label={t('availability')}
                      >
                        {activity.duration === 'permanent'
                          ? t('open')
                          : t('limited')}
                      </Row>
                    </div>
                  </div>
                )}

                {active === 'location' && (
                  <div className='flex flex-col gap-5'>
                    <PanelTitle>{t('tabs.location')}</PanelTitle>
                    <span className='text-sm text-ink'>
                      {activity.location}
                    </span>
                    <div className='relative z-0 h-[300px] w-full overflow-hidden rounded border border-bronze/20 bg-sand/40 md:h-[400px]'>
                      {hasCoordinates ? (
                        <React.Suspense fallback={null}>
                          <MapView
                            pins={[
                              {
                                id: activity.id,
                                latitude: coordinates.latitude as number,
                                longitude: coordinates.longitude as number,
                                label: activity.name,
                                active: true,
                              },
                            ]}
                          />
                        </React.Suspense>
                      ) : (
                        <div className='flex h-full items-center justify-center p-6 text-center text-sm text-ink-soft'>
                          {t('mapUnavailable')}
                        </div>
                      )}
                    </div>
                    {activity.mapLink && (
                      <a
                        href={activity.mapLink}
                        target='_blank'
                        rel='noreferrer'
                        className='self-start text-sm text-bronze-600 underline'
                      >
                        {t('openMap')}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking card */}
          <aside className='lg:sticky lg:top-24 lg:self-start'>
            <div className='flex flex-col gap-5 rounded border border-bronze/20 bg-cream-light p-5 shadow-sm'>
              <div className='flex flex-col gap-1 border-b border-bronze/15 pb-4'>
                <span className='text-xs text-bronze-600'>
                  {t('startFrom')}
                </span>
                <span className='text-xl font-semibold text-ink'>
                  {formatPrice(activity.price, activity.currency)}{' '}
                  <span className='text-xs font-normal text-ink-soft'>
                    / {activity.priceUnit}
                  </span>
                </span>
              </div>

              <div className='flex flex-col gap-1'>
                <span className='text-xs text-bronze-600'>{t('date')}</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type='button'
                      className='flex items-center justify-between rounded border border-bronze/20 bg-white px-3 py-2 text-sm text-ink'
                    >
                      {dateLabel}
                      <CalendarDays size={16} className='text-bronze-600' />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={selectedDate}
                      onSelect={(date) => date && onSelectDate(date)}
                      disabled={{ before: new Date() }}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button variant='primary' onClick={onGetTicket}>
                {t('checkAvailability')}
              </Button>
            </div>
          </aside>
        </div>
      </BaseContainer>
    </div>
  );
};

export default DetailView;
