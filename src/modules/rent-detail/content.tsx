import { Check } from 'lucide-react';
import React from 'react';
import { FaBed, FaClock, FaStar } from 'react-icons/fa6';
import { GrMapLocation } from 'react-icons/gr';
import { MdOutlineLocationOn, MdOutlineWorkspaces } from 'react-icons/md';
import { useTranslations } from 'use-intl';

import { formatLocation, formatPrice } from '@/lib/mappers/format';
import { countBedrooms, getNightlyRate } from '@/lib/mappers/villa';
import { useMapCoordinates } from '@/hooks/api/useRegion';
import { useVillaReviews } from '@/hooks/api/useReview';

import BaseContainer from '@/components/layouts/container';
import { Badge } from '@/components/ui/badge';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Stars } from '@/components/ui/stars';

import { FeatureCard } from '@/modules/rent-detail/feature-card';
import SendInquiryForm from '@/modules/rent-detail/send-inquiry-form';

import { Villa } from '@/types/api/villa';

// Leaflet is heavy, so it is only downloaded once a map is shown.
const MapView = React.lazy(() => import('@/components/ui/map-view'));

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className='px-4 sm:px-6 py-4 flex flex-col gap-4 bg-cream-light rounded border'>
    <span className='text-xl text-primary font-semibold'>{title}</span>
    {children}
  </section>
);

const RatingSummary = ({ villa }: { villa: Villa }) => {
  const t = useTranslations('rentDetail.content');
  const rating = Number(villa.averageRating) || 0;

  return (
    <div className='flex gap-3 items-center'>
      <h4 className='text-primary text-xl font-semibold'>
        {rating > 0 ? rating.toFixed(1) : '-'}
      </h4>
      <div className='flex flex-col'>
        <span className='text-text text-sm'>{t('overallOn')}</span>
        <span className='text-primary font-semibold'>
          {villa.totalReview ?? 0} {t('reviews')}
        </span>
      </div>
      <Stars rating={rating} />
    </div>
  );
};

/** Distances are stored in metres; show kilometres once they get long. */
const formatDistance = (metres: number, m: string, km: string) =>
  metres >= 1000 ? `${(metres / 1000).toFixed(1)} ${km}` : `${metres} ${m}`;

const ContentRentDetail = ({ villa }: { villa: Villa }) => {
  const t = useTranslations('rentDetail.content');
  const tRates = useTranslations('rentDetail.content.rates');
  const tTypes = useTranslations('rentDetail.content.rentTypes');
  const tFeatures = useTranslations('rentDetail.content.features');

  const symbol = villa.currency?.symbol;
  const bedrooms = countBedrooms(villa);
  const facilities = villa.facilities ?? [];
  const extraServices = villa.features ?? [];
  const nearby = villa.placeNearby ?? [];

  const { data: reviewsData } = useVillaReviews(villa.id, 10);
  const reviews = reviewsData?.data.data ?? [];

  const { data: coordinates } = useMapCoordinates(villa.mapLink);
  const hasCoordinates =
    coordinates?.latitude != null && coordinates?.longitude != null;

  const rentTypes = [
    villa.availability?.daily && tTypes('daily'),
    villa.availability?.monthly && tTypes('monthly'),
    villa.availability?.yearly && tTypes('yearly'),
  ].filter(Boolean) as string[];

  const location = formatLocation(villa.city, villa.state);

  // Group the house rules by their type ("House Rules", "Pool Rules", ...).
  const policyGroups = (villa.policies ?? []).reduce<
    Record<string, NonNullable<Villa['policies']>>
  >((groups, policy) => {
    const key = policy.type?.name ?? t('villaPolicies');
    (groups[key] ??= []).push(policy);
    return groups;
  }, {});

  const rateRows = [
    {
      label: tRates('daily'),
      amount: villa.dailyPrice,
      unit: tRates('perNight'),
    },
    {
      label: tRates('lowSeason'),
      amount: villa.lowSeasonDailyPrice,
      unit: tRates('perNight'),
    },
    {
      label: tRates('highSeason'),
      amount: villa.highSeasonDailyPrice,
      unit: tRates('perNight'),
    },
    {
      label: tRates('peakSeason'),
      amount: villa.peakSeasonDailyPrice,
      unit: tRates('perNight'),
    },
    {
      label: tRates('monthly'),
      amount: villa.priceMonthly,
      unit: tRates('perMonth'),
    },
    {
      label: tRates('yearly'),
      amount: villa.priceYearly,
      unit: tRates('perYear'),
    },
  ].filter((row) => row.amount !== null && Number(row.amount) > 0);

  return (
    <div className='py-[32px]'>
      <BaseContainer>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-[32px]'>
          {/* Main content column */}
          <div className='flex-1 min-w-0 flex flex-col gap-4 order-2 lg:order-1'>
            <BreadcrumbLayout
              items={[
                { label: t('breadcrumbHome'), href: '/' },
                { label: t('breadcrumbVillas'), href: '/rent' },
                { label: t('breadcrumbRent'), href: '/rent/result' },
                ...(villa.state
                  ? [{ label: villa.state, href: '/rent/result' }]
                  : []),
                ...(villa.city
                  ? [{ label: villa.city, href: '/rent/result' }]
                  : []),
                {
                  label: villa.name,
                  href: `/rent/${villa.id}`,
                  isActive: true,
                },
              ]}
            />

            {/* Villa header */}
            <div className='px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between bg-cream-light rounded border gap-4 sm:gap-0'>
              <div className='flex flex-col gap-3'>
                <div>
                  <h1 className='text-xl sm:text-2xl font-semibold text-primary'>
                    {villa.name}
                  </h1>
                  <p className='text-sm text-ink-soft'>{villa.secondaryName}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm text-text'>
                    {t('availableForRent')}
                  </span>
                  <div className='flex flex-wrap gap-3 items-center'>
                    {rentTypes.map((type) => (
                      <Badge key={type} className='bg-primary/90 text-cream'>
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-start sm:items-end'>
                <Button
                  variant='primary'
                  className='flex gap-2 items-center'
                  asChild
                >
                  <a href={villa.mapLink} target='_blank' rel='noreferrer'>
                    <GrMapLocation size={18} />
                    <span>
                      {location} ({t('viewOnMap')})
                    </span>
                  </a>
                </Button>
                <RatingSummary villa={villa} />
              </div>
            </div>

            {/* Key features */}
            <Card title={t('keyFeatures')}>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
                <FeatureCard
                  icon={<FaBed size={18} />}
                  value={bedrooms}
                  label={tFeatures('bedrooms')}
                />
                <FeatureCard
                  icon={<FaClock size={18} />}
                  value={villa.checkInHour}
                  label={tFeatures('checkIn')}
                />
                <FeatureCard
                  icon={<FaClock size={18} />}
                  value={villa.checkOutHour}
                  label={tFeatures('checkOut')}
                />
                <FeatureCard
                  icon={<MdOutlineWorkspaces size={20} />}
                  value={facilities.length}
                  label={tFeatures('facilities')}
                />
                <FeatureCard
                  icon={<FaStar size={18} />}
                  value={
                    Number(villa.averageRating) > 0
                      ? Number(villa.averageRating).toFixed(1)
                      : '-'
                  }
                  label={tFeatures('rating')}
                />
                <FeatureCard
                  icon={<MdOutlineLocationOn size={22} />}
                  value={villa.city}
                  label={tFeatures('location')}
                />
              </div>
            </Card>

            {/* Highlights */}
            {villa.highlight && (
              <Card title={t('highlights')}>
                <p className='text-sm text-text whitespace-pre-line'>
                  {villa.highlight}
                </p>
              </Card>
            )}

            {/* Rates */}
            {rateRows.length > 0 && (
              <Card title={tRates('title')}>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {rateRows.map((row) => (
                    <div
                      key={row.label}
                      className='flex items-center justify-between gap-3 p-2.5 border rounded'
                    >
                      <span className='text-sm text-text'>{row.label}</span>
                      <span className='text-right'>
                        <span className='block text-sm font-semibold text-primary'>
                          {formatPrice(Number(row.amount), symbol)}
                        </span>
                        <span className='text-xs text-ink-muted'>
                          {row.unit}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className='text-xs text-ink-muted'>{tRates('note')}</p>
              </Card>
            )}

            {/* Policies */}
            <Card title={t('villaPolicies')}>
              {Object.keys(policyGroups).length === 0 ? (
                <p className='text-sm text-ink-soft'>{t('noPolicies')}</p>
              ) : (
                Object.entries(policyGroups).map(([group, policies]) => (
                  <div key={group} className='flex flex-col gap-3'>
                    <span className='text-primary font-semibold'>{group}</span>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      {policies.map((policy) => (
                        <div
                          key={policy.id}
                          className='flex flex-col gap-1 p-2.5 border rounded'
                        >
                          <span className='text-sm text-primary font-semibold'>
                            {policy.name}
                          </span>
                          {policy.description && (
                            <span className='text-sm text-text'>
                              {policy.description}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </Card>

            {/* Reviews */}
            <section className='px-4 sm:px-6 py-4 flex flex-col gap-5 bg-cream-light rounded border'>
              <div className='flex flex-wrap justify-between gap-3'>
                <span className='text-xl text-primary font-semibold'>
                  {t('reviews')}
                </span>
                <RatingSummary villa={villa} />
              </div>
              {reviews.length === 0 ? (
                <p className='text-sm text-ink-soft'>{t('noReviews')}</p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className='p-6 flex flex-col gap-4 rounded border'
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-primary font-semibold'>
                        {t('verifiedGuest')}
                      </span>
                      <div className='flex items-center gap-2'>
                        <span className='text-text text-xl font-semibold'>
                          {Number(review.rating).toFixed(1)}
                        </span>
                        <Stars rating={Number(review.rating)} />
                      </div>
                    </div>
                    <Separator />
                    <p className='text-text whitespace-pre-line'>
                      &ldquo;{review.message}&rdquo;
                    </p>
                  </div>
                ))
              )}
            </section>

            {/* Location & map */}
            <Card title={`${t('location')} & Map`}>
              <span className='text-text text-sm'>
                {[
                  villa.address,
                  villa.city,
                  villa.state,
                  villa.country,
                  villa.postalCode,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </span>
              <div className='w-full h-[300px] md:h-[400px] bg-sand/40 rounded overflow-hidden border relative z-0'>
                {hasCoordinates ? (
                  <React.Suspense fallback={null}>
                    <MapView
                      pins={[
                        {
                          id: villa.id,
                          latitude: coordinates.latitude as number,
                          longitude: coordinates.longitude as number,
                          label: villa.name,
                          active: true,
                        },
                      ]}
                    />
                  </React.Suspense>
                ) : (
                  <div className='flex h-full flex-col items-center justify-center gap-3 p-6 text-center'>
                    <p className='text-sm text-ink-soft'>
                      {t('mapUnavailable')}
                    </p>
                  </div>
                )}
              </div>
              <Button variant='outline' className='self-start' asChild>
                <a href={villa.mapLink} target='_blank' rel='noreferrer'>
                  {t('openMap')}
                </a>
              </Button>

              <div className='flex flex-col gap-3'>
                <span className='text-text font-semibold text-lg'>
                  {t('aroundVilla')}
                </span>
                {nearby.length === 0 ? (
                  <p className='text-sm text-ink-soft'>
                    {t('aroundVillaEmpty')}
                  </p>
                ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                    {nearby.map((place) => (
                      <div
                        key={place.name}
                        className='flex justify-between gap-3'
                      >
                        <span className='text-sm text-text'>{place.name}</span>
                        <span className='text-sm text-text font-medium whitespace-nowrap'>
                          {formatDistance(
                            Number(place.distance),
                            t('meters'),
                            t('kilometers')
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Facilities & extra services */}
            <Card title={t('serviceFeatures')}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
                <div className='flex flex-col gap-4'>
                  <span className='text-text font-semibold'>
                    {t('facilitiesTitle')}
                  </span>
                  {facilities.length === 0 && (
                    <p className='text-sm text-ink-soft'>{t('noFacilities')}</p>
                  )}
                  {facilities.map((facility) => (
                    <div key={facility.id} className='flex gap-2 items-center'>
                      <Check size={16} className='text-primary' />
                      <span className='text-text text-sm'>{facility.name}</span>
                    </div>
                  ))}
                </div>

                <div className='flex flex-col gap-4'>
                  <span className='text-text font-semibold'>
                    {t('extraServices')}
                  </span>
                  {extraServices.length === 0 && (
                    <p className='text-sm text-ink-soft'>{t('noServices')}</p>
                  )}
                  {extraServices.map((service) => (
                    <div
                      key={service.id}
                      className='flex items-center justify-between gap-3'
                    >
                      <span className='flex gap-2 items-center'>
                        <Check size={16} className='text-primary' />
                        <span className='text-text text-sm'>
                          {service.name}
                        </span>
                      </span>
                      <span className='text-sm font-medium text-primary whitespace-nowrap'>
                        {service.free || !service.price
                          ? t('free')
                          : formatPrice(
                              Number(
                                service.priceAfterDiscount ?? service.price
                              ),
                              symbol
                            )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sticky inquiry / booking card */}
          <div className='w-full lg:w-[350px] shrink-0 order-1 lg:order-2'>
            <SendInquiryForm
              villa={villa}
              bedrooms={bedrooms}
              nightlyRate={getNightlyRate(villa)}
            />
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentRentDetail;
