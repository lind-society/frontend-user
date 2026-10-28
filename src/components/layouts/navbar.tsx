'use client';

import {
  Building2,
  ChevronDown,
  Globe,
  Heart,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState, useTransition } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

import BaseContainer from '@/components/layouts/container';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from '@/components/ui/logo';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/service';

/**
 * Routes whose hero artwork sits directly beneath the header, so the bar has
 * to float transparently over the image instead of painting the cream chrome.
 * Matched exactly — nested routes (e.g. /rent/result) use the solid variant.
 */
const OVERLAY_ROUTES = [
  '/',
  '/rent',
  '/buy',
  '/about-us',
  '/contact-us',
  '/manage-property',
];

const PRIMARY_LINKS = [
  { href: '/rent', key: 'stay' },
  { href: '/buy', key: 'buy' },
  { href: '/tourist-activity', key: 'touristActivity' },
  { href: '/blog', key: 'journal' },
  { href: '/about-us', key: 'aboutUs' },
] as const;

const Navbar = () => {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isOverlayRoute = OVERLAY_ROUTES.includes(pathname);
  /* Once the hero has scrolled past, the floating bar has to become solid
     again or the links land on top of the page content. */
  const isTransparent = isOverlayRoute && !isScrolled && !isMenuOpen;

  useEffect(() => {
    if (!isOverlayRoute) return;
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOverlayRoute]);

  // Close the slide-over whenever the route changes.
  useEffect(() => setIsMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'top-0 z-50 w-full transition-colors duration-300',
        isOverlayRoute ? 'fixed' : 'sticky',
        isTransparent
          ? 'bg-transparent text-cream'
          : 'bg-bone text-ink border-b border-bronze/15'
      )}
    >
      <BaseContainer>
        <nav className='flex h-[72px] items-center justify-between gap-4 lg:h-[92px]'>
          {/* Logo */}
          <Link href='/' aria-label='LIND Society' className='shrink-0'>
            <Logo className='h-11 w-auto lg:h-14' />
          </Link>

          {/* Primary navigation — desktop. Property Management moved to the
              "More" panel (see NavMenuPanel) so only 5 items compete for
              space here, matching the design and fitting comfortably on
              13" laptop widths (1024-1279px) without shrinking below this. */}
          <div className='hidden items-center gap-6 lg:flex xl:gap-9'>
            {PRIMARY_LINKS.map(({ href, key }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'whitespace-nowrap text-sm uppercase tracking-[0.08em] transition-colors',
                    isActive
                      ? isTransparent
                        ? 'text-cream'
                        : 'text-ink'
                      : cn(
                          'text-bronze-600',
                          isTransparent
                            ? 'text-cream/75 hover:text-cream'
                            : 'hover:text-ink'
                        )
                  )}
                >
                  {t(`navigation.${key}`)}
                </Link>
              );
            })}
          </div>

          {/* Locale + menu trigger */}
          <div className='flex shrink-0 items-center gap-3 lg:gap-5'>
            <LocaleGlobe />

            <span
              aria-hidden
              className={cn(
                'hidden h-6 w-px lg:block',
                isTransparent ? 'bg-cream/40' : 'bg-bronze/40'
              )}
            />

            <button
              type='button'
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t('menu.close') : t('menu.open')}
              className={cn(
                'p-1 transition-colors',
                isTransparent
                  ? 'text-cream hover:text-cream/70'
                  : 'text-bronze-600 hover:text-ink'
              )}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </BaseContainer>

      {isMenuOpen && <NavMenuPanel onNavigate={() => setIsMenuOpen(false)} />}
    </header>
  );
};

/** Globe + locale code, matching the new header's right-hand cluster. */
const LocaleGlobe = () => {
  const locale = useLocale();
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();

  const change = (next: Locale) =>
    startTransition(() => {
      setUserLocale(next);
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.08em] transition-opacity focus:outline-none',
          isPending && 'pointer-events-none opacity-60'
        )}
      >
        <Globe size={18} />
        {locale}
        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-32'>
        <DropdownMenuItem onSelect={() => change('en')}>
          {t('en')}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => change('id')}>
          {t('id')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * Slide-down panel behind the hamburger. On desktop it carries the secondary
 * destinations the top bar no longer shows; on mobile it also carries the
 * primary links, which are hidden below `lg`.
 */
const NavMenuPanel = ({ onNavigate }: { onNavigate: () => void }) => {
  const t = useTranslations('navbar');

  const secondary = [
    { href: '/media', label: t('menu.browse') },
    {
      href: '/manage-property',
      label: t('navigation.propertyManagement'),
      icon: Building2,
    },
    { href: '/contact-us', label: t('contact'), icon: Phone },
    { href: '/wishlist', label: t('wishlist'), icon: Heart },
  ];

  return (
    <div className='border-t border-bronze/15 bg-bone text-ink shadow-lg'>
      <BaseContainer>
        <div className='grid gap-8 py-8 sm:grid-cols-2'>
          {/* Primary links — only needed where the top bar collapses them */}
          <div className='flex flex-col gap-1 lg:hidden'>
            <span className='eyebrow mb-2'>{t('menu.browse')}</span>
            {PRIMARY_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className='py-2 font-display text-2xl text-ink transition-colors hover:text-bronze-600'
              >
                {t(`navigation.${key}`)}
              </Link>
            ))}
          </div>

          <div className='flex flex-col gap-1'>
            <span className='eyebrow mb-2'>{t('menu.more')}</span>
            {secondary.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className='flex items-center gap-2 py-2 text-base text-ink-soft transition-colors hover:text-bronze-600'
              >
                {Icon && <Icon size={18} className='text-bronze-600' />}
                {label}
              </Link>
            ))}

            <div className='mt-4 flex items-center gap-5 text-bronze-600'>
              <Link href='#' aria-label='Facebook'>
                <FaFacebookF size={18} className='hover:opacity-70' />
              </Link>
              <Link href='#' aria-label='Twitter'>
                <FaTwitter size={18} className='hover:opacity-70' />
              </Link>
              <Link href='#' aria-label='Instagram'>
                <FaInstagram size={18} className='hover:opacity-70' />
              </Link>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Navbar;
