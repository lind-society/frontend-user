'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
} from 'react-icons/fa';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { countryCodes } from '@/modules/rent-detail/constant';

const ContentContactUs = () => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');
  const t = useTranslations('contactUs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission
    // eslint-disable-next-line no-console
    console.log({
      fullName,
      email,
      phone: `${countryCode}${phoneNumber}`,
      context,
      message,
    });

    // Reset form or show success message
    alert(t('form.successMessage'));
  };

  return (
    <div className='py-8 md:py-12 lg:py-16'>
      <BaseContainer>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
          {/* Left column - Contact Information */}
          <div className='flex flex-col gap-8 w-full lg:w-1/2 justify-center'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <h4 className='text-primary text-xl md:text-2xl font-semibold'>
                  {t('content.title')}
                </h4>
                <span className='text-text text-xl md:text-2xl font-semibold'>
                  {t('content.subtitle')}
                </span>
              </div>
              <span className='text-text'>{t('content.description')}</span>
            </div>

            {/* Contact methods grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8'>
              {/* Phone */}
              <div className='flex gap-3 items-center'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white'>
                  <FaPhoneAlt size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>
                    {t('contactInfo.phone')}
                  </span>
                  <span className='text-sm text-text'>(+62) 812 3456 7890</span>
                </div>
              </div>

              {/* Email */}
              <div className='flex gap-3 items-center'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white'>
                  <FaEnvelope size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>
                    {t('contactInfo.email')}
                  </span>
                  <span className='text-sm text-text'>
                    lindsociety@gmail.com
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className='flex gap-3 items-start sm:col-span-2'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white flex-shrink-0'>
                  <FaMapMarkerAlt size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>
                    {t('contactInfo.address')}
                  </span>
                  <span className='text-sm text-text'>
                    45 Sudirman Avenue, Level 5, Jakarta, Indonesia 10210
                  </span>
                </div>
              </div>

              {/* Instagram */}
              <div className='flex gap-3 items-center'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white'>
                  <FaInstagram size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>
                    {t('contactInfo.instagram')}
                  </span>
                  <span className='text-sm text-text'>@lindsociety</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Contact Form */}
          <div className='w-full lg:w-1/2 shadow-md rounded-lg overflow-hidden'>
            <div className='py-4 px-6 flex flex-col gap-1 bg-primary'>
              <span className='text-white text-sm md:text-base'>
                {t('form.title')}
              </span>
              <span className='text-xl md:text-2xl text-white font-semibold'>
                {t('form.subtitle')}
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className='p-4 md:p-6 flex flex-col gap-3 md:gap-4 bg-white'
            >
              {/* Full Name */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  {t('form.fullName')}
                </Label>
                <Input
                  placeholder={t('form.placeholders.fullName')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  {t('form.email')}
                </Label>
                <Input
                  placeholder={t('form.placeholders.email')}
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  {t('form.phone')}
                </Label>
                <div className='flex w-full'>
                  {/* Country code selector using Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type='button'
                        className='rounded-l-lg bg-primary text-white p-2 flex gap-2 items-center flex-shrink-0'
                      >
                        <span>{countryCode}</span>
                        <svg
                          width='12'
                          height='12'
                          viewBox='0 0 12 12'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='text-white'
                        >
                          <path
                            d='M6 8.5L2 4.5H10L6 8.5Z'
                            fill='currentColor'
                          />
                        </svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className='w-64 p-1 max-h-64 overflow-y-auto'>
                      <div className='flex flex-col'>
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type='button'
                            className='py-2 px-3 text-left rounded-md hover:bg-gray-100 flex items-center gap-2'
                            onClick={() => setCountryCode(country.code)}
                          >
                            <span className='font-medium'>{country.code}</span>{' '}
                            {country.country}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Input
                    placeholder={t('form.placeholders.phone')}
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='rounded-l-none border-l-0'
                    required
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  {t('form.inquiryType')}
                </Label>
                <Select value={context} onValueChange={setContext} required>
                  <SelectTrigger className='w-full'>
                    <SelectValue
                      placeholder={t('form.placeholders.inquiryType')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='booking'>
                      {t('form.inquiryTypes.booking')}
                    </SelectItem>
                    <SelectItem value='property-management'>
                      {t('form.inquiryTypes.propertyManagement')}
                    </SelectItem>
                    <SelectItem value='property-listing'>
                      {t('form.inquiryTypes.propertyListing')}
                    </SelectItem>
                    <SelectItem value='support'>
                      {t('form.inquiryTypes.support')}
                    </SelectItem>
                    <SelectItem value='other'>
                      {t('form.inquiryTypes.other')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  {t('form.message')}
                </Label>
                <Textarea
                  placeholder={t('form.placeholders.message')}
                  className='min-h-[120px]'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                variant='primary'
                className='w-full mt-2 flex items-center gap-2'
                type='submit'
              >
                <FaPaperPlane />
                <span>{t('form.submit')}</span>
              </Button>
            </form>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentContactUs;
