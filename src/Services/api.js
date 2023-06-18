import axios from "axios";

export const BASE_URL = "https://api.apilayer.com/exchangerates_data";

const config = () => ({
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    apikey: process.env.REACT_APP_API_KEY,
  },
});

export const getCurrencySymbols = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/symbols`, config());
    const result = response.data;
    return Object.keys(result?.symbols);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const convertCurrency = async (amount, from, to) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/convert?to=${to}&from=${from}&amount=${amount}`,
      config()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
