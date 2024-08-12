import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { setAuth } from "../helper/session/authSession";
import { useDispatch } from "react-redux";
import { setUser } from "../APP/slice/userSlice";
import toast from "react-hot-toast";

//
const Login = () => {
  const [showPasswordEmoj, setShowPasswordEmoj] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [chekBoxValue, setChekBoxValue] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [googleUser, setGoogleUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  // get google login user data
  useEffect(() => {
    if (googleUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setAuth(res.data);
          dispatch(setUser(res.data));
          toast.success("Login Success");
        })
        .then(() => {
          setTimeout(() => {
            location.href = "/";
          }, 1500);
        })
        .catch((error) => console.log(error));
    }
  }, [googleUser]);

  // handle name
  function handleName(e) {
    setName(e.target.value);
    setNameError("");
  }
  // handle password
  function handlePassword(e) {
    setPassword(e.target.value);
    setPasswordError("");
  }

  // handdle chekbox value
  function handleChakeBox(e) {
    setChekBoxValue(e.target.checked);
  }

  // handle email
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  // handle user login using email password
  async function handleLogin(e) {
    e.preventDefault();
    if (!/^[a-zA-Z ]+$/.test(name)) {
      setNameError("Invalid Name");
    } else if (password.length < 6) {
      setPasswordError("Given Password to short");
    } else if (password.length > 6) {
      setPasswordError("Give max Password 6-digit");
    } else if (!email) {
      setEmailError("Inter your email account");
    } else if (name && password && email) {
      if (chekBoxValue) {
        console.log(name, email, password);
      } else {
        console.log("privacy and policy deikha ahen ga");
      }
      // setBtnLoading(true);

      // login api call here
      // await login(name, password, email)
      //   .then((res) => {
      //     setBtnLoading(false);
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     setBtnLoading(false);
      //     console.log(error);
      //   });
    }
  }

  //
  return (
    <section className="py-10 px-2">
      <div>
        <h1 className="text-center font-bold text-2xl text-black">
          LETS GO TO BAZAR
        </h1>
        <div className="mt-5 h-20 w-20 overflow-hidden mx-auto">
          <img className="h-full w-full" src={logo} alt={logo} />
        </div>
      </div>
      <div className="mt-4 py-6 block md:flex lg:flex xl:flex 2xl:flex gap-x-4">
        <div className="w-full">
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="name" className="font-primaryFont text-black">
                Name
              </label>
              <input
                onChange={(e) => handleName(e)}
                required={true}
                placeholder="Please inter your name"
                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="text"
              />
              <p className="mt-1 text-red">{nameError}</p>
            </div>
            <div className="mt-2">
              <label htmlFor="password" className=" text-black">
                Password
              </label>
              <div className="relative mt-2">
                {showPasswordEmoj ? (
                  <AiOutlineEye
                    onClick={() => setShowPasswordEmoj(!showPasswordEmoj)}
                    className="absolute top-[50%] right-3 translate-y-[-50%] cursor-pointer"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPasswordEmoj(!showPasswordEmoj)}
                    className="absolute top-[50%] right-3 translate-y-[-50%] cursor-pointer"
                  />
                )}

                <input
                  onChange={handlePassword}
                  required={true}
                  placeholder="Minimum 6 characters with a number and latter"
                  className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2"
                  type={showPasswordEmoj ? "text" : "password"}
                />
              </div>
              <p className="mt-1 font-primaryFont text-red">{passwordError}</p>
            </div>
            <div className="mt-2">
              <label htmlFor="email" className="font-primaryFont text-black">
                Email
              </label>
              <input
                onChange={handleEmail}
                required={true}
                placeholder="Please inter your email"
                className="w-full outline-none border-[2px] border-secondaryColor py-2 px-2 mt-2"
                type="email"
              />
              <p className="mt-1 text-red">{emailError}</p>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="w-full bg-primaryColor text-white py-2 transition duration-200 hover:bg-secondaryColor hover:text-black font-semibold"
              >
                LOG IN
              </button>
            </div>
          </form>
          <div className="flex justify-end mt-2">
            <Link to={"/reset-password"} className="text-primaryColor">
              Forgot your password ?
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-x-2">
            <label htmlFor="">
              <input
                className="cursor-pointer"
                onChange={handleChakeBox}
                type="checkbox"
                // checked
                name=""
                id=""
              />
            </label>
            <p className=" text-black">
              I agree to the
              <Link className="text-primaryColor ml-4 transition duration-200 hover:text-black">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full mt-4 sm:mt-4 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0">
          <h5 className="mt-2 font-primaryFont text-black font-medium">
            OR LOG IN WITH
          </h5>
          <div className="mt-3">
            <button
              onClick={() => login()}
              className="font-bold px-2 py-2 bg-red text-white  cursor-pointer w-full transition duration-200 hover:bg-secondaryColor hover:text-black"
            >
              Google
            </button>
          </div>
          {/* <div className="mt-3">
            <button
              onClick={() => login()}
              className="transition duration-200 hover:bg-primaryColor hover:text-white font-bold px-2 py-2 bg-secondaryColor text-primaryColor  cursor-pointer w-full"
            >
              Facebook
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
