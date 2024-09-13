import Link from "next/link";

const Pricing = () => {
  return (
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
  );
};

export default Pricing;
