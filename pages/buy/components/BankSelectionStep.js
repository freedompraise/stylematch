import { Button } from "@mui/material";

const BankSelectionStep = ({
  bankDetails,
  selectedBank,
  setSelectedBank,
  onOrder,
}) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Select Bank for Payment</h2>
    {bankDetails.map((bank) => (
      <div key={bank.id} className="mb-4">
        <input
          type="radio"
          id={bank.id}
          name="bank"
          value={bank.id}
          onChange={() => setSelectedBank(bank)}
        />
        <label htmlFor={bank.id} className="ml-2">
          {`${bank.bankName} - ${bank.accountName} - ${bank.accountNumber}`}
        </label>
      </div>
    ))}
    <Button
      onClick={onOrder}
      variant="contained"
      color="primary"
      disabled={!selectedBank.id}
    >
      Proceed to Payment
    </Button>
  </div>
);

export default BankSelectionStep;
