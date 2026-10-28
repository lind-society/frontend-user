import DiscoverUnforgottableLandingPage from '@/modules/landing-page/discover';
import Ecosystem from '@/modules/landing-page/ecosystem';
import ExperienceUnfolded from '@/modules/landing-page/experience-unfolded';
import ExploreBestListLandingPage from '@/modules/landing-page/explore';
import ExploreIconicLandingPage from '@/modules/landing-page/explore-iconic';
import HeaderLandingPage from '@/modules/landing-page/header';
import MomentsLandingPage from '@/modules/landing-page/moments';
import TrustBar from '@/modules/landing-page/trust-bar';
import WhyChooseUs from '@/modules/landing-page/why-choose-us';

const LandingPageModules = () => {
  return (
    // page background lives here, not on each section: several of these are
    // shared with pages that sit on a different ground colour
    <div className='bg-cream-light'>
      <HeaderLandingPage />
      <TrustBar />
      <ExploreIconicLandingPage />
      <ExploreBestListLandingPage />
      <WhyChooseUs />
      <DiscoverUnforgottableLandingPage />
      <ExperienceUnfolded />
      <MomentsLandingPage />
      <Ecosystem />
    </div>
  );
};

export default LandingPageModules;
