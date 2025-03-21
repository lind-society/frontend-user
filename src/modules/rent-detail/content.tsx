import { ChevronDown } from 'lucide-react';
import React from 'react';
import { FaCalendar } from 'react-icons/fa6';

import BaseContainer from '@/components/layouts/container';
import { Calendar } from '@/components/ui/calendar';
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

const ContentRentDetail = () => {
  return (
    <div className='py-[32px]'>
      <BaseContainer>
        <div className='flex gap-[64px]'>
          <div className='flex-1 flex flex-col gap-4'></div>
          <div className='w-[340px] border shadow-md'>
            <div className='bg-primary text-white flex flex-col gap-1 px-6 py-3'>
              <span className=''>Send Inquiry or</span>
              <span className='text-2xl font-semibold'>Secure Your Stay</span>
            </div>
            <div className='p-6 flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold text-primary'>
                  How long do you want to stay?
                </Label>
                <Select defaultValue='Daily'>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select duration' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Daily'>Daily</SelectItem>
                    <SelectItem value='Weekly'>Weekly</SelectItem>
                    <SelectItem value='Monthly'>Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                      <FaCalendar size={24} className='text-primary' />
                      <div className='flex flex-col w-full'>
                        <span className='font-semibold text-left'>
                          Check in
                        </span>
                        <div className='flex justify-between items-center'>
                          <span className='text-gray-500'>
                            {/* {checkInDate
                            ? format(checkInDate, 'dd MMM yyyy')
                            : 'Select date'} */}
                            Select date
                          </span>
                          <ChevronDown size={18} className='text-primary' />
                        </div>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      // selected={checkInDate}
                      // onSelect={setCheckInDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Check out */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                      <FaCalendar size={24} className='text-primary' />
                      <div className='flex flex-col w-full'>
                        <span className='font-semibold text-left'>
                          Check out
                        </span>
                        <div className='flex justify-between items-center'>
                          <span className='text-gray-500'>
                            {/* {checkOutDate
                            ? format(checkOutDate, 'dd MMM yyyy')
                            : 'Select date'} */}
                            Select date
                          </span>
                          <ChevronDown size={18} className='text-primary' />
                        </div>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      // selected={checkOutDate}
                      // onSelect={setCheckOutDate}
                      initialFocus
                      // disabled={(date) =>
                      //   checkInDate ? date < checkInDate : false
                      // }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentRentDetail;
