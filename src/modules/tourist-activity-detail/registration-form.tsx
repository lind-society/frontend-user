'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { useBookActivity } from '@/hooks/api/useBooking';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TouristActivity } from '@/modules/tourist-activity/constant';

interface RegistrationFormProps {
  activity: TouristActivity;
  selectedDate: Date;
  onBack: () => void;
}

/** Extracts the accessToken from a bookingLink like `https://…/booking/<token>` — the /booking/[token] page is internal, so navigation stays client-side rather than a full reload to an absolute URL. */
const tokenFromBookingLink = (bookingLink: string): string | null => {
  const parts = bookingLink.split('/').filter(Boolean);
  return parts[parts.length - 1] || null;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  activity,
  selectedDate,
  onBack,
}) => {
  const t = useTranslations('touristActivityDetail.form');
  const tDetail = useTranslations('touristActivityDetail');
  const router = useRouter();

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneCountryCode, setPhoneCountryCode] = React.useState('+62');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [ticketAmount, setTicketAmount] = React.useState('1');
  const [agreed, setAgreed] = React.useState(false);

  const { mutate: bookActivity, isPending } = useBookActivity(activity.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast.error(t('agreementRequired'));
      return;
    }

    if (!activity.currencyId) {
      // Shouldn't happen for a real activity — every one has a currency — but
      // booking with no currency would just 400 from the server with a much
      // less useful message.
      toast.error(t('genericError'));
      return;
    }

    bookActivity(
      {
        type: 'activity',
        activityId: activity.id,
        totalGuest: Number(ticketAmount),
        totalAmount: activity.price * Number(ticketAmount),
        currencyId: activity.currencyId,
        bookingDate: selectedDate.toISOString(),
        customer: {
          name: fullName,
          email,
          phoneCountryCode,
          phoneNumber,
        },
      },
      {
        onSuccess: (response) => {
          const bookingLink = response.data?.bookingLink;
          const token = bookingLink ? tokenFromBookingLink(bookingLink) : null;

          if (!token) {
            toast.error(t('genericError'));
            return;
          }

          router.push(`/booking/${token}`);
        },
        onError: (error) => {
          const message =
            (error as AxiosError<{ message?: string }>)?.response?.data
              ?.message || t('genericError');
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className='bg-bone min-h-screen py-16'>
      <BaseContainer>
        <div className='flex flex-col items-center text-center gap-4'>
          <h1 className='text-2xl font-semibold text-primary'>
            {activity.name} {tDetail('ticketRegistration')}
          </h1>
          <p className='max-w-2xl'>{t('title')}</p>

          <div className='mt-8 w-full max-w-2xl bg-cream-light p-8 rounded border border-bronze/25 text-left'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
              <div>
                <Label htmlFor='fullName'>{t('fullName')}</Label>
                <Input
                  id='fullName'
                  placeholder={t('fullNamePlaceholder')}
                  className='mt-1'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor='email'>{t('email')}</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  className='mt-1'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor='phone'>{t('phone')}</Label>
                <div className='flex gap-2 mt-1'>
                  <Select
                    value={phoneCountryCode}
                    onValueChange={setPhoneCountryCode}
                  >
                    <SelectTrigger className='w-24'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='+62'>+62</SelectItem>
                      <SelectItem value='+1'>+1</SelectItem>
                      <SelectItem value='+44'>+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder={t('phonePlaceholder')}
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ''))
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='ticket'>{t('ticketAmount')}</Label>
                <Select value={ticketAmount} onValueChange={setTicketAmount}>
                  <SelectTrigger id='ticket' className='mt-1'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1</SelectItem>
                    <SelectItem value='2'>2</SelectItem>
                    <SelectItem value='3'>3</SelectItem>
                    <SelectItem value='4'>4</SelectItem>
                    <SelectItem value='5'>5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-center justify-between text-sm border-t pt-4'>
                <span className='text-ink-muted'>{t('total')}</span>
                <span className='font-semibold text-primary'>
                  {activity.currency}{' '}
                  {(activity.price * Number(ticketAmount)).toLocaleString()}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='terms'
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {t('agreement')}
                </label>
              </div>
              <div className='flex gap-4'>
                <Button
                  type='button'
                  variant='outline'
                  className='flex-1'
                  onClick={onBack}
                  disabled={isPending}
                >
                  {t('back')}
                </Button>
                <Button
                  type='submit'
                  className='flex-1 bg-primary text-cream'
                  disabled={isPending}
                >
                  {isPending ? t('submitting') : t('next')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default RegistrationForm;
