const Testimonials = () => {
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

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold">What Our Vendors Say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 rounded-lg bg-gray-100">
              <p className="mb-4 text-gray-600">{testimonial.feedback}</p>
              <h3 className="font-bold">{testimonial.name}</h3>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mx-auto mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;