import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

type TitleSectionProps = {
  title: string;
  subTitle?: string;
  isCarousel?: boolean;
  link?: string;
  description?: string;
  isDepthAlign?: boolean;
};

const TitleSection = ({
  title,
  subTitle,
  link,
  description,
  isDepthAlign = true,
}: TitleSectionProps) => {
  const t = useTranslations('HomePage');

  return (
    <div
      className={`flex sm:flex-row flex-col gap-y-4 justify-between ${
        description && 'items-start sm:items-end'
      } ${isDepthAlign ? 'xl:px-9' : ''} `}
    >
      <div className={`flex flex-col gap-[18px] text-start `}>
        <h5 className='text-gray-900 font-semibold'>{title}</h5>
        {subTitle && <p className='text-gray-600 text-xl'>{subTitle}</p>}
      </div>
      {link && (
        <Button
          className='rounded-full'
          variant='primary-red'
          size='default'
          asChild
        >
          <Link href={link}>
            <span>{t('discover-section.cta')}</span>
          </Link>
        </Button>
      )}
      {description && (
        <p className='text-xl text-gray-custom-600 font-medium'>
          {description}
        </p>
      )}
    </div>
  );
};

export default TitleSection;
