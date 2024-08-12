import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  //
  const navigate = useNavigate();
  //
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-red font-bold text-4xl">
          404 !
        </h1>
        <h1 className="text-black font-bold text-2xl mt-5">
          NOT FOUND
        </h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-black bg-secondaryColor px-2 py-1 font-bold"
        >
          GO BACK
        </button>
      </div>
    </div>
  );
};

export default NotFound;
