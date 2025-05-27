'use client';

import { Menu, Phone, SearchIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
import { Separator } from '@/components/ui/separator';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className='hidden md:flex h-[52px] flex-1 max-w-md mx-2 lg:mx-4'>
            <input
              type='text'
              placeholder='Search by villa, property, or activity name'
              className='h-full w-full px-2 lg:px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary text-sm lg:text-base'
            />
            <button className='bg-primary h-full px-3 lg:px-6 rounded-r-md'>
              <SearchIcon size={20} className='text-white' />
            </button>
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
                <span className='text-base lg:text-lg font-semibold'>IDR</span>
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
        <div className='flex h-[42px]'>
          <input
            type='text'
            placeholder='Search'
            className='h-full w-full px-3 border border-gray-300 rounded-l-md focus:outline-none'
          />
          <button className='bg-primary h-full px-4 rounded-r-md'>
            <SearchIcon size={20} className='text-white' />
          </button>
        </div>
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
                Stay
              </Link>
              <Link
                href='/buy'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                Buy
              </Link>
              <Link
                href='/tourist-activity'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                Tourist Activity
              </Link>
              <Link
                href='/manage-property'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                Property Management
              </Link>
              <Link
                href='/about-us'
                className='font-semibold text-base lg:text-lg px-2 lg:px-3 py-2 hover:text-primary whitespace-nowrap transition-colors'
              >
                About Us
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
                  Contact us
                </span>
              </Link>
              <Link
                href='/wishlist'
                className='flex gap-1 lg:gap-2 items-center hover:text-primary transition-colors'
              >
                <FaHeart className='text-red-600' size={22} />
                <span className='font-semibold text-base lg:text-lg'>
                  Wishlist
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
                Stay
              </Link>
              <Link href='/buy' className='block py-2 font-medium text-lg'>
                Buy
              </Link>
              <Link
                href='/tourist-activity'
                className='block py-2 font-medium text-lg'
              >
                Tourist Activity
              </Link>
              <Link
                href='/manage-property'
                className='block py-2 font-medium text-lg'
              >
                Property Management
              </Link>
              <Link href='/about-us' className='block py-2 font-medium text-lg'>
                About Us
              </Link>
            </div>

            {/* Contact and Wishlist */}
            <div className='border-b border-gray-100 py-3'>
              <Link href='/contact-us' className='flex items-center py-2 gap-3'>
                <Phone className='text-gray-600' size={20} />
                <span className='font-medium'>Contact us</span>
              </Link>

              <Link href='/wishlist' className='flex items-center py-2 gap-3'>
                <FaHeart className='text-red-600' size={20} />
                <span className='font-medium'>Wishlist</span>
              </Link>
            </div>

            {/* Language, Currency, Social */}
            <div className='pt-2'>
              <div className='flex justify-between pt-3'>
                <div className='flex gap-4 items-center'>
                  <LocaleSwitcher />
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      hasChevron={true}
                      className='flex items-center gap-2'
                    >
                      <span className='font-medium'>IDR</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>IDR</DropdownMenuItem>
                      <DropdownMenuItem>USD</DropdownMenuItem>
                      <DropdownMenuItem>EUR</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className='flex items-center gap-6'>
                  <FaFacebook className='text-primary' size={20} />
                  <FaTwitter className='text-primary' size={20} />
                  <FaInstagram className='text-primary' size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
