'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

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

interface SendInquiryFormBuyProps {
  villaDetails: VillaDetails;
}

const SendInquiryFormBuy: React.FC<SendInquiryFormBuyProps> = ({
  villaDetails,
}) => {
  const t = useTranslations('buyDetail.inquiryForm');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // eslint-disable-next-line no-console
  //     console.log('Form submitted:', formData);

  //     // Reset form
  //     setFormData({
  //       name: '',
  //       email: '',
  //       phone: '',
  //       message: '',
  //     });

  //     alert('Inquiry sent successfully!');
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     alert('Failed to send inquiry. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className='sticky top-2 border shadow-md bg-white rounded-md overflow-hidden'>
      <div className='bg-primary text-white flex flex-col gap-1 px-6 py-3'>
        <span className=''>{t('sendInquiry')} or</span>
        <span className='text-2xl font-semibold'>{t('makeItYours')}</span>
      </div>
      <div className='p-6 flex flex-col gap-3'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2 items-center'>
            {/* avatar full rounded */}
            <div className='flex flex-col gap-1'>
              <span className='text-lg font-semibold text-primary'>
                Samuel J.
              </span>
              <span className='text-text text-sm'>
                {t('customerServiceFor')} Bali
              </span>
            </div>
          </div>
          <Button variant='primary-outline' className='flex items-center gap-2'>
            <FaWhatsapp className='text-primary' size={18} />
            <span className='text-primary font-semibold '>
              +62 361 123 4567
            </span>
          </Button>
        </div>
        <div className='flex justify-between'>
          <span className='text-lg font-semibold text-primary'>
            IDR 4,740,122,500
          </span>
          <Button variant='primary-outline' className='flex items-center gap-2'>
            {t('askForROI')}
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('fullName')}
          </Label>
          <Input
            placeholder={t('enterYourFullName')}
            value={formData.name}
            onChange={handleInputChange}
            name='name'
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('email')}
          </Label>
          <Input
            placeholder={t('enterYourEmail')}
            type='email'
            value={formData.email}
            onChange={handleInputChange}
            name='email'
            required
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
                  <span>{countryCodes[0].code}</span>
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
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: country.code + prev.phone,
                        }))
                      }
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
              value={formData.phone}
              onChange={handleInputChange}
              name='phone'
              required
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('guest')}
          </Label>
          <Select
            defaultValue='1'
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                guestCount: value,
              }))
            }
          >
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
            value={formData.message}
            onChange={handleInputChange}
            name='message'
            required
          />
        </div>
        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-primary hover:bg-primary/90'
        >
          {isSubmitting ? t('sending') : t('send')}
        </Button>
      </div>
    </div>
  );
};

export default SendInquiryFormBuy;
