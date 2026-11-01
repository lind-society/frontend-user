import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';

import { CreateInquiryPayload } from '@/types/api/inquiry';

/**
 * POST /inquiries — public, rate limited. Stores the message for the admin
 * inbox and emails the team. Used by the contact page and by every
 * "send inquiry" form on the site.
 */
export const useCreateInquiry = () =>
  useMutation({
    mutationFn: async (payload: CreateInquiryPayload) => {
      const { data } = await api.post('/inquiries', payload);
      return data;
    },
  });
