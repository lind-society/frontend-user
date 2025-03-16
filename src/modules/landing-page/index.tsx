import ExploreBestListLandingPage from '@/modules/landing-page/explore';
import ExploreIconicLandingPage from '@/modules/landing-page/explore-iconic';
import HeaderLandingPage from '@/modules/landing-page/header';
import WhyChooseUs from '@/modules/landing-page/why-choose-us';

const LandingPageModules = () => {
  return (
    <>
      <HeaderLandingPage />
      <ExploreIconicLandingPage />
      <ExploreBestListLandingPage />
      <WhyChooseUs />
    </>
  );
};

export default LandingPageModules;
