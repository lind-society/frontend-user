import * as React from 'react';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
