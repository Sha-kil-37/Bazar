import { Fragment, lazy, useEffect, useState, Suspense } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoIosArrowUp } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  productCategory,
  seachAndPaginationProduct,
} from "../APP/api/productApi";
import { setCategory } from "../APP/slice/categorySlice";
import { GoSearch } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { TbSettings } from "react-icons/tb";
import { IoIosLogIn } from "react-icons/io";
import { setProduct } from "../APP/slice/productSlice";
import { googleLogout } from "@react-oauth/google";
import { setUser } from "../APP/slice/userSlice";
const ProfileImage = lazy(() => import("../components/Image"));
import ImageLoading from "../components/ImageLoading";
//
const Nav = ({ children }) => {
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false);
  const [productSearchValue, setProductSearchValue] = useState("");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [clickUp, setClickUp] = useState(false);
  const cartList = useSelector((state) => state.cart.cartList);
  console.log(user);

  // handle sticy navbar
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    });
  }, [scroll]);

  // handle click up to top
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setClickUp(window.scrollY > 200);
    });
  }, [clickUp]);

  // get product category
  useEffect(() => {
    productCategory()
      .then((res) => {
        if (res?.data.length > 0) {
          dispatch(setCategory(res.data));
        } else {
          console.log("something went wrong");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // handle Product Search value
  function handleProductSearchValue(e) {
    setProductSearchValue(e.target.value);
  }
  // handle product search
  async function handleProductSearch() {
    if (productSearchValue.length > 0) {
      await seachAndPaginationProduct(productSearchValue, null)
        .then((res) => {
          if (res.data.products.length > 0) {
            dispatch(setProduct(res.data.products));
          }
          setProductSearchValue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // handle Log Out
  const handleLogOut = () => {
    googleLogout();
    localStorage.removeItem("user");
    dispatch(setUser(null));
    location.href = "/login";
  };
  // handle Up To Top
  function handleUpToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // handle Cart Page
  function handleCartPage() {
    navigate("/cart");
  }
  //
  return (
    <div className="min-h-full relative">
      {clickUp ? (
        <button
          onClick={handleUpToTop}
          className="fixed bottom-5 right-5 bg-primaryColor border-none h-8 w-8 z-10  cursor-pointer flex items-center justify-center text-white"
        >
          <IoIosArrowUp />
        </button>
      ) : null}

      <Disclosure
        className={`headerMain ${
          scroll ? "sticky bg-primaryColor z-50" : "bg-primaryColor z-50"
        }`}
        as="nav"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between sm:justify-between md:justify-between gap-x-2">
                <div>
                  <Link
                    className="text-2xl font-bold cursor-pointer text-white"
                    to="/"
                  >
                    BAZAR
                  </Link>
                </div>
                <div className="hidden md:block w-full ml-2 relative">
                  <input
                    value={productSearchValue}
                    onChange={handleProductSearchValue}
                    type="text"
                    className="rounded-md py-2 outline-none w-full px-4 text-center"
                    placeholder="Search in bazar"
                  />
                  {productSearchValue.length > 0 ? (
                    <button
                      onClick={handleProductSearch}
                      className="absolute top-[50%] translate-y-[-50%] right-2 px-4 py-[6px] bg-primaryColor bg-opacity-[0.5] rounded-md cursor-pointer"
                    >
                      <GoSearch className="text-white text-xl" />
                    </button>
                  ) : null}
                </div>
                <div className="hidden md:block ml-2 mr-1 min-w-[60px] text-center">
                  {user ? (
                    <button
                      onClick={handleLogOut}
                      className="font-medium text-white"
                    >
                      Log out
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="font-bold text-secondaryColor"
                    >
                      Log in
                    </button>
                  )}
                </div>

                {/*  */}
                <div className="hidden md:block">
                  <div className="flex items-center gap-x-3">
                    <div className="relative">
                      {cartList.length > 0 ? (
                        <div className="absolute top-[-8px] right-[-8px] flex justify-center items-center bg-red rounded-full h-6 w-6">
                          <span className="text-white">{cartList.length}</span>
                        </div>
                      ) : null}

                      <IoCartOutline
                        onClick={handleCartPage}
                        className="text-[24px] cursor-pointer text-white"
                      />
                    </div>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      {user ? (
                        <div>
                          <Menu.Button className="relative max-w-xs rounded-full border-[1px] border-secondaryColor h-8 w-8 overflow-hidden">
                            <Suspense fallback={<ImageLoading />}>
                              <ProfileImage data={user.picture} />
                            </Suspense>
                          </Menu.Button>
                        </div>
                      ) : null}

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md py-2 px-2 shadow bg-secondaryColor">
                          <ul>
                            <li onClick={()=>navigate("/profile")}  className="transition duration-200 hover:bg-white w-full hover:text-black text-black cursor-pointer">
                              Profile
                            </li>
                          </ul>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                {/*  */}

                <div className="md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-1  focus:ring-offset-1 focus:ring-offset-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden px-6">
              <div className="relative">
                <input
                  value={productSearchValue}
                  onChange={handleProductSearchValue}
                  type="text"
                  className="rounded-md py-2 outline-none w-full  px-4"
                  placeholder="search in Bazar"
                />
                {productSearchValue.length > 0 ? (
                  <button
                    onClick={handleProductSearch}
                    className="absolute top-[50%] translate-y-[-50%] right-2 px-4 py-[6px] bg-primaryColor bg-opacity-[0.5] rounded-md cursor-pointer"
                  >
                    <GoSearch className="text-secondaryColor text-xl"></GoSearch>
                  </button>
                ) : null}
              </div>

              <div className="py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {user ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.picture}
                        alt=""
                      />
                    ) : null}
                  </div>

                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-secondaryColor">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-secondaryColor mt-1">
                      {user?.email}
                    </div>
                  </div>

                  <div className="relative ml-auto flex-shrink-0">
                    {cartList.length > 0 ? (
                      <div className="bg-red h-6 w-6 rounded-full absolute top-[-10px] right-[-10px] flex justify-center items-center">
                        <span className="text-white">{cartList.length}</span>
                      </div>
                    ) : null}

                    <IoCartOutline
                      onClick={handleCartPage}
                      className="text-3xl text-white"
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <ul className="flex justify-between">
                    {user ? (
                      <li className="flex items-center gap-x-3">
                        <CgProfile className="text-2xl text-secondaryColor hidden sm:block md:block lg:block xl:block 2xl:block" />
                        <Link className="font-medium  text-secondaryColor">
                          Your Profile
                        </Link>
                      </li>
                    ) : null}

                    <li className="flex items-center gap-x-3">
                      <TbSettings className="text-2xl text-secondaryColor hidden sm:block md:block lg:block xl:block 2xl:block" />
                      <Link className="font-medium  text-secondaryColor">
                        Settings
                      </Link>
                    </li>
                    {user ? (
                      <li className="flex items-center gap-x-3  border-secondaryColor">
                        <IoIosLogIn className="text-2xl text-secondaryColor hidden sm:block md:block lg:block xl:block 2xl:block" />
                        <button
                          className="font-medium  text-secondaryColor inline-block"
                          onClick={handleLogOut}
                        >
                          Log Out
                        </button>
                      </li>
                    ) : (
                      <li className="flex items-center gap-x-3  border-secondaryColor">
                        <IoIosLogIn className="text-2xl text-secondaryColor hidden sm:block md:block lg:block xl:block 2xl:block" />
                        <button
                          className="font-medium  text-secondaryColor"
                          onClick={() => navigate("/login")}
                        >
                          Log in
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-3 px-3">
          {children}
        </div>
      </main>
      <div className="bg-secondaryColor">
        <Footer />
      </div>
    </div>
  );
};

export default Nav;
