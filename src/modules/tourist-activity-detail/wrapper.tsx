import React, { useState } from 'react';

import { TouristActivity } from '@/modules/tourist-activity/constant';
import DetailView from '@/modules/tourist-activity-detail/detail-view';
import RegistrationForm from '@/modules/tourist-activity-detail/registration-form';

interface TouristActivityDetailWrapperProps {
  activity: TouristActivity;
}

export default function TouristActivityDetailWrapper({
  activity,
}: TouristActivityDetailWrapperProps) {
  // Every consumer below reads from this, not `activity.images` directly, so
  // an activity with no uploaded photos yet never hands `<Image src>` an
  // empty/undefined value.
  const images =
    activity.images.length > 0
      ? activity.images
      : ['/images/modern-villa-background.webp'];

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'details' | 'form'>('details');

  const handleGetTicket = () => {
    setView('form');
  };

  // The registration form redirects to /booking/[token] on a real booking —
  // it never reaches a local "payment" or "success" step. Those used to be
  // separate screens here with their own fake local state, duplicating (and
  // never actually calling) the same booking + payment flow already built
  // and working for villas at /booking/[token].
  if (view === 'form') {
    return (
      <RegistrationForm
        activity={activity}
        selectedDate={selectedDate}
        onBack={() => setView('details')}
      />
    );
  }

  return (
    <DetailView
      activity={{ ...activity, images }}
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      onGetTicket={handleGetTicket}
    />
  );
}
