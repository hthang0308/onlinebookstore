import { useEffect, useState } from "react";
// material
import { Box, Tab, Card, Divider } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { get } from "../../utils/ApiCaller";
// components
import BookDetail from "../BookDetail";
import { ProductDetailsReview } from "./product-details";
import { useParams } from "react-router-dom";
import ReccomandTab from "../ReccomendTab";
// ----------------------------------------------------------------------

export default function EcommerceProductDetails({ handleAddToCart }) {
  const { bookID } = useParams();
  const [value, setValue] = useState("1");
  const [bookDetail, setBookDetail] = useState();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Get Book Detail
    get("/api/book/detail?book=" + bookID)
      .then((res) => {
        setBookDetail(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(bookID);
        console.log(err);
      });
    //getListBook 
    get("/api/book/search?perPage=100")
      .then((res) => {
        const items = res.data.content.items;
        setBooks(items);
      });
    setValue("1")

  }, [bookID]);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {bookDetail && (
        <Card>
          <TabContext value={value}>
            <Box sx={{ px: 3, bgcolor: "background.neutral" }}>
              <TabList onChange={handleChangeTab}>
                <Tab disableRipple value="1" label="Description" />
                <Tab
                  disableRipple
                  value="2"
                  label={`Review (${bookDetail.rating.length})`}
                  sx={{ "& .MuiTab-wrapper": { whiteSpace: "nowrap" } }}
                />
                <Tab disableRipple value="3" label="Có thể bạn sẽ thích" />
              </TabList>
            </Box>

            <Divider />

            <TabPanel value="1">
              <Box sx={{ p: 3 }}>
                <BookDetail handleAddToCart={handleAddToCart}></BookDetail>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <ProductDetailsReview product={bookDetail} />
            </TabPanel>
            <TabPanel value="3">
              <ReccomandTab product={bookDetail} books={books} ></ReccomandTab>
            </TabPanel>
          </TabContext>
        </Card>
      )}
    </>
  );
}
