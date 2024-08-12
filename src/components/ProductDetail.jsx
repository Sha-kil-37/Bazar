import { lazy, Suspense, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../APP/slice/productSlice";
import { getProduct } from "../APP/api/productApi";
import Slider from "./Slider";
import { BsFillStarFill } from "react-icons/bs";
import DiscountPrice from "../utils/DiscountPrice";
import Review from "./Review";
import toast from "react-hot-toast";
import { setCartList } from "../APP/slice/cartSlice";
import ImageLoading from "./ImageLoading";
const ProductImage=lazy(()=>import("../components/Image"))
// //
const ProductDetail = () => {
  //
  const { id } = useParams();
  const productData = useSelector((state) => state.product.productList[0]);
  // const navigate = useNavigate();
  const dispatch = useDispatch();


  // get single product by id
  useEffect(() => {
    getProduct(id)
      .then((res) => {
        const product = [];
        product.push(res.data);
        dispatch(setProduct(product));
      })
      .catch((error) => {
        console.log("something went wrong");
        console.log(error);
      });
  }, [id]);

  //
  // handle product CartBag
  function handleCartBag(productData) {
    const { id, title, price, images } = productData;
    const cartProduct = { id, title, price, images };
    dispatch(setCartList(cartProduct));
    toast.success("Product Add");
  }
  //
  return (
    <div className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          {productData?.tags.map((tag, i) => (
            <li key={i}>
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium text-black">
                  {tag.toUpperCase()}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <div className="md:block lg:flex xl:flex 2xl:flex justify-between mt-6">
        <div className="overflow-hidden w-full md:w-full flex justify-center items-center lg:w-[50%] xl:w-[50%] 2xl:w-[50%]">
        <Suspense fallback={<ImageLoading />}>
          <ProductImage data={productData?.images[0]} />
        </Suspense>
        </div>
        <div className="w-full mt-6 sm:mt-6 md:mt-6 lg:mt-0 xl:mt-0 2xl:mt-0 md:w-full flex justify-center items-center lg:w-[50%] xl:w-[50%] 2xl:w-[50%]">
        <Slider data={productData?.images} />
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="font-bold text-2xl text-black">
            {productData?.title}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <div className="px-2 py-2 bg-secondaryColor rounded-sm">
            <h6 className="text-black">Special Price</h6>
            <p className="font-bold text-black mt-1">
              $ : {productData?.price}
            </p>
          </div>
          <div className="mt-3">
            <h6 className="text-black">Regular Price</h6>
            <p>
              $ : {""}
              <DiscountPrice data={productData} /> - {""}
              <span className="line-through text-black">
                {productData?.discountPercentage}
              </span>
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center gap-x-2">
              <ul className="flex gap-x-1">
                {[0, 1, 2, 3].map((star, i) => {
                  return (
                    <li key={i}>
                      <BsFillStarFill className="text-black" />
                    </li>
                  );
                })}
              </ul>
              <p className="text-black">{productData?.rating}</p>
            </div>
          </div>

          <div className="mt-3">
            <p className="font-medium text-black">
              Brand : {""}
              <span className="text-black">{productData?.brand}</span>
            </p>
            <p className="font-medium text-black">
              Category : {""}
              <span className="text-black">{productData?.category}</span>
            </p>

            <p className="font-medium text-black">
              Rating : {""}
              <span>{productData?.rating}</span>
            </p>
            <p className="font-medium text-black">
              Return Policy : {""}
              <span className="text-black">{productData?.returnPolicy}</span>
            </p>
            <p className="font-medium  text-black">
              Stock : {""}
              <span className="text-black">{productData?.stock}</span>
            </p>
            <p className="font-medium text-black">
              Warranty : {""}
              <span className="text-black">
                {productData?.warrantyInformation}
              </span>
            </p>
          </div>

          <div className="mt-10">
            <button
              onClick={() => handleCartBag(productData)}
              className="flex justify-center w-full text-center mt-10 rounded-md px-8 py-2 text-base font-semibold border-[2px] border-secondaryColor text-black hover:bg-secondaryColor transition duration-200"
            >
              Add to bag
            </button>
          </div>
        </div>
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <div className="space-y-6">
              <p className="text-base text-black">{productData?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-black" />
      <div className="my-3">
        {productData?.reviews.map((value, i) => {
          return <Review key={i} data={value} />;
        })}
      </div>
    </div>
  );
};

export default ProductDetail;
