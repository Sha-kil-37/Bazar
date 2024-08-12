import React, { lazy, Suspense } from "react";
import CheckOut from "../components/CheckOut";
import Loading from "../components/Loding";
const Nav = lazy(() => import("../components/Nav"));

//
const CheckOutPage = () => {
  //

  //
  return (
    <Suspense fallback={<Loading />}>
      <Nav>
        <CheckOut />
      </Nav>
    </Suspense>
  );
};

export default CheckOutPage;
