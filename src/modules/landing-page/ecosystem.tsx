import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import Logo from '@/components/ui/logo';

const BRANDS = [
  { key: 'architecture', image: '/images/discover-1.png' },
  // was discover-2.png (a bare temple shot with no people/event feel) — this
  // ceremonial-procession photo actually reads as "event"
  { key: 'wedding', image: '/images/discover-6.jpeg' },
  // TODO: discover-3.jpeg is a food close-up, not fashion — swap once a real
  // fashion/editorial photo is supplied, nothing in public/images fits yet
  { key: 'fashion', image: '/images/discover-3.jpeg' },
  { key: 'experiences', image: '/images/discover-4.jpeg' },
] as const;

/**
 * "A World of Beautiful Living" — the sand-toned band introducing the sister
 * brands in the LIND ecosystem.
 */
const Ecosystem = () => {
  const t = useTranslations('landingPage.ecosystem');

  return (
    <section className='bg-sand py-14 md:py-16'>
      <BaseContainer>
        <div className='grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10'>
          <div className='flex flex-col gap-3 lg:col-span-4 lg:pr-8'>
            <span className='eyebrow text-bronze-700'>{t('subtitle')}</span>
            <h2 className='text-ink'>{t('title')}</h2>
            <p className='text-sm leading-relaxed text-ink-soft'>
              {t('description')}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-4'>
            {BRANDS.map(({ key, image }) => (
              <Link
                key={key}
                href='/about-us'
                className='group relative aspect-[3/4] overflow-hidden'
              >
                <Image
                  src={image}
                  alt=''
                  fill
                  aria-hidden
                  sizes='(max-width: 1024px) 45vw, 20vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10'
                />

                <div className='absolute inset-0 flex flex-col justify-between p-4 text-cream'>
                  <Logo className='h-8 w-auto' />
                  <div className='flex flex-col gap-1'>
                    <span className='font-heading text-sm font-semibold leading-snug'>
                      {t(`items.${key}.title`)}
                    </span>
                    <span className='inline-flex items-center gap-1 text-xs text-cream/80 transition-colors group-hover:text-cream'>
                      {t('viewMore')}
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default Ecosystem;
