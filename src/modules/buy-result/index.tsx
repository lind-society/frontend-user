import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';

import HeaderBuyResult from '@/modules/buy-result/header';
import BuyResultDisplay from '@/modules/buy-result/result';

const BuyResultModules = () => {
  const t = useTranslations('buyResult.breadcrumb');

  return (
    <div>
      <h1 className='sr-only'>{t('searchResults')}</h1>
      <Suspense fallback={null}>
        <HeaderBuyResult />
        <BuyResultDisplay />
      </Suspense>
    </div>
  );
};

export default BuyResultModules;
