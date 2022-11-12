import React, { useEffect, useState } from "react";
import { getStores } from "../../firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

import "./stores.scss";
import Spinner from "../spinner/spinner";

const StoresComponent = () => {
  const navigate = useNavigate();
  const [productStores, setProductStores]: any = useState([]);
  const [loading, setloading] = useState(false);
  let products: any;
  const stores = async () => {
    setloading(false);
    products = await getStores();
    setProductStores(products);
    setloading(true);
    console.log(products, "okay");
  };

  const toProductPage = (product: any) => {
    navigate("/product", {
      state: product,
    });
  };
  useEffect(() => {
    stores();
  }, []);

  return (
    <div className="store-com">
      {!loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="div-1">
            <h1 className="text-center text-2xl font-Pacifico">
              Welcome to Leading-Edge
            </h1>
            <h2 className="text-center text-[13px] font-semibold p-2">
              Explore Stores Owned by Vendors on Leading-Edge
            </h2>
          </div>
          <div className="lg:grid grid-cols-5 pt-[5rem] px-[4rem] md:flex flex flex-wrap space-x-3 justify-around">
            {productStores.map((product: any, i: any) => (
              <div
                key={i}
                className="lg:h-[40vh] col-span-1 w-[200px]"
                onClick={() => toProductPage(product)}
              >
                <h2 className="text-lg font-Alkalami">
                  {product?.businessName}
                </h2>
                <div className="product">
                  <img
                    style={{
                      cursor: "pointer",
                    }}
                    src={product?.businessLogoUrl}
                    className="lg:h-[25vh] h-[15vh] lg:w-[200px] object-contain w-[120px]"
                  />
                </div>
                <div className="product__details">
                  <p className="bg-gray-100 text-[13px]">
                    {product?.businessType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresComponent;
