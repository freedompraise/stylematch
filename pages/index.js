import HeroSection from "../components/LandingPage/HeroSection";
import HowItWorks from "../components/LandingPage/HowItWorks";
import KeyFeatures from "../components/LandingPage/KeyFeatures";
import WhyChoose from "../components/LandingPage/WhyChoose";
import PricingPlans from "../components/LandingPage/PricingPlans";
import CaseStudies from "../components/LandingPage/CaseStudies";
import CallToAction from "../components/LandingPage/CallToAction";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <div className="container px-4">
        <HowItWorks />
        <KeyFeatures />
        <WhyChoose />
        <PricingPlans />
        <CaseStudies />
      </div>
      <CallToAction />
    </>
  );
};

export default LandingPage;
