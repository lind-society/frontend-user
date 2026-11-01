import * as React from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Toaster } from 'sonner';

import Provider from '@/components/layouts/provider';
import RouteProgress from '@/components/layouts/route-progress';

export default function RootLayout() {
  return (
    <Provider>
      <RouteProgress />
      <Outlet />
      <Toaster position='top-right' richColors closeButton />
      <ScrollRestoration />
    </Provider>
  );
}
