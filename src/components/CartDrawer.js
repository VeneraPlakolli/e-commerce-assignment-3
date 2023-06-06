import React from "react";
import Cart from "./cart";
import '../style/style.css'

const CartDrawer = (props) => {

    return <div className="cart-drawer">
        <div className="cart-drawer_title">
            <h3>Cart</h3>
            <button onClick={props.onSetCloseCartEvent}>X</button>
        </div>
        <Cart isOpenedCart={props.openedCart}></Cart>
    </div>
}

export default CartDrawer;