import DiscoverUnforgottableLandingPage from '@/modules/landing-page/discover';
import ExperienceUnfolded from '@/modules/landing-page/experience-unfolded';
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
      <DiscoverUnforgottableLandingPage />
      <ExperienceUnfolded />
    </>
  );
};

export default LandingPageModules;
