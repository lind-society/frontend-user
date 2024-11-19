import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function IsiSurveyLoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main></main>
    </Suspense>
  );
}
