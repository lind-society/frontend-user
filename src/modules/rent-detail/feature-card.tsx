import { useTranslations } from 'next-intl';

import { villaData } from '@/modules/rent-detail/constant';

// Feature Card Component
export const FeatureCard: React.FC<{
  feature: (typeof villaData.features)[0];
}> = ({ feature }) => {
  const t = useTranslations('rentDetail.content.features');

  return (
    <div className='p-2.5 flex gap-2 items-center col-span-1 border rounded'>
      <div className='bg-tertiary h-10 w-10 flex items-center justify-center rounded-full'>
        {feature.icon}
      </div>
      <div className='flex flex-col'>
        <span className='text-sm text-primary font-semibold'>
          {feature.value}
        </span>
        <span className='text-text text-xs'>{t(feature.labelKey)}</span>
      </div>
    </div>
  );
};
