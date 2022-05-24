import React, { useEffect, useState } from "react";
import "./cart.css";
import CartTotal from '../CartTotal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = (props) => {


    return (
        <>
            <button type="button" className="btn" data-toggle="modal" data-target="#cartModal">
                <ShoppingCartIcon fontSize="large" />
                <span className="badge badge-warning" id='lblCartCount'>{props.cart.length}</span>
            </button>
            <div className="modal fade w-100" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Shopping Cart</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="cartCard ">
                                <div className="row">
                                    <CartTotal CartItems={props.cart} handleChange={props.handleChange} handleRemoveItem={props.handleRemoveItem}></CartTotal>
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