import React from "react";
//
const DateConverter = (props) => {
  //
  const date = new Date(props.data).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  //
  return <p className="text-black">{date}</p>;
};

export default DateConverter;
