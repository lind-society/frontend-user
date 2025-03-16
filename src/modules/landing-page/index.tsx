import ExploreBestListLandingPage from '@/modules/landing-page/explore';
import ExploreIconicLandingPage from '@/modules/landing-page/explore-iconic';
import HeaderLandingPage from '@/modules/landing-page/header';

const LandingPageModules = () => {
  return (
    <>
      <HeaderLandingPage />
      <ExploreIconicLandingPage />
      <ExploreBestListLandingPage />
    </>
  );
};

export default LandingPageModules;
