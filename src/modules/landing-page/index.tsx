import DiscoverUnforgottableLandingPage from '@/modules/landing-page/discover';
import ExperienceUnfolded from '@/modules/landing-page/experience-unfolded';
import ExploreBestListLandingPage from '@/modules/landing-page/explore';
import ExploreIconicLandingPage from '@/modules/landing-page/explore-iconic';
import HeaderLandingPage from '@/modules/landing-page/header';
import MomentsLandingPage from '@/modules/landing-page/moments';
import WhyChooseUs from '@/modules/landing-page/why-choose-us';

const LandingPageModules = () => {
  return (
    <div className='bg-bg'>
      <HeaderLandingPage />
      <ExploreIconicLandingPage />
      <ExploreBestListLandingPage />
      <WhyChooseUs />
      <DiscoverUnforgottableLandingPage />
      <ExperienceUnfolded />
      <MomentsLandingPage />
    </div>
  );
};

export default LandingPageModules;
