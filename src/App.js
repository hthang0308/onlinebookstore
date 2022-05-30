import { Routes, Route, HashRouter } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import BookListPage from "./pages/BookListPage";
import "./App.css";
import Footer from "./components/Footer";
import FormSignUpPage from "./pages/FormSignUpPage";
import MyInvoicePage from "./pages/MyInvoicePage";
import BookEdit from "./components/BookEdit";
import FormLoginPage from "./pages/FormLoginPage";
import FormUserEditPage from "./pages/FormUserEditPage";

import LocalStorageUtils from "./utils/LocalStorageUtils";
import EditProfile from "./components/EditProfile/UserAccount";

import DetailAndRating from "./components/DetailAndRating";

import HomePage from "./pages/HomePage";
import React, { useState } from "react";
import TopUp from "./components/TopUp";

import ThemeConfig from "./theme";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const existCart = LocalStorageUtils.getItem("cart");
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    msg: "",
    type: "",
  });

  const handleShowSnackbar = (isOpen, msg = "", type = "") => {
    setSnackbar({ isOpen, msg, type });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ ...snackbar, isOpen: false });
  };

  const [cart, setCart] = useState(existCart ? existCart : []);

  const handleAddToCart = (item) => {
    const exist = cart.find((x) => x.book.slug === item.slug);
    if (exist) {
      cart.map((x) => (x.book.slug === item.slug ? handleChange(x, 1) : x));
    } else {
      setCart([...cart, { book: item, quantity: 1 }]);
    }
    handleShowSnackbar(true, "Add To Cart Successfully!!!", "success");
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].quantity += d;
    if (arr[ind].quantity === 0) arr[ind].quantity = 1;
    setCart([...arr]);
  };

  const handleRemoveItem = (item) => {
    setCart(cart.filter((item2) => item2.book.slug !== item.book.slug));
  };

  LocalStorageUtils.setItem("cart", cart);
  return (
    <ThemeConfig>
      <HashRouter>
        <div>
          <MainNavigation
            cart={cart}
            setCart={setCart}
            handleChange={handleChange}
            handleRemoveItem={handleRemoveItem}
          />
          <div className="ml-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/book"
                element={<BookListPage handleAddToCart={handleAddToCart} />}
              />

              <Route path="/create-book" element={<BookEdit />} />
              <Route path="/book/:bookID/edit" element={<BookEdit />} />

              <Route path="/signup" element={<FormSignUpPage />} />
              <Route path="/login" element={<FormLoginPage />} />
              <Route path="/change-account-info" element={<EditProfile />} />
              <Route path="/view-my-purchases" element={<MyInvoicePage />} />
              <Route path="/top-up" element={<TopUp />} />
              <Route path="/form-edit" element={<FormUserEditPage />} />

              {/* <Route path="/my-account" element={<Account />} /> */}
              <Route
                path="/book/:bookID"
                element={<DetailAndRating handleAddToCart={handleAddToCart} />}
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </HashRouter>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbar.isOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={1000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </ThemeConfig>
  );
}

export default App;
