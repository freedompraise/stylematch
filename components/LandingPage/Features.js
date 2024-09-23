export const Features = () => {
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

  return (
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
  );
};
