'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaBath, FaBed } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';

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
import { DateSelector } from '@/modules/rent-detail/date-selector';

interface BookingInfo {
  price: number;
  currency: string;
  nights: number;
  maxGuests: number;
}

interface VillaDetails {
  name: string;
  availableRentTypes: string[];
  bedrooms: number;
  bathrooms: number;
  maxPersons: number;
  bookingInfo: BookingInfo;
}

interface SendInquiryFormProps {
  villaDetails: VillaDetails;
}

const SendInquiryForm: React.FC<SendInquiryFormProps> = ({ villaDetails }) => {
  const t = useTranslations('rentDetail.inquiryForm');
  const tContent = useTranslations('rentDetail.content');

  // State for calendar dates
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 4))
  );

  // Form state
  const [stayDuration, setStayDuration] = useState('Daily');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');

  // Handle booking submission
  const handleSubmitBooking = () => {
    // Validate form
    if (!fullName || !email || !phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    // In a real app, you would send this data to an API
    // eslint-disable-next-line no-console
    console.log('Booking submitted:', {
      stayDuration,
      checkInDate,
      checkOutDate,
      fullName,
      email,
      phoneNumber: `${countryCode}${phoneNumber}`,
      guestCount,
      message,
    });

    // Show success message
    alert('Your inquiry has been sent. We will contact you shortly!');
  };

  return (
    <div className='sticky 2xl:top-4 top-[-84px] border shadow-md bg-white rounded-md overflow-hidden'>
      <div className='bg-primary text-white flex flex-col gap-1 px-6 py-3'>
        <span className=''>{t('sendInquiry')} or</span>
        <span className='text-2xl font-semibold'>{tContent('bookNow')}</span>
      </div>
      <div className='p-6 flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('howLongDoYouWantToStay')}
          </Label>
          <Select defaultValue='Daily' onValueChange={setStayDuration}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={t('selectDuration')} />
            </SelectTrigger>
            <SelectContent>
              {villaDetails.availableRentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          {/* Check in date */}
          <DateSelector
            label={tContent('bookingInfo.checkIn')}
            date={checkInDate}
            onSelect={setCheckInDate}
          />

          {/* Check out date */}
          <DateSelector
            label={tContent('bookingInfo.checkOut')}
            date={checkOutDate}
            onSelect={setCheckOutDate}
            minDate={checkInDate}
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col gap-1'>
            <span className='text-lg text-primary font-semibold'>
              {villaDetails.bookingInfo.currency}{' '}
              {villaDetails.bookingInfo.price.toLocaleString()}
            </span>
            <span className='text-text text-sm'>
              / {villaDetails.bookingInfo.nights}{' '}
              {tContent('bookingInfo.nights')}
            </span>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-1 items-center'>
              <div className='bg-tertiary rounded-full w-5 h-5 flex items-center justify-center'>
                <FaBed size={12} className='text-primary' />
              </div>
              <span className='text-text text-sm'>
                {villaDetails.bedrooms} {tContent('features.bedrooms')}
              </span>
            </div>
            <div className='flex gap-1 items-center'>
              <div className='bg-tertiary rounded-full w-5 h-5 flex items-center justify-center'>
                <FaBath size={12} className='text-primary' />
              </div>
              <span className='text-text text-sm'>
                {villaDetails.bathrooms} {tContent('features.bathrooms')}
              </span>
            </div>
            <div className='flex gap-1 items-center'>
              <div className='bg-tertiary rounded-full w-5 h-5 flex items-center justify-center'>
                <HiUsers size={12} className='text-primary' />
              </div>
              <span className='text-text text-sm'>
                {villaDetails.maxPersons} {t('persons')}
              </span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('fullName')}
          </Label>
          <Input
            placeholder={t('enterYourFullName')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('email')}
          </Label>
          <Input
            placeholder={t('enterYourEmail')}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('phoneNumber')}
          </Label>
          <div className='flex'>
            {/* Country code selector using Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type='button'
                  className='rounded-l-lg bg-primary text-white p-2 flex gap-2 items-center h-full'
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
                      stroke='currentColor'
                      strokeWidth='0.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-48 p-0'>
                <div className='max-h-[200px] overflow-y-auto'>
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      className='w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
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
              className='rounded-l-none'
              placeholder={t('enterYourPhoneNumber')}
              type='tel'
              value={phoneNumber}
              onChange={(e) => {
                // Allow only numbers
                const value = e.target.value.replace(/\D/g, '');
                setPhoneNumber(value);
              }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('guest')}
          </Label>
          <Select defaultValue='1' onValueChange={setGuestCount}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={t('selectGuestCount')} />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: villaDetails.bookingInfo.maxGuests },
                (_, i) => i + 1
              ).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? t('guestSingular') : t('guestPlural')}
                </SelectItem>
              ))}
              <SelectItem value='custom'>{t('custom')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('tellUsWhatYouWouldLikeUsToHelpYouWith')}
          </Label>
          <Textarea
            placeholder={t('enterYourMessage')}
            className='min-h-[100px]'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button
          variant='primary'
          className='w-full'
          onClick={handleSubmitBooking}
        >
          {t('sendInquiry')} or {tContent('bookNow')}
        </Button>
      </div>
    </div>
  );
};

export default SendInquiryForm;
