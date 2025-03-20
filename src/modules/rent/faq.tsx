'use client';

import Image from 'next/image';
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
  const faqs: FAQItem[] = [
    {
      question: 'What is included in my villa rental?',
      answer:
        'Our villa rentals typically include accommodation, fully equipped kitchens, regular housekeeping, Wi-Fi, access to property amenities (such as pools, gyms, etc.), basic utilities, and premium linens and towels. Some properties also offer additional services like welcome packages, concierge assistance, and airport transfers. The exact inclusions vary by property and are detailed on each listing.',
    },
    {
      question: 'How do I book a villa with LIND Society?',
      answer:
        "Booking with LIND Society is simple. Browse our selection of properties on our website, select your desired dates and location, and choose the villa that meets your needs. You can book directly online, or contact our reservation team for personalized assistance. We'll guide you through the booking process, answer any questions, and help you secure your perfect stay.",
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept major credit cards (Visa, MasterCard, American Express), bank transfers, and certain digital payment methods. For some locations, we also offer installment payment plans. All payments are processed through our secure payment system to ensure your financial information remains protected.',
    },
    {
      question: 'Are there any additional fees beyond the rental price?',
      answer:
        "Our listings clearly indicate the base rental price, which typically includes standard cleaning and utilities. Some properties may have additional fees for services like extra cleaning, heated pools, pet accommodations, or special requests. Any potential additional fees are transparently disclosed before booking confirmation, so you'll never encounter unexpected charges.",
    },
    {
      question: 'Can I request special arrangements for my stay?',
      answer:
        'Absolutely! LIND Society specializes in creating personalized experiences. Whether you need airport transfers, grocery delivery prior to arrival, special occasion setups, childcare services, personal chef services, or any other arrangements, our concierge team is available to fulfill your requests. Simply let us know your needs during booking or before your arrival.',
    },
  ];

  return (
    <section className='bg-gray-50 py-8 md:py-12 lg:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-12'>
          {/* Header Section */}
          <div className='flex flex-col gap-2 md:gap-4 text-center'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-primary'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg md:text-xl lg:text-[22px] text-text'>
              Everything You Need to Know for a Perfect Stay.
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
                Need more assistance?
              </p>
              <p className='text-base md:text-lg text-primary'>
                Our team is always ready to help!
              </p>
              <Button
                variant='primary'
                className='flex items-center gap-2 w-fit'
              >
                <span>Contact Us</span>
                <RiArrowRightUpLine size={20} className='text-white' />
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default FaQRentPage;
