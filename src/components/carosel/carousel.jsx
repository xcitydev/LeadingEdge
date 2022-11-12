import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import buy from "../../assets/buy.jpeg";
import trade from "../../assets/trade.jpeg";
import newGem from "../../assets/newGem.jpeg";
import deposit from "../../assets/deposit.jpeg";
import partner from "../../assets/partner.jpeg";
import newReg from "../../assets/newReg.jpeg";
import "./carousel.scss";

const Carousel = () => {
  const colors = [buy, newGem, deposit, trade, newReg, partner];
  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <div className="slideshow ml-auto overflow-hidden h-[37vh] md:h-[20vh] lg:h-[35vh] w-full">
      <div
        className="whitespace-nowrap transition ease-in duration-1000 w-[300px] lg:h-[25vh]"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((imgSrc, index) => (
          <div
            className="lg:h-[15vh] rounded-[4px] sh m-3 inline-block w-[300px] h-[25vh]"
            key={index}
          >
            <img src={imgSrc} alt="imagefr" className="rounded-[4px]" />
          </div>
        ))}
      </div>

      <div className="slideshowDots ">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
