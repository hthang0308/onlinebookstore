import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import CartItem from '../CartItem/CartItem';
import CartTotal from '../CartTotal/CartTotal';

const Cart = (props) => {


    return (
        <>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#cartModal">cart</button>
            <div className="modal fade w-100" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="cartCard ">
                                <div className="row">
                                    <CartTotal CartItems={props.cart} ></CartTotal>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}
export default Cart;