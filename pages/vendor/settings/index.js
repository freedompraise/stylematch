import { useAuth } from "context/useAuthContext";
import DeliveryOptions from "./components/DeliveryOptions";

const SettingsPage = () => {
  const { vendor } = useAuth();

  return (
    <div className="container mx-auto py-6 px-4 lg:px-12">
      <h1 className="text-2xl font-bold mb-6">Store Settings</h1>
      <div className="space-y-8">
        {/* Delivery Options Section */}
        <DeliveryOptions vendorId={vendor?.user_id} />

        {/* Placeholder for Future Settings */}
        <div className="p-4 bg-gray-100 shadow-md rounded-md">
          <h2 className="text-xl font-semibold">Other Settings</h2>
          <p className="text-gray-600">
            Additional settings will appear here as they are added.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
