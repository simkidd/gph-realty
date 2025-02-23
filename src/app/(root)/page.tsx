import BrowseOffers from "@/components/home/BrowseOffers";
import Cta from "@/components/home/Cta";
import Hero2 from "@/components/home/Hero2";
// import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";

const Homepage = () => {
  return (
    <div className="">
      <div>
        <Hero2 />
        <WhyUs />
        <BrowseOffers />
        {/* <Testimonials /> */}
        <Cta />
      </div>
    </div>
  );
};

export default Homepage;
