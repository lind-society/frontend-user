import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';

import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default async function NotFound() {
  return (
    <main>
      <Navbar />
      <section className='bg-bone'>
        <div className='layout flex min-h-[60vh] flex-col items-center justify-center gap-5 py-24 text-center'>
          <span className='eyebrow text-bronze-600'>Error 404</span>
          <p className='font-display text-[64px] leading-none text-bronze-600/35 md:text-[96px]'>
            404
          </p>
          <h1 className='text-ink'>This page has checked out.</h1>
          <p className='max-w-md text-ink-soft'>
            The page you are looking for has moved or never existed. Let us
            guide you back to somewhere beautiful.
          </p>
          <div className='mt-2 flex flex-wrap justify-center gap-3'>
            <Button variant='primary' asChild>
              <Link href='/'>Back to home</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/rent'>Browse stays</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
