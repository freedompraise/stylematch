import Link from "next/link";

const Policy = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
          Privacy Policy for StyleMatch
        </h1>
        <p className="text-gray-500 mb-4">
          At StyleMatch, accessible from{" "}
          <a
            href="https://stylematch.vercel.app"
            className="hover:text-indigo-600"
          >
            https://stylematch.vercel.app
          </a>
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by StyleMatch and how we use it.
        </p>
        <p className="text-gray-500 mb-4">
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>
        <p className="text-gray-500 mb-4">
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in StyleMatch. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </p>
        <h2 className="text-gray-800 text-lg font-bold mt-6">Consent</h2>
        <p className="text-gray-500">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
      </div>
    </div>
  );
};

export default Policy;
