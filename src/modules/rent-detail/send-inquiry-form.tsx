import { differenceInCalendarDays, startOfDay } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { FaBed } from 'react-icons/fa';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { getApiErrorMessage, tokenFromBookingLink } from '@/lib/api-error';
import { toLocalDateKey, toUtcDateIso } from '@/lib/helper';
import { formatPrice } from '@/lib/mappers/format';
import { useRouter } from '@/lib/navigation';
import { useBookVilla } from '@/hooks/api/useBooking';
import { useCreateInquiry } from '@/hooks/api/useInquiry';

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

import { countryCodes } from '@/constant/country-codes';
import { DateSelector } from '@/modules/rent-detail/date-selector';

import { Villa } from '@/types/api/villa';

type StayType = 'daily' | 'monthly' | 'yearly';

const MAX_GUESTS = 16;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SendInquiryFormProps {
  villa: Villa;
  bedrooms: number;
  nightlyRate: number | null;
  /** Values chosen in the booking card, so the guest does not pick them twice. */
  initialCheckIn?: Date;
  initialCheckOut?: Date;
  initialGuests?: string;
  /** Rendered inside a dialog: no sticky positioning. */
  embedded?: boolean;
}

const SendInquiryForm: React.FC<SendInquiryFormProps> = ({
  villa,
  bedrooms,
  nightlyRate,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  embedded = false,
}) => {
  const t = useTranslations('rentDetail.inquiryForm');
  const tContent = useTranslations('rentDetail.content');
  const tTypes = useTranslations('rentDetail.content.rentTypes');
  const router = useRouter();

  const today = startOfDay(new Date());
  const symbol = villa.currency?.symbol;

  const stayTypes = useMemo(
    () =>
      (['daily', 'monthly', 'yearly'] as StayType[]).filter(
        (type) => villa.availability?.[type]
      ),
    [villa.availability]
  );

  const [stayType, setStayType] = useState<StayType>(stayTypes[0] ?? 'daily');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    initialCheckIn ?? today
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    initialCheckOut ?? new Date(today.getTime() + 4 * 24 * 3600 * 1000)
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestCount, setGuestCount] = useState(initialGuests ?? '2');
  const [message, setMessage] = useState('');

  const { mutate: bookVilla, isPending: isBooking } = useBookVilla(villa.id);
  const { mutate: sendInquiry, isPending: isSending } = useCreateInquiry();
  const isBusy = isBooking || isSending;

  const nights =
    checkInDate && checkOutDate
      ? differenceInCalendarDays(checkOutDate, checkInDate)
      : 0;

  /** The price the guest is quoted for the chosen stay type and dates. */
  const quote = useMemo(() => {
    if (nights <= 0)
      return { unit: null as number | null, total: null as number | null };

    if (stayType === 'monthly') {
      const unit =
        Number(villa.priceMonthlyAfterDiscount || villa.priceMonthly) || null;
      return {
        unit,
        total: unit ? unit * Math.max(1, Math.ceil(nights / 30)) : null,
      };
    }

    if (stayType === 'yearly') {
      const unit =
        Number(villa.priceYearlyAfterDiscount || villa.priceYearly) || null;
      return {
        unit,
        total: unit ? unit * Math.max(1, Math.ceil(nights / 365)) : null,
      };
    }

    return {
      unit: nightlyRate,
      total: nightlyRate ? nightlyRate * nights : null,
    };
  }, [nights, stayType, nightlyRate, villa]);

  const unitLabel =
    stayType === 'monthly'
      ? tContent('rates.perMonth')
      : stayType === 'yearly'
        ? tContent('rates.perYear')
        : tContent('rates.perNight');

  /** Returns false (and tells the visitor why) when the form can't be sent. */
  const validate = (needDates: boolean): boolean => {
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      toast.error(t('fillRequired'));
      return false;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      toast.error(t('invalidEmail'));
      return false;
    }

    if (needDates && (!checkInDate || !checkOutDate || nights <= 0)) {
      toast.error(t('invalidDates'));
      return false;
    }

    return true;
  };

  const handleBook = () => {
    if (!validate(true)) return;

    const currencyId = villa.currencyId ?? villa.currency?.id;

    if (!currencyId || !checkInDate || !checkOutDate) {
      toast.error(t('bookingError'));
      return;
    }

    bookVilla(
      {
        type: 'villa',
        villaId: villa.id,
        totalGuest: Number(guestCount),
        totalAmount: quote.total ?? 0,
        currencyId,
        checkInDate: toUtcDateIso(checkInDate),
        checkOutDate: toUtcDateIso(checkOutDate),
        customer: {
          name: fullName.trim(),
          email: email.trim(),
          phoneCountryCode: countryCode,
          phoneNumber,
        },
      },
      {
        onSuccess: (response) => {
          const link = response.data?.bookingLink;
          const token = link ? tokenFromBookingLink(link) : null;

          if (!token) {
            toast.error(t('bookingError'));
            return;
          }

          router.push(`/booking/${token}`);
        },
        onError: (error) =>
          toast.error(getApiErrorMessage(error, t('bookingError'))),
      }
    );
  };

  const handleInquiry = () => {
    if (!validate(false)) return;

    sendInquiry(
      {
        type: 'villa',
        name: fullName.trim(),
        email: email.trim(),
        phone: `${countryCode}${phoneNumber}`,
        message: message.trim() || undefined,
        referenceId: villa.id,
        referenceName: villa.name,
        metadata: {
          stayType,
          checkIn: checkInDate && toLocalDateKey(checkInDate),
          checkOut: checkOutDate && toLocalDateKey(checkOutDate),
          guests: Number(guestCount),
        },
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
    <div
      className={`border shadow-xs bg-cream-light rounded overflow-hidden ${
        embedded ? '' : '2xl:sticky 2xl:top-4'
      }`}
    >
      <div className='bg-primary text-cream flex flex-col gap-1 px-6 py-3'>
        <span>{t('sendInquiry')} or</span>
        <span className='text-2xl font-semibold'>{tContent('bookNow')}</span>
      </div>
      <div className='p-6 flex flex-col gap-3'>
        {stayTypes.length > 1 && (
          <div className='flex flex-col gap-2'>
            <Label className='text-sm font-semibold text-primary'>
              {t('howLongDoYouWantToStay')}
            </Label>
            <Select
              value={stayType}
              onValueChange={(value) => setStayType(value as StayType)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={t('selectDuration')} />
              </SelectTrigger>
              <SelectContent>
                {stayTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {tTypes(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className='grid grid-cols-2 gap-4'>
          <DateSelector
            label={tContent('bookingInfo.checkIn')}
            date={checkInDate}
            onSelect={(date) => {
              setCheckInDate(date);
              // Keep the stay valid when the new check-in overtakes check-out.
              if (date && checkOutDate && checkOutDate <= date) {
                setCheckOutDate(new Date(date.getTime() + 24 * 3600 * 1000));
              }
            }}
            minDate={today}
          />
          <DateSelector
            label={tContent('bookingInfo.checkOut')}
            date={checkOutDate}
            onSelect={setCheckOutDate}
            minDate={
              checkInDate
                ? new Date(checkInDate.getTime() + 24 * 3600 * 1000)
                : today
            }
          />
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col gap-1'>
            <span className='text-lg text-primary font-semibold'>
              {quote.unit ? formatPrice(quote.unit, symbol) : t('noPrice')}
            </span>
            {quote.unit && (
              <span className='text-text text-sm'>{unitLabel}</span>
            )}
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex gap-1 items-center'>
              <div className='bg-tertiary rounded-full w-5 h-5 flex items-center justify-center'>
                <FaBed size={12} className='text-primary' />
              </div>
              <span className='text-text text-sm'>
                {bedrooms} {tContent('features.bedrooms')}
              </span>
            </div>
            {nights > 0 && (
              <span className='text-text text-sm'>
                {nights} {nights === 1 ? t('nightLabel') : t('nightsLabel')}
              </span>
            )}
          </div>
        </div>

        {quote.total ? (
          <div className='flex items-center justify-between rounded border border-bronze/25 bg-cream px-3 py-2'>
            <span className='text-sm text-text'>{t('total')}</span>
            <span className='font-semibold text-primary'>
              {formatPrice(quote.total, symbol)}
            </span>
          </div>
        ) : null}

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
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type='button'
                  className='rounded-l bg-primary text-cream p-2 flex gap-2 items-center h-full'
                >
                  <span>{countryCode}</span>
                  <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    className='text-cream'
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
            {t('guest')}
          </Label>
          <Select value={guestCount} onValueChange={setGuestCount}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={t('selectGuestCount')} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map(
                (num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? t('guestSingular') : t('guestPlural')}
                  </SelectItem>
                )
              )}
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
          onClick={handleBook}
          disabled={isBusy}
        >
          {isBooking ? t('booking') : tContent('bookNow')}
        </Button>
        <Button
          variant='outline'
          className='w-full'
          onClick={handleInquiry}
          disabled={isBusy}
        >
          {isSending ? t('sending') : t('sendInquiry')}
        </Button>
        <p className='text-xs text-ink-muted'>{t('bookingNote')}</p>
      </div>
    </div>
  );
};

export default SendInquiryForm;
