import React from "react";
import { useDispatch } from "react-redux";
import "./product-item.scss";
import { addToCart } from "../../../store/basket/basket";
import { alert, close } from "../../../store/alert/alert.modal.reducer";
interface Items {
  id: any;
  itemType: string;
  imageUrl: string;
  name: string;
  price: number;
  vendorWallet: string;
}
const Item = ({ id, itemType, imageUrl, name, price, vendorWallet }: Items) => {
  const dispatch = useDispatch();
  const addToCartt = () => {
    dispatch(
      addToCart({
        id: id,
        title: name,
        image: imageUrl,
        price: price,
        rating: itemType,
        vendorWallet: vendorWallet,
      })
    );
    dispatch(alert("Items Added +"));
    setTimeout(() => {
      dispatch(close(""));
    }, 2000);
    console.log("added");
  };
  return (
    <div className="item">
      <div className="div-1">
        {/* <p className="text-1">{itemType}</p> */}
        <img
          src={imageUrl}
          alt="product"
          className="object-conatin w-[160px]"
        />
      </div>
      <div className="div-2">
        <p className="item-name">{name}</p>
        <p className="item-price">${price}</p>
      </div>
      <button className="buy-btn" onClick={addToCartt}>
        Buy Now
      </button>
    </div>
  );
};

export default Item;
