import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import Image from "next/image";
import { config } from "../landing.config";

const LandingPage = () => {
  return (
    <>
      <section className="min-h-96 relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
        <Image
          src={config.hero.image}
          loading="lazy"
          alt="Photo by Fakurian Design"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1500}
          height={1000}
        />
        <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply"></div>
        <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
          <p className="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">
            Elevate Your Local Business
          </p>
          <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">
            {config.hero.big_desc}
          </h1>
          <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
            <a
              href="/signup"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Get Started for Free
            </a>
            <a
              href="#tour"
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 hover:bg-gray-300"
            >
              Take a Tour
            </a>
          </div>
        </div>
      </section>

      <Features />

      <HowItWorks />

      <Testimonials />

      <Pricing />

      <section className="bg-white py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Join StyleMatch Today</h2>
          <p className="text-gray-600">Take your business to the next level.</p>
          <a
            href="/auth"
            className="mt-4 inline-block rounded-lg bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
