import Image from "next/image";
import { config } from "../landing.config";
import Link from "next/link";

const LandingPage = () => {
  const features = [
    {
      title: "Easy Catalog Management",
      description: "Manage your product listings with an intuitive interface.",
    },
    {
      title: "Secure Payments",
      description: "Accept payments through secure payment gateways.",
    },
    {
      title: "Unique Store Link",
      description: "Each vendor gets a personalized link for their store.",
    },
    {
      title: "Order Tracking",
      description: "Track and manage orders with real-time updates.",
    },
  ];

  const testimonials = [
    {
      name: "Vendor A",
      feedback: "StyleMatch has transformed my business!",
      image: "/vendor-a.jpg",
    },
    {
      name: "Vendor B",
      feedback: "Easy to use and great support!",
      image: "/vendor-b.jpg",
    },
  ];

  const steps = [
    { step: "1", title: "Sign Up", desc: "Create your vendor profile." },
    {
      step: "2",
      title: "Upload Products",
      desc: "Add your products to the catalog.",
    },
    {
      step: "3",
      title: "Start Selling",
      desc: "Share your link and manage orders.",
    },
  ];

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
            <Link
              href="/auth"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Get Started for Free
            </Link>
            <a
              href="#tour"
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 hover:bg-gray-300"
            >
              Take a Tour
            </a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-8 flex justify-around">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mb-4 h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold">What Our Vendors Say</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-100">
                <p className="mb-4 text-gray-600">{testimonial.feedback}</p>
                <h3 className="font-bold">{testimonial.name}</h3>
                <div className="mt-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
          <div className="flex justify-center space-x-6">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Freemium</h3>
              <p className="text-gray-600 mb-4">Free for one month</p>
              <p className="text-2xl font-bold mb-4">$0/month</p>
              <Link
                href="/signup"
                className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-600 mb-4">Access all features</p>
              <p className="text-2xl font-bold mb-4">$10/month</p>
              <Link
                href="/signup"
                className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Join StyleMatch Today</h2>
          <p className="text-gray-600">Take your business to the next level.</p>
          <Link
            href="/auth"
            className="mt-4 inline-block rounded-lg bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
