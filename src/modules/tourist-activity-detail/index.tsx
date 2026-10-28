'use client';

import React from 'react';

import { toTouristActivity } from '@/lib/mappers/activity';
import { useActivity } from '@/hooks/api/useActivity';

import BaseContainer from '@/components/layouts/container';
import { StateMessage } from '@/components/ui/state-message';

import TouristActivityDetailWrapper from '@/modules/tourist-activity-detail/wrapper';

interface TouristActivityDetailModuleProps {
  activityId: string;
}

export default function TouristActivityDetailModule({
  activityId,
}: TouristActivityDetailModuleProps) {
  const { data, isLoading, isError } = useActivity(activityId);

  if (isLoading) {
    return (
      <div className='bg-bone min-h-screen py-8'>
        <BaseContainer>
          <div className='flex flex-col gap-8'>
            <div className='h-[420px] rounded bg-sand/40 animate-pulse' />
            <div className='flex flex-col lg:flex-row gap-8'>
              <div className='flex-1 h-[600px] rounded bg-sand/40 animate-pulse' />
              <div className='w-full lg:w-80 h-[200px] rounded bg-sand/40 animate-pulse' />
            </div>
          </div>
        </BaseContainer>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className='bg-bone min-h-screen py-16'>
        <BaseContainer>
          <StateMessage
            variant='error'
            title='Activity not found'
            description='This activity may have been removed, or the link you followed is no longer valid.'
          />
        </BaseContainer>
      </div>
    );
  }

  const activity = toTouristActivity(data.data);

  return <TouristActivityDetailWrapper activity={activity} />;
}
