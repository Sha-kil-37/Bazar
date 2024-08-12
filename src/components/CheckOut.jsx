import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//
const CheckOut = () => {
  //
  const cartList = useSelector((state) => state.cart.cartList);
  const [showTermsAndCondition, setShowTermsAndConditon] = useState(false);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [discrict, setDiscrict] = useState("");
  const [postCode, setPostCode] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const navigate = useNavigate();
  //  handle product subtotal price
  useEffect(() => {
    let subTotalPriceArray = cartList.map((product) => product.price);
    const subTotalPrice = subTotalPriceArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setSubTotalPrice(subTotalPrice.toFixed(2));
  }, [cartList]);
  // handle name value
  function handleName(e) {
    setName(e.target.value);
  }
  // handle email
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  // handle address
  function handleAddress(e) {
    setAddress(e.target.value);
  }
  //  handle phoneNumber
  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value);
  }
  // handle discrict
  function handleDiscrict(e) {
    setDiscrict(e.target.value);
  }
  // handle post code
  function handlePostCode(e) {
    setPostCode(e.target.value);
  }

  // handle order note
  function handleOrderNote(e) {
    setOrderNote(e.target.value);
  }

  // handle GetPayment
  function handleGetPayment() {
    // if (!name) {
    //   toast.error("name required");
    // } else if (!email) {
    //   toast.error("email required");
    // } else if (!phoneNumber) {
    //   toast.error("phone number required");
    // } else if (!discrict) {
    //   toast.error("discrit required");
    // } else if (!postCode) {
    //   toast.error("post code required");
    // } else if (!address) {
    //   toast.error("address required");
    // }
    navigate("/payment");
  }
  //
  return (
    <div className="py-10">
      <h1 className="font-bold text-2xl text-black">BULDING DETAILS</h1>
      <div className="md:flex gap-x-8">
        <div className="w-full sm:w-full md:w-[70%] py-6">
          <div className="lg:flex xl:flex 2xl:flex  gap-x-3 sm:block md:flex">
            <div className="w-full">
              <label htmlFor="name" className="font-primaryFont text-black">
                Name
              </label>
              <input
                onChange={(e) => handleName(e)}
                // required={true}

                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="text"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="font-primaryFont text-black">
                Email
              </label>
              <input
                onChange={(e) => handleEmail(e)}
                // required={true}
                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="email"
              />
            </div>
          </div>
          <div className="mt-2 lg:flex xl:flex 2xl:flex  gap-x-3 sm:block md:flex">
            <div className="w-full">
              <label htmlFor="address" className="font-primaryFont text-black">
                Address
              </label>
              <input
                onChange={(e) => handleAddress(e)}
                // required={true}

                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="text"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="font-primaryFont text-black"
              >
                Phone Number
              </label>
              <input
                onChange={(e) => handlePhoneNumber(e)}
                // required={true}

                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="number"
              />
            </div>
          </div>
          <div className="mt-2 lg:flex xl:flex 2xl:flex  gap-x-3 sm:block md:flex">
            <div className="w-full">
              <label htmlFor="discrict" className="font-primaryFont text-black">
                Discrict
              </label>
              <input
                onChange={(e) => handleDiscrict(e)}
                // required={true}

                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="text"
              />
            </div>
            <div className="w-full">
              <label htmlFor="postCode" className="font-primaryFont text-black">
                Post Code
              </label>
              <input
                onChange={(e) => handlePostCode(e)}
                // required={true}

                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="number"
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="discrict" className="font-primaryFont text-black">
              Order notes (optional)
            </label>
            <textarea
              onChange={(e) => handleOrderNote(e)}
              placeholder="Notes for special order delevery"
              className="mt-2 h-20 w-full outline-none border-[2px] border-secondaryColor px-4 py-2 resize-none"
              // name=""
              // id=""
            ></textarea>
          </div>
        </div>
        <div className="w-full sm:w-full md:w-[30%] px-4 py-6 sm:px-6 border-[1px] border-dashed border-primaryColor">
          <h2 className="text-black font-bold">YOUR ORDER</h2>
          <div className="flex justify-between mt-3">
            <h3 className="text-black font-semibold">PRODUCT</h3>
            <h4 className="text-black font-semibold">SUBTOTAL</h4>
          </div>
          <div className="mt-3">
            {cartList.map((product, key) => {
              return (
                <div key={key} className="flex justify-between py-2">
                  <h4 className="text-black font-medium">{product.title}</h4>
                  <h4 className="text-black font-medium">{product.price} $</h4>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex gap-x-3 border-t border-secondaryColor">
            <h3 className="text-black font-semibold">SHIPPING</h3>
            <ul>
              <li>
                <input disabled type="radio" />
                <label className="ml-2 text-black" htmlFor="FREE SHIPPING">
                  FREE SHIPPING
                </label>
              </li>
              <li>
                <input disabled type="radio" />
                <label className="ml-2 text-black" htmlFor="FREE SHIPPING">
                  SAME DAY DELEVERY
                </label>
              </li>
              <li>
                <input disabled type="radio" />
                <label className="ml-2 text-black" htmlFor="FREE SHIPPING">
                  2 DAY DELEVERY
                </label>
              </li>
            </ul>
          </div>
          <div className="flex mt-3 justify-between border-t border-secondaryColor">
            <h3 className="text-black font-semibold line-through">
              PAYMENT CHARGE
            </h3>
            <h3 className="text-black font-semibold line-through">0.1 $</h3>
          </div>
          <div className="flex mt-3 justify-between border-t border-secondaryColor">
            <h3 className="text-black font-semibold ">TOTAL</h3>
            <h3 className="text-black font-semibold ">{subTotalPrice} $</h3>
          </div>
          {showTermsAndCondition ? (
            <div className="mt-2 bg-secondaryColor ">
              <p className="text-black font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt consequatur veritatis voluptates sint alias voluptatum
                quaerat est. Ex, quaerat magnam?
              </p>
            </div>
          ) : null}

          <ul className="mt-2">
            <li className="flex">
              <input disabled type="checkbox" />
              <label className="ml-2 text-black">
                <p className="text-black">
                  I was read this {""}
                  <span
                    onClick={() => setShowTermsAndConditon((prev) => !prev)}
                    className="transition duration-200 hover:text-primaryColor hover:underline cursor-pointer"
                  >
                    terms and condition
                  </span>
                </p>
              </label>
            </li>
          </ul>

          <button
            onClick={handleGetPayment}
            className="mt-5 w-full py-2 font-semibold rounded-md bg-primaryColor text-white border-[2px] border-secondaryColor  hover:bg-secondaryColor hover:text-black transition duration-200"
          >
            GET PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
