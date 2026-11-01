import * as React from 'react';
import { Outlet } from 'react-router';

import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';

export default function MainLayout() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
