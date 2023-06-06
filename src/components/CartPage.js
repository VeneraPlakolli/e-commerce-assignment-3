import React, { useState } from "react";
import Header from "../header/header";
import '../style/style.css'
import Cart from "./cart";

const CartPage = () => {
  const[addClassName, setClassName] = useState('');

  function onSetClassHandler() {
    setClassName('shop-list-visible');
  }
  function onRemoveClassHandler() {
    setClassName('');
  }

    return (
    <div onClick={onRemoveClassHandler}>
        <header>
            <div className='container'>
              <Header onClassPropertie={addClassName} onSetClassEvent={onSetClassHandler}></Header>
            </div>
          </header>
          <Cart></Cart>
    </div>
    )
}

export default CartPage;