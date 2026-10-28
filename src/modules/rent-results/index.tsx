import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';

import HeaderRentResult from '@/modules/rent-results/header';
import ResultRentContent from '@/modules/rent-results/result';

const RentResultModules = () => {
  const t = useTranslations('rentResults.breadcrumb');

  return (
    <div>
      <h1 className='sr-only'>{t('searchResults')}</h1>
      {/* Header and result both read the filter state from useSearchParams()
          — Next.js requires a Suspense boundary around that. */}
      <Suspense fallback={null}>
        <HeaderRentResult />
        <ResultRentContent />
      </Suspense>
    </div>
  );
};

export default RentResultModules;
