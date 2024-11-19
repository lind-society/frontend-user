import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default async function NotFound() {
  return <main className='flex flex-col'></main>;
}
