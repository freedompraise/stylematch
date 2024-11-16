import { useState, useEffect } from "react";
import {
  getAccountDetails,
  updateAccountDetails,
  addAccountDetails,
  deleteAccountDetails,
} from "@/api/vendor";
import LoadingButton from "@/LoadingButton";
import CustomToast from "@/CustomToast";

const AccountDetails = ({ vendorId }) => {
  const [accountDetails, setAccountDetails] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentAccountId, setCurrentAccountId] = useState(null);

  useEffect(() => {
    if (!vendorId) {
      console.error("Vendor ID is undefined");
      return;
    }
    const fetchAccountDetails = async () => {
      try {
        const details = await getAccountDetails(vendorId);
        setAccountDetails(details);
      } catch (error) {
        console.error("Error fetching account details:", error.message);
      }
    };
    fetchAccountDetails();
  }, [vendorId]);

  const validateForm = () => {
    if (!accountNumber || !bankName || !accountName) {
      CustomToast.error("All fields are required.");
      return false;
    }

    const isDuplicate = accountDetails.some(
      (acc) =>
        acc.accountNumber === accountNumber &&
        acc.bankName.toLowerCase() === bankName.toLowerCase() &&
        (!editMode || acc.id !== currentAccountId) // Ignore current account in edit mode
    );

    if (isDuplicate) {
      CustomToast.error(
        "An account with this Account Number and Bank Name already exists."
      );
      return false;
    }

    return true;
  };

  const handleSaveAccount = async () => {
    if (!validateForm()) return;

    const account = { accountNumber, bankName, accountName };

    if (editMode) {
      await updateAccountDetails(vendorId, currentAccountId, account);
      setAccountDetails(
        accountDetails.map((acc) =>
          acc.id === currentAccountId ? { ...acc, ...account } : acc
        )
      );
      CustomToast.success("Account updated successfully");
    } else {
      const newAccount = await addAccountDetails(vendorId, account);
      setAccountDetails((prevDetails) => [...prevDetails, newAccount]);
      CustomToast.success("Account added successfully");
    }

    // Reset form
    setEditMode(false);
    setAccountNumber("");
    setBankName("");
    setAccountName("");
  };

  const handleEditAccount = (account) => {
    setEditMode(true);
    setCurrentAccountId(account.id);
    setAccountNumber(account.accountNumber);
    setBankName(account.bankName);
    setAccountName(account.accountName);
  };

  const handleDeleteAccount = async (id) => {
    await deleteAccountDetails(vendorId, id);
    setAccountDetails((prevDetails) =>
      prevDetails.filter((acc) => acc.id !== id)
    );
    CustomToast.success("Account deleted successfully");
  };

  return (
    <div className="p-4 lg:p-12 container bg-white shadow-md rounded-md">
      <h5 className="text-xl font-semibold mb-4">Account Details</h5>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bank Name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Account Name"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <LoadingButton onClick={handleSaveAccount}>
          {editMode ? "Update Account" : "Add Account"}
        </LoadingButton>
      </div>
      <div className="mt-6">
        {accountDetails.map((account) => (
          <div
            key={account.id}
            className="p-4 border rounded-md flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{account.accountName}</p>
              <p>{account.bankName}</p>
              <p>{account.accountNumber}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleEditAccount(account)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAccount(account.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetails;
