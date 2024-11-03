import { toast } from "sonner";

const CustomToast = {
  success: (message) => {
    toast.success(message, {
      position: "top-center",
      className: "bg-green-500 text-white text-xs p-2",
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "top-center",
      className: "bg-red-500 text-white text-xs p-2",
    });
  },
};

export default CustomToast;
