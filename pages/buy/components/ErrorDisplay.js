import Link from "next/link";

const ErrorDisplay = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
        Oops!
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 text-center">
        {message || "The vendor you're looking for could not be found."}
      </p>
      <p className="text-gray-500 mb-6 sm:mb-8 md:mb-10 text-center">
        But don’t worry, we have plenty of other vendors and products for you!
      </p>
      <Link
        href="/"
        className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-200"
      >
        Browse Other Vendors
      </Link>
      <div className="mt-4 sm:mt-6 md:mt-8">
        <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center">
          Or you can go back to the{" "}
          <Link className="text-blue-600 hover:underline" href="/">
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
