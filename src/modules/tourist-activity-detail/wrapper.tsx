'use client';

import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';

import { TouristActivity } from '@/modules/tourist-activity/constant';
import Content from '@/modules/tourist-activity-detail/content';
import Gallery from '@/modules/tourist-activity-detail/gallery';
import ImagePreviewModal from '@/modules/tourist-activity-detail/image-preview-modal';
import PaymentMethods from '@/modules/tourist-activity-detail/payment-methods';
import RegistrationForm from '@/modules/tourist-activity-detail/registration-form';
import Sidebar from '@/modules/tourist-activity-detail/sidebar';
import SuccessMessage from '@/modules/tourist-activity-detail/success-message';

interface TouristActivityDetailWrapperProps {
  activity: TouristActivity;
}

export default function TouristActivityDetailWrapper({
  activity,
}: TouristActivityDetailWrapperProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    activity.images[0]
  );
  const [view, setView] = useState<'details' | 'form' | 'payment' | 'success'>(
    'details'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetTicket = () => {
    setView('form');
  };

  const handleFormSubmit = () => {
    setView('payment');
  };

  const handlePaymentSubmit = () => {
    setView('success');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (view === 'form') {
    return (
      <RegistrationForm
        activityName={activity.name}
        onSubmit={handleFormSubmit}
      />
    );
  }

  if (view === 'payment') {
    return (
      <PaymentMethods
        activityName={activity.name}
        onSubmit={handlePaymentSubmit}
      />
    );
  }

  if (view === 'success') {
    return <SuccessMessage activityName={activity.name} />;
  }

  const selectedImageIndex = activity.images.findIndex(
    (img) => img === selectedImage
  );

  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        <BaseContainer>
          <>
            <Gallery
              images={activity.images}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              onMainImageClick={openModal}
            />
            <div className='flex flex-col lg:flex-row gap-8'>
              <Content activity={activity} onGetTicket={handleGetTicket} />
              <Sidebar activity={activity} onGetTicket={handleGetTicket} />
            </div>
          </>
        </BaseContainer>
      </div>
      <ImagePreviewModal
        images={activity.images}
        isOpen={isModalOpen}
        onClose={closeModal}
        startIndex={selectedImageIndex}
      />
    </>
  );
}
