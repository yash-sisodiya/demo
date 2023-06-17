import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "./calculator.scss";
import { Button, TextField } from "@mui/material";
const PersonalLoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(15);
  const [emi, setEmi] = useState(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [loanData, setLoanData] = useState([]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(loanTenure);

    const emiValue =
      (principal * rateOfInterest * Math.pow(1 + rateOfInterest, time)) /
      (Math.pow(1 + rateOfInterest, time) - 1);
    setEmi(emiValue.toFixed(2));

    let balance = principal;
    let monthData = [];
    let totalInterest = 0;
    let totalAmount = 0;

    for (let month = 1; month <= time; month++) {
      const interest = balance * rateOfInterest;
      const principalPaid = emiValue - interest;
      const totalPayment = emiValue;
      balance -= principalPaid;
      monthData.push({
        month,
        principalPaid: principalPaid.toFixed(2),
        interestCharged: interest.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : 0,
      });
      totalInterest += interest;
      totalAmount += totalPayment;
    }
    setTotalInterestPaid(totalInterest.toFixed(2));
    setTotalAmountPaid(totalAmount.toFixed(2));
    setLoanData(monthData);
  };

  return (
    <div className="calculatorWrapper">
      <h2>Personal Loan EMI Calculator</h2>
      <div>
        <TextField
          label="Loan Amount"
          variant="outlined"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <TextField
          label="Interest Rate"
          variant="outlined"
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <TextField
          label="Loan Tenure (in months)"
          variant="outlined"
          type="number"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={calculateEMI} variant="contained">
          Calculate
        </Button>
      </div>
      {emi > 0 && (
        <div>
          <h3>EMI: {emi}</h3>
          <p>Total Interest Paid: ₹{totalInterestPaid}</p>
          <p>Total Amount Paid: ₹{totalAmountPaid}</p>
          <TableContainer component={Paper}>
            <Table
              aria-label="simple table"
              sx={{
                "& thead tr th": {
                  backgroundColor: "#ECF7F5",
                  color: "#287B6C",
                  fontWeight: 700,
                },
                "& tbody tr": {
                  border: "1px solid #EAECEE",
                },
                "& td": { color: "#11182A", fontSize: 14 },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="center">Principal Paid</TableCell>
                  <TableCell align="center">Interest Charged</TableCell>
                  <TableCell align="center">Total Payment</TableCell>
                  <TableCell align="right">Balance Remaining</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanData.map((row) => (
                  <TableRow
                    key={row.month}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row">
                      {moment().add(row.month, "months").format("MMM YY")}
                    </TableCell>
                    <TableCell align="center">₹{row.principalPaid}</TableCell>
                    <TableCell align="center">₹{row.interestCharged}</TableCell>
                    <TableCell align="center">₹{row.totalPayment}</TableCell>
                    <TableCell align="right">₹{row.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default PersonalLoanEMICalculator;
