import React from "react";
import BuyPrice from "./BuyPrice";
import SellPrice from "./SellPrice";

const Price = () => {
  return (
    <>
      <h2>Bitcoin Price</h2>
      <BuyPrice />
      <SellPrice />
    </>
  );
};

export default Price;
