import React, { useEffect, useState } from "react";
import "./BookDetail.css";
import { get } from "../../utils/ApiCaller";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  CardMedia,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import Label from "../MyInvoice/Label";
import { useTheme } from "@emotion/react";

function BookDetail({ handleAddToCart }) {
  const [bookDetail, setBookDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { bookID } = useParams();
  const theme = useTheme();

  useEffect(() => {
    // Get Book Detail
    get("/api/book/detail?book=" + bookID).then((res) => {
      setBookDetail(res.data.content);
      setIsLoading(false);
    });
  }, [bookID]);

  const calStar = (dataDetail) => {
    var avgstar = 0;
    for (let j = 0; j < dataDetail.rating.length; j++) {
      avgstar += dataDetail.rating[j].star;
    }
    avgstar = avgstar / dataDetail.rating.length;
    if (dataDetail.rating.length === 0) return -1;
    return avgstar;
  };
  const item = bookDetail;
  return isLoading ? (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress className="m-2" />
    </Box>
  ) : (
    <Container maxWidth="lg" sx={{ minHeight: "70vh" }}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Card>
            <CardMedia
              component="img"
              image={
                bookDetail.picture ||
                "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
              }
              alt="Book thumbnail"
            />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ px: 5, py: 3 }}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ fontWeight: 600 }}
                variant="h4"
                component="div"
              >
                {bookDetail.bookName}
              </Typography>
              <Typography gutterBottom className="card-text">
                {calStar(bookDetail) < 0 ? (
                  "No reviews yet"
                ) : (
                  <Rating
                    name="read-only"
                    value={calStar(bookDetail)}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                )}
              </Typography>

              <Typography gutterBottom variant="body1" color="text.secondary">
                {bookDetail.description}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tác giả: {bookDetail.authorName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Nhà xuất bản: {bookDetail.publisherName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Thể loại: {bookDetail.categories.join(", ")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tình trạng:&nbsp;
                <Label
                  variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                  color={bookDetail.inStock ? "success" : "error"}
                >
                  {bookDetail.inStock ? "Còn hàng" : "Hết hàng"}
                </Label>
              </Typography>
              <Typography variant="h3" sx={{ my: 2 }} component="div">
                {Number(bookDetail.price).toLocaleString()}₫
              </Typography>
            </CardContent>

            <CardActions>
              {LocalStorageUtils.getUser()?.isAdmin ? (
                <Button
                  href={"/#/book/" + bookID + "/edit"}
                  color="success"
                  size="large"
                  variant="contained"
                >
                  Edit this book
                </Button>
              ) : (
                <Button
                  onClick={() => handleAddToCart(item)}
                  size="large"
                  variant="contained"
                >
                  Add to cart
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BookDetail;
