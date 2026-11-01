import React from 'react';
import { useTranslations } from 'use-intl';

import { useParams } from '@/lib/navigation';
import { useVilla } from '@/hooks/api/useVilla';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import PageMeta from '@/components/page-meta';
import Skeleton from '@/components/Skeleton';
import { Button } from '@/components/ui/button';
import { StateMessage } from '@/components/ui/state-message';

import ContentRentDetail from '@/modules/rent-detail/content';
import ContentImage from '@/modules/rent-detail/content-image';
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
          <Skeleton className='h-[640px] w-full rounded lg:w-[350px]' />
        </div>
      </div>
    </BaseContainer>
  </div>
);

const RentDetailModules = () => {
  const t = useTranslations('rentDetail.state');
  const { name: id } = useParams();
  const { data, isLoading, isError, error } = useVilla(id);

  if (isLoading) return <DetailSkeleton />;

  const villa = data?.data;

  if (isError || !villa) {
    // The API answers 404 for an unknown id and 400 for a malformed one.
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
                <Link href='/rent'>{t('backToVillas')}</Link>
              </Button>
            }
          />
        </BaseContainer>
      </div>
    );
  }

  return (
    <div className='bg-bg'>
      <PageMeta title={villa.name} />
      <HeaderRentDetail photos={villa.photos ?? []} name={villa.name} />
      <ContentRentDetail villa={villa} />
      <ContentImage villa={villa} />
    </div>
  );
};

export default RentDetailModules;
