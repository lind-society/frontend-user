'use client';

import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';

import { TouristActivity } from '@/modules/tourist-activity/constant';
import Content from '@/modules/tourist-activity-detail/content';
import Gallery from '@/modules/tourist-activity-detail/gallery';
import ImagePreviewModal from '@/modules/tourist-activity-detail/image-preview-modal';
import RegistrationForm from '@/modules/tourist-activity-detail/registration-form';
import Sidebar from '@/modules/tourist-activity-detail/sidebar';

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

  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'details' | 'form'>('details');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetTicket = () => {
    setView('form');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const selectedImageIndex = images.findIndex((img) => img === selectedImage);

  return (
    <>
      <div className='bg-bone min-h-screen'>
        <BaseContainer>
          <>
            <Gallery
              images={images}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              onMainImageClick={openModal}
            />
            <div className='flex flex-col lg:flex-row gap-8'>
              <Content
                activity={activity}
                onGetTicket={handleGetTicket}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              <Sidebar activity={activity} onGetTicket={handleGetTicket} />
            </div>
          </>
        </BaseContainer>
      </div>
      <ImagePreviewModal
        images={images}
        isOpen={isModalOpen}
        onClose={closeModal}
        startIndex={selectedImageIndex}
      />
    </>
  );
}
