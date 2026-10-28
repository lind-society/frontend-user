import { Clock, Handshake, Home, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

/**
 * Sand-coloured reassurance strip that sits directly beneath the hero.
 */
const TrustBar = () => {
  const t = useTranslations('landingPage.trustBar');

  const items = [
    { icon: Home, key: 'curated' },
    { icon: User, key: 'personal' },
    { icon: Handshake, key: 'partners' },
    { icon: Clock, key: 'concierge' },
  ] as const;

  return (
    <section className='bg-sand'>
      <BaseContainer>
        <div className='grid grid-cols-1 gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4'>
          {items.map(({ icon: Icon, key }) => (
            <div key={key} className='flex items-center gap-4'>
              <Icon
                size={38}
                strokeWidth={1.25}
                className='shrink-0 text-bronze-700'
              />
              <div className='flex flex-col'>
                <span className='font-heading text-lg font-semibold text-ink'>
                  {t(`${key}.title`)}
                </span>
                <span className='text-sm text-ink-soft'>
                  {t(`${key}.description`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </BaseContainer>
    </section>
  );
};

export default TrustBar;
