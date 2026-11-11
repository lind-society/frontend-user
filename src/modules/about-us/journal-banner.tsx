import React from 'react';
import { useTranslations } from 'use-intl';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';

/** "Inspiration for Every Journey" — the wide photo banner that points to the Journal (blog). */
const JournalBanner = () => {
  const t = useTranslations('aboutUs.journal');

  return (
    <section className='pb-12 md:pb-16'>
      <BaseContainer>
        <div
          className='relative overflow-hidden rounded bg-ink bg-cover bg-center'
          style={{ backgroundImage: "url('/images/iconic-3.png')" }}
        >
          <div aria-hidden className='absolute inset-0 bg-ink/65' />

          <div className='relative grid gap-8 px-6 py-10 text-cream md:grid-cols-[1.1fr_1fr] md:px-12 md:py-12'>
            <div className='flex flex-col gap-5'>
              <span className='text-[11px] uppercase tracking-[0.14em] text-cream/70'>
                {t('eyebrow')}
              </span>
              <h2 className='font-heading text-3xl leading-tight md:text-4xl'>
                {t('title')}
              </h2>
              <Link
                href='/blog'
                className='w-fit rounded border border-cream/70 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:bg-cream hover:text-ink'
              >
                {t('button')}
              </Link>
            </div>

            <p className='text-sm leading-relaxed text-cream/90 md:self-start md:pt-6'>
              {t('description')}
            </p>
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default JournalBanner;
