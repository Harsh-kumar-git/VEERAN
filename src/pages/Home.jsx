import HeroSection from '../components/home/HeroSection';
import BrandIntro from '../components/home/BrandIntro';
import UseCaseGrid from '../components/home/UseCaseGrid';
import CraftStory from '../components/home/CraftStory';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BottlePosterShowcase from '../components/home/BottlePosterShowcase';
import FindYourVeeran from '../components/home/FindYourVeeran';
import WhyVeeran from '../components/home/WhyVeeran';
import CustomerStories from '../components/home/CustomerStories';
import JournalPreview from '../components/home/JournalPreview';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <BrandIntro />
      <UseCaseGrid />
      <FeaturedProducts />
      <BottlePosterShowcase />
      <CraftStory />
      <FindYourVeeran />
      <WhyVeeran />
      <CustomerStories />
      <JournalPreview />
      <FinalCTA />
    </div>
  );
}
