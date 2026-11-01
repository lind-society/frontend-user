export type InquiryType =
  | 'contact'
  | 'villa'
  | 'property'
  | 'activity'
  | 'early_bird'
  | 'manage_property';

/** Body of POST /inquiries (public). */
export interface CreateInquiryPayload {
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  /** The villa / property / activity the visitor was looking at. */
  referenceId?: string;
  referenceName?: string;
  /** Form-specific extras: dates, guest count, topic, package, ... */
  metadata?: Record<string, unknown>;
}
