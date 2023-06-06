import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import { Link } from 'gatsby';
import '../style/style.css';
import { fetchProducts } from './GROQ_queries';
import noImage from '../images/no-image.png';
import { addCartItem } from '../data/cart';
import CartDrawer from './CartDrawer';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [addClassName, setClassName] = useState('');
  const [isClickedButton, setClickedButton] = useState('');
  const [isOpenedCart, setOpenCart] = useState(false);
  const [isOpeningCart, setIsOpeningCart] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    fetchProductsData();
  }, []);

  const addCartItemHandler = async(productId) => {
    await addCartItem(productId, 1);
    onSetOpenCartHandler();
    // setLoading(true);
  }

  function onSetClassHandler() {
    setClassName('shop-list-visible');
  }
  function onRemoveClassHandler() {
    setClassName('');
  }
  function clickAddButtonHandler(productId) {
    setIsOpeningCart(true)
    setClickedButton({ productId, buttonText: 'ADDING...' });
  }

  const onSetOpenCartHandler = () => {
    setOpenCart(true);
  }
  const onSetCloseCartHandler = () => {
    setOpenCart(false);
    setIsOpeningCart(false);
    setClickedButton('ADD TO CART')
  }


  return (
    <div onClick={onRemoveClassHandler}>
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
    <div className="container">
        <div className="products"> 
           {products.map((product) => {
             const isClicked = isClickedButton && isClickedButton.productId === product._id;
             const buttonText = isClicked ? isClickedButton.buttonText : 'ADD TO CART';
            return (
              <div key={product._id} className="products_product" onClick={onRemoveClassHandler}>
              {product.store.previewImageUrl && product.store.previewImageUrl.length > 0 ? (
              <div className='product_content'><Link to={`/products/${product._id}`}><img src={product.store.previewImageUrl}></img></Link></div>
              ) : (
              <div className='product_content product_content2'><Link to={`/products/${product._id}`}><img src={noImage}></img></Link></div>)}
              <div className='product_title'><p>{product.store.title.length > 0 ? product.store.title : ''}</p></div>
              <div className='product_price'><p>${product.store.priceRange.maxVariantPrice}</p></div>
              <button onClick={() => {addCartItemHandler(product.store?.variants?.[0].store.gid); clickAddButtonHandler(product._id)}} 
              className='atc-button' disabled={isOpeningCart}>{buttonText}</button>
              </div>
            )
            })}
           
    </div>
    </div>
    </div>
  );
};

export default ProductList;
