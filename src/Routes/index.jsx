import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import PersonalLoanEMICalculator from "../loan-calculator";
import "./index.scss";
import CurrencyConvertor from "../currency-convertor";
function RouterOutlet() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-xxxxxxl shadow-E1 border-xs border-light-primary-800">
                Home Page
              </h1>
            }
          />
          <Route
            path="personal-loan-emi-calculator"
            element={<PersonalLoanEMICalculator />}
          />
          <Route path="currency-converter" element={<CurrencyConvertor />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default RouterOutlet;
