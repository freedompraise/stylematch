const CaseStudies = () => {
  const caseStudies = [
    {
      title: "From Chaos to Clarity",
      description:
        "A fashion vendor increased order accuracy by 40% using StyleMatch’s delivery scheduling.",
      image: "https://via.placeholder.com/300", // Placeholder
    },
    {
      title: "Doubling Sales",
      description:
        "A food vendor doubled their sales within two months thanks to inventory tracking and automated payments.",
      image: "https://via.placeholder.com/300", // Placeholder
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
        <p className="mb-10 text-gray-600">
          See how local vendors transformed their businesses with StyleMatch.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg max-w-sm overflow-hidden"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                <p className="text-gray-600">{study.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
