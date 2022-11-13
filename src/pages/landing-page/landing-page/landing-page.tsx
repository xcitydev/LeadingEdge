import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/home/navbar/navbar.component";
import Header from "../header/header";
import Robot from "../../../assets/bot.png";
import Carousel from "../../../components/carosel/carousel";
import { checkIfUserExist } from "../../../firebase/firebase.utils";

type Props = {};

const LandingPage = (props: Props) => {
  const connectWallet = async () => {
    await window.tronWeb.request({
      method: "tron_requestAccounts",
    });
    const { name, base58 } = window.tronWeb.defaultAddress;
    console.log("addr", base58);
    checkIfUserExist(base58);
  };
  return (
    <>
      <div className="h-[8vh] text-[13px] flex justify-between w-full items-center px-4">
        <div className="flex items-center space-x-12 font-semibold">
          <p className="text-2xl font-Cinzel">Leading-Edge</p>
        </div>
        <div>
          <p
            className="p-2 bg-black rounded text-white cursor-pointer hover:px-3 transition-all"
            onClick={connectWallet}
          >
            Connect Wallet
          </p>
        </div>
      </div>
      <div className="h-[90vh] bg-white">
        <div className="lg:h-[50vh] h-[35vh]  grid grid-cols-4">
          <div className="absolute z-[-1]"></div>
          <div className="col-span-4 lg:col-span-2 p-[1rem] lg:pl-[4rem] flex flex-col justify-center space-y-3">
            <p className="font-Poppins text-3xl lg:text-4xl w-[70%] font-semibold">
              Welcome to Leading Edge
            </p>
            <p>
              Trade with confidence, Multiple payment gateways, Secure and
              scalable transactions.
            </p>
            <div className="flex justify-between w-2/4">
              <Link
                to="/setup"
                className=" w-fit p-2 text-[13px] rounded-sm lg:bg-black lg:text-white"
              >
                Create a Vendor account
              </Link>
              <Link
                to="/stores"
                className=" w-fit p-2 px-[3rem] text-[13px] rounded-sm lg:bg-black lg:text-white"
              >
                Stores
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex col-span-2 items-center justify-center">
            <img src={Robot} alt="a pic" className="h-[45vh] mt-5" />
          </div>
        </div>
        <Carousel />
      </div>
    </>
  );
};

export default LandingPage;
