import { ChefHat } from 'lucide-react';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import {
  MdAirportShuttle,
  MdDirectionsCar,
  MdEmail,
  MdSecurity,
} from 'react-icons/md';

import BaseContainer from '@/components/layouts/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AdditionalService = () => {
  return (
    <BaseContainer>
      <div className='flex flex-col lg:flex-row justify-between bg-white py-8 md:py-12 px-5 md:px-10 lg:px-16 rounded-lg shadow-md gap-6'>
        {/* Left Column - Additional Services */}
        <div className='py-4 flex-1 flex flex-col gap-5'>
          <h3 className='text-xl md:text-2xl font-semibold text-primary'>
            Additional Services
          </h3>

          <div className='flex gap-4 flex-wrap'>
            <Button
              variant='outline'
              className='w-full sm:w-auto flex gap-2 items-center'
              size='sm'
            >
              <ChefHat className='text-primary' size={18} />
              <span className='text-primary font-semibold'>Private Chef</span>
            </Button>

            <Button
              variant='outline'
              className='w-full sm:w-auto flex gap-2 items-center'
              size='sm'
            >
              <MdAirportShuttle className='text-primary' size={18} />
              <span className='text-primary font-semibold'>
                Airport Transfer
              </span>
            </Button>

            <Button
              variant='outline'
              className='w-full sm:w-auto flex gap-2 items-center'
              size='sm'
            >
              <MdDirectionsCar className='text-primary' size={18} />
              <span className='text-primary font-semibold'>
                Luxury Car Rental
              </span>
            </Button>
          </div>

          {/* Mobile separator - only visible on mobile */}
          <Separator className='lg:hidden my-2' />

          <h3 className='text-xl md:text-2xl font-bold text-text'>
            Next Steps
          </h3>

          <p className='text-text text-base md:text-lg'>
            Our concierge will be in touch shortly to finalize your booking. For
            urgent assistance, contact us directly.
          </p>

          {/* Additional information section - visible only on mobile */}
          {/* <div className='lg:hidden flex flex-col gap-4 mt-2 bg-gray-50 p-4 rounded-lg'>
            <h4 className='text-lg font-semibold text-primary'>
              Important Information
            </h4>
            <ul className='text-text text-sm space-y-2'>
              <li className='flex gap-2'>
                <span className='text-primary flex-shrink-0'>•</span>
                <span>
                  You will receive a confirmation email within 24 hours.
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='text-primary flex-shrink-0'>•</span>
                <span>
                  A 50% deposit will be required to secure your booking.
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='text-primary flex-shrink-0'>•</span>
                <span>Free cancellation up to 7 days before arrival.</span>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Right Column - Contact Box */}
        <div className='w-full lg:w-[340px] border shadow-md'>
          <div className='bg-primary text-white flex flex-col gap-1 px-6 py-3'>
            <span className='text-sm md:text-base'>Send Inquiry or</span>
            <span className='text-xl md:text-2xl font-semibold'>
              Make it Yours
            </span>
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

            <div className='border p-3 flex flex-col gap-2.5 text-center mt-2'>
              <div className='flex items-center justify-center gap-2'>
                <MdSecurity className='text-primary' size={18} />
                <span className='font-bold text-primary'>Security Notice</span>
              </div>

              <span className='text-text font-medium text-sm md:text-base'>
                For your security, our official <strong>WhatsApp</strong>{' '}
                support will only contact you from the following number:
              </span>

              <span className='font-bold text-text'>+62 9 915 7438</span>

              <span className='text-text font-medium text-sm'>
                If you receive messages from any other number, please ignore
                them and report to us immediately. Beware of scams!
              </span>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default AdditionalService;
