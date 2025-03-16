'use client';

import { ChevronDown, Menu, Phone, SearchIcon, X } from 'lucide-react';
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
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Image src='/images/logo.png' alt='logo' width={153} height={58} />
          </div>

          {/* Search (hidden on mobile) */}
          <div className='hidden md:flex h-[52px] flex-1 max-w-md mx-4'>
            <input
              type='text'
              placeholder='Search by villa, property, or activity name'
              className='h-full w-full px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary'
            />
            <button className='bg-primary h-full px-6 rounded-r-md'>
              <SearchIcon size={24} className='text-white' />
            </button>
          </div>

          {/* Language, Currency, Social Icons (hidden on mobile) */}
          <div className='hidden md:flex gap-6 lg:gap-8 items-center'>
            {/* Language Dropdown with LocaleSwitcher */}
            <LocaleSwitcher />

            {/* Currency Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                hasChevron={true}
                className='flex items-center gap-3'
              >
                <span className='text-lg font-semibold'>IDR</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>IDR</DropdownMenuItem>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Social Media Icons */}
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

      {/* Mobile search (visible only on mobile) */}
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

      {/* Desktop Menu Navigation */}
      <BaseContainer>
        <div className='hidden md:flex justify-between items-center py-5 text-gray-600'>
          <div className='flex gap-4 lg:gap-8 items-center'>
            {/* Stay Dropdown */}
            <NavDropdown title='Stay'>
              <DropdownMenuItem asChild>
                <Link href='/stay/villas'>Villas</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/stay/hotels'>Hotels</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/stay/apartments'>Apartments</Link>
              </DropdownMenuItem>
            </NavDropdown>

            {/* Buy Dropdown */}
            <NavDropdown title='Buy'>
              <DropdownMenuItem asChild>
                <Link href='/buy/properties'>Properties</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/buy/land'>Land</Link>
              </DropdownMenuItem>
            </NavDropdown>

            {/* Tourist Activity Dropdown */}
            <NavDropdown title='Tourist activity'>
              <DropdownMenuItem asChild>
                <Link href='/activities/tours'>Tours</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/activities/adventures'>Adventures</Link>
              </DropdownMenuItem>
            </NavDropdown>

            {/* Property Management Dropdown */}
            <NavDropdown title='Property management'>
              <DropdownMenuItem asChild>
                <Link href='/management/services'>Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/management/pricing'>Pricing</Link>
              </DropdownMenuItem>
            </NavDropdown>

            {/* About Us Dropdown */}
            <NavDropdown title='About us'>
              <DropdownMenuItem asChild>
                <Link href='/about/team'>Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/about/mission'>Our Mission</Link>
              </DropdownMenuItem>
            </NavDropdown>
          </div>

          <div className='flex gap-4 lg:gap-8 items-center'>
            <div className='flex gap-2 items-center'>
              <Phone className='text-gray-600' size={24} />
              <span className='font-semibold text-lg'>Contact us</span>
            </div>
            <div className='flex gap-2 items-center'>
              <FaHeart className='text-red-600' size={24} />
              <span className='font-semibold text-lg'>Wishlist</span>
            </div>
          </div>
        </div>
      </BaseContainer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t'>
          <div className='px-4 py-2 space-y-2'>
            <MobileNavItem title='Stay'>
              <Link href='/stay/villas' className='block py-2 px-4'>
                Villas
              </Link>
              <Link href='/stay/hotels' className='block py-2 px-4'>
                Hotels
              </Link>
              <Link href='/stay/apartments' className='block py-2 px-4'>
                Apartments
              </Link>
            </MobileNavItem>

            <MobileNavItem title='Buy'>
              <Link href='/buy/properties' className='block py-2 px-4'>
                Properties
              </Link>
              <Link href='/buy/land' className='block py-2 px-4'>
                Land
              </Link>
            </MobileNavItem>

            <MobileNavItem title='Tourist activity'>
              <Link href='/activities/tours' className='block py-2 px-4'>
                Tours
              </Link>
              <Link href='/activities/adventures' className='block py-2 px-4'>
                Adventures
              </Link>
            </MobileNavItem>

            <MobileNavItem title='Property management'>
              <Link href='/management/services' className='block py-2 px-4'>
                Services
              </Link>
              <Link href='/management/pricing' className='block py-2 px-4'>
                Pricing
              </Link>
            </MobileNavItem>

            <MobileNavItem title='About us'>
              <Link href='/about/team' className='block py-2 px-4'>
                Our Team
              </Link>
              <Link href='/about/mission' className='block py-2 px-4'>
                Our Mission
              </Link>
            </MobileNavItem>

            <div className='pt-2'>
              <Separator />
            </div>

            {/* Contact and Wishlist */}
            <Link href='/contact' className='flex items-center py-3 gap-3'>
              <Phone className='text-gray-600' size={20} />
              <span className='font-medium'>Contact us</span>
            </Link>

            <Link href='/wishlist' className='flex items-center py-3 gap-3'>
              <FaHeart className='text-red-600' size={20} />
              <span className='font-medium'>Wishlist</span>
            </Link>

            {/* Language, Currency, Social */}
            <div className='pt-2'>
              <Separator />
            </div>

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
      )}
    </div>
  );
};

// Desktop nav dropdown component
function NavDropdown({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        hasChevron={true}
        className='flex items-center gap-3'
      >
        <span className='font-semibold text-lg'>{title}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}

// Mobile nav item component with dropdown
function MobileNavItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-gray-100 last:border-none'>
      <button
        className='flex w-full items-center justify-between py-3'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='font-medium text-lg'>{title}</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>
      {isOpen && <div className='pt-1 pb-3 pl-4 text-gray-600'>{children}</div>}
    </div>
  );
}

export default Navbar;
