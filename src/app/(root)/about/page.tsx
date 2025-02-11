import AboutContent from "@/components/about/AboutContent";
import AboutHeader from "@/components/about/AboutHeader";
import ServiceSection from "@/components/about/ServiceSection";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <AboutHeader />
      <AboutContent />
      <ServiceSection />
      <Testimonials />
    </div>
  );
};

export default AboutPage;
