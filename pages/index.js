import HeroSection from "../components/LandingPage/HeroSection";
import HowItWorks from "../components/LandingPage/HowItWorks";
import KeyFeatures from "../components/LandingPage/KeyFeatures";
import WhyChoose from "../components/LandingPage/WhyChoose";
import PricingPlans from "../components/LandingPage/PricingPlans";
// import Testimonials from "../components/LandingPage/Testimonials";
import CallToAction from "../components/LandingPage/CallToAction";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <div className="container px-4">
        <HowItWorks />
        <KeyFeatures />
        <WhyChoose />
        {/* <Testimonials /> */}
        <PricingPlans />
      </div>
      <CallToAction />
    </>
  );
};

export default LandingPage;
