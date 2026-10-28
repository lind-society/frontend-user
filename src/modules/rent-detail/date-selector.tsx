import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FaCalendar } from 'react-icons/fa6';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Date Selector Component
export const DateSelector: React.FC<{
  label: string;
  date?: Date;
  onSelect: (date?: Date) => void;
  minDate?: Date;
}> = ({ label, date, onSelect, minDate }) => {
  const t = useTranslations('rentDetail.inquiryForm');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='py-2 flex gap-2 w-full border border-transparent hover:border-bronze/25 rounded'>
          <FaCalendar size={24} className='text-primary' />
          <div className='flex flex-col w-full'>
            <span className='font-semibold text-left'>{label}</span>
            <div className='flex justify-between items-center'>
              <span className='text-ink-muted text-sm'>
                {date ? format(date, 'dd MMM yyyy') : t('selectDate')}
              </span>
              <ChevronDown size={18} className='text-primary' />
            </div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={onSelect}
          initialFocus
          disabled={minDate ? (date) => date < minDate : undefined}
        />
      </PopoverContent>
    </Popover>
  );
};
