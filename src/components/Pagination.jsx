import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { seachAndPaginationProduct } from "../APP/api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../APP/slice/productSlice";
const Pagination = () => {
  //
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  //  handle product pagination
  useEffect(() => {
    seachAndPaginationProduct(currentPage, products)
      .then((res) => {
        if (res?.data.products.length > 0) {
          dispatch(setProduct(res?.data.products));
        }
      })
      .catch((error) => console.log(error));
  }, [currentPage]);
  //
  return (
    <section className="pb-4 flex justify-center relative z-0">
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default Pagination;
