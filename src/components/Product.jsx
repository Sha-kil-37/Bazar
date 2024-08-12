import React, { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import ImageLoading from "../components/ImageLoading";
import ShortText from "../utils/ShortText";
const ProductImage = lazy(() => import("../components/Image"));

//

const Product = (props) => {
  //

  const { id, title, price, description, images } = props?.data;
  const navigate = useNavigate();
  //   handle product details
  function handleProductDetails() {
    navigate(`/product-detail/${id}`);
  }
  //
  return (
    <div
      onClick={() => handleProductDetails()}
      className="pb-2 transition duration-200 hover:shadow-md hover:cursor-pointer group"
    >
      <div className="h-[200px] overflow-hidden">
        <Suspense fallback={<ImageLoading />}>
          <ProductImage data={images[0]} />
        </Suspense>
      </div>
      <div className="px-2 mt-2">
        <div className="flex justify-between mb-1 ">
          <h3 className="font-semibold text-black transition duration-200 group-hover:text-red">
            {title}
          </h3>
          <p className="font-semibold ml-2 group-hover:text-red">
            <spa className="text-black font-medium group-hover:text-red">$</spa>{" "}
            : {price}
          </p>
        </div>
        <ShortText data={description} />
      </div>
    </div>
  );
};

export default Product;
