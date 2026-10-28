'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { countryCodes } from '@/modules/rent-detail/constant';

/** Same concierge line the rest of the site links WhatsApp to (footer, detail pages). */
const CONCIERGE_WHATSAPP = '6281234567890';

const ContentEarlyBird = () => {
  const t = useTranslations('earlyBird');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // There's no backend "leads" endpoint (yet) — same pattern already used for
  // the Manage Property package inquiry: hand the details to WhatsApp instead
  // of silently dropping them.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      `Hello, LIND Society! I'd like to join the Early Bird list.`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${countryCode}${phoneNumber}`,
    ].join('\n');

    window.open(
      `https://wa.me/${CONCIERGE_WHATSAPP}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setSubmitted(true);
  };

  return (
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='mx-auto flex max-w-2xl flex-col items-center gap-10 text-center'>
          <h1 className='font-heading text-2xl font-semibold text-ink md:text-3xl'>
            {t('heading')}
          </h1>

          <div className='w-full rounded border border-bronze/25 bg-cream-light p-6 text-left md:p-10'>
            {submitted ? (
              <div className='flex flex-col items-center gap-2 py-8 text-center'>
                <span className='font-heading text-xl font-semibold text-ink'>
                  {t('successTitle')}
                </span>
                <p className='text-ink-soft'>{t('successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                  <Label className='font-semibold text-ink'>
                    {t('fullName')}
                  </Label>
                  <Input
                    placeholder={t('fullNamePlaceholder')}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label className='font-semibold text-ink'>{t('email')}</Label>
                  <Input
                    type='email'
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label className='font-semibold text-ink'>
                    {t('phoneNumber')}
                  </Label>
                  <div className='flex w-full'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type='button'
                          className='flex h-10 flex-shrink-0 items-center gap-2 rounded-l border border-bronze-600 bg-bronze-600 px-3 text-white'
                        >
                          <span>{countryCode}</span>
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M6 8.5L2 4.5H10L6 8.5Z'
                              fill='currentColor'
                            />
                          </svg>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className='max-h-64 w-64 overflow-y-auto p-1'>
                        <div className='flex flex-col'>
                          {countryCodes.map((country) => (
                            <button
                              key={country.code}
                              type='button'
                              className='flex items-center gap-2 rounded px-3 py-2 text-left hover:bg-sand/40'
                              onClick={() => setCountryCode(country.code)}
                            >
                              <span className='font-medium'>
                                {country.code}
                              </span>{' '}
                              {country.country}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Input
                      type='tel'
                      placeholder={t('phoneNumberPlaceholder')}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className='rounded-l-none border-l-0'
                      required
                    />
                  </div>
                </div>

                <label className='flex items-start gap-2 text-sm text-bronze-700'>
                  <Checkbox
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                    className='mt-0.5'
                  />
                  {t('consent')}
                </label>

                <Button
                  type='submit'
                  variant='cta'
                  className='h-12 w-full'
                  disabled={!agreed}
                >
                  {t('submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default ContentEarlyBird;
