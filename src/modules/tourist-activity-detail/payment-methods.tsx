import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

interface PaymentMethodsProps {
  activityName: string;
  onSubmit: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  activityName,
  onSubmit,
}) => {
  const t = useTranslations('touristActivityDetail.payment');
  const tDetail = useTranslations('touristActivityDetail');

  const bankTransfers = [
    { name: 'BRI', logo: '/images/bri.svg' },
    { name: 'BNI', logo: '/images/bni.svg' },
    { name: 'BCA', logo: '/images/bca.svg' },
    { name: 'Mandiri', logo: '/images/mandiri.svg' },
  ];

  const cardPayments = [
    { name: 'Visa', logo: '/images/visa.png' },
    { name: 'Mastercard', logo: '/images/master-card.png' },
    { name: 'JCB', logo: '/images/jcb.png' },
    { name: 'American Express', logo: '/images/american-express.png' },
  ];

  return (
    <div className='bg-gray-50 min-h-screen py-16'>
      <BaseContainer>
        <div className='flex flex-col items-center text-center gap-4'>
          <h1 className='text-2xl font-semibold text-primary'>
            {activityName} {tDetail('ticketRegistration')}
          </h1>
          <p className='max-w-2xl'>{t('title')}</p>

          <div className='mt-8 w-full max-w-3xl bg-white p-8 rounded-lg border border-gray-200 text-left flex flex-col gap-6'>
            <div>
              <h2 className='text-lg font-semibold text-primary'>
                {t('paymentMethods')}
              </h2>
              <p className='text-sm text-gray-600 mt-1'>{t('description')}</p>
            </div>

            <div>
              <h3 className='font-semibold mb-3'>{t('bankTransfer')}</h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {bankTransfers.map((bank) => (
                  <div
                    key={bank.name}
                    className='border rounded-lg p-4 flex justify-center items-center'
                  >
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={80}
                      height={24}
                      objectFit='contain'
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-3'>{t('cardPayments')}</h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {cardPayments.map((card) => (
                  <div
                    key={card.name}
                    className='border rounded-lg p-4 flex justify-center items-center'
                  >
                    <Image
                      src={card.logo}
                      alt={card.name}
                      width={80}
                      height={40}
                      objectFit='contain'
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={onSubmit} className='w-full bg-primary text-white'>
              {t('continueToPayment')}
            </Button>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default PaymentMethods;
