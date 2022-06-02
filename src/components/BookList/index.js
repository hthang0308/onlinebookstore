import "./index.css";
import { useState, useEffect } from "react";

import BookCard from "../BookCard";
import { get } from "../../utils/ApiCaller";
import {
  CircularProgress,
  Button,
  TextField,
  Box,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../Pagination";
import FilterTreeView from "../FilterTreeView";

const BookList = ({ handleAddToCart }) => {
  const [searchText, setSearchText] = useState("");
  const [dataContent, setDataContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState(null);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    let listCategory = [];
    get("/api/book/search?perPage=100")
      .then((res) => {
        const items = res.data.content.items;
        setDataContent(res.data.content.items);
        for (let item of items) {
          for (let category of item.categories) {
            listCategory.push(category);
          }
        }
        listCategory = Array.from(new Set(listCategory));
        setCategory(listCategory);
        setBooks(items);
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
  const filterHandler = (type, name) => {
    if (type == "all") {
      setDataContent(books);
    }
    if (type == "category") {
      let listBook = []
      for (let book of books) {
        if (book.categories.includes(name)) {
          listBook.push(book);
        };

      }
      setDataContent(listBook);
      console.log(name);
    }
  }


  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextField
          id="search"
          type="search"
          label="Search books"
          style={{ margin: "0 20px", width: "500px" }}
          variant="outlined"
          value={searchText}
          onChange={searchTextChangeHandler}
        />
        <Button onClick={submitHandler} size="large" variant="outlined">
          <SearchIcon />
        </Button>
      </Box>
      <div>
        <div>
          <FilterTreeView categories={category} filterHandler={filterHandler}>

          </FilterTreeView>
        </div>

        <div className="title z ">All Books</div>
        {!isLoading && dataContent.length > 0 && (
          <Pagination
            data={dataContent.map((dataDetail) => {
              return (
                <BookCard
                  handleAddToCart={handleAddToCart}
                  data={dataDetail}
                  key={dataDetail._id}
                />
              );
            })}
          />
        )}
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
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
