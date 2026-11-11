import { addDays, format, startOfDay } from 'date-fns';
import { CalendarDays, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import { formatPrice } from '@/lib/mappers/format';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
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

import SendInquiryForm from '@/modules/rent-detail/send-inquiry-form';

import { Villa } from '@/types/api/villa';

const DateField = ({
  label,
  date,
  onSelect,
  minDate,
}: {
  label: string;
  date: Date;
  onSelect: (date: Date) => void;
  minDate: Date;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        type='button'
        className='flex flex-col items-start gap-1 text-left'
      >
        <span className='text-xs text-bronze-600'>{label}</span>
        <span className='flex items-center gap-2 text-sm text-ink'>
          {format(date, 'dd MMM yyyy')}
          <CalendarDays size={14} className='text-bronze-600' />
        </span>
      </button>
    </PopoverTrigger>
    <PopoverContent className='w-auto p-0'>
      <Calendar
        mode='single'
        selected={date}
        onSelect={(picked) => picked && onSelect(picked)}
        disabled={(day) => day < minDate}
        autoFocus
      />
    </PopoverContent>
  </Popover>
);

interface BookingCardProps {
  villa: Villa;
  bedrooms: number;
  nightlyRate: number | null;
}

/**
 * The short booking card from the design: price, dates, guests and "Check
 * availability". The button opens the full booking / inquiry form with these
 * choices already filled in.
 */
const BookingCard = ({ villa, bedrooms, nightlyRate }: BookingCardProps) => {
  const t = useTranslations('rentDetail.bookingCard');
  const tForm = useTranslations('rentDetail.inquiryForm');

  const today = startOfDay(new Date());
  const [checkIn, setCheckIn] = useState<Date>(today);
  const [checkOut, setCheckOut] = useState<Date>(addDays(today, 4));
  const [guests, setGuests] = useState('2');
  const [open, setOpen] = useState(false);

  const symbol = villa.currency?.symbol;

  return (
    <>
      <div className='flex flex-col gap-5 rounded border border-bronze/20 bg-cream-light p-5 shadow-sm'>
        {nightlyRate != null && (
          <div className='flex flex-col gap-1 border-b border-bronze/15 pb-4'>
            <span className='text-xs text-bronze-600'>{t('startFrom')}</span>
            <span className='text-xl font-semibold text-ink'>
              {formatPrice(nightlyRate, symbol)}{' '}
              <span className='text-xs font-normal text-ink-soft'>
                / {t('night')}
              </span>
            </span>
          </div>
        )}

        <div className='grid grid-cols-2 gap-4 border-b border-bronze/15 pb-4'>
          <DateField
            label={t('checkIn')}
            date={checkIn}
            minDate={today}
            onSelect={(date) => {
              setCheckIn(date);
              if (checkOut <= date) setCheckOut(addDays(date, 1));
            }}
          />
          <DateField
            label={t('checkOut')}
            date={checkOut}
            minDate={addDays(checkIn, 1)}
            onSelect={setCheckOut}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <span className='text-xs text-bronze-600'>{t('guests')}</span>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className='w-full bg-white'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, index) => index + 1).map(
                (count) => (
                  <SelectItem key={count} value={String(count)}>
                    {count}{' '}
                    {count === 1
                      ? tForm('guestSingular')
                      : tForm('guestPlural')}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <Button variant='primary' onClick={() => setOpen(true)}>
          {t('checkAvailability')}
        </Button>

        <p className='flex items-center gap-2 text-xs text-ink-soft'>
          <ShieldCheck size={14} className='text-bronze-600' />
          {t('bestRate')}
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-h-[90vh] max-w-md overflow-y-auto p-0'>
          <DialogTitle className='sr-only'>{villa.name}</DialogTitle>
          <DialogDescription className='sr-only'>
            {t('checkAvailability')}
          </DialogDescription>
          <SendInquiryForm
            villa={villa}
            bedrooms={bedrooms}
            nightlyRate={nightlyRate}
            initialCheckIn={checkIn}
            initialCheckOut={checkOut}
            initialGuests={guests}
            embedded
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingCard;
