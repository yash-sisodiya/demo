import React, { useEffect, useState } from "react";
import "./index.scss";
import { convertCurrency, getCurrencySymbols } from "../Services/api";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Images } from "../assets";
import moment from "moment";

export default function CurrencyConvertor() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [convertedData, setConvertedData] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    getSymbols();
  }, []);

  const getSymbols = async () => {
    try {
      setIsloading(true);
      let data = await getCurrencySymbols();
      setCurrencyOptions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
      fromCurrency: "usd",
      toCurrency: "eur",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .min(1, "amount must be greater than 0")
        .required("amount is required"),
    }),
    onSubmit: (values) => {
      convert(values);
    },
  });

  const convert = async () => {
    try {
      setIsloading(true);
      let data = await convertCurrency(
        formik.values.amount,
        formik.values.fromCurrency,
        formik.values.toCurrency
      );
      setConvertedData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleChange = (type, event) => {
    switch (type) {
      case "from":
        formik.setFieldValue("fromCurrency", event.target.value);
        break;
      case "to":
        formik.setFieldValue("toCurrency", event.target.value);
        break;
      default:
        break;
    }
  };

  const generateCurrencyOptions = (selectedCurrency) => {
    return currencyOptions
      .filter((currency) => currency.toLowerCase() !== selectedCurrency)
      .map((currency) => (
        <MenuItem key={currency} value={currency.toLowerCase()}>
          {currency}
        </MenuItem>
      ));
  };

  const swapCurrency = () => {
    formik.setFieldValue("fromCurrency", formik.values.toCurrency);
    formik.setFieldValue("toCurrency", formik.values.fromCurrency);
  };

  return (
    <div className="converter">
      <div className="converterWrapper">
        <div className="title">Currency Converter</div>
        <form onSubmit={formik.handleSubmit} autoComplete="off" method="POST">
          <div className="inputs">
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              name={"amount"}
              onChange={formik.handleChange}
              value={formik.values.amount}
              helperText={
                formik.touched.amount && formik.errors.amount
                  ? formik.errors.amount
                  : null
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.fromCurrency}
                label="From"
                onChange={(e) => handleChange("from", e)}
              >
                {generateCurrencyOptions(formik.values.toCurrency)}
              </Select>
            </FormControl>
            <div className="swapIcon">
              <img src={Images.swap_icon} alt="swap" onClick={swapCurrency} />
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">To</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.toCurrency}
                label="To"
                onChange={(e) => handleChange("to", e)}
              >
                {generateCurrencyOptions(formik.values.fromCurrency)}
              </Select>
            </FormControl>

            <button className="submitButton" type="submit" disabled={isLoading}>
              {isLoading ? "loading" : "Convert"}
            </button>
          </div>
        </form>
        {convertedData && (
          <div className="result">
            <div className="total">
              {Number(convertedData.result).toFixed(2)}
            </div>
            <div>Current Rate = {convertedData.info.rate}</div>
            <div>
              Timestamp:{" "}
              {moment
                .unix(convertedData.info.timestamp)
                .format("DD MMM YYYY HH:mm")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
