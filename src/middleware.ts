// import { auth } from '@/auth';
import NextAuth from 'next-auth';

import { authConfig } from '@/auth.config';

// const authRoutes = ['/auth/login', '/auth/register'];

export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // const { nextUrl } = req;
  // console.log(nextUrl, 'anjay req');

  if (!req.auth && req.nextUrl.pathname.startsWith('/login/')) {
    const newUrl = new URL('/login', req.nextUrl.origin);

    return Response.redirect(newUrl);
  } else if (
    !req.auth &&
    req.nextUrl.pathname.startsWith('/isi-survey-pengguna/')
  ) {
    const newUrl = new URL('/isi-survey-pengguna', req.nextUrl.origin);

    return Response.redirect(newUrl);
  } else if (!req.auth && req.nextUrl.pathname.startsWith('/admin')) {
    const newUrl = new URL('/login', req.nextUrl.origin);

    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
