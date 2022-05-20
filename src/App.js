import { Routes, Route, HashRouter } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import BookListPage from "./pages/BookListPage";
import "./App.css";
import Account from "./components/Account/account";
import Footer from "./components/Footer";
import FormSignUpPage from "./pages/FormSignUpPage";
// import FormSignUpToLoginPage from "./pages/FormSignUpToLoginPage";
import BookOwnedList from "./components/BookOwnedList";
import CourseCreate from "./components/CourseCreate";
import FormLoginPage from "./pages/FormLoginPage";
import FormUserEditPage from "./pages/FormUserEditPage";
import BookDetailPage from "./pages/BookDetailPage";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <HashRouter>
      <div>
        <MainNavigation />
        <div className="ml-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-list" element={<BookListPage />} />
            <Route path="/your-book" element={<BookOwnedList />} />
            <Route path="/create-book" element={<CourseCreate />} />
            {/* <Route path="/course-history" element={<CourseHistoryPage />} />
            <Route path="/course-create" element={<CourseCreatePage />} /> */}

            <Route path="/signup" element={<FormSignUpPage />} />
            <Route path="/login" element={<FormLoginPage />} />
            <Route path="/form-edit" element={<FormUserEditPage />} />

            <Route path="/my-account" element={<Account />} />
            <Route path="/book/:bookID" element={<BookDetailPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
