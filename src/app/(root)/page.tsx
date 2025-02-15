import BrowseOffers from "@/components/home/BrowseOffers";
import HeroSection from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";

const Homepage = () => {
  return (
    <div className="py-[90px]">
      <div>
        <HeroSection />
        <WhyUs />
        <BrowseOffers />
        <Testimonials />
      </div>
    </div>
  );
};

export default Homepage;
