import { Check, X } from 'lucide-react';
import React from 'react';
import { FaCrown, FaRegStar, FaStar } from 'react-icons/fa';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Feature data type
interface FeatureItem {
  name: string;
  online: boolean;
  full: boolean;
  premium: boolean;
  highlight?: boolean;
}

const PackageManageProperty = () => {
  // Features data with availability for each package
  const features: FeatureItem[] = [
    {
      name: 'Listing properti di platform',
      online: true,
      full: true,
      premium: true,
    },
    {
      name: 'Manajemen booking & kalender',
      online: true,
      full: true,
      premium: true,
    },
    {
      name: 'Dukungan pelanggan 24/7',
      online: false,
      full: true,
      premium: true,
      highlight: true,
    },
    {
      name: 'Laporan bulanan performa properti',
      online: true,
      full: true,
      premium: true,
    },
    {
      name: 'Optimasi harga dinamis (dynamic pricing)',
      online: false,
      full: true,
      premium: true,
    },
    {
      name: 'Pemasaran & promosi properti',
      online: true,
      full: true,
      premium: true,
    },
    {
      name: 'Manajemen tim & staf kebersihan',
      online: false,
      full: true,
      premium: true,
    },
    {
      name: 'Manajemen tamu VIP',
      online: false,
      full: false,
      premium: true,
      highlight: true,
    },
    {
      name: 'Fotografi & videografi profesional',
      online: false,
      full: false,
      premium: true,
    },
    {
      name: 'Layanan concierge & pengalaman tamu',
      online: false,
      full: false,
      premium: true,
    },
  ];

  return (
    <div className='py-8 md:py-12 lg:py-[64px]'>
      <BaseContainer>
        <>
          {/* Header section */}
          <div className='mb-8 md:mb-12 lg:mb-16 text-center'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4'>
              The Perfect Package Just for You!
            </h2>
            <p className='text-text text-base md:text-lg max-w-3xl mx-auto'>
              We help you manage your property with the best price at LIND
              Society, offering tailored solutions for every property owner's
              needs.
            </p>
          </div>

          {/* Package cards - Desktop & Tablet */}
          <div className='hidden sm:grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16'>
            {/* Package info column */}
            <div className='col-span-1 flex justify-end flex-col gap-8 pt-[100px]'>
              <div className='text-text font-medium'>
                <span className='text-lg md:text-xl'>Select your</span>
                <h3 className='text-2xl md:text-3xl font-bold text-primary mt-1'>
                  Management Package
                </h3>
              </div>
            </div>

            {/* Online Marketing Package */}
            <div className='col-span-1 border border-primary rounded-lg flex flex-col'>
              <div className='p-6 flex flex-col gap-3 flex-grow'>
                <div className='flex items-center gap-2 mb-2'>
                  <FaRegStar className='text-primary text-2xl' />
                  <span className='text-text font-bold text-xl md:text-2xl'>
                    Online Marketing
                  </span>
                </div>
                <span className='text-primary font-bold text-xl md:text-2xl mb-1'>
                  8%
                </span>
                <span className='text-sm text-text'>of rental revenue</span>
                <p className='text-text text-sm mt-4 flex-grow'>
                  Ideal for owners who manage their property personally but want
                  enhanced online presence and booking management.
                </p>
              </div>
              <Separator />
              <div className='p-6'>
                <Button variant='primary' className='w-full'>
                  Choose Package
                </Button>
              </div>
            </div>

            {/* Full Management Package */}
            <div className='col-span-1 border-2 border-primary rounded-lg flex flex-col relative shadow-lg'>
              <div className='absolute -top-3 left-0 right-0 flex justify-center'>
                <span className='bg-primary text-white text-xs font-bold px-4 py-1 rounded-full'>
                  Most Popular
                </span>
              </div>
              <div className='p-6 bg-primary text-white flex flex-col gap-3 flex-grow'>
                <div className='flex items-center gap-2 mb-2'>
                  <FaStar className='text-white text-2xl' />
                  <span className='font-bold text-xl md:text-2xl'>
                    Full Management
                  </span>
                </div>
                <span className='font-bold text-xl md:text-2xl mb-1'>15%</span>
                <span className='text-sm'>of rental revenue</span>
                <p className='text-sm mt-4 flex-grow'>
                  Complete management solution including guest communications,
                  maintenance, cleaning, and optimization of your property.
                </p>
              </div>
              <Separator className='bg-white/20' />
              <div className='p-6 bg-primary'>
                <Button
                  variant='outline'
                  className='w-full bg-white text-primary hover:bg-white/90'
                >
                  Choose Package
                </Button>
              </div>
            </div>

            {/* Premium Management Package */}
            <div className='col-span-1 border border-primary rounded-lg flex flex-col bg-tertiary'>
              <div className='p-6 flex flex-col gap-3 flex-grow'>
                <div className='flex items-center gap-2 mb-2'>
                  <FaCrown className='text-primary text-2xl' />
                  <span className='text-text font-bold text-xl md:text-2xl'>
                    Premium Management
                  </span>
                </div>
                <span className='text-primary font-bold text-xl md:text-2xl mb-1'>
                  20%
                </span>
                <span className='text-sm text-text'>of rental revenue</span>
                <p className='text-text text-sm mt-4 flex-grow'>
                  Ultimate VIP service with dedicated staff, premium marketing,
                  professional photography, and personalized concierge services.
                </p>
              </div>
              <Separator />
              <div className='p-6'>
                <Button variant='primary-outline' className='w-full'>
                  Choose Package
                </Button>
              </div>
            </div>
          </div>

          {/* Package cards - Mobile only */}
          <div className='sm:hidden space-y-6 mb-12'>
            {/* Online Marketing Package */}
            <div className='border border-primary rounded-lg overflow-hidden'>
              <div className='p-5 flex flex-col gap-3'>
                <div className='flex items-center gap-2 mb-1'>
                  <FaRegStar className='text-primary text-xl' />
                  <span className='text-text font-bold text-xl'>
                    Online Marketing
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <span className='text-primary font-bold text-xl'>8%</span>
                    <span className='text-xs text-text ml-1'>
                      of rental revenue
                    </span>
                  </div>
                  <Button variant='primary' size='sm'>
                    Choose
                  </Button>
                </div>
                <Separator className='my-2' />
                <p className='text-text text-sm'>
                  Ideal for owners who manage their property personally but want
                  enhanced online presence.
                </p>
              </div>
            </div>

            {/* Full Management Package */}
            <div className='border-2 border-primary rounded-lg  relative shadow-md'>
              <div className='absolute -top-3 left-0 right-0 flex justify-center'>
                <span className='bg-primary text-white text-xs font-bold px-4 py-1 rounded-full'>
                  Most Popular
                </span>
              </div>
              <div className='p-5 flex flex-col gap-3 bg-primary text-white'>
                <div className='flex items-center gap-2 mb-1'>
                  <FaStar className='text-white text-xl' />
                  <span className='font-bold text-xl'>Full Management</span>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <span className='font-bold text-xl'>15%</span>
                    <span className='text-xs ml-1'>of rental revenue</span>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-white text-primary hover:bg-white/90'
                  >
                    Choose
                  </Button>
                </div>
                <Separator className='my-2 bg-white/20' />
                <p className='text-sm'>
                  Complete management solution including guest communications
                  and maintenance.
                </p>
              </div>
            </div>

            {/* Premium Management Package */}
            <div className='border border-primary rounded-lg overflow-hidden bg-tertiary'>
              <div className='p-5 flex flex-col gap-3'>
                <div className='flex items-center gap-2 mb-1'>
                  <FaCrown className='text-primary text-xl' />
                  <span className='text-text font-bold text-xl'>
                    Premium Management
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <span className='text-primary font-bold text-xl'>20%</span>
                    <span className='text-xs text-text ml-1'>
                      of rental revenue
                    </span>
                  </div>
                  <Button variant='primary-outline' size='sm'>
                    Choose
                  </Button>
                </div>
                <Separator className='my-2' />
                <p className='text-text text-sm'>
                  Ultimate VIP service with dedicated staff and premium
                  marketing.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison table heading */}
          <div className='text-center mb-8 md:mb-10'>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-primary'>
              Compare Plans
            </h3>
            <p className='text-text mt-2'>
              Detailed feature comparison of all our management packages
            </p>
          </div>

          {/* Comparison table - Desktop & Tablet */}
          <div className='hidden sm:block overflow-hidden rounded-lg border border-gray-200 mb-8'>
            {/* Table header */}
            <div className='grid grid-cols-4 bg-gray-50 border-b'>
              <div className='col-span-1 p-4 md:p-5 font-semibold text-text'>
                Features
              </div>
              <div className='col-span-1 p-4 md:p-5 text-center font-semibold text-primary'>
                Online Marketing
              </div>
              <div className='col-span-1 p-4 md:p-5 text-center font-semibold text-primary'>
                Full Management
              </div>
              <div className='col-span-1 p-4 md:p-5 text-center font-semibold text-primary'>
                Premium Management
              </div>
            </div>

            {/* Table rows */}
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 border-b last:border-b-0 ${
                  feature.highlight ? 'bg-tertiary/30' : ''
                }`}
              >
                <div className='col-span-1 p-4 md:p-5 flex items-center text-text'>
                  {feature.name}
                  {feature.highlight && (
                    <span className='ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded'>
                      Popular
                    </span>
                  )}
                </div>
                <div className='col-span-1 p-4 md:p-5 flex justify-center items-center'>
                  {feature.online ? (
                    <Check className='text-green-500 h-5 w-5' />
                  ) : (
                    <X className='text-gray-300 h-5 w-5' />
                  )}
                </div>
                <div className='col-span-1 p-4 md:p-5 flex justify-center items-center'>
                  {feature.full ? (
                    <Check className='text-green-500 h-5 w-5' />
                  ) : (
                    <X className='text-gray-300 h-5 w-5' />
                  )}
                </div>
                <div className='col-span-1 p-4 md:p-5 flex justify-center items-center'>
                  {feature.premium ? (
                    <Check className='text-green-500 h-5 w-5' />
                  ) : (
                    <X className='text-gray-300 h-5 w-5' />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table - Mobile only */}
          <div className='sm:hidden space-y-6'>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden ${
                  feature.highlight
                    ? 'border-primary/50 bg-tertiary/30'
                    : 'border-gray-200'
                }`}
              >
                <div className='p-4 flex items-center justify-between border-b'>
                  <div className='flex items-center'>
                    <span className='font-medium text-text'>
                      {feature.name}
                    </span>
                    {feature.highlight && (
                      <span className='ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded'>
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <div className='grid grid-cols-3 divide-x'>
                  <div className='p-3 flex flex-col items-center gap-1'>
                    <span className='text-xs text-text'>Online</span>
                    {feature.online ? (
                      <Check className='text-green-500 h-5 w-5' />
                    ) : (
                      <X className='text-gray-300 h-5 w-5' />
                    )}
                  </div>
                  <div className='p-3 flex flex-col items-center gap-1'>
                    <span className='text-xs text-text'>Full</span>
                    {feature.full ? (
                      <Check className='text-green-500 h-5 w-5' />
                    ) : (
                      <X className='text-gray-300 h-5 w-5' />
                    )}
                  </div>
                  <div className='p-3 flex flex-col items-center gap-1'>
                    <span className='text-xs text-text'>Premium</span>
                    {feature.premium ? (
                      <Check className='text-green-500 h-5 w-5' />
                    ) : (
                      <X className='text-gray-300 h-5 w-5' />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </BaseContainer>
    </div>
  );
};

export default PackageManageProperty;
