import React, { useEffect, useState } from "react";

import CartItem from "../CartItem";
const CartTotal = (props) => {
  const CartItems = props.CartItems;
  // var price = 0;
  // for (var item of CartItems) {
  //     price += item.price * item.qty;
  // }
  //create a new object with CartItems as a field and quantity as CartItems.qty

  const handleAddToCart = () => {
    const CartItemsWithQty = CartItems.map((item) => {
      return {
        book: item,
        quantity: item.qty,
      };
    });
    console.log(CartItemsWithQty);
  };

  const [total, setTotal] = useState(0);
  const handlePrice = () => {
    var price = 0;
    for (var item of CartItems) {
      price += item.price * item.qty;
    }
    setTotal(price);
  };
  useEffect(() => {
    handlePrice();
  });
  return (
    <>
      <div className="col-md-8 cart">
        <div className="title">
          <div className="row">
            <div className="col align-self-center text-right text-muted">
              {CartItems.length} sách trong giỏ
            </div>
          </div>
        </div>
        {CartItems.length > 0 &&
          CartItems.map((item) => (
            <CartItem
              key={item.slug}
              item={item}
              handleChange={props.handleChange}
              handleRemoveItem={props.handleRemoveItem}
            ></CartItem>
          ))}
      </div>
      <div className="col-md-4 summary">
        <div>
          <h5>
            <b>Summary</b>
          </h5>
        </div>
        <div
          className="row"
          style={{ border: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
        >
          <div className="col">TOTAL PRICE</div>
          <div className="col text-right">{total} ₫</div>
        </div>
        <button onClick={handleAddToCart} className="checkout-btn ">
          CHECKOUT
        </button>
      </div>
    </>
  );
};

export default CartTotal;
