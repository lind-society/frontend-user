import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

interface SuccessMessageProps {
  activityName: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ activityName }) => {
  const t = useTranslations('touristActivityDetail.success');
  const tDetail = useTranslations('touristActivityDetail');

  return (
    <div className='bg-gray-50 min-h-screen py-16'>
      <BaseContainer>
        <div className='flex flex-col items-center text-center gap-6'>
          <h1 className='text-2xl font-semibold text-primary'>
            {activityName} {tDetail('ticketRegistration')}
          </h1>
          <p className='text-2xl md:text-3xl font-medium text-green-600'>
            {t('title')}
          </p>
          <Button asChild className='mt-4 bg-primary text-white'>
            <Link href='/tourist-activity'>{t('return')}</Link>
          </Button>
        </div>
      </BaseContainer>
    </div>
  );
};

export default SuccessMessage;
