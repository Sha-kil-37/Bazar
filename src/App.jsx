import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import { useState } from "react";
import { getAuth } from "./helper/session/authSession";
import CheckOutPage from "./pages/CheckOutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentPage from "./pages/PaymentPage";
//
function App() {
  const [user, setUser] = useState(getAuth);

  //
  if (user) {
    return (
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/check-out" element={<CheckOutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<NotFoundPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default App;
