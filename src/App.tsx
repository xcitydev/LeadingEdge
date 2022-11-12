import React from "react";
import "./App.css";
import DashBoardMain from "./pages/dashboard/dashboard-main";
import Setup from "./pages/setup/setup";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Stores from "./pages/stores/stores";
import Product from "./components/product/product.components";
import AlertModal from "./statics/AlertModal";
import ErrorMessage from "./statics/ErrorMessage";
import CheckOut from "./pages/check-out/check-out";
import LandingPage from "./pages/landing-page/landing-page/landing-page";

function App() {
  return (
    <Router>
      <AlertModal />
      <ErrorMessage />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/stores" element={<Stores />} />

        <Route path="/dashboard/*" element={<DashBoardMain />} />

        <Route path="/checkout" element={<CheckOut />} />
        {/* <Route path="/reset" element={<ForgotPasswordPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
