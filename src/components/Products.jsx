//
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProductByCategory,
  sortProduct,
} from "../APP/api/productApi";
import { setProduct } from "../APP/slice/productSlice";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import sliderOne from "../images/sliderOne.png";
import sliderTwo from "../images/sliderTwo.png";
import sliderThree from "../images/sliderThree.png";
import sliderFour from "../images/sliderFour.png";
import sliderFive from "../images/sliderFive.png";
import sliderSix from "../images/sliderSix.png";
import Product from "./Product";
import toast from "react-hot-toast";
//
const Products = () => {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector((state) => state.product.productList);
  const categorys = useSelector((state) => state.category.categoryList);
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const navigate = useNavigate(); //

  //
 

  const filters = [
    {
      id: "category",
      name: "Category",
      options: [
        { value: "smartphones", label: "smartphones", checked: false },
        { value: "laptops", label: "laptops", checked: false },
        { value: "fragrances", label: "fragrances", checked: false },
        { value: "skincare", label: "skincare", checked: false },
        { value: "groceries", label: "groceries", checked: false },
        {
          value: "home-decoration",
          label: "home-decoration",
          checked: false,
        },
        { value: "furniture", label: "furniture", checked: false },
        { value: "tops", label: "tops", checked: false },
        { value: "womens-dresses", label: "womens-dresses", checked: false },
        { value: "womens-shoes", label: "womens-shoes", checked: false },
        { value: "mens-shirts", label: "mens-shirts", checked: false },
        { value: "mens-shoes", label: "mens-shoes", checked: false },
        { value: "mens-watches", label: "mens-watches", checked: false },
        { value: "womens-watches", label: "womens-watches", checked: false },
        { value: "womens-bags", label: "womens-bags", checked: false },
        {
          value: "womens-jewellery",
          label: "womens-jewellery",
          checked: false,
        },
        { value: "sunglasses", label: "sunglasses", checked: true },
        { value: "automotive", label: "automotive", checked: false },
        { value: "motorcycle", label: "motorcycle", checked: false },
        { value: "lighting", label: "lighting", checked: false },
      ],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  // handle product details

  // get all product
  useEffect(() => {
    getProduct(null)
      .then((res) => {
        if (res.data.products.length > 0) {
          dispatch(setProduct(res.data.products));
        } else {
          console.log("something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //
  // get product by category
  useEffect(() => {
    getProductByCategory(categoryFilterValue)
      .then((res) => {
        if (res?.data?.products?.length > 0) {
          dispatch(setProduct(res.data.products));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryFilterValue]);
  // handleSortByAsc
  async function handleSortByAsc() {
    sortProduct("asc")
      .then((res) => {
        if (res.data.products.length > 0) {
          dispatch(setProduct(res.data.products));
        } else {
          console.log("something went wrong");
        }
      })
      .catch((error) => toast.error("Something went wrong"));
  }
  // handleSortByDesc
  function handleSortByDesc() {
    sortProduct("desc")
      .then((res) => {
        if (res.data.products.length > 0) {
          dispatch(setProduct(res.data.products));
        } else {
          console.log("something went wrong");
        }
      })
      .catch((error) => toast.error("Something went wrong"));
  }
  // 
  return (
    <div>
      <div className="h-[350px]">
        <Slider
          data={[
            sliderOne,
            sliderTwo,
            sliderThree,
            sliderFour,
            sliderFive,
            sliderSix,
          ]}
        />
      </div>

      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 z-20 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-12 shadow-xl bg-secondaryColor">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section, i) => (
                    <Disclosure
                      as="div"
                      key={i}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-4">
                            <div className="space-y-6">
                              {categorys.map((option, optionIdx) => (
                                <div
                                  key={optionIdx}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={(e) =>
                                      setCategoryFilterValue(e.target.value)
                                    }
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-primaryColor capitalize"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.toUpperCase()}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-7xl mt-3">
        <div className="flex justify-end">
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-black">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-black"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0  mt-2 w-[80px] origin-top-right rounded-md shadow bg-secondaryColor text-center px-1 py-1">
                  <ul>
                    <li
                      onClick={() => handleSortByAsc()}
                      className="transition duration-200 hover:bg-white w-full hover:text-black text-black cursor-pointer"
                    >
                      A - Z
                    </li>
                    <li
                      onClick={() => handleSortByDesc()}
                      className="transition duration-200 hover:bg-white w-full hover:text-black text-black cursor-pointer"
                    >
                      Z - A
                    </li>
                  </ul>
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <section aria-labelledby="products-heading" className="py-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              {filters.map((section, i) => (
                <Disclosure
                  as="div"
                  key={i}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm">
                          <span className="font-medium text-black">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5 text-black"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5 text-black"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {categorys.map((option, optionIdx) => (
                            <div key={optionIdx} className="flex items-center">
                              <input
                                onChange={(e) =>
                                  setCategoryFilterValue(e.target.value)
                                }
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-primaryColor capitalize"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.toUpperCase()}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="py-2 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-4">
                  {products.map((item, i) => {
                    return <Product key={i} data={item} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Pagination />
    </div>
  );
};

export default Products;
