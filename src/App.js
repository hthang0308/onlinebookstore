import { Routes, Route, HashRouter } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import BookListPage from "./pages/BookListPage";
import "./App.css";
import Account from "./components/Account/account";
import Footer from "./components/Footer";
import FormSignUpPage from "./pages/FormSignUpPage";
// import FormSignUpToLoginPage from "./pages/FormSignUpToLoginPage";
import MyInvoicePage from "./pages/MyInvoicePage";
import BookCreate from "./components/BookCreate";
import FormLoginPage from "./pages/FormLoginPage";
import FormUserEditPage from "./pages/FormUserEditPage";

import LocalStorageUtils from "./utils/LocalStorageUtils";
import EditProfile from "./components/EditProfile/UserAccount";

import DetailAndRating from "./components/DetailAndRating";

import HomePage from "./pages/HomePage";
import { useState } from "react";
import TopUp from "./components/TopUp";
function App() {
  const existCart = LocalStorageUtils.getItem("cart");

  const [cart, setCart] = useState(existCart ? existCart : []);

  const handleAddToCart = (item) => {
    const exist = cart.find((x) => x.book.slug === item.slug);
    if (exist) {
      cart.map((x) => (x.book.slug === item.slug ? handleChange(x, 1) : x));
    } else {
      setCart([...cart, { book: item, quantity: 1 }]);
    }
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
              path="/book-list"
              element={<BookListPage handleAddToCart={handleAddToCart} />}
            />

            <Route path="/create-book" element={<BookCreate />} />
            {/* <Route path="/course-history" element={<CourseHistoryPage />} />
            <Route path="/course-create" element={<BookCreatePage />} /> */}

            <Route path="/signup" element={<FormSignUpPage />} />
            <Route path="/login" element={<FormLoginPage />} />
            <Route path="/change-account-info" element={<EditProfile />} />
            <Route path="/view-my-purchases" element={<MyInvoicePage />} />
            <Route path="/top-up" element={<TopUp />} />
            <Route path="/form-edit" element={<FormUserEditPage />} />

            <Route path="/my-account" element={<Account />} />
            <Route
              path="/book/:bookID"
              element={<DetailAndRating handleAddToCart={handleAddToCart} />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
