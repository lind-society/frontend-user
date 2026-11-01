export const siteConfig = {
  title: 'Lind',
  description:
    'We provide a variety of the best lodging accommodations for those of you who need it.',
};

/**
 * The concierge team guests reach by WhatsApp. Digits only, with country code;
 * set VITE_CONCIERGE_WHATSAPP to change it without touching the code.
 */
export const CONCIERGE_WHATSAPP: string =
  import.meta.env.VITE_CONCIERGE_WHATSAPP || '6281234567890';

/** `wa.me` link that opens a chat with the concierge, optionally pre-filled. */
export const conciergeWhatsappUrl = (message?: string): string =>
  `https://wa.me/${CONCIERGE_WHATSAPP}${
    message ? `?text=${encodeURIComponent(message)}` : ''
  }`;

/** `+62 812-3456-7890` style, for display. */
export const CONCIERGE_WHATSAPP_DISPLAY = `+${CONCIERGE_WHATSAPP}`;
