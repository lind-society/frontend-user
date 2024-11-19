import { z } from 'zod';

export const ValidationSchemaChangePassword = z
  .object({
    old_password: z
      .string({
        required_error: 'Title should be filled',
      })
      .min(8, 'Title should be filled with minimum 10 character'),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, {
        message: 'Password must contain at least one letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      })
      .trim(),
    password_confirmation: z
      .string({
        message: 'Password confirmation field must not be empty.',
      })
      .min(8, {
        message: 'Password confirmation must be at least 8 characters long.',
      })
      .trim(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'], // This specifies where the error message should appear
    message: 'Passwords do not match.',
  });

// Define the Validation Schema for Edit Profile
export const ValidationSchemaEditProfile = z.object({
  fullname: z
    .string({
      required_error: 'Full name is required.',
    })
    .min(2, 'Full name must be at least 2 characters long.')
    .max(50, 'Full name must not exceed 50 characters.')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces.'),

  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(3, 'Username must be at least 3 characters long.')
    .max(30, 'Username must not exceed 30 characters.')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores.'
    ),

  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email('Invalid email address.'),

  whatsapp_number: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Allow empty strings if the field is optional
        // Simple regex for international WhatsApp numbers (e.g., +1234567890)
        return /^\+?[1-9]\d{1,14}$/.test(val);
      },
      {
        message:
          'Invalid WhatsApp number. Please enter a valid international number.',
      }
    ),
  street_address: z
    .string({
      required_error: 'Street address is required.',
    })
    .min(5, 'Street address must be at least 5 characters long.')
    .max(100, 'Street address must not exceed 100 characters.'),

  province: z
    .string({
      required_error: 'Province is required.',
    })
    .min(2, 'Province must be at least 2 characters long.')
    .max(50, 'Province must not exceed 50 characters.'),

  city: z
    .string({
      required_error: 'City is required.',
    })
    .min(2, 'City must be at least 2 characters long.')
    .max(50, 'City must not exceed 50 characters.'),

  zip_code: z
    .string({
      required_error: 'ZIP code is required.',
    })
    .min(4, 'ZIP code must be at least 4 characters long.')
    .max(10, 'ZIP code must not exceed 10 characters.')
    .regex(/^\d{4,10}$/, 'ZIP code must contain only numbers.'),
});
