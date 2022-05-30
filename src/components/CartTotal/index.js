import React, { useEffect, useState } from "react";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { get, put, post } from "../../utils/ApiCaller";
import CartItem from "../CartItem";
import { send } from "@emailjs/browser";
const CartTotal = (props) => {
  const CartItems = props.CartItems;
  const [total, setTotal] = useState(0);
  const handlePrice = () => {
    var price = 0;
    for (var item of CartItems) {
      price += item.book.price * item.quantity;
    }
    setTotal(price);
  };
  useEffect(() => {
    handlePrice();
  });
  const createPurchase = async (values) => {
    if (!LocalStorageUtils.getUser()) {
      alert("Please login to purchase");
      return;
    }
    post("/api/purchasing/purchase", {
      items: values,
      username: LocalStorageUtils.getUser().username,
    })
      .then((res) => {
        console.log({
          items: values,
          username: LocalStorageUtils.getUser().username,
        });
        var user = LocalStorageUtils.getUser();
        user.balance = res.data.newBalance;
        LocalStorageUtils.setUser(user);
        values = [];
        LocalStorageUtils.setItem("cart", values);
        alert(res.data.message);

        if (user.email) {
          var templateParams = {
            username: user.username,
            user_email: user.email,
            total,
          };

          return send(
            process.env.REACT_APP_EMAILJS_SERVICEID,
            process.env.REACT_APP_EMAILJS_TEMPLATEID,
            templateParams,
            process.env.REACT_APP_EMAILJS_USERID
          ).then(() => {
            console.log("Send successfully");
            window.location.reload()
          });
        } else window.location.reload();
      })
      .catch((err) => alert(err.response.data.message));
  };

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
              key={item.book.slug}
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
        <button
          onClick={() => createPurchase(CartItems)}
          className="checkout-btn "
        >
          CHECKOUT
        </button>
      </div>
    </>
  );
};

export default CartTotal;
