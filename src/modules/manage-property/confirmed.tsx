import { CircleCheck } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'use-intl';

import { useSearchParams } from '@/lib/navigation';
import { usePackage } from '@/hooks/api/usePackage';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import { Button } from '@/components/ui/button';

import ConciergeCard from '@/modules/manage-property/concierge-card';

/** "Thank You! Your Package Has Been Confirmed." — shown after the visitor contacts the concierge about a package. */
const PackageConfirmed = () => {
  const t = useTranslations('managePropertyFlow.confirmed');
  const searchParams = useSearchParams();
  const { data } = usePackage(searchParams.get('package') ?? undefined);
  const pkg = data?.data;

  return (
    <div className='bg-bone pb-16 pt-[110px]'>
      <BaseContainer>
        <div className='flex flex-col gap-8 rounded border border-bronze/15 bg-cream-light p-6 md:p-10'>
          <div className='flex flex-col items-center gap-2 border-b border-bronze/20 pb-8 text-center'>
            <h1 className='font-heading text-3xl text-bronze-600 md:text-4xl'>
              {t('thankYou')}
              <br />
              {t('title')}
            </h1>
            <p className='max-w-md text-sm italic text-ink md:text-base'>
              {t('received')}
            </p>
          </div>

          <div className='grid gap-8 lg:grid-cols-[1fr_320px]'>
            {pkg ? (
              <div className='overflow-hidden rounded border border-bronze/25 bg-white'>
                <div className='flex flex-col gap-3 p-6'>
                  <h2 className='font-heading text-2xl text-bronze-600'>
                    {pkg.name}
                  </h2>
                  {pkg.description && (
                    <p className='text-sm text-ink'>{pkg.description}</p>
                  )}
                </div>

                {(pkg.benefits ?? []).length > 0 && (
                  <>
                    <div className='bg-bronze-500 px-6 py-3 font-heading text-lg text-cream'>
                      {t('whatYoullGet')}
                    </div>
                    <ul>
                      {(pkg.benefits ?? []).map((benefit) => (
                        <li
                          key={benefit.id ?? benefit.title}
                          className='flex items-center justify-between gap-4 border-t border-bronze/20 px-6 py-3 text-sm text-ink'
                        >
                          <span>{benefit.title}</span>
                          <CircleCheck size={18} className='text-ink' />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <div className='rounded border border-bronze/25 bg-white p-6 text-sm text-ink-soft'>
                {t('fallback')}
              </div>
            )}

            <ConciergeCard />
          </div>

          <div className='rounded border border-bronze/30 bg-white px-6 py-4'>
            <p className='font-heading text-xl text-bronze-700'>
              {t('nextStep')}
            </p>
            <p className='text-sm text-ink'>{t('nextStepText')}</p>
          </div>

          <Button variant='outline' className='w-fit self-center' asChild>
            <Link href='/manage-property'>{t('back')}</Link>
          </Button>
        </div>
      </BaseContainer>
    </div>
  );
};

export default PackageConfirmed;
