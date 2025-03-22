import { LucideParkingSquare } from 'lucide-react';
import React from 'react';
import {
  FaCalendar,
  FaRulerCombined,
  FaTree,
  FaWaterLadder,
} from 'react-icons/fa6';
import { GiMoneyStack } from 'react-icons/gi';
import { IoCalendarNumber, IoHome, IoKey } from 'react-icons/io5';
import { MdConstruction } from 'react-icons/md';

// Villa data with buy-specific features
export const villaDataBuy = {
  name: 'Uma Santai Villa',
  location: 'Canggu',
  availableRentTypes: ['Leasehold', 'Ownership'],
  rating: 4.8,
  reviewCount: 10,
  features: [
    {
      id: 'ownership',
      icon: <IoKey size={24} className='text-primary' />,
      value: 'Leasehold',
      label: 'Ownership',
    },
    {
      id: 'villaSize',
      icon: <FaRulerCombined size={20} className='text-primary' />,
      value: '450 m²',
      label: 'Villa size',
    },
    {
      id: 'landSize',
      icon: <FaTree size={20} className='text-primary' />,
      value: '1000 m²',
      label: 'Land size',
    },
    {
      id: 'productionStatus',
      icon: <MdConstruction size={20} className='text-primary' />,
      value: 'Completed',
      label: 'Production status',
    },
    {
      id: 'yearBuilt',
      icon: <IoCalendarNumber size={20} className='text-primary' />,
      value: '2021',
      label: 'Year built',
    },
    {
      id: 'lease',
      icon: <FaCalendar size={20} className='text-primary' />,
      value: '25 years',
      label: 'Lease',
    },
    {
      id: 'pricePerSqm',
      icon: <GiMoneyStack size={20} className='text-primary' />,
      value: 'IDR 33,147,710',
      label: 'Price/Sqm',
    },
    {
      id: 'levels',
      icon: <IoHome size={20} className='text-primary' />,
      value: '2',
      label: 'Levels',
    },
    {
      id: 'pool',
      icon: <FaWaterLadder size={20} className='text-primary' />,
      value: 'Private',
      label: 'Pool',
    },
    {
      id: 'parking',
      icon: <LucideParkingSquare size={20} className='text-primary' />,
      value: 'Private',
      label: 'Parking',
    },
  ],
  highlights: [
    'The beautiful Uma Santai Villa is set in the background of the Kerobokan paddy fields swaying in the tropical wind. Its location offers the guests a private luxurious escape from the bustling crowd of Seminyak without being too far away. In fact, popular attractions like Batubelig Beach, Seminyak and Canggu can all be reached within 10 minutes by car.',
    'The villa has eight bedrooms and can accommodate as many as twenty people. With its alang-alang thatch and joglo-type structure, Villa Mannao is traditionally Balinese in its appeal. Its open living spaces, soaring columns, garden showers, infinity pools and luxurious bedrooms, the villa is an ideal getaway for large groups who want to enjoy an exclusive vacation in the heart of Bali. The furnishings made of distressed wood have a very chic and contemporary appeal.',
  ],
  highlightBullets: [
    'Fantastic location, walking distance to Canggu hotspots',
    'Beautiful architecture by Design Assembly',
    'Sleek infinity pool with a swim-up bar',
    'Wellness haven with a yoga deck and indoor gym',
    'Rooftop Cinema: Large lawn with an outdoor projector',
    'High-ceiling sunken lounge and stylish dining room',
  ],
  bookingInfo: {
    price: 14500000000,
    currency: 'IDR',
    nightsMinimum: 2,
    maxGuests: 8,
  },
};
