import { useState, useEffect } from "react";
import {
  updateAccountDetails,
  addAccountDetails,
  deleteAccountDetails,
} from "@/api/vendor";
import LoadingButton from "@/LoadingButton";
import CustomToast from "@/CustomToast";
import { Box, Typography } from "@mui/material";

const AccountDetails = ({ vendorId, initialBankDetails }) => {
  const [bankDetails, setBankDetails] = useState(initialBankDetails || []);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialBankDetails) {
      setBankDetails(initialBankDetails);
    }
  }, [initialBankDetails]);

  const handleAddOrUpdateAccount = async () => {
    if (!accountNumber || !bankName || !accountName) {
      CustomToast.error("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      if (editMode) {
        const updatedDetails = {
          id: editingAccountId,
          accountNumber,
          bankName,
          accountName,
        };
        const updatedBankDetails = await updateAccountDetails(
          vendorId,
          editingAccountId,
          updatedDetails
        );
        setBankDetails(updatedBankDetails);
        CustomToast.success("Account updated successfully.");
      } else {
        const accountDetails = { accountNumber, bankName, accountName };
        const updatedBankDetails = await addAccountDetails(
          vendorId,
          accountDetails
        );
        setBankDetails(updatedBankDetails);
        CustomToast.success("Account added successfully.");
      }

      resetForm();
    } catch (error) {
      CustomToast.error(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (!confirm("Are you sure you want to delete this account?")) return;

    setIsLoading(true);
    try {
      const updatedBankDetails = await deleteAccountDetails(
        vendorId,
        accountId
      );
      setBankDetails(updatedBankDetails);
      CustomToast.success("Account deleted successfully.");
    } catch (error) {
      CustomToast.error(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAccount = (account) => {
    setEditMode(true);
    setEditingAccountId(account.id);
    setAccountNumber(account.accountNumber);
    setBankName(account.bankName);
    setAccountName(account.accountName);
  };

  const resetForm = () => {
    setEditMode(false);
    setEditingAccountId(null);
    setAccountNumber("");
    setBankName("");
    setAccountName("");
  };

  return (
    <Box p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
      <Typography variant="h6" fontWeight="semibold" mb={3}>
        Bank Account Details
      </Typography>
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
        <LoadingButton onClick={handleAddOrUpdateAccount} isLoading={isLoading}>
          {editMode ? "Update Account" : "Add Account"}
        </LoadingButton>
        {editMode && (
          <button onClick={resetForm} className="text-gray-500 mt-2 underline">
            Cancel Edit
          </button>
        )}
      </div>
      <div className="mt-6">
        {bankDetails.map((account) => (
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
    </Box>
  );
};

export default AccountDetails;
