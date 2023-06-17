import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import PersonalLoanEMICalculator from "../loan-calculator";
import "./index.scss";
import CurrencyConvertor from "../currency-convertor";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Home from "../Home";
import Header from "../Components/Header";
function RouterOutlet() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="personal-loan-emi-calculator"
            element={<PersonalLoanEMICalculator />}
          />
          <Route path="currency-converter" element={<CurrencyConvertor />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default RouterOutlet;
