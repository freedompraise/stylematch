import Router from "next/router";

const CallToAction = () => {
  const handleButtonClick = () => {
    Router.push("/auth?mode=signup");
  };
  return (
    <section className="bg-blue-600 text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Take Your Business to the Next Level?
      </h2>
      <p className="mb-6">
        Join hundreds of local vendors transforming their businesses today.
      </p>
      <button
        className="bg-white text-blue-600 py-2 px-8 rounded hover:bg-gray-200"
        onClick={handleButtonClick}
      >
        Start Your Free Trial Today
      </button>
    </section>
  );
};

export default CallToAction;
