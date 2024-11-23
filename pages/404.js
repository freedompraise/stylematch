import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const NotFound = () => {
  const router = useRouter();
  const isVendorPath = router.pathname.startsWith("/vendor");

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center">
          <Link
            href="/"
            className="text-black-800 mb-8 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
            aria-label="logo"
          >
            <Image
              src="/logo.jpg" // Ensure this path is correct and the logo file is in the public folder
              alt="StyleMatch Logo"
              width={95}
              height={94}
              className="h-auto w-6 text-indigo-500"
            />
            StyleMatch
          </Link>

          <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
            That&apos;s a 404
          </p>
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            Page not found
          </h1>

          <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-gray-700">Are you a visitor?</p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
            >
              Go to Home
            </Link>
            <p className="text-lg text-gray-700">Are you a vendor?</p>
            <Link
              href="/vendor"
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
            >
              Go to Vendor Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
