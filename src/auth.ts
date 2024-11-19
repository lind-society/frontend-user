import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginRequest } from '@/hooks/auth/request';

import { authConfig } from './auth.config';

import { TMetaErrorResponse } from '@/types';
import { TLoginResponse } from '@/types/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { maxAge: 30 * 60, strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(
        credentials
      ): Promise<TLoginResponse | TMetaErrorResponse> {
        // console.log(credentials, 'credentials');
        const defaultErrors = {
          errors: {
            code: 500,
            message: 'Internal Server Error',
            status: 'error',
          },
        };

        const data = await loginRequest({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        // console.log(data, 'data');

        if (!data.success) {
          if (data.user) {
            throw new Error(JSON.stringify({ errors: data?.message }));
          } else {
            throw new Error(JSON.stringify(defaultErrors));
          }
        }

        return data;
      },
    }),
  ],
});
