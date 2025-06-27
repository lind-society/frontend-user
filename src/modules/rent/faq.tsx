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

interface FAQItem {
  question: string;
  answer: string;
}

const FaQRentPage = () => {
  const t = useTranslations('rent.faq');

  const faqs: FAQItem[] = [
    {
      question: t('questions.whatIncluded.question'),
      answer: t('questions.whatIncluded.answer'),
    },
    {
      question: t('questions.howToBook.question'),
      answer: t('questions.howToBook.answer'),
    },
    {
      question: t('questions.paymentMethods.question'),
      answer: t('questions.paymentMethods.answer'),
    },
    {
      question: t('questions.additionalFees.question'),
      answer: t('questions.additionalFees.answer'),
    },
    {
      question: t('questions.specialArrangements.question'),
      answer: t('questions.specialArrangements.answer'),
    },
  ];

  return (
    <section className='bg-gray-50 py-8 md:py-12 lg:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-12'>
          {/* Header Section */}
          <div className='flex flex-col gap-2 md:gap-4 text-center'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-primary'>
              {t('title')}
            </h2>
            <p className='text-lg md:text-xl lg:text-[22px] text-text'>
              {t('subtitle')}
            </p>
          </div>

          {/* Content Section - Responsive layout */}
          <div className='flex flex-col lg:flex-row gap-8'>
            {/* FAQ Accordion - Takes full width on mobile/tablet */}
            <div className='flex flex-col w-full lg:flex-1'>
              <Accordion type='single' collapsible className='w-full'>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className='text-lg md:text-xl text-primary font-semibold text-start'>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className='text-base md:text-lg text-text'>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Section - Full width on mobile, fixed width on desktop */}
            <div className='flex flex-col gap-5 w-full lg:w-[400px]'>
              <div className='relative w-full h-[260px] lg:h-auto lg:aspect-[400/260]'>
                <Image
                  src='/images/faq-buy.jpeg'
                  alt='FAQ Image'
                  fill
                  sizes='(max-width: 1024px) 100vw, 400px'
                  className='rounded-lg shadow-md object-cover'
                />
              </div>
              <p className='text-xl md:text-2xl font-bold text-primary'>
                {t('needMoreAssistance')}
              </p>
              <p className='text-base md:text-lg text-primary'>
                {t('teamReady')}
              </p>
              <Button variant='primary' asChild>
                <Link
                  href='/contact-us'
                  className='flex items-center gap-2 w-fit'
                >
                  <span>{t('contactUs')}</span>
                  <RiArrowRightUpLine size={20} className='text-white' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default FaQRentPage;
