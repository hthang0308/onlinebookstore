import React, { useEffect, useState } from "react";
import "./courseDetail.css";
import { get, post, put, remove } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate, useParams, useRouteMatch } from "react-router-dom";

function CourseDetail() {
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");

  // Role
  const [isAdmin, setIsAdmin] = useState("");

  const { bookID } = useParams();
  const getRole = async () => {
    const user = LocalStorageUtils.getUser();
    if (user !== null) setIsAdmin(user.isAdmin);
  };

  const [listEnrolledCourses, setListEnrolledCourse] = useState([]);
  useEffect(() => {
    // Get Course Detail
    get("/api/book/detail?book=" + bookID).then((res) => {
      const bookName = res.data.content.bookName;
      const description = res.data.content.description;
      let picture = res.data.content.picture;
      if (picture === "#")
        picture =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg/1200px-NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg";
      setPicture(picture);
      const price = res.data.content.price;
      const slug = res.data.content.slug;
      setBookName(bookName);
      setDescription(description);
      setPicture(picture);
      setPrice(price);
      setSlug(slug);

      const user = LocalStorageUtils.getUser();
      console.log(user);
      if (user != null)
        get("/api/purchasing/my-purchase?username=" + user.username).then(
          (res) => {
            setListEnrolledCourse(res.data.content.filter((x) => x != null));
            console.log(listEnrolledCourses);
          }
        );
    });
    getRole();
  }, []);
  const editCourseInfo = () => {
    LocalStorageUtils.getToken();
    const bookNameEdit = document.querySelector("#bookName").value;
    const descriptionEdit = document.querySelector("#description").value;
    const priceEdit = document.querySelector("#price").value;
    // const timeStartEdit = document.querySelector("#timeStart").value;
    // const timeEndEdit = document.querySelector("#timeEnd").value;
    // const startingDateEdit = document.querySelector("#startingDate").value;
    // const endingDateEdit = document.querySelector("#endingDate").value;
    put("/api/book/update", {
      slug: slug,
      bookName: bookNameEdit,
      description: descriptionEdit,
      price: priceEdit,
      // time: {
      //   starting: timeStartEdit,
      //   ending: timeEndEdit,
      // },
      // startingDate: startingDateEdit,
      // endingDate: endingDateEdit,
    })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err.response));
  };

  // OK
  const deleteCourse = () => {
    LocalStorageUtils.getToken();
    remove("/api/book/delete", { slug: slug })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err.response));
  };

  // OK
  const createZoomHostLink = () => {
    LocalStorageUtils.getToken();
    const user = LocalStorageUtils.getUser();
    if ((user = null)) {
      alert("Bạn chưa đăng ký/đăng nhập");
      <Navigate to="/login"></Navigate>;
    } else {
      // post("/api/courses/new-meeting", { slug: slug })
      // .then((res) => {
      //   const zoomHostLink = res.data.content.zoomHostLink;
      //   const zoomLink = res.data.content.zoomLink;
      //   document.querySelector(".zoomLinkContent").innerHTML = zoomHostLink;
      //   document.querySelector(".zoomLink").style.display = "block";
      //   document.querySelector(".card-course-info").style.height = "280px";
      // })
      // .catch((err) => console.log(err));
    }
  };

  // OK ----
  const getMoney = () => {
    console.log("You got 0 money");
    // LocalStorageUtils.getToken();
    // put("/api/enrolling/get-credit", { course: bookID })
    //   .then((res) => alert(res.data.message))
    //   .catch((err) => alert(err.response.data.message));
  };
  // Student
  const enrollCourse = () => {
    const user = LocalStorageUtils.getUser();
    const balance = user.balance * 1;

    if (user == null) {
      alert("Chưa đăng nhập, xin mời bạn đăng nhập");
      <Navigate to="/login" />;
    } else {
      post("/api/purchasing/purchase", {
        book: bookID,
        username: user.username,
      })
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.content.price);
          user.balance -= parseInt(res.data.content.price);
          LocalStorageUtils.setUser(user);
          document.querySelector(".enroll-button").style.display = "none";
          document.querySelector(".joining-button").style.display = "block";
          document.querySelector(".rating-button").style.display = "block";
        })
        .catch((err) => {
          if (
            err.response.data.message ===
            "User have already enrolled this course"
          ) {
            document.querySelector(".enroll-button").style.display = "none";
            document.querySelector(".joining-button").style.display = "block";
            document.querySelector(".rating-button").style.display = "block";
          } else alert(err.response.data.message);
        });
    }
  };

  const joiningCourse = () => {
    const user = LocalStorageUtils.getUser();
    if (user == null) {
      <Navigate to="/login" />;
      alert("Chưa đăng nhập, xin mời bạn đăng nhập");
    } else {
      // post("/api/courses/new-meeting", { slug: slug })
      // .then((res) => {
      //   const zoomLink = res.data.content.zoomLink;
      //   document.querySelector(".zoomLinkContentStudent").innerHTML = zoomLink;
      //   document.querySelector(".zoomLink").style.display = "block";
      //   document.querySelector(".card-course-info").style.height = "280px";
      // })
      // .catch((err) => console.log(err));
    }
  };

  const rateCourse = () => {
    console.log("0 rating");
    //sum of 2 number in javascript
    // const sum = (a, b) => a + b;
    // const rate = sum(1, 2);
    // LocalStorageUtils.getToken();
    // const user = LocalStorageUtils.getUser();
    // const starEdit = document.querySelector("#star").value;
    // put("/api/book/rate", {
    //   course: bookID,
    //   rating: { username: user.username, star: starEdit },
    // })
    //   .then((res) => {
    //     alert(res.data.message);
    //   })
    //   .catch((err) => console.log(err.response));
  };

  // Nếu đăng ký rồi mới cho đánh giá
  const displayRatingCourse = () => {
    const formRatingElement = document.querySelector(".notify-message");
    const user = LocalStorageUtils.getUser();
    const username = user.username;
    get("/api/purchasing/my-purchase?username=" + username)
      .then((res) => {
        var i = 0;
        while (i < res.data.content.filter((x) => x != null).length) {
          if (
            bookName === res.data.content.filter((x) => x != null)[i].bookName
          ) {
            formRatingElement.style.display = "block";
            break;
          }
          i++;
        }
        if (i == res.data.content.filter((x) => x != null).length)
          alert("User cannot rate this course");
      })
      .catch((err) => console.log(err.response));
  };

  // Tutor
  const renderEditPannel = () => {
    document.querySelector(".card-edit-course").style.display = "block";
    document.querySelector(".card-course-info").style.display = "none";
  };

  const cancelButton = () => {
    document.querySelector(".card-edit-course").style.display = "none";
    document.querySelector(".card-course-info").style.display = "block";
  };

  const renderViewForTutor = () => {
    // const username = LocalStorageUtils.getUser().username;
    // if (tutor === username) {
    //   return (
    //     <React.Fragment>
    //       <div className="edit-button btn btn-primary mt-2 tutor-view" onClick={renderEditPannel}>
    //         Edit
    //       </div>
    //       <div className="delete-button btn btn-danger mt-2 tutor-view" onClick={deleteCourse}>
    //         Delete
    //       </div>
    //       <div className="create-button btn btn-light mt-2 tutor-view" onClick={createZoomHostLink}>
    //         Create Zoom Link
    //       </div>
    //       <div className="get-money-button btn btn-warning mt-2 tutor-view" onClick={getMoney}>
    //         Get Money
    //       </div>
    //     </React.Fragment>
    //   );
    // } else return;
  };

  const renderView = () => {
    if (!isAdmin)
      return (
        <React.Fragment>
          <div className="container container-course">
            <div className="row">
              <div className="card-wrapper col-lg-4">
                <div className="card m-4">
                  <img src={picture} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h4 className="card-title">{bookName}</h4>
                    <p className="card-text">{description}</p>
                    <div
                      className="enroll-button btn-primary mt-4"
                      onClick={enrollCourse}
                    >
                      Enroll
                    </div>
                    <div
                      className="joining-button btn-outline-primary mt-2"
                      onClick={joiningCourse}
                    >
                      Joining
                    </div>
                    <div
                      className="rating-button btn-light mt-2"
                      onClick={displayRatingCourse}
                    >
                      Rating
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-content col-lg-6 mt-4 pt-2 card-course-info">
                <p className="card-text ">
                  <i class="fas fa-dollar-sign mr-2"></i>
                  <b>Price:</b> <span className="price-card-text">{price}</span>
                </p>
                <div className="card-content mt-4 notify-message">
                  <form className="form-rating ml-4 mt-3">
                    <p>Please input your rating: (1-5)</p>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control mb-2 mt-2"
                        id="star"
                        min="1"
                        max="5"
                      />
                      <input
                        type="button"
                        value="Submit"
                        className="btn btn-primary"
                        onClick={rateCourse}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    else if (isAdmin) {
      return (
        <React.Fragment>
          <div className="container container-course">
            <div className="row">
              <div className="card-wrapper col-lg-4">
                <div className="card m-4">
                  <img src={picture} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h4 className="card-title">{bookName}</h4>
                    <p className="card-text">{description}</p>
                    <div>{renderViewForTutor()}</div>
                  </div>
                </div>
              </div>

              <div className="card-content col-lg-6 mt-4 pt-2 card-course-info">
                <p className="card-text ">
                  <i class="fas fa-dollar-sign mr-2"></i>
                  <b>Price:</b> <span className="price-card-text">{price}</span>
                </p>
              </div>
              <div class="col-lg-8 mt-4 course-edit-wrapper">
                <div className="card-content card-edit-course">
                  <div class="course-edit-heading">
                    <h6 class="mt-3 ml-2 text-primary">Course Info</h6>
                  </div>

                  <div className="course-info-wrapper">
                    <div class="form-group edit-wrapper">
                      <label for="couseName">Course Name</label>
                      <input
                        type="text"
                        class="form-control course-edit-item"
                        id="bookName"
                        defaultValue={bookName}
                      />
                    </div>
                    <div class="form-group edit-wrapper">
                      <label for="description">Course Description</label>
                      <input
                        type="text"
                        class="form-control course-edit-item"
                        id="description"
                        defaultValue={description}
                      />
                    </div>
                    <div class="form-group edit-wrapper">
                      <label for="description">Price</label>
                      <input
                        type="number"
                        class="form-control course-edit-item"
                        id="price"
                        defaultValue={price}
                      />
                    </div>
                    <div
                      class="form-group edit-wrapper btn btn-primary save-button"
                      onClick={editCourseInfo}
                    >
                      Save
                    </div>
                    <div
                      class="form-group edit-wrapper btn btn-light btn-outline-dark cancel-button"
                      onClick={cancelButton}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="container container-course">
            <div className="row">
              <div className="card-wrapper col-lg-4">
                <div className="card m-4">
                  <img src={picture} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h4 className="card-title">{bookName}</h4>
                    <p className="card-text">{description}</p>
                  </div>
                </div>
              </div>

              <div className="card-content col-lg-6 mt-4 pt-2 card-course-info">
                <p className="card-text ">
                  <i class="fas fa-dollar-sign mr-2"></i>
                  <b>Price:</b> <span className="price-card-text">{price}</span>
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  };
  return <div>{renderView()}</div>;
}
export default CourseDetail;
