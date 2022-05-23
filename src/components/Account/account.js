import React, { useEffect, useState } from "react";
import "./account.css";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate } from "react-router-dom";
function AccountManagemnt() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("");
  const user = LocalStorageUtils.getUser();
  useEffect(() => {
    const user = LocalStorageUtils.getUser();
    if (user === null) return;
    const username = user.username;
    const balance = user.balance * 1;
    setUsername(username);
    setBalance(balance);
  }, []);

  if (LocalStorageUtils.getUser() === null) {
    return <Navigate to="/login" />;
  }
  const logOut = () => {
    LocalStorageUtils.clear();
    window.location.reload();
  };
  return (
    <>
      <div className="content-wrapper">
        <div className="container">
          <div className="row border-bottom">
            <div className="col-lg-12">
              <div className="account-info-wrapper mb-4">
                <h3 className="account-heading">Hi, {username}</h3>
                <button
                  className="sign-out-link btn-sm btn-primary"
                  onClick={logOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="row border-bottom">
            <div className="col-lg-12">
              <div className="account-password-container mb-4 mt-4">
                <h3 className="account-password-heading">My Account</h3>
                <a
                  className="account-management-link btn btn-primary btn-sm"
                  href="/#/change-account-info"
                >
                  Manage
                </a>
              </div>
            </div>
          </div>
          {user.isAdmin ? (
            <></>
          ) : (
            <>
              <div className="row border-bottom">
                <div className="col-lg-12">
                  <div className="account-password-container mb-4 mt-4">
                    <h3 className="account-password-heading">My Purchases</h3>
                    <a
                      className="account-management-link btn btn-primary btn-sm"
                      href="/#/view-my-purchases"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="row border-bottom">
                <div className="col-lg-12">
                  <div className="account-password-container mb-4 mt-4">
                    <h3 className="account-password-heading">
                      Your balance is: {balance} (VND)
                    </h3>
                    <a
                      className="account-management-link btn btn-primary btn-sm"
                      href="/#/top-up"
                    >
                      Top Up
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AccountManagemnt;
