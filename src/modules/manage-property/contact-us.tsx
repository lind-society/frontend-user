import Link from 'next/link';
import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

const ContactUsManageProperty = () => {
  return (
    <div className='bg-primary py-[64px]'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            <h4 className='text-bg'>
              Ready to Optimize Your Property or Find a Luxury Home?
            </h4>
            <span className='text-lg text-bg'>
              With complete property solutions and a premium staying experience,
              we are ready to help you. Contact us now for a free consultation
              or find your dream property!
            </span>
          </div>
          <Button
            variant='outline'
            className='bg-white flex items-center gap-2 w-fit'
            asChild
          >
            <Link href='/contact-us' className='flex gap-2 items-center'>
              <span>Contact Us</span>
              <RiArrowRightUpLine size={20} />
            </Link>
          </Button>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContactUsManageProperty;
