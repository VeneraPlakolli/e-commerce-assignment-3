import React, { useState, useEffect } from "react";
import { shopifyBuy } from "../data/helpers";
import { getCheckoutId } from "../data/cart";
import '../style/style.css'
import { updateCartItem } from "../data/cart";
import { removeCartItems } from "../data/cart";

const Cart = () => {
    
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

    console.log(items);
    return (
        <>
          <div className="cart-products">
            {items.map((lineItem) => (
                <div key={lineItem.id}>
                    <div className="container container-cart">
                        <div className="cart-product">
                            <div className="cart-product_image">
                             {lineItem.variant.image ? <img src={lineItem.variant.image.src}></img> : <div></div>} 
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
            {/* <div className="total-price"><h3>Total: ${totalPrice.toFixed(2)}</h3></div> */}
            </div>
        </>
        )
}

export default Cart;