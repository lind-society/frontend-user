'use client';

import React, { useState } from 'react';
import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
} from 'react-icons/fa';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { countryCodes } from '@/modules/rent-detail/constant';

const ContentContactUs = () => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission
    // eslint-disable-next-line no-console
    console.log({
      fullName,
      email,
      phone: `${countryCode}${phoneNumber}`,
      context,
      message,
    });

    // Reset form or show success message
    alert('Message sent successfully! We will contact you soon.');
  };

  return (
    <div className='py-8 md:py-12 lg:py-16'>
      <BaseContainer>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
          {/* Left column - Contact Information */}
          <div className='flex flex-col gap-8 w-full lg:w-1/2 justify-center'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <h4 className='text-primary text-xl md:text-2xl font-semibold'>
                  Contact Us
                </h4>
                <span className='text-text text-xl md:text-2xl font-semibold'>
                  Have questions or need assistance?
                </span>
              </div>
              <span className='text-text'>
                We're here to help! Reach out to us for inquiries about
                bookings, services, or any information you need. Our team is
                ready to make your experience seamless and enjoyable.
              </span>
            </div>

            {/* Contact methods grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8'>
              {/* Phone */}
              <div className='flex gap-3 items-center'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white'>
                  <FaPhoneAlt size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>Phone</span>
                  <span className='text-sm text-text'>(+62) 812 3456 7890</span>
                </div>
              </div>

              {/* Email */}
              <div className='flex gap-3 items-center'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white'>
                  <FaEnvelope size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>Email</span>
                  <span className='text-sm text-text'>
                    lindsociety@gmail.com
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className='flex gap-3 items-start sm:col-span-2'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white flex-shrink-0'>
                  <FaMapMarkerAlt size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>
                    Address
                  </span>
                  <span className='text-sm text-text'>
                    45 Sudirman Avenue, Level 5, Jakarta, Indonesia 10210
                  </span>
                </div>
              </div>

              {/* Instagram */}
              <div className='flex gap-3 items-center'>
                <div className='rounded-md bg-primary h-12 w-12 flex items-center justify-center text-white'>
                  <FaInstagram size={20} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-text text-lg font-semibold'>
                    Instagram
                  </span>
                  <span className='text-sm text-text'>@lindsociety</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Contact Form */}
          <div className='w-full lg:w-1/2 shadow-md rounded-lg overflow-hidden'>
            <div className='py-4 px-6 flex flex-col gap-1 bg-primary'>
              <span className='text-white text-sm md:text-base'>
                Fill out the form
              </span>
              <span className='text-xl md:text-2xl text-white font-semibold'>
                We will reach out to you in 24 hours
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className='p-4 md:p-6 flex flex-col gap-3 md:gap-4 bg-white'
            >
              {/* Full Name */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  Full name
                </Label>
                <Input
                  placeholder='Enter your full name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  Email
                </Label>
                <Input
                  placeholder='Enter your email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  Phone number
                </Label>
                <div className='flex w-full'>
                  {/* Country code selector using Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type='button'
                        className='rounded-l-lg bg-primary text-white p-2 flex gap-2 items-center flex-shrink-0'
                      >
                        <span>{countryCode}</span>
                        <svg
                          width='12'
                          height='12'
                          viewBox='0 0 12 12'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='text-white'
                        >
                          <path
                            d='M6 8.5L2 4.5H10L6 8.5Z'
                            fill='currentColor'
                            stroke='currentColor'
                            strokeWidth='0.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0 max-w-[300px]'>
                      <div className='max-h-[200px] overflow-y-auto'>
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            className='w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
                            onClick={() => setCountryCode(country.code)}
                            type='button'
                          >
                            <span className='font-medium'>{country.code}</span>{' '}
                            {country.country}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className='flex-1'>
                    <Input
                      className='rounded-l-none flex-grow w-full'
                      placeholder='Enter your phone number'
                      type='tel'
                      value={phoneNumber}
                      onChange={(e) => {
                        // Allow only numbers
                        const value = e.target.value.replace(/\D/g, '');
                        setPhoneNumber(value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Context */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  Inquiry Type
                </Label>
                <Select value={context} onValueChange={setContext} required>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select inquiry type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='booking'>Booking Inquiry</SelectItem>
                    <SelectItem value='property-management'>
                      Property Management
                    </SelectItem>
                    <SelectItem value='property-listing'>
                      List My Property
                    </SelectItem>
                    <SelectItem value='support'>Customer Support</SelectItem>
                    <SelectItem value='other'>Other Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  Message
                </Label>
                <Textarea
                  placeholder='Enter your message'
                  className='min-h-[120px]'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                variant='primary'
                className='w-full mt-2 flex items-center gap-2'
                type='submit'
              >
                <FaPaperPlane />
                <span>Send Your Message</span>
              </Button>
            </form>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentContactUs;
