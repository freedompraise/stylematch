const HowItWorks = () => {
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
  );
};

export default HowItWorks;
