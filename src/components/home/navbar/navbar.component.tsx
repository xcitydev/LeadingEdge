// Copyright iSELL 💳 2022
// 17 U.S.C §§ 101-1511

//importing relevant files and modules
import React from "react";
// import styles
import "./navbar.scss";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import logo
const iSELLlogo = require("../../../assets/isell-logo.png");
const shoppingLogo = require("../../../assets/shopping-cart.png");

interface Active {
  isActive: boolean;
}
// JSX component
const Navbar = (props) => {
  const cart = useSelector((state: any) => state.basket);
  const Navigate = useNavigate();
  console.log(props.state, "props");

  const getVendorWallet = () => {
    Navigate("/checkout", { state: props.state });
  };

  return (
    <div className="navbar">
      <Link
        to="/"
        style={{
          cursor: "pointer",
        }}
      >
        <p className="font-Alkalami text-xl">LEADING-EDGE</p>
      </Link>

      <div className="sign_in_and_login">
        <p>Connect Wallet</p>

        <div
          className={props.isActive ? `navbar-cart` : `navbar-nocart`}
          onClick={getVendorWallet}
        >
          <img className="cart" src={shoppingLogo} alt="cart" />
          <p className="count">{cart.basket?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
