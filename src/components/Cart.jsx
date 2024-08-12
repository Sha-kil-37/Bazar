import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoRemove } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeCartList } from "../APP/slice/cartSlice";
import logo from "../images/logo.png";
import { getAuth } from "../helper/session/authSession";
import ImageLoading from "../components/ImageLoading";
const CartImage = lazy(() => import("../components/Image"));
//
const Cart = () => {
  const cartList = useSelector((state) => state.cart.cartList);
  const [user, setUser] = useState(getAuth);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [quantityArray, setQuantityArray] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(quantityArray);

  // handle cart default quantity array
  useEffect(() => {
    let cartQuantityArray = [];
    for (let index = 0; index < cartList.length; index++) {
      cartQuantityArray.push(Math.floor(Math.random() + 1));
    }
    setQuantityArray(cartQuantityArray);
  }, [cartList]);
  //  handle product subtotal price
  useEffect(() => {
    let subTotalPriceArray = cartList.map((product) => product.price);
    const subTotalPrice = subTotalPriceArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setSubTotalPrice(subTotalPrice.toFixed(2));
  }, [cartList]);

  // handle Cart Product Remove
  function handleCartProductRemove(product) {
    dispatch(removeCartList(product));
    // console.log(product);
  }
  // handle cart product increment
  function handleProductIncrement(product, key) {
    quantityArray.map((item, i) => {
      if (key === i) {
        const newArray = [...quantityArray];
        newArray[i] = item + 1;
        setQuantityArray(newArray);
      }
    });
  }
  // handle cart product decrement
  function handleProductDecrement(product, key) {
    quantityArray.map((item, i) => {
      if (key === i) {
        const newArray = [...quantityArray];
        if (newArray[i] !== 1) {
          newArray[i] = item - 1;
          setQuantityArray(newArray);
        }
      }
    });
  }
  // handle CheckOut
  function handleCheckOut() {
    if (user == null) {
      navigate("/login");
    } else {
      navigate("/check-out");
    }
  }
  //
  if (cartList.length > 0) {
    return (
      <div className="md:flex py-10">
        <div className="w-full sm:w-full md:w-[70%]  py-6">
          <h3 className="font-bold text-2xl text-black">
            ADDED PRODUCT YOUR CART
          </h3>
          <div className="mt-5 pr-6">
            {cartList.map((product, key) => (
              <div key={key} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <Suspense fallback={<ImageLoading />}>
                    <CartImage data={product.images[0]} />
                  </Suspense>
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium text-black">
                    <h3 className="text-black">Price : {product.price} $</h3>
                    <p className="ml-4">Total : {product.price} $</p>
                  </div>
                  <div className="my-3">
                    <label className="flex items-center border-[2px] border-secondaryColor w-[120px] justify-between">
                      <span
                        onClick={() => handleProductIncrement(product, key)}
                        className="px-3 py-1 text-black cursor-pointer transition duration-200 hover:bg-secondaryColor"
                      >
                        <GoPlus className="text-xl" />
                      </span>
                      {quantityArray.map((item, i) => {
                        if (key == i) {
                          return (
                            <span
                              className="flex justify-center items-center font-medium text-black"
                              key={i}
                            >
                              {item}
                            </span>
                          );
                        }
                      })}
                      <span
                        onClick={() => handleProductDecrement(product, key)}
                        className="px-3 py-1 text-black cursor-pointer transition duration-200 hover:bg-secondaryColor"
                      >
                        <IoRemove className="text-xl" />
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center gap-x-3">
                      <p className="text-black font-medium">Quantity</p>
                      <p className="font-medium text-black">
                        {quantityArray.map((item, i) => {
                          if (i === key) {
                            return item;
                          }
                        })}
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => handleCartProductRemove(product)}
                        type="button"
                        className="font-medium text-black"
                      >
                        <RiDeleteBinLine className="text-black text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full sm:w-full md:w-[30%] px-4 py-6 sm:px-6 border-[1px] border-dashed border-primaryColor">
          <h2 className="text-black font-bold">CART TOTALS </h2>
          <div className="flex justify-between mt-3">
            <h3 className="text-black font-semibold">SUBTOTAL</h3>
            <h4 className="text-black font-semibold">{subTotalPrice} $</h4>
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
            <h3 className="text-black font-semibold ">{subTotalPrice}</h3>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-5 w-full py-2 font-semibold rounded-md border-[2px] border-secondaryColor text-black  hover:bg-secondaryColor hover:text-black transition duration-200"
          >
            CONTINUE SHOPPING
          </button>
          <button
            onClick={handleCheckOut}
            className="mt-5 w-full py-2 font-semibold rounded-md bg-primaryColor text-white border-[2px] border-secondaryColor  hover:bg-secondaryColor hover:text-black transition duration-200"
          >
            PROCEED TO CHEKOUT
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center py-[50px] sm:py-[100px] md:py-[150px] lg:py-[200px] xl:py-[200px] 2xl:py-[200px]">
        <div className="text-center">
          <div className="mt-5 h-20 w-20 overflow-hidden mx-auto">
            <img className="h-full w-full" src={logo} alt={logo} />
          </div>
          <h3 className="font-bold text-2xl text-black">YOUR CART IS EMPTY</h3>
          <button
            onClick={() => navigate("/")}
            className="mt-3 px-2 py-2 text-black font-medium hover:text-primaryColor transition duration-200"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }
};

export default Cart;
