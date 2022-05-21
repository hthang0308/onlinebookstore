import React from "react";

const CartItem = (props) => {
    const item = props.item;

    return (
        <>

            <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                    <div className="col-2"><img className="img-fluid" src={item.picture} /></div>
                    <div className="col">
                        <div className="row text-muted">{item.name}</div>

                    </div>
                    <div className="col">
                        <button onClick={() => props.handleChange(item, -1)}>-</button>
                        <a className="border">{item.qty}</a>
                        <button onClick={() => props.handleChange(item, 1)}>+</button>
                    </div>
                    <div className="col"> {item.price} vnd <span className="close">&#10005;</span></div>
                </div>
            </div>
        </>

    );


}
export default CartItem;