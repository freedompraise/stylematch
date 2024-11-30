import Head from "next/head";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Terms of Service - StyleMatch</title>
        <meta
          name="description"
          content="Review the terms of service for using StyleMatch, our platform for connecting buyers and vendors."
        />
      </Head>
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to StyleMatch. By using our platform, you agree to comply with
        and be bound by the following terms and conditions of use. Please read
        them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using the StyleMatch platform, you agree to be bound by
        these Terms of Service and our Privacy Policy. If you do not agree with
        any part of these terms, you must not use our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        2. Use of the Platform
      </h2>
      <p className="mb-4">
        StyleMatch connects buyers and vendors, allowing vendors to showcase
        their products and buyers to make purchases. You agree to use the
        platform for lawful purposes and in accordance with these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Accounts</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Vendors are responsible for providing accurate business details.
        </li>
        <li>
          Buyers and vendors must safeguard their login credentials and notify
          us immediately of any unauthorized access.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">4. Transactions</h2>
      <p className="mb-4">
        StyleMatch facilitates transactions between buyers and vendors but is
        not responsible for issues such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Product quality or accuracy of descriptions.</li>
        <li>Disputes arising from delivery or payments.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        5. Prohibited Activities
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>Using the platform for fraudulent or illegal activities.</li>
        <li>Submitting false or misleading information.</li>
        <li>Attempting to compromise the platform’s security.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        6. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on the platform, including logos, text, graphics, and
        software, is the property of StyleMatch or its licensors. Unauthorized
        use is prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your access to the platform
        if you breach these terms or engage in prohibited activities.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        8. Limitation of Liability
      </h2>
      <p className="mb-4">
        StyleMatch is not liable for any direct, indirect, incidental, or
        consequential damages arising from your use of the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">9. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service from time to time. Changes will be
        effective immediately upon posting, and your continued use of the
        platform constitutes acceptance of the updated terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about these terms, please contact
        us at{" "}
        <a href="mailto:support@stylematch.com" className="text-blue-500">
          support@stylematch.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfService;
