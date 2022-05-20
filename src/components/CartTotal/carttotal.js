import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import CartItem from '../CartItem/CartItem';
const CartTotal = (props) => {
    const CartItems = props.CartItems;
    return (
        <>
            <div className="col-md-8 cart">
                <div className="title">
                    <div className="row">
                        <div className="col"><h4><b>Shopping Cart</b></h4></div>
                        <div className="col align-self-center text-right text-muted">{CartItems.length} sách trong giỏ</div>
                    </div>
                </div>
                {CartItems.length > 0 && CartItems.map((item) => (<CartItem key={item.slug} item={item} ></CartItem>))}



                <div className="back-to-shop"><a href="#">&leftarrow;</a><span className="text-muted">Back to shop</span></div>
            </div>
            <div className="col-md-4 summary">
                <div><h5><b>Summary</b></h5></div>
                <div className="row" style={{ border: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                    <div className="col">TOTAL PRICE</div>
                    <div className="col text-right">&euro; 137.00</div>
                </div>
                <button className="checkout-btn ">CHECKOUT</button>
            </div>
        </>

    );

}

export default CartTotal;