import "./index.css";
import { useState, useEffect } from "react";
import BookCard from "../BookCard";
import { get } from "../../utils/ApiCaller";
import { CircularProgress, Button, TextField, Box, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "../Pagination";

const BookList = ({ handleAddToCart }) => {
  const [searchText, setSearchText] = useState("");
  const [dataContent, setDataContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    setIsLoading(true);
    get("/api/book/search?perPage=100")
      .then((res) => {
        setDataContent(res.data.content.items);
      })
      .then(() => setIsLoading(false));
  }, []);

  const submitHandler = () => {
    setIsLoading(true);
    get("/api/book/search?q=" + searchText)
      .then((res) => {
        setDataContent(res.data.content.items);
      })
      .then(() => setIsLoading(false));
  };

  const searchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };




  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextField id="search" label="Search books" style={{ margin: "0 20px", width: "500px" }} variant="outlined" value={searchText} onChange={searchTextChangeHandler} />
        <Button onClick={submitHandler} size="large" variant="outlined"><SearchIcon /></Button>

      </Box>
      <div>
        <div className="title m-2 ml-4">All Books</div>
        {!isLoading && dataContent.length > 0 && (
          <Pagination
            data={dataContent.map((dataDetail) => {
              return <BookCard handleAddToCart={handleAddToCart} data={dataDetail} key={dataDetail._id} />
            }

            )}
          />
        )}
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress className="m-2" />
          </Box>
        ) : (
          dataContent.length === 0 && <div className="ml-2">No course!</div>
        )}
      </div>
    </Container>
  );
};

export default BookList;
