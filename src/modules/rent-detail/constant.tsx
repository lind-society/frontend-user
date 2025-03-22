import React from 'react';
import { FaExclamationCircle, FaWifi } from 'react-icons/fa';
import {
  FaBath,
  FaBed,
  FaCalendar,
  FaRulerCombined,
  FaTree,
  FaWaterLadder,
} from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import { IoAirplane, IoHome } from 'react-icons/io5';
import { LuHotel } from 'react-icons/lu';
import { MdCleaningServices } from 'react-icons/md';
import { RiGlobalFill } from 'react-icons/ri';

// Country codes for phone input
export const countryCodes = [
  { code: '+62', country: 'Indonesia' },
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' },
  { code: '+65', country: 'Singapore' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+66', country: 'Thailand' },
  { code: '+60', country: 'Malaysia' },
  { code: '+82', country: 'South Korea' },
  { code: '+64', country: 'New Zealand' },
];

// Villa data - In a real app, this would come from an API
export const villaData = {
  name: 'Uma Santai Villa',
  location: 'Canggu',
  availableRentTypes: ['Daily', 'Monthly', 'Yearly'],
  rating: 4.8,
  reviewCount: 10,
  features: [
    {
      id: 'maxPersons',
      icon: <HiUsers size={24} className='text-primary' />,
      value: '8',
      label: 'Max. persons',
    },
    {
      id: 'staff',
      icon: <LuHotel size={24} className='text-primary' />,
      value: '5',
      label: 'Staff',
    },
    {
      id: 'villaSize',
      icon: <FaRulerCombined size={20} className='text-primary' />,
      value: '450 m²',
      label: 'Villa size',
    },
    {
      id: 'gardenSize',
      icon: <FaTree size={20} className='text-primary' />,
      value: '7550 m²',
      label: 'Garden size',
    },
    {
      id: 'pool',
      icon: <FaWaterLadder size={20} className='text-primary' />,
      value: 'Private',
      label: 'Pool',
    },
    {
      id: 'levels',
      icon: <IoHome size={20} className='text-primary' />,
      value: '2',
      label: 'Levels',
    },
    {
      id: 'toBeach',
      icon: <RiGlobalFill size={20} className='text-primary' />,
      value: '5 min',
      label: 'To the beach',
    },
    {
      id: 'toAirport',
      icon: <IoAirplane size={20} className='text-primary' />,
      value: '45 min',
      label: 'To the airport',
    },
    {
      id: 'housekeeping',
      icon: <MdCleaningServices size={20} className='text-primary' />,
      value: 'Daily',
      label: 'Housekeeping',
    },
    {
      id: 'wifi',
      icon: <FaWifi size={20} className='text-primary' />,
      value: '5G',
      label: 'WiFi',
    },
    {
      id: 'bedrooms',
      icon: <FaBed />,
      value: '8',
      label: 'Bedrooms',
    },
    {
      id: 'bathrooms',
      icon: <FaBath />,
      value: '8',
      label: 'Bathrooms',
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
  houseRules: [
    { icon: <FaCalendar size={24} />, text: 'Check in after 02:00 pm' },
    { icon: <FaCalendar size={24} />, text: 'Check out until 11:00 am' },
  ],
  specialNotes: [
    {
      icon: <FaExclamationCircle size={20} />,
      text: 'Late check out until 6:00 pm will be charged 50% of the daily rate (subject to availability)',
    },
  ],
  paymentTerms: [
    '50% deposit payment required to confirm your stay',
    'Balance payable at least 60 days prior to check in',
    'Security deposit will be charged for Rp. 500.000',
  ],
  bookingInfo: {
    price: 9000000,
    currency: 'IDR',
    nights: 2,
    maxGuests: 8,
  },
};
