import React from 'react';

import AuthLayout from '@/components/layouts/auth-layout';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthLayout
      title='Create Account'
      description='Create your account to unlock personalized picks and make your  home truly yours!'
      linkText='Create an account'
      linkHref='/register'
      linkLabel='Register'
    >
      {children}
    </AuthLayout>
  );
};
export default LoginLayout;
