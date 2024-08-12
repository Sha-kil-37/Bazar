import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  //
  const navigate = useNavigate();
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h2 className="text-black font-bold text-2xl"> THIS PART WILL BE UPDATED</h2>
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

export default Profile;
