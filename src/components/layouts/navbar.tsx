'use client';

import { Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaFacebook, FaHeart, FaInstagram, FaTwitter } from 'react-icons/fa6';

import BaseContainer from '@/components/layouts/container';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import SearchBar from '@/components/ui/search-bar';
import { Separator } from '@/components/ui/separator';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navbar');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-white'>
      <BaseContainer>
        <nav className='flex justify-between items-center text-gray-600 py-3'>
          {/* Logo - responsive on all devices */}
          <Link href='/' className='flex-shrink-0'>
            <Image
              src='/images/logo.png'
              alt='logo'
              width={153}
              height={58}
              priority
              className='w-auto h-[40px] md:h-[45px] lg:h-[58px]'
            />
          </Link>

          {/* Search - tablet and desktop only */}
          <div className='hidden md:flex flex-1 max-w-md mx-2 lg:mx-4'>
            <SearchBar />
          </div>

          {/* Language, Currency, Social Icons - tablet and desktop */}
          <div className='hidden md:flex gap-3 lg:gap-8 items-center'>
            {/* Language Dropdown with LocaleSwitcher */}
            <LocaleSwitcher />

            {/* Currency Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                hasChevron={true}
                className='flex items-center gap-1 lg:gap-3'
              >
                <span className='text-base lg:text-lg font-semibold'>
                  {t('currency')}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>IDR</DropdownMenuItem>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Social Media Icons - desktop only */}
            <div className='hidden lg:flex items-center gap-6 lg:gap-8'>
              <FaFacebook className='text-primary' size={24} />
              <FaTwitter className='text-primary' size={24} />
              <FaInstagram className='text-primary' size={24} />
            </div>
          </div>

          {/* Mobile menu button */}
          <button className='md:hidden p-2' onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </BaseContainer>

      {/* Mobile search */}
      <div className='md:hidden px-4 pb-3'>
        <SearchBar />
      </div>

      <Separator />

      {/* Desktop Menu Navigation - Now with direct links instead of dropdowns */}
      <BaseContainer>
        <div className='hidden md:block py-3 lg:py-5 text-gray-600'>
          <div className='flex justify-between items-center'>
            {/* Main navigation links */}
            <div className='flex gap-2 items-center overflow-x-auto pb-1 hideScrollbar'>
              {/* Main categories - direct links */}
              <Link
                href='/rent'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                {t('navigation.stay')}
              </Link>
              <Link
                href='/buy'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                {t('navigation.buy')}
              </Link>
              <Link
                href='/tourist-activity'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                {t('navigation.touristActivity')}
              </Link>
              <Link
                href='/manage-property'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                {t('navigation.propertyManagement')}
              </Link>
              <Link
                href='/about-us'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                {t('navigation.aboutUs')}
              </Link>
            </div>

            {/* Contact and wishlist */}
            <div className='flex-shrink-0 flex gap-2 lg:gap-8 items-center whitespace-nowrap'>
              <Link
                href='/contact-us'
                className='flex gap-1 lg:gap-2 items-center hover:text-primary transition-colors'
              >
                <Phone className='text-gray-600' size={22} />
                <span className='font-semibold text-base lg:text-lg'>
                  {t('contact')}
                </span>
              </Link>
              <Link
                href='/wishlist'
                className='flex gap-1 lg:gap-2 items-center hover:text-primary transition-colors'
              >
                <FaHeart className='text-red-600' size={22} />
                <span className='font-semibold text-base lg:text-lg'>
                  {t('wishlist')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </BaseContainer>

      {/* Mobile Menu - Now with direct links instead of expandable sections */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t'>
          <div className='px-4 py-2 space-y-2'>
            {/* Main categories */}
            <div className='border-b border-gray-100 py-3'>
              <Link href='/rent' className='block py-2 font-medium text-lg'>
                {t('navigation.stay')}
              </Link>
              <Link href='/buy' className='block py-2 font-medium text-lg'>
                {t('navigation.buy')}
              </Link>
              <Link
                href='/tourist-activity'
                className='block py-2 font-medium text-lg'
              >
                {t('navigation.touristActivity')}
              </Link>
              <Link
                href='/manage-property'
                className='block py-2 font-medium text-lg'
              >
                {t('navigation.propertyManagement')}
              </Link>
              <Link href='/about-us' className='block py-2 font-medium text-lg'>
                {t('navigation.aboutUs')}
              </Link>
            </div>

            {/* Contact and Wishlist */}
            <div className='border-b border-gray-100 py-3'>
              <Link href='/contact-us' className='flex items-center py-2 gap-3'>
                <Phone className='text-gray-600' size={22} />
                <span className='font-medium text-lg'>{t('contact')}</span>
              </Link>
              <Link href='/wishlist' className='flex items-center py-2 gap-3'>
                <FaHeart className='text-red-600' size={22} />
                <span className='font-medium text-lg'>{t('wishlist')}</span>
              </Link>
            </div>

            {/* Language, Currency, Social for mobile */}
            <div className='py-3 space-y-3'>
              {/* Language Switcher */}
              <div className='flex justify-between items-center'>
                <span className='font-medium text-lg'>Language</span>
                <LocaleSwitcher />
              </div>

              {/* Currency */}
              <div className='flex justify-between items-center'>
                <span className='font-medium text-lg'>Currency</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center gap-2'>
                    <span className='text-lg font-semibold'>
                      {t('currency')}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>IDR</DropdownMenuItem>
                    <DropdownMenuItem>USD</DropdownMenuItem>
                    <DropdownMenuItem>EUR</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Social Media for mobile */}
              <div className='flex gap-4 pt-2'>
                <FaFacebook className='text-primary' size={24} />
                <FaTwitter className='text-primary' size={24} />
                <FaInstagram className='text-primary' size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
        .hideScrollbar::-webkit-scrollbar {
          display: none;
        }
        .hideScrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
