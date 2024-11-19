import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const BankSelectionStep = ({ bankDetails, onOrder }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Bank Details</h2>
    <p>Please transfer the payment to one of the following bank accounts:</p>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Bank Name</TableCell>
          <TableCell>Account Name</TableCell>
          <TableCell>Account Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bankDetails.map((bank, index) => (
          <TableRow key={index}>
            <TableCell>{bank.name}</TableCell>
            <TableCell>{bank.account_name}</TableCell>
            <TableCell>{bank.account_number}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Button
      onClick={onOrder}
      variant="contained"
      color="primary"
      className="mt-4"
    >
      Proceed
    </Button>
  </div>
);

export default BankSelectionStep;
