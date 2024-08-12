import React, { lazy, Suspense } from "react";
import Loading from "../components/Loding";
const Nav = lazy(() => import("../components/Nav"));
import ProductDetail from "../components/ProductDetail";
//
const ProductDetailPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Nav>
        <ProductDetail />
      </Nav>
    </Suspense>
  );
};

export default ProductDetailPage;
