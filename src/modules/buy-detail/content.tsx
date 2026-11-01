import { Check } from 'lucide-react';
import React from 'react';
import { FaBed, FaTag } from 'react-icons/fa6';
import { GrMapLocation } from 'react-icons/gr';
import { IoKey } from 'react-icons/io5';
import { MdOutlineLocationOn, MdOutlineWorkspaces } from 'react-icons/md';
import { useTranslations } from 'use-intl';

import { formatLocation, formatPrice } from '@/lib/mappers/format';
import { useMapCoordinates } from '@/hooks/api/useRegion';

import BaseContainer from '@/components/layouts/container';
import { Badge } from '@/components/ui/badge';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';

import SendInquiryFormBuy from '@/modules/buy-detail/inquiry-form';
import { FeatureCard } from '@/modules/rent-detail/feature-card';

import { Property } from '@/types/api/property';

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

const formatDistance = (metres: number, m: string, km: string) =>
  metres >= 1000 ? `${(metres / 1000).toFixed(1)} ${km}` : `${metres} ${m}`;

const ContentBuyDetail = ({ property }: { property: Property }) => {
  const t = useTranslations('buyDetail.content');

  const symbol = property.currency?.symbol;
  const price = Number(property.priceAfterDiscount || property.price);
  const bedrooms =
    property.additionals?.filter((additional) => additional.type === 'bedrooms')
      .length ?? 0;
  const facilities = property.facilities ?? [];
  const highlights = property.features ?? [];
  const nearby = property.placeNearby ?? [];
  const location = formatLocation(property.city, property.state);

  const { data: coordinates } = useMapCoordinates(property.mapLink);
  const hasCoordinates =
    coordinates?.latitude != null && coordinates?.longitude != null;

  return (
    <div className='pt-[32px]'>
      <BaseContainer>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-[32px]'>
          <div className='flex-1 min-w-0 flex flex-col gap-4 order-2 lg:order-1'>
            <BreadcrumbLayout
              items={[
                { label: t('breadcrumbHome'), href: '/' },
                { label: t('breadcrumbBuy'), href: '/buy' },
                ...(property.country
                  ? [{ label: property.country, href: '/buy/result' }]
                  : []),
                ...(property.city
                  ? [{ label: property.city, href: '/buy/result' }]
                  : []),
                {
                  label: property.name,
                  href: `/buy/${property.id}`,
                  isActive: true,
                },
              ]}
            />

            {/* Header */}
            <div className='px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between bg-cream-light rounded border gap-4 sm:gap-0'>
              <div className='flex flex-col gap-3'>
                <div>
                  <h1 className='text-xl sm:text-2xl font-semibold text-primary'>
                    {property.name}
                  </h1>
                  <p className='text-sm text-ink-soft'>
                    {property.secondaryName}
                  </p>
                </div>
                <div className='flex flex-wrap items-center gap-3'>
                  <Badge className='bg-primary/90 text-cream'>
                    {t(property.ownershipType)}
                  </Badge>
                  <Badge
                    className={
                      property.soldStatus
                        ? 'bg-ink text-cream'
                        : 'bg-primary/70 text-cream'
                    }
                  >
                    {property.soldStatus ? t('sold') : t('available')}
                  </Badge>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-start sm:items-end'>
                <Button
                  variant='primary'
                  className='flex gap-2 items-center'
                  asChild
                >
                  <a href={property.mapLink} target='_blank' rel='noreferrer'>
                    <GrMapLocation size={18} />
                    <span>
                      {location} ({t('viewOnMap')})
                    </span>
                  </a>
                </Button>
                <div className='text-right'>
                  <span className='block text-xs text-ink-muted'>
                    {t('price')}
                  </span>
                  <span className='text-xl font-semibold text-primary'>
                    {formatPrice(price, symbol)}
                  </span>
                </div>
              </div>
            </div>

            {/* Key features */}
            <Card title={t('keyFeatures')}>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                <FeatureCard
                  icon={<IoKey size={20} />}
                  value={t(property.ownershipType)}
                  label={t('propertyInfo.ownership')}
                />
                <FeatureCard
                  icon={<FaTag size={18} />}
                  value={property.soldStatus ? t('sold') : t('available')}
                  label={t('status')}
                />
                <FeatureCard
                  icon={<FaBed size={18} />}
                  value={bedrooms}
                  label={t('bedroomsCount')}
                />
                <FeatureCard
                  icon={<MdOutlineWorkspaces size={20} />}
                  value={facilities.length}
                  label={t('facilitiesCount')}
                />
                <FeatureCard
                  icon={<MdOutlineLocationOn size={22} />}
                  value={property.city}
                  label={t('location')}
                />
              </div>
            </Card>

            {/* Overview */}
            {property.highlight && (
              <Card title={t('overview')}>
                <p className='text-sm text-text whitespace-pre-line'>
                  {property.highlight}
                </p>
              </Card>
            )}

            {/* Highlights */}
            <Card title={t('highlightsTitle')}>
              {highlights.length === 0 ? (
                <p className='text-sm text-ink-soft'>{t('noFeatures')}</p>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {highlights.map((feature) => (
                    <div key={feature.id} className='flex items-center gap-2'>
                      <Check size={16} className='text-primary' />
                      <span className='text-sm text-text'>{feature.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Location & map */}
            <Card title={`${t('location')} & Map`}>
              <span className='text-text text-sm'>
                {[
                  property.address,
                  property.city,
                  property.state,
                  property.country,
                  property.postalCode,
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
                          id: property.id,
                          latitude: coordinates.latitude as number,
                          longitude: coordinates.longitude as number,
                          label: property.name,
                          active: true,
                        },
                      ]}
                    />
                  </React.Suspense>
                ) : (
                  <div className='flex h-full items-center justify-center p-6 text-center'>
                    <p className='text-sm text-ink-soft'>
                      {t('mapUnavailable')}
                    </p>
                  </div>
                )}
              </div>
              <Button variant='outline' className='self-start' asChild>
                <a href={property.mapLink} target='_blank' rel='noreferrer'>
                  {t('openMap')}
                </a>
              </Button>

              <div className='flex flex-col gap-3'>
                <span className='text-text font-semibold text-lg'>
                  {t('aroundVilla')}
                </span>
                {nearby.length === 0 ? (
                  <p className='text-sm text-ink-soft'>{t('aroundEmpty')}</p>
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

            {/* Facilities */}
            <Card title={t('serviceFacilities')}>
              {facilities.length === 0 ? (
                <p className='text-sm text-ink-soft'>{t('noFacilities')}</p>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {facilities.map((facility) => (
                    <div key={facility.id} className='flex gap-2 items-center'>
                      <Check size={16} className='text-primary' />
                      <span className='text-text text-sm'>{facility.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className='w-full lg:w-[350px] shrink-0 order-1 lg:order-2'>
            <SendInquiryFormBuy
              property={property}
              priceLabel={formatPrice(price, symbol)}
            />
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentBuyDetail;
