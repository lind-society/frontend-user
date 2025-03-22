'use client';

import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { PiStarFill } from 'react-icons/pi';

import BaseContainer from '@/components/layouts/container';
import { Badge } from '@/components/ui/badge';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  villaData,
  villaLocations,
  villaServices,
} from '@/modules/rent-detail/constant';
import { FeatureCard } from '@/modules/rent-detail/feature-card';
import { PaymentTermItem } from '@/modules/rent-detail/payment-term';
import SendInquiryForm from '@/modules/rent-detail/send-inquiry-form';

const ContentRentDetail = () => {
  // Extract villa details for the inquiry form
  const villaDetails = {
    name: villaData.name,
    availableRentTypes: villaData.availableRentTypes,
    bedrooms: Number(
      villaData.features.find((f) => f.id === 'bedrooms')?.value || 0
    ),
    bathrooms: Number(
      villaData.features.find((f) => f.id === 'bathrooms')?.value || 0
    ),
    maxPersons: Number(
      villaData.features.find((f) => f.id === 'maxPersons')?.value || 0
    ),
    bookingInfo: villaData.bookingInfo,
  };

  return (
    <div className='py-[32px]'>
      <BaseContainer>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-[32px]'>
          {/* Main content column */}
          <div className='flex-1 flex flex-col gap-4 order-2 lg:order-1'>
            {/* Breadcrumb */}
            <BreadcrumbLayout
              items={[
                { label: 'Home', href: '/' },
                { label: 'Home & Villas', href: '/rent' },
                { label: 'Rent', href: '/rent/bali' },
                { label: 'Bali', href: '/rent/bali' },
                { label: 'Canggu', href: '/rent/bali' },
                {
                  label: villaData.name,
                  href: '/rent/bali/villa-serenity',
                  isActive: true,
                },
              ]}
            />

            {/* Villa Header */}
            <div className='px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between bg-white rounded-md border gap-4 sm:gap-0'>
              <div className='flex flex-col gap-3'>
                <h4 className='text-xl sm:text-2xl font-semibold text-primary'>
                  {villaData.name}
                </h4>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm text-text'>Available for rent</span>
                  <div className='flex gap-3 items-center'>
                    {villaData.availableRentTypes.map((type, index) => (
                      <Badge
                        key={type}
                        className={`bg-primary/${80 + index * 10} text-white`}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-start sm:items-end'>
                <Button variant='primary' className='flex gap-2 items-center'>
                  <GrMapLocation size={18} />
                  <span>{villaData.location} (View on map)</span>
                </Button>
                <div className='flex gap-3 items-center'>
                  <h4 className='text-primary text-xl font-semibold'>
                    {villaData.rating}
                  </h4>
                  <div className='flex flex-col'>
                    <span className='text-text text-sm'>Overall on</span>
                    <span className='text-primary font-semibold'>
                      {villaData.reviewCount} reviews
                    </span>
                  </div>
                  <div className='flex gap-1'>
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <PiStarFill
                          key={index}
                          size={16}
                          className='text-primary'
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className='px-4 sm:px-6 py-4 flex flex-col gap-4 bg-white rounded-md border'>
              <span className='text-xl text-primary font-semibold'>
                Key Features
              </span>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
                {villaData.features.map((feature) => (
                  <FeatureCard key={feature.id} feature={feature} />
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className='px-4 sm:px-6 py-4 flex flex-col gap-4 bg-white rounded-md border text-sm'>
              <span className='text-xl text-primary font-semibold'>
                Highlights
              </span>
              {villaData.highlights.map((paragraph, index) => (
                <span key={index} className='text-text'>
                  {paragraph}
                </span>
              ))}
              <ul className='list-disc pl-5 space-y-1 text-gray-600'>
                {villaData.highlightBullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Villa Policies */}
            <div className='px-4 sm:px-6 py-4 flex flex-col gap-4 bg-white rounded-md border'>
              <span className='text-xl text-primary font-semibold'>
                Villa Policies
              </span>
              <span className='text-primary font-semibold'>House Rules</span>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {villaData.houseRules.map((rule, index) => (
                  <div
                    key={index}
                    className='flex gap-2 p-2.5 border rounded-lg'
                  >
                    <span className='text-primary'>{rule.icon}</span>
                    <span className='text-sm text-primary font-semibold'>
                      {rule.text}
                    </span>
                  </div>
                ))}
              </div>

              {villaData.specialNotes.map((note, index) => (
                <div
                  key={index}
                  className='w-full flex items-start gap-2 p-2.5 border rounded-lg'
                >
                  <span className='text-primary flex-shrink-0 mt-0.5'>
                    {note.icon}
                  </span>
                  <span className='text-sm text-primary font-semibold'>
                    {note.text}
                  </span>
                </div>
              ))}

              <span className='text-primary font-semibold'>Payment Terms</span>

              {villaData.paymentTerms.map((term, index) => (
                <PaymentTermItem key={index} number={index + 1} text={term} />
              ))}
            </div>
            <div className='px-4 sm:px-6 py-4 flex flex-col gap-5 bg-white rounded-md border'>
              <div className='flex justify-between'>
                <span className='text-xl text-primary font-semibold'>
                  Reviews
                </span>
                <div className='flex gap-3 items-center'>
                  <h4 className='text-primary text-xl font-semibold'>
                    {villaData.rating}
                  </h4>
                  <div className='flex flex-col'>
                    <span className='text-text text-sm'>Overall on</span>
                    <span className='text-primary font-semibold'>
                      {villaData.reviewCount} reviews
                    </span>
                  </div>
                  <div className='flex gap-1'>
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <PiStarFill
                          key={index}
                          size={16}
                          className='text-primary'
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className='p-6 flex flex-col gap-6 rounded-lg border'>
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                    <span className='text-primary text-lg font-semibold'>
                      Vicker
                    </span>
                    <span className='text-text font-semibold'>
                      Stayed at Villa Sepalika with a group of friends and their
                      families
                    </span>
                    <span className='text-text'>
                      From 09th December 2017 to 15th December 2017
                    </span>
                  </div>
                  <div className='flex flex-col items-end'>
                    <span className='text-text text-2xl font-semibold'>
                      5.0
                    </span>
                    <span className='text-text'>Singapore</span>
                    <div className='flex gap-1'>
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <PiStarFill
                            key={index}
                            size={16}
                            className='text-primary'
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <Separator />
                <span className='text-text'>
                  "Great location near Seminyak's hotspots. The villa was clean,
                  modern, and very comfortable. Perfect for a family vacation!"
                </span>
              </div>
              <div className='p-6 flex flex-col gap-6 rounded-lg border'>
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                    <span className='text-primary text-lg font-semibold'>
                      Vicker
                    </span>
                    <span className='text-text font-semibold'>
                      Stayed at Villa Sepalika with a group of friends and their
                      families
                    </span>
                    <span className='text-text'>
                      From 09th December 2017 to 15th December 2017
                    </span>
                  </div>
                  <div className='flex flex-col items-end'>
                    <span className='text-text text-2xl font-semibold'>
                      5.0
                    </span>
                    <span className='text-text'>Singapore</span>
                    <div className='flex gap-1'>
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <PiStarFill
                            key={index}
                            size={16}
                            className='text-primary'
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <Separator />
                <span className='text-text'>
                  "Great location near Seminyak's hotspots. The villa was clean,
                  modern, and very comfortable. Perfect for a family vacation!"
                </span>
              </div>
              <div className='flex justify-between w-full'>
                {/* pagination */}

                <Button
                  variant='link'
                  className='text-text text-sm font-medium p-0 flex gap-2'
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </Button>
                <span className='text-text font-semibold'>1</span>

                <Button
                  variant='link'
                  className='text-text text-sm font-medium p-0 flex gap-2'
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
            <div className='px-4 sm:px-6 py-4 flex flex-col gap-5 bg-white rounded-md border'>
              <span className='text-xl text-primary font-semibold'>
                Location & Map
              </span>
              <span className='text-primary text-lg font-semibold'>
                Location
              </span>
              <span className='text-text text-sm'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </span>
              <div className='w-full h-[300px] md:h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-4 border'>
                <div className="w-full h-full bg-[url('/images/map.png')] bg-cover bg-center opacity-80 relative">
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <Button variant='primary'>View full map</Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <span className='text-text font-semibold text-lg'>
                  Around the villa
                </span>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                  {/* First column - Nearby places */}
                  <div className='flex flex-col gap-3'>
                    {villaLocations.nearby.map((location, index) => (
                      <div
                        key={`nearby-${index}`}
                        className='flex justify-between'
                      >
                        <span className='text-sm text-text'>
                          {location.name}
                        </span>
                        <span className='text-sm text-text font-medium'>
                          {location.distance}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Second column - Further attractions */}
                  <div className='flex flex-col gap-3'>
                    {villaLocations.furtherAway.map((location, index) => (
                      <div
                        key={`far-${index}`}
                        className='flex justify-between'
                      >
                        <span className='text-sm text-text'>
                          {location.name}
                        </span>
                        <span className='text-sm text-text font-medium'>
                          {location.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 sm:px-6 py-4 flex flex-col gap-5 bg-white rounded-md border'>
              <span className='text-xl text-primary font-semibold'>
                Service & Features
              </span>
              {/* Replace the entire Service & Features grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8'>
                {/* Facilities */}
                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2 items-center'>
                    <span className='text-text text font-semibold'>
                      Facilities
                    </span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {villaServices.facilities.map((item, index) => (
                      <div
                        key={`facility-${index}`}
                        className='flex gap-2 items-center'
                      >
                        <Check size={16} className='text-primary' />
                        <span className='text-text text-sm'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2 items-center'>
                    <span className='text-text text font-semibold'>
                      Services
                    </span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {villaServices.services.map((item, index) => (
                      <div
                        key={`service-${index}`}
                        className='flex gap-2 items-center'
                      >
                        <Check size={16} className='text-primary' />
                        <span className='text-text text-sm'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entertainment */}
                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2 items-center'>
                    <span className='text-text text font-semibold'>
                      Entertainment
                    </span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {villaServices.entertainment.map((item, index) => (
                      <div
                        key={`entertainment-${index}`}
                        className='flex gap-2 items-center'
                      >
                        <Check size={16} className='text-primary' />
                        <span className='text-text text-sm'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meals */}
                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2 items-center'>
                    <span className='text-text text font-semibold'>Meals</span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {villaServices.meals.map((item, index) => (
                      <div
                        key={`meal-${index}`}
                        className='flex gap-2 items-center'
                      >
                        <Check size={16} className='text-primary' />
                        <span className='text-text text-sm'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transport */}
                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2 items-center'>
                    <span className='text-text text font-semibold'>
                      Transport
                    </span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {villaServices.transport.map((item, index) => (
                      <div
                        key={`transport-${index}`}
                        className='flex gap-2 items-center'
                      >
                        <Check size={16} className='text-primary' />
                        <span className='text-text text-sm'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kids */}
                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2 items-center'>
                    <span className='text-text text font-semibold'>Kids</span>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {villaServices.kids.map((item, index) => (
                      <div
                        key={`kid-${index}`}
                        className='flex gap-2 items-center'
                      >
                        <Check size={16} className='text-primary' />
                        <span className='text-text text-sm'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky inquiry form */}
          <div className='w-full lg:w-[350px] order-1 lg:order-2'>
            <SendInquiryForm villaDetails={villaDetails} />
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentRentDetail;
