import React from 'react';

import AuthLayout from '@/components/layouts/auth-layout';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthLayout
      title='Login'
      description='Welcome back! Your next home upgrade is just a click away-sign in to start exploring.'
      linkText='Create an account'
      linkHref='/register'
      linkLabel='Register'
    >
      {children}
    </AuthLayout>
  );
};
export default LoginLayout;
