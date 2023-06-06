import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import { Link } from 'gatsby';
import '../style/style.css';
import { fetchProducts } from './GROQ_queries';
import noImage from '../images/no-image.png';
import { addCartItem } from '../data/cart';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [addClassName, setClassName] = useState('');
  const [isClickedButton, setClickedButton] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    fetchProductsData();
  }, []);

  const addCartItemHandler = async(productId) => {
    await addCartItem(productId, 1);
    window.location.href = "/products/cart";
    setLoading(true);
  }

  function onSetClassHandler() {
    setClassName('shop-list-visible');
  }
  function onRemoveClassHandler() {
    setClassName('');
  }
  function clickAddButtonHandler() {
    setClickedButton(true);
  }

  return (
    <div onClick={onRemoveClassHandler}>
    <header>
        <div className='container'>
            <Header onClassPropertie={addClassName} onSetClassEvent={onSetClassHandler}></Header>
        </div>
    </header>
   
    <div className="container">
        <div className="products"> 
           {products.map((product) => {
            return (
                  <>
                  {isLoading && <>
                    <div className='overlay-pdp overlay-pdp2'></div>
                    <div className='loading-overlay'>Loading...</div>
                  </>}
                    
                    <div key={product._id} className="products_product" onClick={onRemoveClassHandler}>
                    {product.store.previewImageUrl && product.store.previewImageUrl.length > 0 ? (
                    <div className='product_content'><Link to={`/products/${product._id}`}><img src={product.store.previewImageUrl}></img></Link></div>) : 
                    (<div className='product_content product_content2'><Link to={`/products/${product._id}`}><img src={noImage}></img></Link></div>)}
                    <div className='product_title'><p>{product.store.title.length > 0 ? product.store.title : ''}</p></div>
                    <div className='product_price'><p>${product.store.priceRange.maxVariantPrice}</p></div>
                    <button onClick={() => {addCartItemHandler(product.store?.variants?.[0].store.gid); clickAddButtonHandler()}} 
                      className='atc-button' disabled={isClickedButton}>ADD TO CART</button>
                    </div>
                    </>
                    )
            })}
           
    </div>
    </div>
    </div>
  );
};

export default ProductList;
