import { notFound } from 'next/navigation';
import React from 'react';

import { touristActivities } from '@/modules/tourist-activity/constant';
import TouristActivityDetailModule from '@/modules/tourist-activity-detail';

type Props = {
  params: { name: string };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const activityId = params.name;
//   const activity = touristActivities.find((act) => act.id === activityId);

//   if (!activity) {
//     return {
//       title: 'Activity Not Found',
//     };
//   }

//   return {
//     title: activity.name,
//   };
// }

export default async function TouristActivityDetailPage({ params }: Props) {
  const activityId = params.name;
  const activity = touristActivities.find((act) => act.id === activityId);

  if (!activity) {
    notFound();
  }

  return <TouristActivityDetailModule activity={activity} />;
}
