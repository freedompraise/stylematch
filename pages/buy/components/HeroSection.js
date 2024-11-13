import {
  FaInstagramSquare,
  FaWhatsappSquare,
  FaFacebookSquare,
} from "react-icons/fa";

const HeroSection = ({ vendor }) => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-col items-center text-center">
        <img
          src={vendor.banner_image_url}
          alt={`${vendor.name} banner`}
          className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
        />

        <h1 className="text-3xl font-bold text-indigo-600">{vendor.name}</h1>
        <p className="text-gray-700 mt-2">{vendor.bio}</p>
        <div className="flex space-x-4 mt-4">
          {vendor.instagram_url && (
            <a
              href={vendor.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare className="text-2xl text-red-500" />
            </a>
          )}
          {vendor.wabusiness_url && (
            <a
              href={`https://wa.me/${vendor.wabusiness_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsappSquare className="text-2xl text-green-600" />
            </a>
          )}
          {vendor.facebook_url && (
            <a
              href={vendor.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare className="text-2xl text-blue-600" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
