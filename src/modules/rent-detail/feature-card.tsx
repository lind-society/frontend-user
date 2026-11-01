import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}

/** One figure in the "Key Features" grid. */
export const FeatureCard = ({ icon, value, label }: FeatureCardProps) => (
  <div className='p-2.5 flex gap-2 items-center col-span-1 border rounded'>
    <div className='bg-tertiary h-10 w-10 flex shrink-0 items-center justify-center rounded-full text-primary'>
      {icon}
    </div>
    <div className='flex min-w-0 flex-col'>
      <span className='truncate text-sm text-primary font-semibold'>
        {value}
      </span>
      <span className='text-text text-xs'>{label}</span>
    </div>
  </div>
);
