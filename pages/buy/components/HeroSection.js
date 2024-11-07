const HeroSection = ({ bannerImage, vendorName, bio }) => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-col items-center text-center">
        <img
          src={bannerImage}
          alt={`${vendorName} banner`}
          className="w-full h-48 object-cover mb-4"
        />
        <h1 className="text-3xl font-bold text-indigo-600">{vendorName}</h1>
        <p className="text-gray-700 mt-2">{bio}</p>
        <div className="flex space-x-4 mt-4">
          <span className="text-gray-500">Social media placeholders</span>
          {/* Add icons for social media links here as placeholders */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
