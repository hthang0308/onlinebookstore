import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import LocalStorageUtils from "../../utils/LocalStorageUtils";

const CartTotal = () => {
    return (
        <>
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