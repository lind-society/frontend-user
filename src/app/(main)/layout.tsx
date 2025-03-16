import * as React from 'react';

import Navbar from '@/components/layouts/navbar';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
