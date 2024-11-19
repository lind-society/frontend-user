import { auth } from '@/auth';
import BaseContainer from '@/components/layouts/container';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { Button } from '@/components/ui/button';
import FollowSection from '@/modules/home-page/follow-section';
import SliderBannerPromo from '@/modules/promo/slider-banner-promo';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoChatbubbleOutline, IoChatbubblesOutline } from 'react-icons/io5';
import { RiAlarmWarningFill } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default async function NotFound() {
  const session = await auth();
  return (
    <main className='flex flex-col'>
      {/* <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
          <Link href='/'>Back to home</Link>
        </div>
      </section> */}
      <Navbar session={session} />
      <div
        className='py-[120px] relative'
        style={{
          background:
            'linear-gradient(270deg, rgba(250, 250, 250, 0) 0%, rgba(250, 250, 250, 0.88) 55.11%, #FAFAFA 90.34%)',
        }}
      >
        <BaseContainer>
          <>
            <Image
              src='/images/detail-product-1.jpeg'
              width={0}
              height={0}
              alt='detail-product'
              sizes='100vw'
              className='w-full h-full object-cover absolute top-0 left-0 -z-10'
            />
            <div className='flex flex-col gap-9 '>
              <div className='flex justify-between flex-col md:flex-row gap-6'>
                <h1 className='font-semibold text-gray-custom-800 order-2 md:order-1'>
                  Sorry, we cant find that page
                </h1>
                <h4 className='text-white font-semibold order-1 md:order-2 whitespace-nowrap'>
                  ERROR 404
                </h4>
              </div>
              <div className='flex flex-col gap-9 max-w-2xl'>
                <p className='text-2xl text-gray-custom-600'>
                  If you need assistance or have any questions, you can contact
                  via WhatsApp at 0812-3456-7890 or tap the button below.
                </p>
                <div className='flex items-center gap-6 flex-wrap'>
                  <Button
                    variant='primary'
                    className=' w-fit rounded-full px-6 animation-transition'
                    asChild
                  >
                    <Link href='/' className='flex items-center gap-2'>
                      <FaChevronLeft className='text-white text-2xl group-hover:text-primary-blue' />
                      <p>Back to Home</p>
                    </Link>
                  </Button>
                  <Button
                    variant='primary-outline'
                    className=' w-fit rounded-full px-6 animation-transition'
                    asChild
                  >
                    <Link href='/contact' className='flex items-center gap-2'>
                      <IoChatbubblesOutline className='text-primary-blue text-2xl group-hover:text-white' />
                      <p>Back to Home</p>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        </BaseContainer>
      </div>
      <SliderBannerPromo />
      <FollowSection bg='bg-custom-gray-50' />
      <Footer />
    </main>
  );
}
