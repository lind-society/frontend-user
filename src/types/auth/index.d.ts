import { SignupFormSchema } from '@/modules/auth/validation';

export interface TLoginPayload {
  email: string;
  password: string;
}

export type TLoginResponse = {
  success: boolean;
  message: string;
  token?: string; // Optional token for authenticated sessions
  user?: {
    id: number;
    name: string;
    email: string;
  };
} & User;

export type TCredentialParams = {
  email: string;
  password: string;
};

export type TMetaErrorSignIn = {
  errors: TMetaItem;
};

// Infer the input type from the SignupFormSchema
export type SignupFormInput = z.infer<typeof SignupFormSchema>;

// Define the response structure for the signup request
export type SignupResponse = {
  success: boolean;
  message: string;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};
