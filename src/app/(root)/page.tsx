import BrowseOffers from "@/components/home/BrowseOffers";
import Cta from "@/components/home/Cta";
import HeroSection from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";

const Homepage = () => {
  return (
    <div className="">
      <div>
        <HeroSection />
        <WhyUs />
        <BrowseOffers />
        <Testimonials />
        <Cta />
      </div>
    </div>
  );
};

export default Homepage;
