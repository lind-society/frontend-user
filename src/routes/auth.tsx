import * as React from 'react';

import AuthLayout from '@/components/layouts/auth-layout';

export function SignInPage() {
  return (
    <main>
      <AuthLayout
        title='Login'
        description='Welcome back! Your next home upgrade is just a click away-sign in to start exploring.'
        linkText='Create an account'
        linkHref='/register'
        linkLabel='Register'
      >
        <main></main>
      </AuthLayout>
    </main>
  );
}

export function SignUpPage() {
  return (
    <main>
      <AuthLayout
        title='Create Account'
        description='Create your account to unlock personalized picks and make your  home truly yours!'
        linkText='Create an account'
        linkHref='/register'
        linkLabel='Register'
      >
        <div className='mt-6'></div>
      </AuthLayout>
    </main>
  );
}
