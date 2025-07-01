import React from 'react';

import { TouristActivity } from '@/modules/tourist-activity/constant';
import TouristActivityDetailWrapper from '@/modules/tourist-activity-detail/wrapper';

interface TouristActivityDetailModuleProps {
  activity: TouristActivity;
}

export default function TouristActivityDetailModule({
  activity,
}: TouristActivityDetailModuleProps) {
  return <TouristActivityDetailWrapper activity={activity} />;
}
