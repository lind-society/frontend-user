import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RegistrationFormProps {
  activityName: string;
  onSubmit: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  activityName,
  onSubmit,
}) => {
  const t = useTranslations('touristActivityDetail.form');
  const tDetail = useTranslations('touristActivityDetail');

  return (
    <div className='bg-gray-50 min-h-screen py-16'>
      <BaseContainer>
        <div className='flex flex-col items-center text-center gap-4'>
          <h1 className='text-2xl font-semibold text-primary'>
            {activityName} {tDetail('ticketRegistration')}
          </h1>
          <p className='max-w-2xl'>{t('title')}</p>

          <div className='mt-8 w-full max-w-2xl bg-white p-8 rounded-lg border border-gray-200 text-left'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className='flex flex-col gap-6'
            >
              <div>
                <Label htmlFor='fullName'>{t('fullName')}</Label>
                <Input
                  id='fullName'
                  placeholder={t('fullNamePlaceholder')}
                  className='mt-1'
                />
              </div>
              <div>
                <Label htmlFor='email'>{t('email')}</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  className='mt-1'
                />
              </div>
              <div>
                <Label htmlFor='phone'>{t('phone')}</Label>
                <div className='flex gap-2 mt-1'>
                  <Select defaultValue='+62'>
                    <SelectTrigger className='w-24'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='+62'>+62</SelectItem>
                      <SelectItem value='+1'>+1</SelectItem>
                      <SelectItem value='+44'>+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder={t('phonePlaceholder')}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='ticket'>{t('ticketAmount')}</Label>
                <Select defaultValue='1'>
                  <SelectTrigger id='ticket' className='mt-1'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1</SelectItem>
                    <SelectItem value='2'>2</SelectItem>
                    <SelectItem value='3'>3</SelectItem>
                    <SelectItem value='4'>4</SelectItem>
                    <SelectItem value='5'>5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {t('agreement')}
                </label>
              </div>
              <Button type='submit' className='w-full bg-primary text-white'>
                {t('next')}
              </Button>
            </form>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default RegistrationForm;
