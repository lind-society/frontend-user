import * as React from 'react';
import { createBrowserRouter, useParams } from 'react-router';

import PageMeta from '@/components/page-meta';

import AboutUsModules from '@/modules/about-us';
import BlogModules from '@/modules/blog';
import BlogDetailModules from '@/modules/blog-detail';
import BuyModules from '@/modules/buy';
import BuyDetailModules from '@/modules/buy-detail';
import BuyResultModules from '@/modules/buy-result';
import ContactUsModules from '@/modules/contact-us';
import EarlyBirdModules from '@/modules/early-bird';
import WishlistModules from '@/modules/wishlist';
import LandingPageModules from '@/modules/landing-page';
import ManagePropertyModules from '@/modules/manage-property';
import MediaModules from '@/modules/media';
import RentModules from '@/modules/rent';
import RentDetailModules from '@/modules/rent-detail';
import BookingReservation from '@/modules/rent-reservation/booking-reservation';
import RentResultModules from '@/modules/rent-results';
import TouristActivityModules from '@/modules/tourist-activity';
import TouristActivityDetailModule from '@/modules/tourist-activity-detail';
import { SignInPage, SignUpPage } from '@/routes/auth';
import ErrorPage from '@/routes/error-page';
import MainLayout from '@/routes/main-layout';
import NotFound from '@/routes/not-found';
import RootLayout from '@/routes/root-layout';
import SearchPage from '@/routes/search';

/** Static page: a fixed title around the page module. */
const page = (title: string | undefined, element: React.ReactNode) => (
  <>
    <PageMeta title={title} />
    {element}
  </>
);

/**
 * The single link a guest receives over WhatsApp: `/booking/<accessToken>`.
 *
 * The URL never changes as the booking moves from awaiting confirmation to
 * payment to confirmed — the page reads the current status and shows the
 * matching step of the reservation flow.
 *
 * The token is the guest's only credential, so the page is kept out of search
 * engines and out of any referrer header.
 */
function BookingReservationPage() {
  const { token = '' } = useParams();
  return (
    <>
      <PageMeta
        title='Your reservation'
        robots='noindex, nofollow'
        referrer='no-referrer'
      />
      <BookingReservation token={token} />
    </>
  );
}

function TouristActivityDetailPage() {
  const { name = '' } = useParams();
  return page(undefined, <TouristActivityDetailModule activityId={name} />);
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: page(undefined, <LandingPageModules />) },
              {
                path: 'about-us',
                element: page('About Us', <AboutUsModules />),
              },
              { path: 'blog', element: page('Blog', <BlogModules />) },
              {
                path: 'blog/:name',
                element: <BlogDetailModules />,
              },
              { path: 'booking/:token', element: <BookingReservationPage /> },
              { path: 'buy', element: page('Buy', <BuyModules />) },
              {
                path: 'buy/result',
                element: page('Buy Results', <BuyResultModules />),
              },
              {
                path: 'buy/:name',
                element: <BuyDetailModules />,
              },
              {
                path: 'contact-us',
                element: page('Contact Us', <ContactUsModules />),
              },
              {
                path: 'early-bird',
                element: page('Early Bird Offer', <EarlyBirdModules />),
              },
              {
                path: 'manage-property',
                element: page('Manage Property', <ManagePropertyModules />),
              },
              { path: 'media', element: page('Media', <MediaModules />) },
              { path: 'rent', element: page('Rent', <RentModules />) },
              {
                path: 'rent/result',
                element: page('Rent Results', <RentResultModules />),
              },
              {
                path: 'rent/:name',
                element: <RentDetailModules />,
              },
              { path: 'search', element: page(undefined, <SearchPage />) },
              {
                path: 'wishlist',
                element: page('Wishlist', <WishlistModules />),
              },
              {
                path: 'tourist-activity',
                element: page('Tourist Activity', <TouristActivityModules />),
              },
              {
                path: 'tourist-activity/:name',
                element: <TouristActivityDetailPage />,
              },
            ],
          },
          { path: 'signin', element: <SignInPage /> },
          { path: 'signup', element: <SignUpPage /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]);
