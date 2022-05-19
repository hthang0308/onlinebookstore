import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col lg-3">
            <div className="content__left-side-wrapper">
              <p className="content__left-side-description">ONLINE BOOKSTORE</p>
              <div className="content__left-side-btn-wrapper">
                <a
                  className="content__left-side-btn btn btn-primary"
                  href="/#/book-list"
                  role="button"
                >
                  View All Books Available
                </a>
              </div>
            </div>
          </div>
          <div className="col lg-6">
            <div className="content__right-side-wrapper">
              <img
                src="student.png"
                alt=""
                className="content__right-side-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
