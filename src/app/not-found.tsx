import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default async function NotFound() {
  return (
    <main>
      <Navbar />
      <section className='bg-white'>
        <div className='layout flex min-h-[calc(100vh-90px)] flex-col items-center justify-center text-center text-black'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
          <Link href='/'>Back to home</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
