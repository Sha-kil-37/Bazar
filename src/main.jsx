import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./APP/store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
//
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="761787954134-rd48jd8s2vnv7g1j1j5e8qj8ipgk15v5.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <Toaster />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
