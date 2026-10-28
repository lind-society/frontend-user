import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

/**
 * Full-bleed journal banner: photograph on the left, dark editorial panel on
 * the right inviting the reader into the Journal.
 */
const ExperienceUnfolded = () => {
  const t = useTranslations('landingPage.journalBanner');

  return (
    <section className='relative isolate overflow-hidden'>
      <Image
        src='/images/blog-2.jpeg'
        alt=''
        fill
        aria-hidden
        sizes='100vw'
        className='-z-10 object-cover'
      />
      {/* Darkened on small screens so the panel text stays readable */}
      <div aria-hidden className='absolute inset-0 -z-10 bg-ink/55 lg:hidden' />

      <div className='mx-auto flex min-h-[420px] w-full max-w-[1440px] justify-end px-4 py-16 sm:px-6 lg:px-0 lg:py-0'>
        <div className='flex w-full flex-col justify-center gap-5 bg-ink/85 p-8 lg:max-w-[40%] lg:p-14'>
          <span className='eyebrow text-bronze-200'>{t('eyebrow')}</span>
          <h2 className='whitespace-pre-line text-cream'>{t('title')}</h2>
          <p className='text-sm text-cream/75'>{t('subtitle')}</p>
          <Button variant='cta' className='mt-2 h-12 w-fit px-8' asChild>
            <Link href='/blog'>{t('cta')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceUnfolded;
