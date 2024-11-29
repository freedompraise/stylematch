const PricingPlans = () => {
  const plans = [
    {
      name: "Freemium",
      price: "Free",
      features: ["1-month trial", "Access to all core features"],
      buttonLabel: "Start Free Trial",
    },
    {
      name: "Standard Plan (Coming Soon)",
      price: "₦10,000/month",
      features: [
        "Unlimited products",
        "Order Tracking",
        "24/7 Customer Support",
      ],
      buttonLabel: "Launching Soon",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Pricing Plans</h2>
        <p className="mb-10 text-gray-600">
          Start with our free trial and explore everything StyleMatch has to
          offer. A paid plan will launch soon!
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full"
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-6 text-gray-600">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✅ {feature}</li>
                ))}
              </ul>
              <button
                className={`py-2 px-6 rounded text-white ${
                  plan.buttonLabel === "Launching Soon"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={plan.buttonLabel === "Launching Soon"}
              >
                {plan.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
