import { redirect } from 'next/navigation';
import * as React from 'react';

import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';

import { auth } from '@/auth';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/signin');
  }

  return (
    <main>
      <Navbar session={session} />
      {children}
      <Footer />
    </main>
  );
}
