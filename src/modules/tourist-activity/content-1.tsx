'use client';

import { ChevronDown, SlidersHorizontal, Star } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';

import BaseContainer from '@/components/layouts/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SortOption, sortOptions } from '@/modules/buy-result/result';

const ContentTourist1 = () => {
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  return (
    <div className='py-[64px] bg-bg'>
      <BaseContainer>
        <div className='flex flex-col gap-8 '>
          <div className='flex flex-col gap-2 text-center items-center'>
            <h4 className='text-primary'>
              Nourish Your Body, Refresh Your Soul
            </h4>
            <span className='max-w-[850px] text-text'>
              Discover wellness experiences that help you relax, recharge, and
              restore balance in your life.
            </span>
          </div>
          <div className='flex justify-center items-center gap-8'>
            <Select>
              <SelectTrigger className='w-[240px] h-[58px]'>
                <SelectValue placeholder='Choose Location' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={1} value='Bali'>
                  Bali
                </SelectItem>
              </SelectContent>
            </Select>
            <div className='flex border rounded-l-md pl-5 items-center'>
              <input
                placeholder='What do you want to do?'
                className='border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none w-[400px]'
              />
              <button className='bg-primary rounded-r-md p-4 text-white '>
                Search
              </button>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='font-medium text-gray-500'>
              Available wellness activity:
            </span>
            <span className='text-xl text-primary'>32</span>
          </div>
          <div className='flex justify-between w-full'>
            <div className='flex gap-8'>
              <Button variant='outline' className='flex gap-2 items-center'>
                <FaCalendar className='text-primary text-xl' />
                <span className='text-primary'>Availability</span>
                <ChevronDown className='text-primary' />
              </Button>
              <Button variant='outline' className='flex gap-2 items-center'>
                {/* icon price */}
                <span className='text-primary'>Price Range</span>
              </Button>
            </div>
            <div className='flex gap-8'>
              <Button variant='outline' className='flex gap-2 items-center'>
                <SlidersHorizontal size={20} className='text-primary' />
                <span className='text-primary'>Filters</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex items-center justify-center gap-2 text-primary text-xs font-semibold'
                  >
                    <span className='whitespace-nowrap'>
                      Sort by{' '}
                      {
                        sortOptions.find((opt) => opt.value === selectedSort)
                          ?.label
                      }
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={`cursor-pointer ${
                        selectedSort === option.value
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }`}
                      onClick={() => setSelectedSort(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-8'>
            <div>
              <div className='relative h-[240px] w-full'>
                <div className='relative h-[240px] w-full'>
                  <Image
                    className='w-full h-full object-cover'
                    src='/images/activity-1.jpeg'
                    alt={`activity - Image `}
                    sizes='100vw'
                    width={0}
                    height={0}
                  />
                </div>

                {/* Rating badge */}
                <div className='absolute left-0 bottom-0 bg-primary px-4 py-2 rounded-tr-lg z-10 flex gap-2 items-center'>
                  <Star className='text-white' size={16} />
                  <span className='text-white'>4.8</span>
                </div>
              </div>
              <div className='px-6 py-4 flex justify-between border-b'>
                <span className='text-sm text-text'>
                  Ubud, Bali - Indonesia
                </span>
                <Badge className='bg-primary px-3 rounded-md'>Welness</Badge>
              </div>
              <div className='px-6 py-4 flex flex-col gap-2'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2'>
                  <p className='text-lg md:text-xl text-primary font-semibold'>
                    Jungle Detox & Wellness Spa
                  </p>
                  <div className='flex flex-col text-start md:text-end items-start md:items-end text-primary'>
                    <span className='text-lg md:text-[22px] font-bold whitespace-nowrap'>
                      IDR 1.500.000
                    </span>
                    <span className='italic text-xs md:text-sm font-normal'>
                      /session
                    </span>
                  </div>
                </div>
                <p className='text-gray-600 font-normal text-sm md:text-base line-clamp-3'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore.
                </p>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center'>
            <Button variant='outline' className='w-fit'>
              Show more wellness (26)
            </Button>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentTourist1;
