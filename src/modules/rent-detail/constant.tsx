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

// Around the villa locations
export const villaLocations = {
  nearby: [
    { name: 'Baked. Berawa Bakery', distance: '84 m' },
    { name: 'Riviera Bistro', distance: '220 m' },
    { name: 'Mosto Organic Wine Bar', distance: '280 m' },
    { name: 'Atlas Beach Club', distance: '800 m' },
    { name: 'Berawa Beach', distance: '950 m' },
  ],
  furtherAway: [
    { name: 'Jungle Padel Pererenan', distance: '5.0 km' },
    { name: 'Desa Kitsuné', distance: '7.3 km' },
    { name: 'La Brisa Sunday Market', distance: '7.4 km' },
    { name: 'Tanah Lot Sea Temple', distance: '13.4 km' },
    { name: 'Ngurah Rai International Airport', distance: '15.7 km' },
  ],
};

// Service & Features sections
export const villaServices = {
  facilities: [
    'Private pool with sun loungers',
    'Lush tropical garden',
    'Fully equipped kitchen',
    'Spa room for in-villa treatments',
    'Open-plan dining and living area',
    'Air-conditioned bedrooms with en-suite bathrooms',
    'Spacious balcony with seating area',
    'Dedicated workspace with high-speed Wi-Fi',
  ],
  services: [
    'Daily housekeeping and villa cleaning',
    'Personal chef services (upon request)',
    '24/7 concierge assistance',
    'In-villa spa and massage treatments',
    'Laundry and ironing services (additional charge)',
    'Grocery shopping and stocking (on request)',
    'Round-the-clock security',
  ],
  entertainment: [
    'Flat-screen TV with international channels',
    'Bluetooth sound system for music streaming',
    'Board games for family and group fun',
    'Book collection for leisure reading',
    'Pool floats and toys for added fun',
    'Outdoor BBQ area (upon request)',
  ],
  meals: [
    'Customized in-villa dining experiences (by personal chef)',
    'Daily breakfast (included or upon request)',
    'Pre-stocked pantry service',
    'Outdoor BBQ setup for group dining',
    'Access to local catering services for special events',
    'Fresh seafood dinner arrangements (available on request)',
  ],
  transport: [
    'Complimentary airport pickup and drop-off (depending on booking package)',
    'Private driver and car rental services',
    'Scooter and bike rental (available on request)',
    'Shuttle service to nearby attractions',
    'Dedicated parking space for guests',
  ],
  kids: [
    'Baby cots and high chairs (upon request)',
    'Babysitting services (on request)',
    'Pool safety fence installation (optional)',
    'Child-friendly meal preparation (chef services)',
    'Kid-friendly board games and activities',
    'Shaded play area in the garden',
  ],
};
