import { get } from "../../utils/ApiCaller";
import { useState, useEffect, useRef } from "react";
import CourseCard from "../CourseCard";
import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { post } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import Pagination from "../Pagination";
import {
  CircularProgress,
  TextField,
  Button,
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
} from "@mui/material";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";
import { Navigate } from "react-router-dom";

const CourseCreate = (props) => {
  const bookName = useRef("");
  const bookSlug = useRef("");
  const bookFee = useRef(0);
  const bookDescription = useRef("");
  const courseUrl = useRef("#");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const createNewCourse = () => {
    var url = courseUrl.current.value === "" ? "#" : courseUrl.current.value;
    var body = {
      bookName: bookName.current.value,
      slug: bookSlug.current.value,
      description: bookDescription.current.value,
      fee: bookFee.current.value - 0,
      picture: url,
    };
    post("/api/book/create", body)
      .then((res) => {
        handleClose();
        document.location.reload();
      })
      .catch((err) => {
        var x = document.querySelector(".alertlog");
        setErrMessage(err.response.data.message);
        x.style.display = "block";
        setTimeout(function () {
          x.style.display = "none";
        }, 2000);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    get("/api/book/my-book", {
      username: LocalStorageUtils.getUser()?.username,
    })
      .then((res) => setDataContent(res.data.content))
      .then(() => setIsLoading(false));
  }, []);
  if (LocalStorageUtils.getUser() === null) {
    return <Navigate to="/login"></Navigate>;
  }
  if (!LocalStorageUtils.getUser().isAdmin) {
    return <div className="ml-2 mt-2">You are not a tutor!</div>;
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const RedditTextField = styled((props) => {
    return <TextField InputProps={{ disableUnderline: true }} {...props} />;
  })(({ theme }) => ({
    "& .MuiFilledInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  return (
    <>
      <div className="title m-1 mt-4 mb-4">
        Created Courses
        <Button
          className="addbutton ml-3"
          variant="contained"
          component="span"
          onClick={handleOpen}
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Enter Courses Detail
              </Typography>
              <RedditTextField
                label="bookName"
                id="name"
                variant="filled"
                style={{ marginTop: 11, width: 300 }}
                inputRef={bookName}
              />
              <RedditTextField
                label="Fee (VND)"
                id="fee"
                type="number"
                variant="filled"
                style={{ marginTop: 11, marginLeft: 10, width: 200 }}
                inputRef={bookFee}
              />
              <RedditTextField
                label="Description"
                id="name"
                variant="filled"
                style={{ marginTop: 11, width: 300 }}
                inputRef={bookDescription}
              />
              <RedditTextField
                label="Image Url"
                id="fee"
                variant="filled"
                style={{ marginTop: 11, marginLeft: 10, width: 200 }}
                inputRef={courseUrl}
              />
              <RedditTextField
                label="Slug"
                placeholder="toeic"
                id="slug"
                variant="filled"
                style={{ marginTop: 11, marginLeft: 10, width: 150 }}
                inputRef={bookSlug}
              />
              <br />
              <div className="alertlog" style={{ display: "none" }}>
                <Alert
                  severity="error"
                  style={{ marginTop: 11, marginLeft: 10, width: 510 }}
                >
                  {errMessage}
                </Alert>
              </div>
              <Button
                className="mt-3"
                variant="contained"
                style={{ marginTop: 11, marginLeft: 100, width: 300 }}
                onClick={() => {
                  createNewCourse();
                }}
              >
                Create
              </Button>
              <Button
                className="ml-3 mt-3"
                variant="contained"
                onClick={handleClose}
                style={{ marginTop: 11, marginLeft: 100, width: 100 }}
              >
                Cancel
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>

      {!isLoading && dataContent.length > 0 && (
        <Pagination
          data={dataContent.map((dataDetail) => (
            <CourseCard dat={dataDetail} key={dataDetail._id} />
          ))}
        ></Pagination>
      )}
      {!isLoading && dataContent.length === 0 && (
        <div className="ml-2">You haven't created any course yet</div>
      )}
      {isLoading && <CircularProgress />}
    </>
  );
};
export default CourseCreate;
