import React from "react";
import "./index.css"
const CartItem = (props) => {
    const item = props.item;

    return (
        <>

            <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                    <div className="col-2"><img className="img-fluid" src={item.book.picture} /></div>
                    <div className="col">
                        <div className="row text-muted">{item.book.bookName}</div>

                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-danger" onClick={() => props.handleChange(item, -1)}>-</button>
                        <a className="h5 mx-2 text-dark">{item.quantity}</a>
                        <button type="button" className="btn btn-success" onClick={() => props.handleChange(item, 1)}>+</button>
                    </div>
                    <div className="col"> {item.book.price} ₫ <span onClick={() => props.handleRemoveItem(item)} className="remove-icon close">&#10005;</span></div>
                </div>
            </div>
        </>

    );


}
export default CartItem;