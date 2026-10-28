import { Compass, Home, Sparkles, Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

/**
 * "The LIND Experience" — the dark editorial band with four pillars split by
 * hairline dividers.
 */
const WhyChooseUs = () => {
  const t = useTranslations('landingPage.whyChooseUs');

  const features = [
    { icon: Home, key: 'handpicked' },
    { icon: Compass, key: 'localInsight' },
    { icon: Timer, key: 'seamlessStay' },
    { icon: Sparkles, key: 'meaningfulMoments' },
  ] as const;

  return (
    <section className='bg-ink py-14 md:py-16'>
      <BaseContainer>
        <div className='flex flex-col items-center gap-10 md:gap-12'>
          <h2 className='text-center uppercase tracking-[0.14em] text-cream'>
            {t('title')}
          </h2>

          <div className='grid w-full grid-cols-1 divide-y divide-cream/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-cream/15'>
            {features.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className='flex flex-col items-center gap-3 px-6 py-6 text-center lg:py-2'
              >
                <Icon
                  size={38}
                  strokeWidth={1.25}
                  className='text-bronze-200'
                />
                <p className='font-heading text-lg font-semibold text-cream'>
                  {t(`features.${key}.title`)}
                </p>
                <p className='text-sm text-cream/70'>
                  {t(`features.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default WhyChooseUs;
