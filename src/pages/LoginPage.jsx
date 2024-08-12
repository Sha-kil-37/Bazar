import React, { lazy, Suspense } from "react";
import Loading from "../components/Loding";
import Login from "../components/Login";
const Nav = lazy(() => import("../components/Nav"));
//
const LoginPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Nav>
        <Login />
      </Nav>
    </Suspense>
  );
};

export default LoginPage;
