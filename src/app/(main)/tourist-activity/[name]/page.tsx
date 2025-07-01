'use client';

import { Calendar, Clock, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const galleryImages = [
  '/images/tourist-1.jpeg',
  '/images/tourist-2.jpeg',
  '/images/tourist-3.jpeg',
  '/images/activity-1.jpeg',
  '/images/activity-2.jpeg',
];

export default function TouristActivityDetailPage() {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <BaseContainer>
        <>
          {/* Breadcrumbs */}
          <nav className='text-xs text-gray-500 py-4 flex flex-wrap gap-1'>
            <Link href='/tourist-activity' className='hover:underline'>
              Home
            </Link>
            <span>/</span>
            <Link href='/tourist-activity' className='hover:underline'>
              Tour Activity
            </Link>
            <span>/</span>
            <Link href='#' className='hover:underline'>
              Culture
            </Link>
            <span>/</span>
            <Link href='#' className='hover:underline'>
              Indonesia
            </Link>
            <span>/</span>
            <Link href='#' className='hover:underline'>
              Bali
            </Link>
            <span>/</span>
            <Link href='#' className='hover:underline'>
              Badung
            </Link>
            <span>/</span>
            <span className='text-primary font-semibold'>
              Tari Kecak dan Tari Api di Pura Uluwatu
            </span>
          </nav>

          <div className='flex flex-col lg:flex-row gap-8'>
            {/* Left: Main Content */}
            <div className='flex-1 min-w-0'>
              {/* Gallery */}
              <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
                <div className='md:col-span-3'>
                  <Image
                    src={selectedImage}
                    alt='Main Activity'
                    width={800}
                    height={400}
                    className='rounded-lg w-full h-[320px] object-cover'
                    priority
                  />
                </div>
                <div className='md:col-span-2 grid grid-cols-3 md:grid-cols-2 gap-2'>
                  {galleryImages.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setSelectedImage(img)}
                      className={`border rounded-lg overflow-hidden focus:outline-none ${
                        selectedImage === img
                          ? 'border-primary'
                          : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        width={120}
                        height={80}
                        className='object-cover w-full h-20'
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Info */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2'>
                <h1 className='text-2xl font-bold text-gray-900'>
                  Tari Kecak dan Tari Api di Pura Uluwatu
                </h1>
                <div className='flex items-center gap-2'>
                  <Badge className='bg-green-100 text-green-800'>
                    Pura Uluwatu / View on map!
                  </Badge>
                  <span className='flex items-center gap-1 text-xs text-gray-500'>
                    <Clock className='w-4 h-4' /> Buka | Sel, 17:00-18:00
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-4 mb-4'>
                <span className='text-sm text-red-600 font-semibold'>
                  25 Tickets left
                </span>
              </div>

              {/* Tabs */}
              <div className='border-b border-gray-200 mb-4'>
                <nav className='flex gap-6'>
                  <button className='py-2 px-1 border-b-2 border-primary text-primary font-semibold'>
                    Description
                  </button>
                  <button className='py-2 px-1 text-gray-500'>Ticket</button>
                  <button className='py-2 px-1 text-gray-500'>
                    Open Schedule
                  </button>
                  <button className='py-2 px-1 text-gray-500'>
                    Location & Map
                  </button>
                </nav>
              </div>

              {/* Description */}
              <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-2'>Description</h2>
                <p className='text-gray-700 mb-2'>
                  A trip to Bali would be complete without a visit to Uluwatu
                  Temple, where you can catch the mesmerizing Kecak and Fire
                  Dance. This epic performance will leave you in awe as you
                  experience Bali's vibrant and colorful culture up close.
                </p>
                <ul className='list-disc pl-5 text-gray-700 space-y-1'>
                  <li>
                    Watch the legendary Kecak and Fire Dance live at Uluwatu
                    Temple
                  </li>
                  <li>
                    Enjoy the view of the Ramayana, performed with the
                    breathtaking sunset as the backdrop—truly spectacular
                  </li>
                  <li>
                    Feel the excitement of being part of the performance by
                    chanting "chak-chak" along with the dancers and the crowd
                  </li>
                  <li>
                    Don't forget to snap some photos—capture the beautiful
                    temple and dancers, perfect for your social media feed!
                  </li>
                </ul>
              </div>

              {/* Ticket */}
              <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-2'>Ticket</h2>
                <div className='flex flex-col md:flex-row md:items-center gap-4'>
                  <div className='flex gap-2 items-center'>
                    <Ticket className='w-5 h-5 text-primary' />
                    <span className='font-medium'>Entrance Ticket</span>
                    <Badge className='bg-gray-100 text-gray-700'>
                      See details
                    </Badge>
                  </div>
                  <div className='flex-1 flex gap-2 items-center justify-between md:justify-end'>
                    <span className='text-lg font-bold text-primary'>
                      IDR 135,000
                      <span className='text-sm font-normal text-gray-500'>
                        /pax
                      </span>
                    </span>
                    <span className='line-through text-gray-400 text-sm'>
                      IDR 150,000
                    </span>
                    <Badge className='bg-green-100 text-green-800'>-10%</Badge>
                    <Button className='bg-primary text-white'>
                      Get Ticket
                    </Button>
                  </div>
                </div>
              </div>

              {/* Open Schedule */}
              <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-2'>
                  Open Schedule (Local Time)
                </h2>
                <div className='flex gap-8'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-primary' />
                    <span>Opening Hour: 09:00 am</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-primary' />
                    <span>Closing Hour: 09:00 pm</span>
                  </div>
                </div>
              </div>

              {/* Location & Map */}
              <div className='mb-6'>
                <h2 className='text-lg font-semibold mb-2'>Location & Map</h2>
                <div className='mb-2 text-gray-700'>
                  Location: Uluwatu Temple, Bali, Indonesia. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Etiam eu turpis
                  molestie, dictum est a, mattis tellus.
                </div>
                <div className='w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center'>
                  <span className='text-gray-500'>[Map Placeholder]</span>
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <aside className='w-full lg:w-80 flex-shrink-0'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
                <div className='text-sm text-gray-500 mb-1'>Start from</div>
                <div className='text-2xl font-bold text-primary mb-1'>
                  IDR 135,000
                  <span className='text-base font-normal text-gray-500'>
                    /pax
                  </span>
                </div>
                <div className='text-sm text-gray-400 line-through mb-2'>
                  IDR 150,000
                </div>
                <Button className='w-full bg-primary text-white mb-2'>
                  Find Your Ticket!
                </Button>
              </div>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
                <div className='font-semibold mb-2'>More Activity</div>
                <div className='flex gap-3 items-center mb-2'>
                  <Image
                    src='/images/tourist-3.jpeg'
                    alt='Tari Kecak'
                    width={60}
                    height={40}
                    className='rounded-md object-cover'
                  />
                  <div>
                    <div className='text-sm font-medium'>Tari Kecak</div>
                    <div className='text-xs text-gray-500'>7 pictures</div>
                  </div>
                </div>
                <Button variant='outline' className='w-full text-xs'>
                  View More
                </Button>
              </div>
            </aside>
          </div>
        </>
      </BaseContainer>
    </div>
  );
}
