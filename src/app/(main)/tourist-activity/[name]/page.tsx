import React from 'react';

import TouristActivityDetailModule from '@/modules/tourist-activity-detail';

type Props = {
  params: Promise<{ name: string }>;
};

export default async function TouristActivityDetailPage({ params }: Props) {
  const activityId = (await params).name;

  return <TouristActivityDetailModule activityId={activityId} />;
}
