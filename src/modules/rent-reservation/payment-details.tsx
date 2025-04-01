import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

import BaseContainer from '@/components/layouts/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const PaymentDetails = () => {
  return (
    <BaseContainer>
      <div className='flex flex-col lg:flex-row justify-between bg-white py-8 md:py-12 px-5 md:px-10 lg:px-16 rounded-lg shadow-md gap-6'>
        {/* Left Column - Additional Services */}
        <div className='py-4 flex-1 flex flex-col gap-5'>
          <h3 className='text-xl md:text-2xl font-semibold text-primary'>
            Payment Details
          </h3>
          <p className='text-primary font-semibold'>Payment Completed</p>
          <div className='grid grid-cols-2 gap-6'>
            <Button
              variant='primary-outline'
              className='flex justify-start items-center gap-2 col-span-1'
            >
              <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
                {/* icon */}
              </div>
              <span className='text-sm text-primary font-semibold'>
                ID Transaksi : #TRX202502054321
              </span>
            </Button>
            <Button
              variant='primary-outline'
              className='flex justify-start items-center gap-2 col-span-1'
            >
              <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
                {/* icon */}
              </div>
              <span className='text-sm text-primary font-semibold'>
                February 5, 2025
              </span>
            </Button>
            <Button
              variant='primary-outline'
              className='flex justify-start items-center gap-2 col-span-2'
            >
              <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
                {/* icon */}
              </div>
              <span className='text-sm text-primary font-semibold'>
                Paid via Virtual Account (BCA)
              </span>
            </Button>
          </div>
          <span className='text-xl text-primary font-bold'>Next Step</span>
          <span className='text-lg'>
            📩 Confirmation Email Sent: Please check your inbox for the
            confirmation details.
          </span>
          <span className='text-lg'>
            📲 WhatsApp Notification: You will receive check-in instructions via
            WhatsApp from +62 9 915 7438.
          </span>
          <span className='text-lg'>
            🏡 Check-in Instructions: Detailed information on villa access and
            services will be sent 24 hours before arrival.
          </span>
          <span className='text-xl text-primary font-bold'>
            Security Notice
          </span>
          <span className='text-lg'>
            Our official payment link is only sent via WhatsApp from +62 9 915
            7438. If you receive a payment request from another source, please
            ignore it and contact us immediately.
          </span>
        </div>
        <div className='w-full h-fit lg:w-[340px] border shadow-md'>
          <div className='bg-primary text-white flex flex-col gap-1 px-6 py-3'>
            <span className='text-lg md:text-xl font-semibold'>Help</span>
          </div>
          <div className='p-4 md:p-6 flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
              <div className='relative w-12 h-12 flex-shrink-0'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold text-primary'>
                  Samuel J.
                </span>
                <span className='text-text text-sm'>
                  Villa Customer Service for Bali
                </span>
              </div>
            </div>

            <Button
              variant='primary-outline'
              className='flex items-center gap-2'
            >
              <FaWhatsapp className='text-primary' size={18} />
              <span className='text-primary font-semibold text-sm md:text-base'>
                +62 361 123 4567
              </span>
            </Button>

            <Button
              variant='primary-outline'
              className='flex items-center gap-2'
            >
              <MdEmail className='text-primary' size={18} />
              <span className='text-primary font-semibold text-sm md:text-base'>
                support@lindvillas.com
              </span>
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default PaymentDetails;
