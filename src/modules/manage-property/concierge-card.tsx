import { Mail } from 'lucide-react';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import {
  CONCIERGE_WHATSAPP_DISPLAY,
  conciergeWhatsappUrl,
} from '@/constant/config';

/** Contact email shown next to the WhatsApp number. */
export const CONCIERGE_EMAIL = 'hello@lindsociety.com';

/** "Have a Question?" card with the concierge's WhatsApp, email and the scam notice. */
const ConciergeCard = () => {
  const t = useTranslations('managePropertyFlow.concierge');

  return (
    <div className='overflow-hidden rounded border border-bronze/20 bg-white shadow-sm'>
      <div className='bg-ink px-5 py-4 text-cream'>
        <p className='font-heading text-xl'>{t('title')}</p>
        <p className='text-sm text-cream/80'>{t('subtitle')}</p>
      </div>

      <div className='flex flex-col gap-3 p-5'>
        <div className='flex flex-col'>
          <span className='font-heading text-bronze-700'>{t('team')}</span>
          <span className='text-xs text-ink-soft'>{t('service')}</span>
        </div>

        <a
          href={conciergeWhatsappUrl()}
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-center gap-2 rounded border border-bronze/40 px-3 py-2 text-sm text-ink hover:bg-bronze/5'
        >
          <FaWhatsapp className='text-green-600' size={18} />
          {CONCIERGE_WHATSAPP_DISPLAY}
        </a>

        <a
          href={`mailto:${CONCIERGE_EMAIL}`}
          className='flex items-center justify-center gap-2 rounded border border-bronze/40 px-3 py-2 text-sm text-ink hover:bg-bronze/5'
        >
          <Mail size={18} className='text-bronze-600' />
          {CONCIERGE_EMAIL}
        </a>

        <div className='rounded border border-bronze/30 p-3 text-center text-xs text-ink-soft'>
          <p className='mb-1 font-heading text-sm text-bronze-700'>
            {t('noticeTitle')}
          </p>
          <p>{t('notice')}</p>
        </div>
      </div>
    </div>
  );
};

export default ConciergeCard;
