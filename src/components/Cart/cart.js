import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import CartItem from '../CartItem/cartitem';
import CartTotal from '../CartTotal/carttotal';

const Cart = () => {
    return (
        <>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#cartModal">cart</button>
            <div className="modal fade w-100" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="cartCard ">

                                <div className="row">
                                    <div className="col-md-8 cart">
                                        <div className="title">
                                            <div className="row">
                                                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                                                <div className="col align-self-center text-right text-muted">3 items</div>
                                            </div>
                                        </div>
                                        <CartItem></CartItem>
                                        <CartItem></CartItem>
                                        <CartItem></CartItem>
                                        <div className="back-to-shop"><a href="#">&leftarrow;</a><span className="text-muted">Back to shop</span></div>
                                    </div>
                                    <CartTotal></CartTotal>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}
export default Cart;