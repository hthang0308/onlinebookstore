import React, { useState } from "react";

import { Link } from "react-router-dom";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import Cart from "../Cart";
import "./MainNavigation.css";
import AccountPopover from "../AccountPopover";

const MainNavigation = ({ cart, handleChange, handleRemoveItem }) => {
  const [user, setUser] = useState(LocalStorageUtils.getUser());
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="logo" />
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/book" className="nav-link">
              All Books
            </Link>
          </li>
          {user === null ? (
            <></>
          ) : user.isAdmin ? (
            <li className="nav-item">
              <Link to="/create-book" className="nav-link">
                Create New Book
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
        <ul className="navbar-nav ml-auto mb-lg-0">
          {user === null ? (
            <>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <AccountPopover />
              </li>
            </>
          )}
          {user?.isAdmin ? (
            <></>
          ) : (
            <li className="nav-item">
              <Cart
                cart={cart}
                handleChange={handleChange}
                handleRemoveItem={handleRemoveItem}
              ></Cart>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
