'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

import { OptionCarousel } from '@/modules/rent/header/option-carousel';

interface PreferredOption {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  selected?: boolean;
}

interface PreferredOptionsProps {
  options: PreferredOption[];
  onToggleOption: (id: string) => void;
  onClearAll: () => void;
}

export const PreferredOptions: React.FC<PreferredOptionsProps> = ({
  options,
  onToggleOption,
  onClearAll,
}) => {
  const t = useTranslations('rentResults');

  // Split options for better responsive layout on smaller screens
  const halfLength = Math.ceil(options.length / 2);
  const firstHalf = options.slice(0, halfLength);
  const secondHalf = options.slice(halfLength);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <span className='text-lg md:text-[22px] text-primary font-semibold'>
          {t('preferredOptions.title')}
        </span>
        <Button
          variant='link'
          className='text-text text-sm font-medium p-0'
          onClick={onClearAll}
        >
          {t('preferredOptions.clearAll')}
        </Button>
      </div>

      <OptionCarousel className='md:hidden'>
        {options.map((option) => (
          <Button
            key={option.id}
            variant={option.selected ? 'default' : 'outline'}
            className={`flex items-center gap-2 min-w-max ${
              option.selected ? 'bg-primary text-cream' : 'text-ink-muted'
            }`}
            onClick={() => onToggleOption(option.id)}
          >
            <span className={option.selected ? 'text-cream' : 'text-ink-muted'}>
              {option.icon}
            </span>
            <span
              className={`text-xs font-medium ${
                option.selected ? 'text-cream' : 'text-ink-muted'
              }`}
            >
              {t(`search.amenities.${option.labelKey}`)}
            </span>
          </Button>
        ))}
      </OptionCarousel>

      <div className='hidden md:block'>
        <OptionCarousel>
          <div className='grid grid-rows-2 gap-4'>
            <div className='flex gap-3 items-center'>
              {firstHalf.map((option) => (
                <Button
                  key={option.id}
                  variant={option.selected ? 'default' : 'outline'}
                  className={`flex items-center gap-2 min-w-max ${
                    option.selected ? 'bg-primary text-cream' : 'text-ink-muted'
                  }`}
                  onClick={() => onToggleOption(option.id)}
                >
                  <span
                    className={
                      option.selected ? 'text-cream' : 'text-ink-muted'
                    }
                  >
                    {option.icon}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      option.selected ? 'text-cream' : 'text-ink-muted'
                    }`}
                  >
                    {t(`search.amenities.${option.labelKey}`)}
                  </span>
                </Button>
              ))}
            </div>
            <div className='flex gap-3 items-center'>
              {secondHalf.map((option) => (
                <Button
                  key={option.id}
                  variant={option.selected ? 'default' : 'outline'}
                  className={`flex items-center gap-2 min-w-max ${
                    option.selected ? 'bg-primary text-cream' : 'text-ink-muted'
                  }`}
                  onClick={() => onToggleOption(option.id)}
                >
                  <span
                    className={
                      option.selected ? 'text-cream' : 'text-ink-muted'
                    }
                  >
                    {option.icon}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      option.selected ? 'text-cream' : 'text-ink-muted'
                    }`}
                  >
                    {t(`search.amenities.${option.labelKey}`)}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </OptionCarousel>
      </div>
    </div>
  );
};
