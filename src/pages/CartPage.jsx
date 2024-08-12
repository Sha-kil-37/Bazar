import React, { lazy, Suspense } from "react";
import Loading from "../components/Loding";
import Cart from "../components/Cart";
const Nav = lazy(() => import("../components/Nav"));
//

const CartPage = () => {
  //

  //
  return (
    <Suspense fallback={<Loading />}>
      <Nav>
        <Cart />
      </Nav>
    </Suspense>
  );
};

export default CartPage;
