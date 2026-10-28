'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import TitleSection from '@/components/ui/title-section';

const FAQ_KEYS = [
  'whatIncluded',
  'howToBook',
  'paymentMethods',
  'additionalFees',
  'specialArrangements',
] as const;

const FaQRentPage = () => {
  const t = useTranslations('rent.faq');

  return (
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-10'>
          <TitleSection title={t('title')} subTitle={t('subtitle')} />

          <div className='flex flex-col gap-10 lg:flex-row lg:gap-14'>
            <div className='w-full lg:flex-1'>
              <Accordion type='single' collapsible className='w-full'>
                {FAQ_KEYS.map((key) => (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger>
                      {t(`questions.${key}.question`)}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t(`questions.${key}.answer`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <aside className='flex w-full flex-col gap-4 lg:w-[360px]'>
              <div className='relative aspect-[360/230] w-full overflow-hidden'>
                <Image
                  src='/images/faq-buy.jpeg'
                  alt=''
                  fill
                  aria-hidden
                  sizes='(max-width: 1024px) 100vw, 360px'
                  className='object-cover'
                />
              </div>
              <p className='font-heading text-xl font-semibold text-ink'>
                {t('needMoreAssistance')}
              </p>
              <p className='text-sm text-ink-soft'>{t('teamReady')}</p>
              <Button variant='primary' className='w-fit' asChild>
                <Link href='/contact-us' className='flex items-center gap-2'>
                  <span>{t('contactUs')}</span>
                  <RiArrowRightUpLine size={18} />
                </Link>
              </Button>
            </aside>
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default FaQRentPage;
