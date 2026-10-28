'use client'; // Error components must be Client Components

import * as React from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className='bg-bone'>
        <div className='layout flex min-h-screen flex-col items-center justify-center gap-5 text-center'>
          <span className='eyebrow text-bronze-600'>Something went wrong</span>
          <h1 className='text-ink'>We hit an unexpected turn.</h1>
          <p className='max-w-md text-ink-soft'>
            Sorry about that. Try again, and if it keeps happening our concierge
            team is one message away.
          </p>
          <Button variant='primary' className='mt-2' onClick={reset}>
            Try again
          </Button>
        </div>
      </section>
    </main>
  );
}
