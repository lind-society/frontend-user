import { Star } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { getApiErrorMessage } from '@/lib/api-error';
import { useCreateInquiry } from '@/hooks/api/useInquiry';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/**
 * "{t('title')}" — a short rating form. The review lands in the
 * admin's Inquiries inbox (the public API has no anonymous review endpoint),
 * tagged with the rating, so the team can publish it from there.
 */
const ReviewModules = () => {
  const t = useTranslations('review');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const { mutate: send, isPending } = useCreateInquiry();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error(t('chooseRating'));
      return;
    }

    send(
      {
        type: 'contact',
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        metadata: { topic: 'review', rating },
      },
      {
        onSuccess: () => setSent(true),
        onError: (error) =>
          toast.error(
            getApiErrorMessage(
              error,
              'Could not send your review. Please try again.'
            )
          ),
      }
    );
  };

  return (
    <div className='bg-bone pb-20 pt-[120px]'>
      <BaseContainer>
        <div className='mx-auto flex max-w-2xl flex-col items-center gap-8 text-center'>
          <div className='flex flex-col gap-3'>
            <h1 className='font-heading text-3xl text-ink'>
              Tell Us About Your Stay
            </h1>
            <p className='text-sm italic text-ink'>{t('quote')}</p>
          </div>

          {sent ? (
            <div className='w-full rounded border border-bronze/20 bg-cream-light p-8'>
              <p className='font-heading text-2xl text-bronze-600'>
                {t('thanks')}
              </p>
              <p className='mt-2 text-sm text-ink'>{t('sent')}</p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className='flex w-full max-w-md flex-col gap-5 rounded border border-bronze/20 bg-cream-light p-6 text-left'
            >
              <div className='flex flex-col gap-2'>
                <span className='font-heading text-sm text-bronze-700'>
                  {t('ratings')}
                </span>
                <div
                  role='radiogroup'
                  aria-label='Rating'
                  className='flex gap-2'
                  onMouseLeave={() => setHover(0)}
                >
                  {[1, 2, 3, 4, 5].map((value) => {
                    const filled = value <= (hover || rating);
                    return (
                      <button
                        key={value}
                        type='button'
                        role='radio'
                        aria-checked={rating === value}
                        aria-label={`${value} star${value > 1 ? 's' : ''}`}
                        onMouseEnter={() => setHover(value)}
                        onClick={() => setRating(value)}
                      >
                        <Star
                          size={40}
                          className={
                            filled
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-bronze/30'
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='flex flex-col gap-1'>
                  <label
                    htmlFor='review-name'
                    className='font-heading text-sm text-bronze-700'
                  >
                    {t('fullName')}
                  </label>
                  <Input
                    id='review-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('fullNamePlaceholder')}
                    required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label
                    htmlFor='review-email'
                    className='font-heading text-sm text-bronze-700'
                  >
                    {t('email')}
                  </label>
                  <Input
                    id='review-email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    required
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='review-message'
                  className='font-heading text-sm text-bronze-700'
                >
                  {t('message')}
                </label>
                <Textarea
                  id='review-message'
                  className='min-h-[110px] bg-slate-50'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('messagePlaceholder')}
                  required
                />
              </div>

              <Button variant='primary' type='submit' disabled={isPending}>
                {isPending ? t('sending') : t('submit')}
              </Button>
            </form>
          )}
        </div>
      </BaseContainer>
    </div>
  );
};

export default ReviewModules;
