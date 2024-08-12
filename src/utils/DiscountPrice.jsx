import React from "react";

const DiscountPrice = (props) => {
  //
  const price = props.data?.price;
  const discountPercentage = props.data?.price;
  const result = ((price / 100) * discountPercentage + price).toFixed(2);

  //
  return <span className="text-black">{result}</span>;
};

export default DiscountPrice;
