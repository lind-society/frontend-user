import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { getApiErrorMessage } from '@/lib/api-error';
import { useCreateInquiry } from '@/hooks/api/useInquiry';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import {
  CONCIERGE_WHATSAPP_DISPLAY,
  conciergeWhatsappUrl,
} from '@/constant/config';
import { countryCodes } from '@/constant/country-codes';

import { Property } from '@/types/api/property';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SendInquiryFormBuyProps {
  property: Property;
  priceLabel: string;
}

const SendInquiryFormBuy: React.FC<SendInquiryFormBuyProps> = ({
  property,
  priceLabel,
}) => {
  const t = useTranslations('buyDetail.inquiryForm');
  const tRent = useTranslations('rentDetail.inquiryForm');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const { mutate: sendInquiry, isPending } = useCreateInquiry();

  const submit = (text: string | undefined) => {
    if (!name.trim() || !email.trim() || !phoneNumber.trim()) {
      toast.error(t('fillRequired'));
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      toast.error(t('invalidEmail'));
      return;
    }

    sendInquiry(
      {
        type: 'property',
        name: name.trim(),
        email: email.trim(),
        phone: `${countryCode}${phoneNumber}`,
        message: text?.trim() || undefined,
        referenceId: property.id,
        referenceName: property.name,
        metadata: { price: priceLabel, ownership: property.ownershipType },
      },
      {
        onSuccess: () => {
          toast.success(t('inquirySent'));
          setMessage('');
        },
        onError: (error) =>
          toast.error(getApiErrorMessage(error, t('inquiryError'))),
      }
    );
  };

  return (
    <div className='sticky 2xl:top-4 top-[-84px] border shadow-xs bg-cream-light rounded overflow-hidden'>
      <div className='bg-primary text-cream flex flex-col gap-1 px-6 py-3'>
        <span>{t('makeItYours')}</span>
        <span className='text-2xl font-semibold'>{tRent('sendInquiry')}</span>
      </div>
      <div className='p-6 flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
          <span className='text-lg font-semibold text-primary'>
            {t('needHelp')}
          </span>
          <Button
            variant='primary-outline'
            className='flex items-center gap-2'
            asChild
          >
            <a
              href={conciergeWhatsappUrl(
                `Hi LIND Society, I'm interested in ${property.name}.`
              )}
              target='_blank'
              rel='noreferrer'
            >
              <FaWhatsapp className='text-primary' size={18} />
              <span className='text-primary font-semibold'>
                {CONCIERGE_WHATSAPP_DISPLAY}
              </span>
            </a>
          </Button>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <span className='text-lg font-semibold text-primary'>
            {priceLabel}
          </span>
          <Button
            variant='primary-outline'
            type='button'
            disabled={isPending}
            onClick={() => submit(t('askRoiMessage'))}
          >
            {t('askForROI')}
          </Button>
        </div>

        {property.soldStatus && (
          <p className='rounded border border-bronze/25 bg-cream px-3 py-2 text-sm text-ink-soft'>
            {t('soldNotice')}
          </p>
        )}

        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-semibold text-primary'>
            {t('fullName')}
          </Label>
          <Input
            placeholder={t('enterYourFullName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type='button'
                  className='rounded-l bg-primary text-cream p-2 flex gap-2 items-center h-full'
                >
                  <span>{countryCode}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-48 p-0'>
                <div className='max-h-[200px] overflow-y-auto'>
                  {countryCodes.map((country) => (
                    <button
                      type='button'
                      key={country.code}
                      className='w-full text-left px-3 py-2 hover:bg-sand/40 focus:bg-sand/40 focus:outline-hidden'
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
              inputMode='numeric'
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ''))
              }
            />
          </div>
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
          type='button'
          disabled={isPending}
          className='w-full bg-primary hover:bg-primary/90'
          onClick={() => submit(message)}
        >
          {isPending ? t('sending') : t('send')}
        </Button>
      </div>
    </div>
  );
};

export default SendInquiryFormBuy;
