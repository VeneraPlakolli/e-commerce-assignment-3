import React from "react";
import Header from "../header/header";
import '../style/style.css'
import Cart from "./cart";

const CartPage = () => {
    return <>
        <header>
            <div className='container'>
              <Header></Header>
            </div>
          </header>
          <Cart></Cart>
    </>
}

export default CartPage;