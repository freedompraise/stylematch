import { useEffect } from "react";
import { useRouter } from "next/router";
import CustomToast from "@/CustomToast";

const ConfirmEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkConfirmation = async () => {
      const { error } = router.query;

      if (error) {
        CustomToast.error(error);
        return;
      }

      router.push("/auth");
    };

    checkConfirmation();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-2xl font-bold">Email Confirmed!</h1>
        <p className="mt-4 text-gray-600">Redirecting to your login page...</p>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
