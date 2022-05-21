import React, { useState } from "react";
import "./index.css";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  let navigate = useNavigate();

  var dataDetail = props.data;
  if (dataDetail === null) return;

  const calStar = (dataDetail) => {
    var avgstar = 0;
    for (let j = 0; j < dataDetail.rating.length; j++) {
      avgstar += dataDetail.rating[j].star;
    }
    avgstar = avgstar / dataDetail.rating.length;
    if (dataDetail.rating.length === 0) return -1;
    return avgstar;
  };
  const item = { slug: dataDetail.slug, name: dataDetail.bookName, author: dataDetail.authorName, picture: dataDetail.picture, price: dataDetail.price };
  const handleClick = () => {
    navigate("/book/" + dataDetail.slug, { replace: true })
  }

  return (
    <div
      className="card m-4 bookCard clearfix"
    >
      <div onClick={handleClick}>
        <div className="imgBookCard">
          <img
            src={dataDetail.picture === "" ? (
              "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
            ) : (
              dataDetail.picture
            )}
            alt="Book thumbnail"
          />
        </div>
        <div className="card-body">
          <h4 className="card-title">{dataDetail.bookName}</h4>
          <h5 className="card-text my-2">{dataDetail.price} ₫</h5>
          <div className="card-text">
            {calStar(dataDetail) < 0 ? (
              "No reviews yet"
            ) : (
              <Rating
                name="read-only"
                value={calStar(dataDetail)}
                precision={0.5}
                size="small"
                readOnly
              />
            )}
          </div>
        </div>
      </div>
      <Button onClick={() => props.handleAddToCart(item)} size="large" variant="contained" >Add to cart</Button>
    </div >

  );
};

export default BookCard;
