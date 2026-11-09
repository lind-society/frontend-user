import { useQueries } from '@tanstack/react-query';
import React from 'react';
import { useTranslations } from 'use-intl';

import { api } from '@/lib/api';
import { toPropertyCard } from '@/lib/mappers/property';
import { toVillaCard } from '@/lib/mappers/villa';
import { useWishlist } from '@/hooks/useWishlist';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import Skeleton from '@/components/Skeleton';
import { VillaCard } from '@/components/ui/card/villa';
import { StateMessage } from '@/components/ui/state-message';

import { Payload } from '@/types/api/payload';
import { Property } from '@/types/api/property';
import { Villa } from '@/types/api/villa';

const WishlistModules = () => {
  const t = useTranslations('wishlist');
  const { items } = useWishlist();

  // One request per saved item. A saved listing that has since been removed
  // answers 404 and is simply left out of the page.
  const results = useQueries({
    queries: items.map((item) => ({
      queryKey: [item.kind === 'rent' ? 'villa' : 'property', item.id],
      queryFn: async () => {
        const path = item.kind === 'rent' ? 'villas' : 'properties';
        const { data } = await api.get<Payload<Villa | Property>>(
          `/${path}/${item.id}`
        );

        return data.data;
      },
      retry: false,
    })),
  });

  const isLoading = results.some((result) => result.isLoading);

  const cards = items.flatMap((item, index) => {
    const listing = results[index]?.data;

    if (!listing) return [];

    return [
      {
        kind: item.kind,
        card:
          item.kind === 'rent'
            ? toVillaCard(listing as Villa)
            : toPropertyCard(listing as Property),
      },
    ];
  });

  return (
    <div className='bg-cream-light pb-16 pt-[110px]'>
      <BaseContainer>
        <>
          <h1 className='mb-8 font-heading text-2xl font-semibold text-ink md:text-3xl'>
            {t('title')}
          </h1>

          {items.length === 0 ? (
            <StateMessage
              title={t('emptyTitle')}
              description={t('emptyDescription')}
              action={
                <div className='flex flex-wrap justify-center gap-3'>
                  <Link href='/rent' className='text-bronze-600 underline'>
                    {t('browseRent')}
                  </Link>
                  <Link href='/buy' className='text-bronze-600 underline'>
                    {t('browseBuy')}
                  </Link>
                </div>
              }
            />
          ) : isLoading ? (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {items.map((item) => (
                <Skeleton
                  key={`${item.kind}-${item.id}`}
                  className='h-[360px] w-full rounded'
                />
              ))}
            </div>
          ) : cards.length === 0 ? (
            <StateMessage
              title={t('unavailableTitle')}
              description={t('unavailableDescription')}
            />
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {cards.map(({ kind, card }) => (
                <VillaCard
                  key={`${kind}-${card.id}`}
                  villa={card}
                  rentType={kind}
                />
              ))}
            </div>
          )}
        </>
      </BaseContainer>
    </div>
  );
};

export default WishlistModules;
