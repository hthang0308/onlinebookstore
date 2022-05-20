import React, { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import CourseListPage from "./pages/CourseListPage";
import "./App.css";
import Account from "./components/Account/account";
import Footer from "./components/Footer";
//Phuc
// import FormSignUpToLoginPage from "./pages/FormSignUpToLoginPage";
import TestSignUp from "./components/TestSignUp";
import TestLogin from "./components/TestLogin";

//import FormLoginPage from "./pages/FormLoginPage";
import FormUserEditPage from "./pages/FormUserEditPage";
//Bao
import CourseDetailPage from "./pages/CourseDetailPage";

import HomePage from "./pages/HomePage";
import Cart from "./components/Cart/cart";
function App() {
  return (
    <HashRouter>
      <div>
        <MainNavigation />
        <div className="ml-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course-list" element={<CourseListPage />} />
            {/* <Route path="/course-history" element={<CourseHistoryPage />} />
            <Route path="/course-create" element={<CourseCreatePage />} /> */}

            <Route path="/signup" element={<TestSignUp />} />
            <Route path="/login" element={<TestLogin />} />
            <Route path="/form-edit" element={<FormUserEditPage />} />

            <Route path="/my-account" element={<Account />} />
            <Route path="/course/:courseID" element={<CourseDetailPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </HashRouter>

  );
}


export default App;
