import { Check, CircleAlert, CalendarClock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';

import { formatPrice } from '@/lib/mappers/format';
import { useMapCoordinates } from '@/hooks/api/useRegion';
import { useVillaReviews } from '@/hooks/api/useReview';

import { Separator } from '@/components/ui/separator';
import { Stars } from '@/components/ui/stars';

import { ListingMedia } from '@/modules/rent-detail/content-image';

import { Villa } from '@/types/api/villa';

// Leaflet is heavy, so it is only downloaded once a map is shown.
const MapView = React.lazy(() => import('@/components/ui/map-view'));

export const TABS = [
  'highlights',
  'amenities',
  'rooms',
  'location',
  'reviews',
  'house-rules',
  'policies',
] as const;

export type TabId = (typeof TABS)[number];

/** What the shared panels read: a villa, or a property for sale (which has no rates/reviews/policies). */
export type ListingLike = Pick<
  Villa,
  | 'id'
  | 'name'
  | 'highlight'
  | 'address'
  | 'city'
  | 'state'
  | 'country'
  | 'postalCode'
  | 'mapLink'
  | 'placeNearby'
  | 'currency'
  | 'facilities'
  | 'features'
  | 'additionals'
  | 'videos'
  | 'video360s'
  | 'floorPlans'
> &
  Partial<Pick<Villa, 'whatsIncluded' | 'goodToKnow'>>;

const TAB_KEYS: Record<TabId, string> = {
  highlights: 'highlights',
  amenities: 'amenities',
  rooms: 'rooms',
  location: 'location',
  reviews: 'reviews',
  'house-rules': 'houseRules',
  policies: 'policies',
};

/** Policy groups whose type name reads like a house rule; everything else is a "policy". */
const isHouseRule = (typeName?: string) =>
  /house|rule|pool/i.test(typeName ?? '');

/** Distances are stored in metres; show kilometres once they get long. */
const formatDistance = (metres: number, m: string, km: string) =>
  metres >= 1000 ? `${(metres / 1000).toFixed(1)} ${km}` : `${metres} ${m}`;

const PanelTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className='border-b border-bronze/25 pb-3 font-heading text-xl text-ink'>
    {children}
  </h2>
);

const InfoRow = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className='flex items-center gap-3 rounded border border-bronze/15 bg-cream-light px-4 py-3 text-sm text-ink shadow-xs'>
    <span className='text-bronze-600'>{icon}</span>
    <span>{children}</span>
  </div>
);

const CheckList = ({ items }: { items: string[] }) => (
  <ul className='grid gap-x-8 gap-y-4 sm:grid-cols-2'>
    {items.map((item) => (
      <li key={item} className='flex items-start gap-3 text-sm text-ink'>
        <Check size={18} className='mt-0.5 shrink-0 text-bronze-600' />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const HighlightsPanel = ({ villa }: { villa: ListingLike }) => {
  const tTabs = useTranslations('rentDetail.tabs');

  const paragraphs = (villa.highlight ?? '')
    .split(/\n{2,}/)
    .map((text) => text.trim())
    .filter(Boolean);
  const keyFeatures = villa.facilities ?? [];
  const included = villa.whatsIncluded ?? [];
  const goodToKnow = villa.goodToKnow ?? [];

  return (
    <div className='flex flex-col gap-10'>
      <div className='grid gap-8 lg:grid-cols-[1.2fr_1fr]'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-heading text-xl text-ink'>
            {tTabs('aboutVilla')}
          </h2>
          {paragraphs.length === 0 ? (
            <p className='text-sm text-ink-soft'>{tTabs('noHighlights')}</p>
          ) : (
            paragraphs.map((text, index) => (
              <p
                key={index}
                className='whitespace-pre-line text-sm leading-7 text-ink'
              >
                {text}
              </p>
            ))
          )}
        </div>

        {keyFeatures.length > 0 && (
          <div className='grid grid-cols-2 content-start gap-x-6 gap-y-6 sm:grid-cols-3'>
            {keyFeatures.map((feature) => (
              <div key={feature.id} className='flex items-start gap-3'>
                {feature.icon?.url ? (
                  <img
                    src={feature.icon.url}
                    alt=''
                    aria-hidden
                    className='h-7 w-7 shrink-0 object-contain'
                  />
                ) : (
                  <Check size={20} className='shrink-0 text-bronze-600' />
                )}
                <span className='text-xs leading-snug text-bronze-700'>
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {(included.length > 0 || goodToKnow.length > 0) && (
        <div className='grid gap-8 border-t border-bronze/25 pt-8 lg:grid-cols-2'>
          {included.length > 0 && (
            <div className='flex flex-col gap-5'>
              <h3 className='font-heading text-xl text-ink'>
                {tTabs('whatsIncluded')}
              </h3>
              <CheckList items={included} />
            </div>
          )}
          {goodToKnow.length > 0 && (
            <div className='flex flex-col gap-5 lg:border-l lg:border-bronze/25 lg:pl-8'>
              <h3 className='font-heading text-xl text-ink'>
                {tTabs('goodToKnow')}
              </h3>
              <ul className='flex list-disc flex-col gap-3 pl-5 text-sm text-ink'>
                {goodToKnow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Nightly rates stay visible: they are real data the design did not drop. */}
      {'dailyPrice' in villa && <RatesBlock villa={villa as Villa} />}
    </div>
  );
};

const RatesBlock = ({ villa }: { villa: Villa }) => {
  const tRates = useTranslations('rentDetail.content.rates');
  const symbol = villa.currency?.symbol;

  const rows = [
    [tRates('daily'), villa.dailyPrice, tRates('perNight')],
    [tRates('lowSeason'), villa.lowSeasonDailyPrice, tRates('perNight')],
    [tRates('highSeason'), villa.highSeasonDailyPrice, tRates('perNight')],
    [tRates('peakSeason'), villa.peakSeasonDailyPrice, tRates('perNight')],
    [tRates('monthly'), villa.priceMonthly, tRates('perMonth')],
    [tRates('yearly'), villa.priceYearly, tRates('perYear')],
  ].filter(([, amount]) => amount !== null && Number(amount) > 0);

  if (rows.length === 0) return null;

  return (
    <div className='flex flex-col gap-4'>
      <PanelTitle>{tRates('title')}</PanelTitle>
      <div className='grid gap-3 sm:grid-cols-2'>
        {rows.map(([label, amount, unit]) => (
          <div
            key={String(label)}
            className='flex items-center justify-between gap-3 rounded border border-bronze/15 px-4 py-3'
          >
            <span className='text-sm text-ink'>{label}</span>
            <span className='text-right'>
              <span className='block text-sm font-semibold text-bronze-700'>
                {formatPrice(Number(amount), symbol)}
              </span>
              <span className='text-xs text-ink-muted'>{unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AmenitiesPanel = ({ villa }: { villa: ListingLike }) => {
  const t = useTranslations('rentDetail.content');
  const tTabs = useTranslations('rentDetail.tabs');
  const symbol = villa.currency?.symbol;
  const services = villa.features ?? [];

  // The admin files every service under a category (Facilities, Services,
  // Entertainment, Meals, Transport, Kids, ...); show one column block per category.
  const groups = services.reduce<Record<string, typeof services>>(
    (acc, service) => {
      const key = service.type?.trim() || tTabs('amenities');
      (acc[key] ??= []).push(service);
      return acc;
    },
    {}
  );

  return (
    <div className='flex flex-col gap-8'>
      <PanelTitle>{tTabs('amenitiesTitle')}</PanelTitle>

      {services.length === 0 ? (
        <p className='text-sm text-ink-soft'>{t('noServices')}</p>
      ) : (
        <div className='grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
          {Object.entries(groups).map(([category, items]) => (
            <div key={category} className='flex flex-col gap-4'>
              <h3 className='flex items-center gap-2 font-heading text-base text-bronze-700'>
                {items[0]?.icon?.url && (
                  <img
                    src={items[0].icon.url}
                    alt=''
                    aria-hidden
                    className='h-5 w-5 object-contain'
                  />
                )}
                {category}
              </h3>
              <ul className='flex flex-col gap-3'>
                {items.map((service) => (
                  <li key={service.id} className='flex items-start gap-3'>
                    <Check
                      size={16}
                      className='mt-0.5 shrink-0 text-bronze-600'
                    />
                    <span className='flex flex-col text-sm text-ink'>
                      <span>{service.name}</span>
                      <span className='text-xs text-bronze-700'>
                        {service.free || !service.price
                          ? t('free')
                          : formatPrice(
                              Number(
                                service.priceAfterDiscount ?? service.price
                              ),
                              symbol
                            )}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LocationPanel = ({ villa }: { villa: ListingLike }) => {
  const t = useTranslations('rentDetail.content');
  const { data: coordinates } = useMapCoordinates(villa.mapLink);
  const hasCoordinates =
    coordinates?.latitude != null && coordinates?.longitude != null;
  const nearby = villa.placeNearby ?? [];

  return (
    <div className='flex flex-col gap-6'>
      <PanelTitle>{t('location')}</PanelTitle>
      <span className='text-sm text-ink'>
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

      <div className='relative z-0 h-[300px] w-full overflow-hidden rounded border border-bronze/20 bg-sand/40 md:h-[400px]'>
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
          <div className='flex h-full items-center justify-center p-6 text-center text-sm text-ink-soft'>
            {t('mapUnavailable')}
          </div>
        )}
      </div>

      {villa.mapLink && (
        <a
          href={villa.mapLink}
          target='_blank'
          rel='noreferrer'
          className='self-start text-sm text-bronze-600 underline'
        >
          {t('openMap')}
        </a>
      )}

      <div className='flex flex-col gap-3'>
        <h3 className='font-heading text-lg text-ink'>{t('aroundVilla')}</h3>
        {nearby.length === 0 ? (
          <p className='text-sm text-ink-soft'>{t('aroundVillaEmpty')}</p>
        ) : (
          <div className='grid gap-x-10 gap-y-3 sm:grid-cols-2'>
            {nearby.map((place) => (
              <div key={place.name} className='flex justify-between gap-3'>
                <span className='text-sm text-ink'>{place.name}</span>
                <span className='whitespace-nowrap text-sm font-medium text-ink'>
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
    </div>
  );
};

const ReviewsPanel = ({ villa }: { villa: Villa }) => {
  const t = useTranslations('rentDetail.content');
  const { data } = useVillaReviews(villa.id, 10);
  const reviews = data?.data.data ?? [];
  const rating = Number(villa.averageRating) || 0;

  return (
    <div className='flex flex-col gap-6'>
      <PanelTitle>{t('reviews')}</PanelTitle>

      <div className='flex items-center gap-4'>
        <span className='font-heading text-3xl text-bronze-700'>
          {rating > 0 ? rating.toFixed(1) : '-'}
        </span>
        <div className='flex flex-col'>
          <span className='text-sm text-ink-soft'>{t('overallOn')}</span>
          <span className='font-semibold text-ink'>
            {villa.totalReview ?? 0} {t('reviews')}
          </span>
        </div>
        <Stars rating={rating} />
      </div>

      {reviews.length === 0 ? (
        <p className='text-sm text-ink-soft'>{t('noReviews')}</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className='flex flex-col gap-4 rounded border border-bronze/15 bg-cream-light p-6'
          >
            <div className='flex items-center justify-between gap-3'>
              <span className='font-semibold text-ink'>
                {t('verifiedGuest')}
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-xl font-semibold text-ink'>
                  {Number(review.rating).toFixed(1)}
                </span>
                <Stars rating={Number(review.rating)} />
              </div>
            </div>
            <Separator />
            <p className='whitespace-pre-line text-ink'>
              &ldquo;{review.message}&rdquo;
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const PolicyGroups = ({
  groups,
  empty,
}: {
  groups: [string, NonNullable<Villa['policies']>][];
  empty: string;
}) =>
  groups.length === 0 ? (
    <p className='text-sm text-ink-soft'>{empty}</p>
  ) : (
    <>
      {groups.map(([group, policies]) => (
        <div key={group} className='flex flex-col gap-3'>
          <h3 className='font-heading text-lg text-ink'>{group}</h3>
          {policies.map((policy) => (
            <div
              key={policy.id}
              className='flex items-start gap-3 rounded border border-bronze/15 bg-cream-light px-4 py-3 shadow-xs'
            >
              {policy.icon?.url ? (
                <img
                  src={policy.icon.url}
                  alt=''
                  aria-hidden
                  className='mt-0.5 h-5 w-5 shrink-0 object-contain'
                />
              ) : (
                <Check size={18} className='mt-0.5 shrink-0 text-bronze-600' />
              )}
              <span className='flex flex-col text-sm text-ink'>
                <span>{policy.name}</span>
                {policy.description && (
                  <span className='text-ink-soft'>{policy.description}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      ))}
    </>
  );

const groupPolicies = (villa: Villa, fallbackName: string) =>
  (villa.policies ?? []).reduce<Record<string, NonNullable<Villa['policies']>>>(
    (groups, policy) => {
      const key = policy.type?.name ?? fallbackName;
      (groups[key] ??= []).push(policy);
      return groups;
    },
    {}
  );

const HouseRulesPanel = ({ villa }: { villa: Villa }) => {
  const t = useTranslations('rentDetail.content');
  const tTabs = useTranslations('rentDetail.tabs');

  const groups = Object.entries(groupPolicies(villa, t('houseRules'))).filter(
    ([name]) => isHouseRule(name)
  );

  return (
    <div className='flex flex-col gap-6'>
      <PanelTitle>{t('houseRules')}</PanelTitle>

      <div className='grid gap-3 sm:grid-cols-2'>
        {villa.checkInHour && (
          <InfoRow icon={<CalendarClock size={18} />}>
            {tTabs('checkInAfter')} {villa.checkInHour}
          </InfoRow>
        )}
        {villa.checkOutHour && (
          <InfoRow icon={<CalendarClock size={18} />}>
            {tTabs('checkOutUntil')} {villa.checkOutHour}
          </InfoRow>
        )}
      </div>

      <PolicyGroups groups={groups} empty='' />
    </div>
  );
};

const PoliciesPanel = ({ villa }: { villa: Villa }) => {
  const t = useTranslations('rentDetail.content');

  const groups = Object.entries(
    groupPolicies(villa, t('villaPolicies'))
  ).filter(([name]) => !isHouseRule(name));

  return (
    <div className='flex flex-col gap-6'>
      <PanelTitle>{t('villaPolicies')}</PanelTitle>
      <PolicyGroups groups={groups} empty={t('noPolicies')} />
      {groups.length > 0 && (
        <p className='flex items-center gap-2 text-xs text-ink-muted'>
          <CircleAlert size={14} />
          {t('villaPolicies')}
        </p>
      )}
    </div>
  );
};

/** The seven tabs of the detail page (Highlights, Amenities, Rooms, Location, Reviews, House Rules, Policies). */
const DetailTabs = ({
  villa,
  tabs = TABS,
}: {
  villa: ListingLike;
  /** Property pages show only the tabs their data supports. */
  tabs?: readonly TabId[];
}) => {
  const tTabs = useTranslations('rentDetail.tabs');

  const fromHash = () => {
    const hash = window.location.hash.replace('#', '') as TabId;
    return tabs.includes(hash) ? hash : 'highlights';
  };

  const [active, setActive] = useState<TabId>(fromHash);

  // Keep the tab in the URL so a link (or a refresh) lands on the same tab.
  useEffect(() => {
    window.history.replaceState(null, '', `#${active}`);
  }, [active]);

  return (
    <div className='flex flex-col gap-8'>
      <div
        role='tablist'
        className='flex gap-1 overflow-x-auto border-b border-bronze/25'
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type='button'
            role='tab'
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
              active === tab
                ? 'border-bronze-600 text-ink'
                : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            {tTabs(TAB_KEYS[tab])}
          </button>
        ))}
      </div>

      <div role='tabpanel'>
        {active === 'highlights' && <HighlightsPanel villa={villa} />}
        {active === 'amenities' && <AmenitiesPanel villa={villa} />}
        {active === 'rooms' && (
          <div className='flex flex-col gap-6'>
            <PanelTitle>{tTabs('rooms')}</PanelTitle>
            <ListingMedia listing={villa as Villa} hideVideos />
          </div>
        )}
        {active === 'location' && <LocationPanel villa={villa} />}
        {active === 'reviews' && <ReviewsPanel villa={villa as Villa} />}
        {active === 'house-rules' && <HouseRulesPanel villa={villa as Villa} />}
        {active === 'policies' && <PoliciesPanel villa={villa as Villa} />}
      </div>
    </div>
  );
};

export default DetailTabs;
