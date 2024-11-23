const ConfirmEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-2xl font-bold">Confirm your Email</h1>
        <p className="mt-4 text-gray-600">
          We have sent a confirmation email to your inbox. Please verify your
          email to continue. Check your spam folder if you can't find the email.
        </p>
      </div>
    </div>
  );
};

export default ConfirmEmail;
