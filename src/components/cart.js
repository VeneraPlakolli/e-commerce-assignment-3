import React, { useState, useEffect } from "react";
import { shopifyBuy } from "../data/helpers";
import { getCheckoutId } from "../data/cart";
import '../style/style.css'
import { updateCartItem } from "../data/cart";
import { removeCartItems } from "../data/cart";
import noImg from '../images/no-image.png'
import { Link } from "gatsby";

const Cart = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getItems() {
            const checkoutId = await getCheckoutId();
            const checkout = await shopifyBuy.checkout.fetch(checkoutId);
            const lineItems = checkout.lineItems;
            setItems(lineItems)
        }
        getItems();
    }, []);

    const onUpdateCartHandler = async(id, quantityValue) => {
        await updateCartItem(id, quantityValue);
        const updatedItems = items.map(item => {
          if (item.id === id) {
            return {...item, quantity: quantityValue};
          }
          return item;
        });
        setItems(updatedItems);
    }

    const onRemoveItemHandler = async(id) => {
        await removeCartItems(id);
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
     
    }

    function increaseQuantityValueHandler(id, quantity) {
        let newQuantityValue = quantity + 1;
        onUpdateCartHandler(id, newQuantityValue);
    } 
  
      function decreaseQuantityValueHandler(id, quantity) {
        if(quantity > 1){
          let newQuantityValue = quantity - 1;
          onUpdateCartHandler(id, newQuantityValue);
        }
            
      }

    const totalPrice = items.reduce((accumulator, item) => accumulator + item.variant.price * item.quantity, 0);

    return (
        <>
        {items == '' && 

        <div className="cart-noItems"><h2>No items in Cart!</h2></div>
        }
          <div className="cart-products">
            {items.map((lineItem) => (
                <div key={lineItem.id}>
                    <div className="container container-cart">
                        <div className="cart-product">
                            <div className="cart-product_image">
                            {lineItem.variant.image ? <img src={lineItem.variant.image.src}></img> : <div className="cart_noImage"><img src={noImg}></img></div>} 
                            </div>
                            <div className="cart-product-data">
                                <p>{lineItem.title}</p>
                                <div className="quantity-box quantity-box-cart">
                                    <div className="decreaseQuantityButton quantityButton" onClick={() => {decreaseQuantityValueHandler(lineItem.id, lineItem.quantity)}}><button>-</button></div>
                                    <div >{lineItem.quantity}</div>
                                    <div className="quantityButton increaseButton" onClick={() => {increaseQuantityValueHandler(lineItem.id, lineItem.quantity)}}><button>+</button></div>
                                </div>
                                <button className="product-cart-removeButton" onClick={() => onRemoveItemHandler(lineItem.id)}>Remove</button>
                            </div>
                            <div className="cart-product-price"><p>${lineItem.variant.price}</p></div>
    
                        </div>
                        <hr></hr>
                    </div>
                </div>
            ))}
            <div className="container">
            <div className={`total-price ${props.isOpenedCart ? "total-price-cartdrawer" : ""}`}>
                <div className="total-price__data">
                    {props.isOpenedCart ? (
                        <>
                        <div className="total-price__data-cartdrawer">
                        <p className="price-title">SUBTOTAL</p>
                        <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <button><Link to="https://help.shopify.com/en/manual/checkout-settings">CHECK OUT</Link></button>
                        </>
                    ) : (
                        <>
                        <h3>Total</h3>
                        <h3>${totalPrice.toFixed(2)}</h3>
                        </>
                    )}
                </div>
            </div></div>
          
            </div>
        </>
        )
}

export default Cart;