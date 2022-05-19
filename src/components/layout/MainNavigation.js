import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import "./MainNavigation.css";
const MainNavigation = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(LocalStorageUtils.getUser());
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            HomePage
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/book-list"
                  className="nav-link active"
                  aria-current="page"
                >
                  All Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/your-book"
                  className="nav-link active"
                  aria-current="page"
                >
                  Your Book
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/create-book"
                  className="nav-link active"
                  aria-current="page"
                >
                  Add New Book
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto mb-lg-0">
              {user === null ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-link active"
                      aria-current="page"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <Link
                  to="/my-account"
                  className="nav-link active"
                  aria-current="page"
                >
                  <Avatar />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
