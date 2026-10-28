// components/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className='text-ink transition-colors duration-200 hover:text-bronze-600'
  >
    {children}
  </Link>
);

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-3.5'>
    <span className='font-heading text-lg font-semibold uppercase tracking-[0.06em] text-bronze-600'>
      {title}
    </span>
    {children}
  </div>
);

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer>
      {/* ---- Newsletter band ---- */}
      <section className='relative overflow-hidden'>
        <Image
          src='/images/header-landing-page.png'
          alt=''
          fill
          sizes='100vw'
          aria-hidden
          className='object-cover'
        />
        <div aria-hidden className='absolute inset-0 bg-ink/80' />

        <BaseContainer>
          <div className='relative flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-20'>
            <h2 className='max-w-xl whitespace-pre-line text-cream'>
              {t('newsletter.title')}
            </h2>

            <form
              className='flex w-full max-w-lg gap-3'
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor='newsletter-email' className='sr-only'>
                {t('newsletter.emailPlaceholder')}
              </label>
              <input
                id='newsletter-email'
                type='email'
                placeholder={t('newsletter.emailPlaceholder')}
                className='h-11 w-full rounded-none border border-cream/25 bg-ink/70 px-4 text-sm text-cream placeholder:text-cream/55 focus:border-bronze focus:outline-none focus:ring-0'
              />
              <Button type='submit' variant='primary' className='h-11 px-7'>
                {t('newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </BaseContainer>
      </section>

      {/* ---- Link columns ---- */}
      <div className='bg-cream-warm text-ink'>
        <BaseContainer>
          <>
            <div className='grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16'>
              {/* Brand */}
              <div className='flex flex-col gap-6 lg:col-span-4 lg:pr-10'>
                <Link
                  href='/'
                  aria-label='LIND Society'
                  className='text-bronze-900'
                >
                  <Logo className='h-14 w-auto' />
                </Link>
                <p className='whitespace-pre-line text-sm leading-relaxed text-bronze-600'>
                  {t('tagline')}
                </p>
                <div className='flex items-center gap-6 text-bronze-900'>
                  <Link href='#' aria-label='Facebook'>
                    <FaFacebookF
                      size={22}
                      className='transition-opacity hover:opacity-70'
                    />
                  </Link>
                  <Link href='#' aria-label='Twitter'>
                    <FaTwitter
                      size={22}
                      className='transition-opacity hover:opacity-70'
                    />
                  </Link>
                  <Link href='#' aria-label='Instagram'>
                    <FaInstagram
                      size={22}
                      className='transition-opacity hover:opacity-70'
                    />
                  </Link>
                </div>
              </div>

              {/* Link groups */}
              <div className='grid gap-8 sm:grid-cols-3 lg:col-span-5 lg:border-x lg:border-bronze/25 lg:px-8'>
                <FooterColumn title={t('explore.title')}>
                  <FooterLink href='/rent'>{t('explore.stays')}</FooterLink>
                  <FooterLink href='/buy'>{t('explore.properties')}</FooterLink>
                  <FooterLink href='/tourist-activity'>
                    {t('explore.experiences')}
                  </FooterLink>
                  <FooterLink href='/blog'>{t('explore.journal')}</FooterLink>
                  <FooterLink href='/media'>
                    {t('explore.destinations')}
                  </FooterLink>
                </FooterColumn>

                <FooterColumn title={t('aboutLinks.title')}>
                  <FooterLink href='/about-us'>
                    {t('aboutLinks.aboutUs')}
                  </FooterLink>
                  <FooterLink href='/about-us'>
                    {t('aboutLinks.ourStory')}
                  </FooterLink>
                  <FooterLink href='/manage-property'>
                    {t('aboutLinks.partners')}
                  </FooterLink>
                  <FooterLink href='/about-us'>
                    {t('aboutLinks.careers')}
                  </FooterLink>
                  <FooterLink href='/contact-us'>
                    {t('aboutLinks.contact')}
                  </FooterLink>
                </FooterColumn>

                <FooterColumn title={t('support.title')}>
                  <FooterLink href='/faq'>{t('support.faqs')}</FooterLink>
                  <FooterLink href='/faq'>
                    {t('support.bookingGuide')}
                  </FooterLink>
                  <FooterLink href='/terms'>{t('support.terms')}</FooterLink>
                  <FooterLink href='/privacy'>
                    {t('support.privacy')}
                  </FooterLink>
                  <FooterLink href='/cancellation'>
                    {t('support.cancellation')}
                  </FooterLink>
                </FooterColumn>
              </div>

              {/* Contact */}
              <div className='flex flex-col gap-3.5 lg:col-span-3 lg:pl-4'>
                <span className='font-heading text-lg font-semibold uppercase tracking-[0.06em] text-bronze-600'>
                  {t('getInTouch.title')}
                </span>
                <p className='text-ink'>
                  {t('getInTouch.conciergeLabel')}:{' '}
                  <a
                    href={`tel:${t('getInTouch.concierge').replace(/\s/g, '')}`}
                    className='transition-colors hover:text-bronze-600'
                  >
                    {t('getInTouch.concierge')}
                  </a>
                </p>
                <p className='text-ink'>
                  {t('getInTouch.emailLabel')}:{' '}
                  <a
                    href={`mailto:${t('getInTouch.email')}`}
                    className='transition-colors hover:text-bronze-600'
                  >
                    {t('getInTouch.email')}
                  </a>
                </p>
                <p className='text-ink'>{t('getInTouch.location')}</p>

                <Button
                  asChild
                  variant='primary'
                  className='mt-3 h-12 w-full max-w-[260px]'
                >
                  <Link href='/contact-us'>{t('getInTouch.cta')}</Link>
                </Button>
              </div>
            </div>

            <p className='whitespace-pre-line border-t border-bronze/20 py-6 text-xs text-ink-muted'>
              {t('copyright')}
            </p>
          </>
        </BaseContainer>
      </div>

      {/* Bronze base rule that closes the page in the new design */}
      <div aria-hidden className='h-2.5 w-full bg-bronze' />
    </footer>
  );
};

export default Footer;
