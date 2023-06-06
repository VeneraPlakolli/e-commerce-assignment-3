import React, { useState, useEffect } from "react";
import '../style/style.css'
import Header from "../header/header";
import { fetchProductById } from "./GROQ_queries";
import { addCartItem } from "../data/cart";
import CartDrawer from "./CartDrawer";
import noImg from '../images/no-image.png'

const Product = ({ productId }) => {
    const[product, setProduct] = useState([]);
    const[quantityValue, setQuantityValue] = useState(1);
    const[isOpenedCart, setOpenCart] = useState(false);
    const[offsetSlider, setOffsetSlider] = useState(0);
    const[imageStoreLength, setImageStoreLength] = useState(false);
    const[isOpeningCart, setIsOpeningCart] = useState(false);
    const[isLoading, setLoading] = useState('ADD TO CART');
    const[addClassName, setClassName] = useState('');

    useEffect(() => {
        const fetchProductData = async () => {
            const fetchProduct = await fetchProductById(productId);
            setProduct(fetchProduct);
            setOffsetSlider(0); 
        }
        fetchProductData()
        
    }, [])

    useEffect(() => {
      imageLengthHandler();
    }, [product]);

    function onSetClassHandler() {
      setClassName('shop-list-visible');
    }
    function onRemoveClassHandler() {
      setClassName('');
    }

    function imageLengthHandler(){
      product.store?.variants?.map(variant => {
        variant.store.previewImageUrl?.length > 0 ? setImageStoreLength(true) : setImageStoreLength(false)
      })
    }

    const handleNext = () => {
      if (offsetSlider < product.store?.variants.length - 1) {
        setOffsetSlider((prevOffset) => prevOffset + 1);
      } else {
        setOffsetSlider(0);
      }
      
    };
    
    const handlePrev = () => {
      if (offsetSlider > 0) {
        setOffsetSlider((prevOffset) => prevOffset - 1);
      } else {
        setOffsetSlider(product.store?.variants.length - 1);
      }
    };

    const displayImages = product.store?.variants ? [
      ...product.store?.variants.slice(offsetSlider),
      ...product.store?.variants.slice(0, offsetSlider),
    ].slice(0, 2)
  : [];
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
      setOpenCart(false);
      setIsOpeningCart(false);
      setLoading('ADD TO CART');
    }

    const addCartItemHandler = async() => {
        await addCartItem(product.store?.variants?.[0].store.gid, quantityValue);
        setQuantityValue(1);
        onSetOpenCartHandler();
        console.log('domain', process.env.ACCESS_DOMAIN);
    }

    function loadingHandler() {
      setIsOpeningCart(true);
      setLoading('LOADING...');
    }

    return (
        <> 
        <div className='product-content' onClick={onRemoveClassHandler}>
          <header>
            <div className='container'>
              <Header onClassPropertie={addClassName} onSetClassEvent={onSetClassHandler}></Header>
            </div>
          </header>

          {isOpenedCart && <>
          <div className='overlay-pdp' onClick={onSetCloseCartHandler}></div>
          <div className='cart-drawer-pdp'><CartDrawer 
            openedCart={isOpenedCart} 
            onSetCloseCartEvent={onSetCloseCartHandler}
            onSetLoadingEvent = {isOpeningCart}
            ></CartDrawer></div>
          </>}
           
          <div className='container'>
            <div key={product._id} className={`pdpProduct ${imageStoreLength ? 'pdpProduct2' : ''}`}>
              <div className='pdpProduct_images'>
                <div className='product_images'>
                  {displayImages.map(variant => ( 
                    variant.store.previewImageUrl ? <div key={variant.store.id}><img src={variant.store.previewImageUrl}></img></div> : ''
                  ))
                  }
                    {imageStoreLength && 
                    <div className='prevNextButtons'>
                    <button onClick={handlePrev}>{`<`}</button>
                    <button onClick={handleNext}>{`>`}</button>
                  </div>}
                </div>


                <div className='product_mainImage'>
                  {product.store && product.store.previewImageUrl ? (
                    <img src={product.store.previewImageUrl}></img>
                  ) : (
                    <>
                    <div className="mainImage-container">
                      <img src={noImg}></img>
                    </div>
                    </>
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
                  <button onClick={() => {addCartItemHandler(); loadingHandler()}}
                  className='atc-button' disabled={isOpeningCart}>
                  {isLoading}
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
      );
   
}

export default Product;



