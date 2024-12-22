import { Image } from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Kevwe",
      feedback:
        "I always needed a platform like this to sell my products online, and StyleMatch has been a great help!",
      image: "/vendor-a.jpg",
    },
    // {
    //   name: "Vendor B",
    //   feedback: "Easy to use and great support!",
    //   image: "/vendor-b.jpg",
    // },
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
  );
};

export default Testimonials;
