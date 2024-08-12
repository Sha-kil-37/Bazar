import React, { useEffect, useState } from "react";
//
const ShortText = (props) => {
  const [result, setResult] = useState("");
  //
  useEffect(() => {
    if (props.data.length > 50) {
      const result = props.data.substring(0, 15)+"...."
      setResult(result);
    }
  }, [props]);
  //
  return (
    <div>
      <h5 className="font-medium text-black">{result}</h5>
    </div>
  );
};

export default ShortText;
