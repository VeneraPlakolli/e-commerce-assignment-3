import React, { useState, useEffect } from "react";
import '../style/style.css'
import Header from "../header/header";
import { fetchProductById } from "./GROQ_queries";
import { addCartItem } from "../data/cart";
import CartDrawer from "./CartDrawer";

const Product = ({ productId }) => {
    const[product, setProduct] = useState([]);
    const[quantityValue, setQuantityValue] = useState(1);
    const [isOpenedCart, setOpenCart] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            const fetchProduct = await fetchProductById(productId);
            setProduct(fetchProduct);
        }
        fetchProductData()
    }, [])

    const increaseQuantityValueHandler = () => {
        setQuantityValue(quantityValue + 1);
    }
    const decreaseQuantityValueHandler = () => {
        if(quantityValue > 1){
            setQuantityValue(quantityValue - 1);
        }
        
    }
    const onSetOpenCartHandler = () => {
      setOpenCart(true);
    }
    const onSetCloseCartHandler = () => {
      setOpenCart(false)
    }

    const addCartItemHandler = async() => {
        await addCartItem(product.store?.variants?.[0].store.gid, quantityValue);
        setQuantityValue(1)
        setOpenCart(true)
    }

    return (
        <> 
        <div className='product-content'>
          <header>
            <div className='container'>
              <Header onSetOpenCartEvent={onSetOpenCartHandler}></Header>
            </div>
          </header>

          {isOpenedCart && <>
          <div className='overlay-pdp'></div>
          <div className='cart-drawer-pdp'><CartDrawer openedCart={isOpenedCart} onSetCloseCartEvent={onSetCloseCartHandler}></CartDrawer></div>
          </>}
      
          <div className='container'>
        
            <div key={product._id} className='pdpProduct'>
              <div className='pdpProduct_images'>
                <div className='product_images'>
                </div>
                <div className='product_mainImage'>
                  {product.store && product.store.previewImageUrl ? (
                    <img src={product.store.previewImageUrl}></img>
                  ) : (
                    ''
                  )}
                </div>
            
              </div>
              <div className='pdpProduct_data'>
                
                <h3>{product.store && product.store.title ? product.store.title : ''}</h3>
                <h2>${product.store ? product.store.priceRange.maxVariantPrice : ''}</h2>
                <hr></hr>
                <p>QUANTITY</p>
                <div className="quantity-box">
                                    <div className="decreaseQuantityButton quantityButton" onClick={decreaseQuantityValueHandler}><button>-</button></div>
                                    <div >{quantityValue}</div>
                                    <div className="increaseButton quantityButton" onClick={increaseQuantityValueHandler}><button>+</button></div>
                </div>
                <div className='products_product product-info'>
                  <button onClick={addCartItemHandler}>ADD TO CART</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
      );
   
}

export default Product;



