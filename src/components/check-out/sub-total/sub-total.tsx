import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sub-total.scss";

interface SubTypes {
  quantity: any;
  shipping: any;
  totalPrice: number;
  ewallet: string;
  items: Array<any>;
}
const SubTotal = ({
  quantity,
  shipping,
  totalPrice,
  ewallet,
  items,
}: SubTypes) => {
  const [price, setPrice] = useState(0);
  console.log("items", items);
  const fetchTrend = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd"
      )
      .then((data) => {
        console.log(data.data.tron.usd);
        setPrice(data.data.tron.usd);
      });
  };

  useEffect(() => {
    fetchTrend();
  }, []);

  const filterVendors = (duplicates) => {
    const hashMap = {};
    for (const [val, name] of duplicates) {
      hashMap[name] = (hashMap[name] || 0) + val;
    }
    return Object.entries(hashMap).map((pair) => [pair[1], pair[0]]);
  };

  const checkoutPage = async () => {
    let vendor: any = [];
    items.forEach((item) => {
      let totalAmount = Number(item.price) * item.quantity;
      vendor.push([totalAmount / price, item.vendorWallet]);
    });

    let uniqueWallets: any = [];
    vendor.forEach((item) => {
      if (!uniqueWallets.includes(item)) {
        uniqueWallets.push(item);
      }
    });
    let mergeArray = filterVendors(uniqueWallets);
    console.log("wallet", uniqueWallets, mergeArray);

    // Send Funds

    let tronWeb = window.tronWeb;
    await window.tronWeb.request({
      method: "tron_requestAccounts",
    });
    const { name, base58 } = window.tronWeb.defaultAddress;
    console.log("addr", base58);

    mergeArray.forEach(async (item) => {
      //address _to
      var amount = 10000; //amount，in sun
      // Create an unsigned TRX transfer transaction
      const tradeobj = await tronWeb.transactionBuilder.sendTrx(
        item[1],
        item[0],
        base58
      );
      // Sign
      const signedtxn = await tronWeb.trx.sign(tradeobj);
      // Broadcast
      const receipt = await tronWeb.trx
        .sendRawTransaction(signedtxn)
        .then((output) => {
          console.log("- Output:", output, "\n");
          return output;
        });
    });

    //END>>>>>>>>>>>>>>>>>>>>>>>>
  };

  return (
    <div className="sub-total">
      <div className="div-1">
        <p className="text-1 font-semibold">Order Summary</p>
        <p className="text-2">
          <span className="span-1">Items ({quantity})</span> ${totalPrice}
        </p>
        <p className="text-2">
          <span className="span-1">Shipping & handling</span> ${shipping}
        </p>
        <p className="text-2">
          <span className="span-1">Order total</span>${totalPrice + shipping}
        </p>
        <p className="flex justify-between">
          <span className="span-1">Order total in TRX</span>$
          {totalPrice + shipping}
        </p>
      </div>
      <button className="sob-btn text-[13px]" onClick={checkoutPage}>
        Proceed to Payment Page
      </button>
    </div>
  );
};

export default SubTotal;
