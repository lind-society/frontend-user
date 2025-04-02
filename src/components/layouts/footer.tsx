// components/Footer.tsx
'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Footer link component for reusability
const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className='text-gray-600 hover:text-primary transition-colors duration-200'
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <div className='bg-white'>
      {/* Payment and social - Responsive */}
      <BaseContainer>
        <div className='flex flex-col md:flex-row gap-6 md:justify-between md:items-center py-6'>
          {/* Payment section */}
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center'>
            <p className='text-primary font-semibold text-xl md:text-2xl whitespace-nowrap'>
              Payment channels
            </p>
            <div className='flex items-center gap-4 md:gap-8 flex-wrap'>
              <Image
                src='/images/visa.png'
                height={0}
                width={0}
                sizes='100vw'
                alt='Visa'
                className='h-[24px] md:h-[36px] w-auto object-contain'
              />
              <Image
                src='/images/master-card.png'
                height={0}
                width={0}
                sizes='100vw'
                alt='Mastercard'
                className='h-[24px] md:h-[36px] w-auto object-contain'
              />
              <Image
                src='/images/american-express.png'
                height={0}
                width={0}
                sizes='100vw'
                alt='American Express'
                className='h-[24px] md:h-[36px] w-auto object-contain'
              />
            </div>
          </div>

          {/* Social media section */}
          <div className='flex gap-4 sm:gap-8 items-center'>
            <p className='text-primary font-semibold text-xl md:text-2xl whitespace-nowrap'>
              Follow us
            </p>
            <div className='flex gap-4 sm:gap-6'>
              <Link href='#' aria-label='Facebook'>
                <FaFacebook
                  size={20}
                  className='text-primary hover:opacity-80'
                />
              </Link>
              <Link href='#' aria-label='Twitter'>
                <FaTwitter
                  size={20}
                  className='text-primary hover:opacity-80'
                />
              </Link>
              <Link href='#' aria-label='Instagram'>
                <FaInstagram
                  size={20}
                  className='text-primary hover:opacity-80'
                />
              </Link>
            </div>
          </div>
        </div>
      </BaseContainer>

      <Separator />

      {/* Main Footer Content - Responsive Grid */}
      <BaseContainer>
        <div className='flex flex-col gap-8 py-6 md:py-10'>
          <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-y-8 gap-x-4 md:gap-x-8 text-gray-600'>
            {/* About Section - 4 cols on desktop, full width on mobile */}
            <div className='col-span-2 sm:col-span-4 md:col-span-4 flex flex-col gap-3'>
              <p className='text-primary font-semibold text-xl md:text-2xl'>
                About LIND Society
              </p>
              <p className='text-text font-normal text-sm md:text-base'>
                LIND Society specializes in offering premium villa bookings,
                property management, and unique tourist activities. Whether
                you're looking to book a luxury villa, purchase your dream
                property, or explore the best activities in the area, we provide
                exceptional service and attention to detail. Our experienced
                team ensures every client receives personalized care and
                memorable experiences.
              </p>
            </div>

            {/* Services - 1 col on mobile, 1 col on desktop */}
            <div className='col-span-1 sm:col-span-1 md:col-span-1 flex flex-col gap-3'>
              <span className='font-semibold text-base md:text-lg text-text'>
                Services
              </span>
              <FooterLink href='/rent'>Rent Home & Villas</FooterLink>
              <FooterLink href='/buy'>Buy Properties</FooterLink>
              <FooterLink href='/tourist-activity'>
                Tourist Activities
              </FooterLink>
              <FooterLink href='/manage-property'>
                Property Management
              </FooterLink>
            </div>

            {/* About Links */}
            <div className='col-span-1 sm:col-span-1 md:col-span-1 flex flex-col gap-3'>
              <span className='font-semibold text-base md:text-lg text-text'>
                About
              </span>
              <FooterLink href='/about-us'>About Us</FooterLink>
              <FooterLink href='/media'>Media Gallery</FooterLink>
              <FooterLink href='/blog'>Blog</FooterLink>
            </div>

            {/* Help Links */}
            <div className='col-span-1 sm:col-span-1 md:col-span-1 flex flex-col gap-3'>
              <span className='font-semibold text-base md:text-lg text-text'>
                Help
              </span>
              <FooterLink href='/contact-us'>Contact Us</FooterLink>
              <FooterLink href='/faq'>FAQs</FooterLink>
              <FooterLink href='/support'>Support</FooterLink>
            </div>

            {/* More Info Links */}
            <div className='col-span-1 sm:col-span-1 md:col-span-1 flex flex-col gap-3'>
              <span className='font-semibold text-base md:text-lg text-text'>
                Legal
              </span>
              <FooterLink href='/terms'>Terms & Conditions</FooterLink>
              <FooterLink href='/privacy'>Privacy Policy</FooterLink>
              <FooterLink href='/cancellation'>Cancellation Policy</FooterLink>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='grid grid-cols-1 md:grid-cols-8 gap-8 mt-6'>
            {/* Logo and Copyright */}
            <div className='md:col-span-4 flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-center text-primary'>
              <Image
                src='/images/logo.png'
                height={80}
                width={120}
                alt='LIND Society'
                className='md:h-[96px] w-auto object-contain'
              />
              <p className='text-xs md:text-sm text-center md:text-left'>
                © 2025 LIND Society. 45 Sudirman Avenue, Level 5, Jakarta,
                Indonesia 10210
                <br className='hidden md:block' /> Indonesian Business Licence
                Number: 0123456789
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className='md:col-span-4 flex flex-col gap-3'>
              <p className='text-base md:text-lg font-semibold'>
                Subscribe to our newsletter for villa perks and insider tips,
                plus discount up to 30%
              </p>
              <div className='flex w-full   rounded-md overflow-hidden'>
                <Input
                  type='email'
                  placeholder='Enter your email address'
                  className='border border-primary rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full'
                />
                <Button
                  variant='primary'
                  className='rounded-l-none border border-primary'
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  I agree to receive news and promotions from LIND Society
                </label>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Footer;
