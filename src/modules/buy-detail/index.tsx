import React from 'react';
import { useTranslations } from 'use-intl';

import { toPropertyCard } from '@/lib/mappers/property';
import { useParams } from '@/lib/navigation';
import { useProperties, useProperty } from '@/hooks/api/useProperty';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import PageMeta from '@/components/page-meta';
import Skeleton from '@/components/Skeleton';
import { Button } from '@/components/ui/button';
import { VillaCard } from '@/components/ui/card/villa';
import { StateMessage } from '@/components/ui/state-message';

import ContentBuyDetail from '@/modules/buy-detail/content';
import {
  ListingMedia,
  MediaShell,
  Section,
} from '@/modules/rent-detail/content-image';
import HeaderRentDetail from '@/modules/rent-detail/header';

const DetailSkeleton = () => (
  <div className='pt-[64px] pb-[32px]' aria-busy='true'>
    <BaseContainer>
      <div>
        <Skeleton className='h-[460px] w-full rounded md:h-[560px]' />
        <div className='mt-8 flex flex-col gap-6 lg:flex-row'>
          <div className='flex flex-1 flex-col gap-4'>
            <Skeleton className='h-36 w-full rounded' />
            <Skeleton className='h-44 w-full rounded' />
            <Skeleton className='h-56 w-full rounded' />
          </div>
          <Skeleton className='h-[560px] w-full rounded lg:w-[350px]' />
        </div>
      </div>
    </BaseContainer>
  </div>
);

const SimilarProperties = ({ currentId }: { currentId: string }) => {
  const t = useTranslations('buyDetail.content');
  const { data } = useProperties({ page: 1, limit: 4 });

  const others = (data?.data.data ?? [])
    .filter((other) => other.id !== currentId)
    .slice(0, 3)
    .map(toPropertyCard);

  if (others.length === 0) return null;

  return (
    <Section title={t('similar')}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {others.map((other) => (
          <VillaCard
            key={other.id}
            villa={other}
            onFavoriteToggle={() => undefined}
            rentType='sale'
          />
        ))}
      </div>
    </Section>
  );
};

const BuyDetailModules = () => {
  const t = useTranslations('buyDetail.state');
  const { name: id } = useParams();
  const { data, isLoading, isError, error } = useProperty(id);

  if (isLoading) return <DetailSkeleton />;

  const property = data?.data;

  if (isError || !property) {
    const status = (error as { response?: { status?: number } } | null)
      ?.response?.status;
    const notFound = !isError || status === 404 || status === 400;

    return (
      <div className='pb-16 pt-[96px]'>
        <BaseContainer>
          <StateMessage
            variant={notFound ? 'empty' : 'error'}
            title={notFound ? t('notFoundTitle') : t('errorTitle')}
            description={
              notFound ? t('notFoundDescription') : t('errorDescription')
            }
            action={
              <Button variant='primary' asChild>
                <Link href='/buy'>{t('backToProperties')}</Link>
              </Button>
            }
          />
        </BaseContainer>
      </div>
    );
  }

  return (
    <div className='bg-bg'>
      <PageMeta title={property.name} />
      <HeaderRentDetail photos={property.photos ?? []} name={property.name} />
      <ContentBuyDetail property={property} />
      <MediaShell>
        <ListingMedia listing={property} />
        <SimilarProperties currentId={property.id} />
      </MediaShell>
    </div>
  );
};

export default BuyDetailModules;
