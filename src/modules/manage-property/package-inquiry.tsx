import React, { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';

import { useRouter } from '@/lib/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { CONCIERGE_EMAIL } from '@/modules/manage-property/concierge-card';

import { conciergeWhatsappUrl } from '@/constant/config';

import { Package } from '@/types/api/package';

interface PackageInquiryProps {
  /** The package the visitor chose; the dialog is open while this is set. */
  pkg: Package | null;
  onClose: () => void;
}

/**
 * "{t('fillOut')} / <package>" — a short message that is sent to the
 * concierge on WhatsApp or by email, followed by the confirmation page.
 */
const PackageInquiry = ({ pkg, onClose }: PackageInquiryProps) => {
  const t = useTranslations('managePropertyFlow.inquiry');
  const router = useRouter();
  const [message, setMessage] = useState('');

  // Pre-fill with the package every time a different one is chosen.
  useEffect(() => {
    if (pkg) {
      setMessage(t('defaultMessage', { name: pkg.name }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkg]);

  if (!pkg) return null;

  const confirm = () => {
    onClose();
    router.push(`/manage-property/confirmed?package=${pkg.id}`);
  };

  const sendWhatsapp = () => {
    window.open(conciergeWhatsappUrl(message), '_blank', 'noopener');
    confirm();
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(t('emailSubject', { name: pkg.name }));
    window.location.href = `mailto:${CONCIERGE_EMAIL}?subject=${subject}&body=${encodeURIComponent(message)}`;
    confirm();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-[420px] gap-0 overflow-hidden p-0'>
        <DialogHeader className='bg-ink px-6 py-5 text-left'>
          <DialogDescription className='text-sm text-cream/70'>
            Fill out the form
          </DialogDescription>
          <DialogTitle className='font-heading text-2xl font-normal text-cream'>
            {pkg.name}
          </DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-4 bg-white p-6'>
          <label
            htmlFor='package-message'
            className='font-heading text-base text-bronze-700'
          >
            {t('tellUs')}
          </label>
          <Textarea
            id='package-message'
            className='min-h-[140px] bg-slate-50'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant='primary' onClick={sendWhatsapp}>
            {t('whatsapp')}
          </Button>
          <Button variant='primary' onClick={sendEmail}>
            {t('email')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageInquiry;
