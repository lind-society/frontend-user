import { ChevronDown } from 'lucide-react';
import { useTransition } from 'react';
import { useLocale, useTranslations } from 'use-intl';

import Image from '@/components/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Locale } from '@/i18n/config';
import { useSetLocale } from '@/i18n/provider';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
  theme?: string;
};

export default function LocaleSwitcher({ theme }: { theme?: string }) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  return (
    <LocaleSwitcherSelect
      theme={theme}
      defaultValue={locale}
      items={[
        {
          value: 'id',
          label: t('id'),
        },
        {
          value: 'en',
          label: t('en'),
        },
      ]}
      label={t('label')}
    />
  );
}

function LocaleSwitcherSelect({ defaultValue, items, label, theme }: Props) {
  const setUserLocale = useSetLocale();
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  const colorText =
    theme === 'dark' ? 'text-white' : 'text-ink-soft hover:text-ink ';

  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger defaultValue={defaultValue} asChild>
          <button
            className={` flex items-center gap-2 rounded text-sm font-medium focus:outline-hidden ${colorText} ${
              isPending && 'pointer-events-none opacity-60'
            }`}
          >
            {label === 'ID' ? (
              <Image
                src='/svg/indonesia.svg'
                width={26.34}
                height={18}
                alt='id'
              />
            ) : (
              <Image
                src='/svg/united-states.svg'
                width={26.34}
                height={18}
                alt='en'
              />
            )}

            {label}
            <ChevronDown className={` h-4 w-4 ${colorText}`} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-32'>
          {items.map((lang) => (
            <DropdownMenuItem
              key={lang.value}
              onSelect={() => onChange(lang.value)}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
