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
import { TextField } from "@mui/material";
import StatsCard from "../Components/Stats-card";
import { useFormik } from "formik";
import * as Yup from "yup";

const PersonalLoanEMICalculator = () => {
  const [emi, setEmi] = useState(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [loanData, setLoanData] = useState([]);

  const formik = useFormik({
    initialValues: {
      loanAmount: "",
      interestRate: "",
      loanTenure: "",
    },
    validationSchema: Yup.object({
      loanAmount: Yup.number()
        .min(1, "Loan amount must be greater than 0")
        .required("Loan amount is required"),
      interestRate: Yup.number()
        .min(0, "Interest rate must be greater than or equal to 0")
        .required("Interest rate is required"),
      loanTenure: Yup.number()
        .min(1, "Loan tenure must be greater than 0")
        .required("Loan tenure is required"),
    }),
    onSubmit: (values) => {
      calculateEMI(values);
    },
  });

  const calculateEMI = () => {
    const principal = parseFloat(formik.values.loanAmount);
    const rateOfInterest = parseFloat(formik.values.interestRate) / 100 / 12;
    const time = parseFloat(formik.values.loanTenure);

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
    <div className="calculator">
      <div className="calculatorWrapper">
        <div className="title">Personal Loan EMI Calculator</div>
        <form onSubmit={formik.handleSubmit} autoComplete="off" method="POST">
          <div className="inputWrapper">
            <TextField
              label="Loan Amount"
              variant="outlined"
              type="number"
              name={"loanAmount"}
              onChange={formik.handleChange}
              value={formik.values.loanAmount}
              helperText={
                formik.touched.loanAmount && formik.errors.loanAmount
                  ? formik.errors.loanAmount
                  : null
              }
            />
            <TextField
              label="Interest Rate"
              variant="outlined"
              type="number"
              step="0.01"
              name={"interestRate"}
              onChange={formik.handleChange}
              value={formik.values.interestRate}
              helperText={
                formik.touched.interestRate && formik.errors.interestRate
                  ? formik.errors.interestRate
                  : null
              }
            />
            <TextField
              label="Loan Tenure (in months)"
              variant="outlined"
              type="number"
              name={"loanTenure"}
              onChange={formik.handleChange}
              value={formik.values.loanTenure}
              helperText={
                formik.touched.loanTenure && formik.errors.loanTenure
                  ? formik.errors.loanTenure
                  : null
              }
            />
            <button type="submit" className="submitButton">
              Calculate
            </button>
          </div>
        </form>
        {emi > 0 && (
          <div>
            <div className="inputWrapper">
              <StatsCard label={"EMI"} value={`₹${emi}`} />
              <StatsCard
                label={"Total Interest"}
                value={`₹${totalInterestPaid}`}
              />
              <StatsCard label={"Total Amount"} value={`₹${totalAmountPaid}`} />
            </div>
            <div className="title">Amortization Details</div>
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
                  {loanData && loanData.length > 0 ? (
                    <>
                      {loanData.map((row) => (
                        <TableRow
                          key={row.month}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell scope="row">
                            {moment().add(row.month, "months").format("MMM YY")}
                          </TableCell>
                          <TableCell align="center">
                            ₹{row.principalPaid}
                          </TableCell>
                          <TableCell align="center">
                            ₹{row.interestCharged}
                          </TableCell>
                          <TableCell align="center">
                            ₹{row.totalPayment}
                          </TableCell>
                          <TableCell align="right">₹{row.balance}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        No Data Available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalLoanEMICalculator;
